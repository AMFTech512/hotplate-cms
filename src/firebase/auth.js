import firebase from './index.js';
import 'firebase/auth';

const auth = firebase.auth();

auth.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

export default auth;
