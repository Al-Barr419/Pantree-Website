const express = require("express");
const app = express();
const port = 3001; // Use a different port than your React app

app.get("/", (req, res) => {
  res.send("Hello from the back-end!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
