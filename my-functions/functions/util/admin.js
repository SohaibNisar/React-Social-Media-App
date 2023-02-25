const admin = require("firebase-admin");

const serviceAccount = require("./socialmediaapp-53549-firebase-adminsdk-fnhua-55b147668e.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://socialmediaapp-53549.firebaseio.com",
  storageBucket: "socialmediaapp-53549.appspot.com",
});

const db = admin.firestore();

module.exports = { admin, db };