const authFirebase = require('firebase/app');

async function createUser(email, password) {
    return authFirebase.auth().createUserWithEmailAndPassword(email, password);
}

async function signIn(email, password) {
    return authFirebase.auth().signInWithEmailAndPassword(email, password);
}

module.exports = {
    createUser,
    signIn,
}