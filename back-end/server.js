const cors = require("cors");
require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("firebase-adminsdk-cfrtp@pantree-aafff.iam.gserviceaccount.com.json");
const { add, format } = require("date-fns"); // For date manipulation
const cron = require("node-cron");
const twilio = require("twilio")(
  process.env.TWILIO_TEST_ACCOUNT_SID,
  process.env.TWILIO_TEST_AUTH_TOKEN
);

/*
Assumes users collection is structured in the following format:
users (collection):
Firebase generated ID:
first_name: "John"
last_name: "Doe"
email: "john.doe@gmail.com"
phone_number: "647-423-2323"
purchase_info: {Sun Mar 24 2024 20:00:00 GMT-0400 (Eastern Daylight Time): [apples, oranges, mango], ...}
expiry_info: {Sun Mar 31 2024 20:00:00 GMT-0400 (Eastern Daylight Time): [apples], Fri Apr 05 2024 20:00:00 GMT-0400 (Eastern Daylight Time): [oranges], ...}
*/

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const port = 3001; // Use a different port than your React app
// Middleware to parse JSON body
app.use(express.json());
app.use(cors());

app.get("/api/getExpiryInfo/:userId", async (req, res) => {
  const { userId } = req.params; // Extract userId from request parameters

  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).send("User not found");
    }

    const userData = userDoc.data();
    // Initialize with existing data if present, or empty object if not
    const currentPurchaseInfo = userData.purchase_info || {};
    const currentExpiryInfo = userData.expiry_info || {};

    for (const itemName of foodItems) {
      const itemSnapshot = await db
        .collection("items")
        .where("names", "array-contains", itemName)
        .get();
      if (itemSnapshot.empty) {
        console.log(`No matching items found for ${itemName}`);
        continue; // Skip this item if not found
      }

      const itemData = itemSnapshot.docs[0].data();
      const { exp_time, exp_unit } = itemData;
      const expiryDate = add(currentDate, {
        [exp_unit.toLowerCase()]: exp_time,
      });
      const formattedCurrentDate = format(
        currentDate,
        "EEE MMM dd yyyy HH:mm:ss 'GMT'xxx (zzzz)"
      );
      const formattedExpiryDate = format(
        expiryDate,
        "EEE MMM dd yyyy HH:mm:ss 'GMT'xxx (zzzz)"
      );

      // Merge purchase info
      if (!currentPurchaseInfo[formattedCurrentDate]) {
        currentPurchaseInfo[formattedCurrentDate] = [];
      }
      currentPurchaseInfo[formattedCurrentDate].push(itemName);

      // Merge expiry info
      if (!currentExpiryInfo[formattedExpiryDate]) {
        currentExpiryInfo[formattedExpiryDate] = [];
      }
      currentExpiryInfo[formattedExpiryDate].push(itemName);
    }

    // Apply the merged updates
    await userRef.update({
      purchase_info: currentPurchaseInfo,
      expiry_info: currentExpiryInfo,
    });

    res.status(200).send("Purchase and expiry info updated successfully");
  } catch (error) {
    console.error("Error updating user document:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/updatePurchaseAndExpiry", async (req, res) => {
  const { userId, foodItems } = req.body; // Assuming foodItems is an array of item names

  if (!userId || !foodItems) {
    return res.status(400).send("Missing userId or foodItems in request");
  }

  try {
    const userRef = db.collection("users").doc(userId);
    const currentDate = new Date();
    const purchaseInfoUpdate = {};
    const expiryInfoUpdate = {};

    for (const itemName of foodItems) {
      const itemSnapshot = await db
        .collection("items")
        .where("names", "array-contains", itemName)
        .get();

      if (itemSnapshot.empty) {
        console.log(`No matching items found for ${itemName}`);
        continue; // Skip this item if not found
      }

      const itemData = itemSnapshot.docs[0].data();
      const { exp_time, exp_unit } = itemData;
      const expiryDate = add(currentDate, {
        [exp_unit.toLowerCase()]: exp_time,
      });

      // Update purchase info with current date
      const formattedCurrentDate = format(
        currentDate,
        "EEE MMM dd yyyy HH:mm:ss 'GMT'xxx (zzzz)"
      );
      if (!purchaseInfoUpdate[formattedCurrentDate]) {
        purchaseInfoUpdate[formattedCurrentDate] = [];
      }
      purchaseInfoUpdate[formattedCurrentDate].push(itemName);

      // Update expiry info
      const formattedExpiryDate = format(
        expiryDate,
        "EEE MMM dd yyyy HH:mm:ss 'GMT'xxx (zzzz)"
      );
      if (!expiryInfoUpdate[formattedExpiryDate]) {
        expiryInfoUpdate[formattedExpiryDate] = [];
      }
      expiryInfoUpdate[formattedExpiryDate].push(itemName);
    }

    // Update user document
    await userRef.update({
      purchase_info: admin.firestore.FieldValue.arrayUnion(purchaseInfoUpdate),
      expiry_info: admin.firestore.FieldValue.arrayUnion(expiryInfoUpdate),
    });

    res.status(200).send("Purchase and expiry info updated successfully");
  } catch (error) {
    console.error("Error updating user document:", error);
    res.status(500).send("Internal Server Error");
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
  const usersRef = db.collection("users");
  const snapshot = await usersRef.get();

  snapshot.forEach((doc) => {
    const userData = doc.data();
    const phoneNumber = userData.phone_number; // Assuming phone_number is correctly formatted for SMS
    const expiryInfo = userData.expiry_info || {};
    const currentDate = new Date();

    Object.keys(expiryInfo).forEach((expiryDate) => {
      const date = new Date(expiryDate);
      // Assuming you want to notify users of items expiring today or tomorrow
      if (date >= currentDate) {
        const diffTime = Math.abs(date - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate difference in days
        const itemsExpiring = expiryInfo[expiryDate].join(", ");
        const message = `Reminder: Your items ${itemsExpiring} will expire in ${diffDays} day(s).`;

        // Send SMS through Twilio
        twilio.messages
          .create({
            body: message,
            to: phoneNumber, // Text this number
            from: "+12055024797", // From Twilio trial number
          })
          .then((message) => console.log(message.sid));
      }
    });
  });
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
