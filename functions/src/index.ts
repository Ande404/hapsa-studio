import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

const firestore = admin.firestore();
const serverTimestamp = admin.firestore.FieldValue.serverTimestamp();

exports.logger = functions.auth.user().onCreate((user) => {
  firestore.collection("logger").doc("user").collection("onCreate").add({
    user: user,
    time: serverTimestamp,
  }).catch((error) => {
    throw new Error(error);
  });
});
