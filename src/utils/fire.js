import firebase from 'firebase/app';
import 'firebase/auth';
import * as admin from 'firebase-admin';

const config = {
    apiKey: "AIzaSyClazcqN6D_RRkTraBsI3c7KXpB0S_vZcA",
    authDomain: "would-you-rather-acb9a.firebaseapp.com",
    databaseURL: "https://would-you-rather-acb9a.firebaseio.com",
    projectId: "would-you-rather-acb9a",
    storageBucket: "would-you-rather-acb9a.appspot.com",
    messagingSenderId: "29428071221"
};

const serviceAccount = require("./keys/would-you-rather-acb9a-firebase-adminsdk-5o6xg-5da249a1b0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://would-you-rather-acb9a.firebaseio.com"
});


if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
    firebase,
    admin,
};