import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyClazcqN6D_RRkTraBsI3c7KXpB0S_vZcA",
    authDomain: "would-you-rather-acb9a.firebaseapp.com",
    databaseURL: "https://would-you-rather-acb9a.firebaseio.com",
    projectId: "would-you-rather-acb9a",
    storageBucket: "would-you-rather-acb9a.appspot.com",
    messagingSenderId: "29428071221"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
// Get a reference to the database service
const database = firebase.database();

export {
    auth,
    firebase,
    database,
};