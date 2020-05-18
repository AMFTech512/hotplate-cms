const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp();

let database = admin.firestore();

exports.addAdmin = functions.https.onRequest(async (request, response) => {

    let uid = request.query.uid;

    if(!uid) {
        response.status(500).send("Request needs user ID (?uid=[UID])");
        return;
    }
    
    var dbEntry = (await database.doc(`webmasters/${uid}`).get()).data();
    console.log(dbEntry);
    if(dbEntry) {
        admin.auth().setCustomUserClaims(uid, {admin: true}).then(() => {
            response.send("Successfully added admin");
        });
    } else {
        response.status(500).send("This user is not authorized to become an admin.");
    }
    
});
