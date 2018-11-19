import {auth, firebase, admin} from "./fire";

export function userSignUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export function userLogin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export function setAuthListener() {
    auth.onAuthStateChanged(user => {
        return user;
    });
}

export function validateUser() {
    const idToken = JSON.parse(localStorage.getItem('user'));
    return admin.auth().verifyIdToken(idToken);
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export function userSignOut() {
    localStorage.removeItem('user');
    return getCurrentUser();
}

export function addUser(name, username, uid) {
    const usersRef = firebase.database().ref('users');
    return usersRef.child(uid).set({
        'answers': {},
        'id': uid,
        'name': name,
        'username': username,
        'avatarURL': '',
        'questions': [],
    });
}

export function addQuestion(question) {
    const questionsRef = firebase.database().ref('questions');
    return questionsRef.child(question.id).set(question);
}