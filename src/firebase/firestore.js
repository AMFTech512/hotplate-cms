import firebase from './index.js'
import 'firebase/firestore'

const database = firebase.firestore();

// if (location.hostname === "localhost") {
//     database.settings({
//       host: "localhost:8000",
//       ssl: false
//     });
// }

export default database;