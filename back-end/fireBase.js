const { credential } = require("firebase-admin");
const { initializeApp, getApps, getApp } = require("firebase-admin/app");
const { getAuth }  = require("firebase-admin/auth");

var serviceAccount = require("./fireBaseKey.json");

const adminCredentials = {
  credential: credential.cert(serviceAccount)
};

// avoid initializing twice
const firebaseAdminApp =
  getApps().length === 0 ? initializeApp(adminCredentials) : getApp();

const authAdmin = getAuth(firebaseAdminApp);

module.exports = { authAdmin };