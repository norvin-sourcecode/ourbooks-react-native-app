import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAa6GjhGTti6MKouiJqP-EdisBSBfovLLU",
    authDomain: "ourbook-357db.firebaseapp.com",
    databaseURL: "https://ourbook-357db-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ourbook-357db",
    storageBucket: "ourbook-357db.appspot.com",
    messagingSenderId: "645068933565",
    appId: "1:645068933565:web:44b5d004aa2b78c5fcead4",
    measurementId: "G-QN4VVKM6Y2"

};

let FirebaseInstance;

if (firebase.apps.length === 0) {
    FirebaseInstance = firebase.initializeApp(firebaseConfig)
}

export default FirebaseInstance;