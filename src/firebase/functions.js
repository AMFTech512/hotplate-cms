import firebase from './index.js'
import 'firebase/functions'

const functions = firebase.functions();

if (location.hostname === 'localhost') {
    firebase.functions().useFunctionsEmulator("http://localhost:5001")
}

export default functions;