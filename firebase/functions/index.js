const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp();

const database = admin.firestore();

exports.addAdmin = functions.https.onCall(async (data, context) => {
  const uid = data.uid;
  if(!uid) {
    throw new functions.https.HttpsError('internal', 'Request needs user ID (?uid=[UID])');
  }
  const dbEntry = (await database.doc(`webmasters/${uid}`).get()).data();

  const isAdmin = (await admin.auth().getUser(context.auth.uid)).customClaims['admin'];
  if(!isAdmin) 
    throw new functions.https.HttpsError('permission-denied', 'Permission DENIED!');

  if(dbEntry && isAdmin) {
    admin.auth().setCustomUserClaims(uid, { admin: true }).then(() => {
      database.doc(`users/${uid}/private/private`).update({
        permissions: 'Admin'
      })
      return {
        msg: 'Successfully added admin'
      }
    });
  } else {
    throw new functions.https.HttpsError('permission-denied', 'This user is not authorized to become an admin.');
  }
});

exports.removeAdmin = functions.https.onCall(async (data, context) => {
  const uid = data.uid;
  if (!uid) {
    throw new functions.https.HttpsError('internal', 'Request needs user ID (?uid=[UID])');
  }
  const dbEntry = (await database.doc(`webmasters/${uid}`).get()).data();

  const isAdmin = (await admin.auth().getUser(context.auth.uid)).customClaims['admin'];
  if(!isAdmin) 
    throw new functions.https.HttpsError('permission-denied', 'Permission DENIED!');

  if (dbEntry && isAdmin) {
    admin.auth().setCustomUserClaims(uid, { admin: false }).then(() => {
      database.doc(`webmasters/${uid}`).delete();
      database.doc(`users/${uid}/private/private`).update({
        permissions: 'User'
      })
    });
  } else {
    throw new functions.https.HttpsError('not-found', 'This admin could not be removed.');
  }
});

exports.removeUser = functions.https.onCall(async (data, context) => {
  const uid = data.uid;
  if (!uid) {
    throw new functions.https.HttpsError('internal', 'Missing uid.');
  }

  let isAdmin = (await admin.auth().getUser(context.auth.uid)).customClaims['admin'];
  if(!isAdmin) 
    throw new functions.https.HttpsError('permission-denied', 'Permission DENIED!');

  const dbEntry = (await database.doc(`users/${uid}`).get()).data();
  if (dbEntry && isAdmin) {
    admin.auth().deleteUser(uid).then(() => {
      database.doc(`users/${uid}/private/private`).delete();
      database.doc(`users/${uid}`).delete();
    })
  } else {
    throw new functions.https.HttpsError('not-found', 'Could not find user to delete.');
  }
})

exports.disableUser = functions.https.onCall(async (data, context) => {
  const uid = data.uid;
  const disable = data.disable;
  if (!uid) {
    throw new functions.https.HttpsError('internal', 'Missing uid.');
  }

  let isAdmin = (await admin.auth().getUser(context.auth.uid)).customClaims['admin'];
  if(!isAdmin) 
    throw new functions.https.HttpsError('permission-denied', 'Permission DENIED!');

  const dbEntry = (await database.doc(`users/${uid}`).get()).data();
  if (dbEntry && isAdmin) {
    admin.auth().updateUser(uid, {
      disabled: disable
    }).then(() => {
      database.doc(`users/${uid}/private/private`).update({
        disabled: disable
      });
    })
  } else {
    throw new functions.https.HttpsError('not-found', 'Could not find user to toggle disabled.');
  }
})