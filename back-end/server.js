const cors = require("cors");
require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./fireBaseKey.json");
const { add, format } = require("date-fns"); // For date manipulation
const { createCustomToken } = require("./jwt");
const { authAdmin } = require("./fireBase");
const cron = require("node-cron");
const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/*
Assumes users collection is structured in the following format:
users (collection):
Firebase generated ID:
first_name: "John"
last_name: "Doe"
email: "john.doe@gmail.com"
phone_number: "6474232323"
"expiry_info": {
        "Mon Feb 26 2024 18:00:00 GMT-0500 (Eastern Standard Time)": [
          "strawberries": {
            "image": "https://www.example.com/strawberries.png",
            "purchase_date": "Mon Feb 19 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          },
          "apples": {
            "image": "https://www.example.com/apples.png",
            "purchase_date": "Mon Feb 20 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          }
        ],
        "Mon Feb 27 2024 20:00:00 GMT-0500 (Eastern Standard Time)": [
          "lemons": {
            "image": "https://www.example.com/strawberries.png",
            "purchase_date": "Mon Feb 17 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          },
          "cucumber": {
            "image": "https://www.example.com/apples.png",
            "purchase_date": "Mon Feb 20 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          }
        ],
      }


      potential future version:

      "expiry_info": {
        "Mon Feb 26 2024 18:00:00 GMT-0500 (Eastern Standard Time)": [
          {
            "name": "strawberries",
            "image": "https://www.example.com/strawberries.png",
            "purchase_date": "Mon Feb 19 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          },
          {
            "name": "apples",
            "image": "https://www.example.com/apples.png",
            "purchase_date": "Mon Feb 20 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          }
        ],
        "Mon Feb 27 2024 20:00:00 GMT-0500 (Eastern Standard Time)": [
          {
            "name": "lemons",
            "image": "https://www.example.com/strawberries.png",
            "purchase_date": "Mon Feb 17 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          },
          {
            "name": "cucumber",
            "image": "https://www.example.com/apples.png",
            "purchase_date": "Mon Feb 20 2024 18:00:00 GMT-0500 (Eastern Standard Time)"
          }
        ],
      }
*/

// Initialize Firebase Admin with your project's credentials
if (admin.apps.length === 0) {
  // Check if any Firebase apps have been initialized
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Optionally, specify your database URL here
  });
}

const db = admin.firestore();
const app = express();
const port = 3001; // Use a different port than your React app
// Middleware to parse JSON body
app.use(express.json());
app.use(cors());

// Middleware for authenticating token
async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
}

// Endpoint to fetch user data
app.get("/api/user-data", authenticateToken, async (req, res) => {
  const uid = req.user.uid; // Extract user UID from verified token
  try {
    const userRef = admin.firestore().collection("users").doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(404).send("User not found.");
    }
    const userData = doc.data();
    res.json(userData); // Send user data as response
  } catch (error) {
    console.error("Error getting user data:", error);
    res.status(500).send("Failed to fetch user data.");
  }
});

app.delete("/api/delete-item", authenticateToken, async (req, res) => {
  const uid = req.user.uid; // Extract user UID from verified token
  const { itemName, expiryDate } = req.body; // Assume these are passed in the request body

  try {
    const userRef = admin.firestore().collection("users").doc(uid);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(404).send("User not found.");
    }

    const userData = doc.data();
    if (userData.expiry_info && userData.expiry_info[expiryDate]) {
      // Assuming expiry_info[expiryDate] is an object where keys are item names
      const items = userData.expiry_info[expiryDate];
      if (items.hasOwnProperty(itemName)) {
        delete items[itemName]; // Remove the item from the object
        await userRef.update({
          [`expiry_info.${expiryDate}`]: items,
        });

        res.send("Item deleted successfully.");
      } else {
        res.status(404).send("Item not found.");
      }
    } else {
      res.status(404).send("Expiry date not found.");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Failed to delete item.");
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the back-end!");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Endpoint to add contact to SendGrid
app.post("/add-contact", (req, res) => {
  const client = require("@sendgrid/client");
  client.setApiKey(process.env.SENDGRID_API_KEY);

  // Extract user details from request body
  const { email, first_name, last_name } = req.body;

  // Check if the necessary data is present
  if (!email || !first_name || !last_name) {
    return res.status(400).send("Missing required fields");
  }

  // Pantree mailing list id from sendgrid
  const list_id = "5a868631-6949-488d-94b6-7a76469423d4";

  const data = {
    contacts: [
      {
        email,
        first_name,
        last_name,
      },
    ],
    list_ids: [list_id],
  };

  const request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  };

  client
    .request(request)
    .then(([response, body]) => {
      console.log(response.statusCode);
      console.log(response.body);
      res.status(200).send("Contact added successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error adding contact");
    });
});

// Scheduled text message for all users at 6 PM informing them when their groceries will expire.
cron.schedule("0 18 * * *", async () => {
  console.log("Checking for expiring food items...");
  const usersRef = admin.firestore().collection("users");
  const snapshot = await usersRef.get();

  snapshot.forEach((doc) => {
    const userData = doc.data();
    const phoneNumber = userData.phone_number; // Assuming phone_number is correctly formatted for SMS
    const expiryInfo = userData.expiry_info || {};
    const currentDate = new Date();

    Object.keys(expiryInfo).forEach((expiryDate) => {
      const items = expiryInfo[expiryDate];
      const date = new Date(expiryDate);

      if (date >= currentDate) {
        items.forEach((item) => {
          const itemName = Object.keys(item)[0]; // Get the name of the item
          const diffTime = Math.abs(date - currentDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate difference in days
          const message = `Reminder: Your item ${itemName} will expire in ${diffDays} day(s).`;

          // Send SMS through Twilio
          twilio.messages
            .create({
              body: message,
              to: phoneNumber, // Text this number
              from: "+13653638018", // From a valid Twilio number
            })
            .then((message) => console.log(message.sid))
            .catch((error) => console.error(error));
        });
      }
    });
  });
});

app.post("/generate-token", (req, res) => {
  createCustomToken(req, res);
});

// TO CREATE CONTACT LIST

// const client = require("@sendgrid/client");
// client.setApiKey(process.env.SENDGRID_API_KEY);

// const data = {
//   name: "Mailing List",
// };

// const request = {
//   url: `/v3/marketing/lists`,
//   method: "POST",
//   body: data,
// };

// client
//   .request(request)
//   .then(([response, body]) => {
//     console.log(response.statusCode);
//     console.log(response.body);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// FOR SENDING EMAILS

// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const msg = {
//   to: "test@example.com", // Change to your recipient
//   from: "barrajiboye@gmail.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log("Email sent");
//   })
//   .catch((error) => {
//     console.error(error);
//   });
