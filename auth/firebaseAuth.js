const authFirebase = require('firebase/app');

async function createUser(email, password) {
    return authFirebase.auth().createUserWithEmailAndPassword(email, password);
}

module.exports = {
    createUser,
}