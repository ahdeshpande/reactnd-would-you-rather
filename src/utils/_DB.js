import {auth, database} from "./fire";

export function userSignUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
}

export function userLogin(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

export function addUser(name, email, uid) {
    const usersRef = database.ref('users');
    return usersRef.child(uid).set({
        'answers': {},
        'id': email,
        'name': name,
        'avatarURL': 'http://icongal.com/gallery/image/458203/avengers_comics.png',
        'questions': [],
    });
}

export function getUsers() {
    return database.ref('users');
}

export function getQuestions() {
    return database.ref('questions');
}