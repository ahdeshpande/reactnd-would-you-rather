import {auth, database} from "./fire";

export function userSignUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export function userLogin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export function addUser(name, username, uid) {
    const usersRef = database.ref('users');
    return usersRef.child(uid).set({
        'answers': {},
        'id': uid,
        'name': name,
        'username': username,
        'avatarURL': '',
        'questions': [],
    });
}

export function getUsers() {
    return database.ref('users');
}

export function getQuestions() {
    return database.ref('questions');
}