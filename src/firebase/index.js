import firebase from 'firebase/app'
import config from './firebaseconfig.js'

firebase.initializeApp(config)

export default firebase;