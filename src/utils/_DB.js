import {auth, firebase} from "./fire";

export function userSignUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export function userLogin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
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
    usersRef.child(uid).set({
        'answers': {},
        'id': uid,
        'name': name,
        'username': username,
        'avatarURL': '',
        'questions': [],
    });
}