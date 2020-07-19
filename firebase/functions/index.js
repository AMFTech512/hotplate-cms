const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp();

const database = admin.firestore();

exports.addAdmin = functions.https.onCall(async (data, context) => {
  const uid = data.uid;
  if (!uid) {
    throw new functions.https.HttpsError('internal', 'Request needs user ID (?uid=[UID])');
  }
  const dbEntry = (await database.doc(`webmasters/${uid}`).get()).data();

  const isAdmin = (await admin.auth().getUser(context.auth.uid)).customClaims['admin'];
  if (!isAdmin)
    throw new functions.https.HttpsError('permission-denied', 'Permission DENIED!');

  if (dbEntry && isAdmin) {
    try {
      await admin.auth().setCustomUserClaims(uid, { admin: true });
      await database.doc(`users/${uid}/private/private`).update(
        { permissions: 'Admin' }
      );
      return {
        msg: 'Successfully added admin'
      }
    } catch(error) {
      return error;
    }
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
  if (!isAdmin)
    throw new functions.https.HttpsError('permission-denied', 'Permission DENIED!');

  if (dbEntry && isAdmin) {
    try {
      await admin.auth().setCustomUserClaims(uid, { admin: false });
      await database.doc(`webmasters/${uid}`).delete();
      await database.doc(`users/${uid}/private/private`).update({
        permissions: 'User'
      })
      return {
        msg: 'Successfully removed admin.'
      };
    } catch(error) {
      return error;
    }
    
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
  if (!isAdmin)
    throw new functions.https.HttpsError('permission-denied', 'Permission DENIED!');

  const dbEntry = (await database.doc(`users/${uid}`).get()).data();
  if (dbEntry && isAdmin) {
    try {
      await admin.auth().deleteUser(uid);
      await database.doc(`users/${uid}/private/private`).delete();
      await database.doc(`users/${uid}`).delete();
      return {
        msg: 'Successfully removed user.'
      }
    } catch(error) {
      return error;
    }
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
  if (!isAdmin)
    throw new functions.https.HttpsError('permission-denied', 'Permission DENIED!');

  const dbEntry = (await database.doc(`users/${uid}`).get()).data();
  if (dbEntry && isAdmin) {
    try {
      await admin.auth().updateUser(uid, {
        disabled: disable
      })
      await database.doc(`users/${uid}/private/private`).update({
        disabled: disable
      });
      return {
        msg: 'Successfuly toggled disabled state.'
      }
    } catch(error) {
      return error;
    }
  } else {
    throw new functions.https.HttpsError('not-found', 'Could not find user to toggle disabled.');
  }
})