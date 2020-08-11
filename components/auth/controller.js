const auth = require('../../auth/firebaseAuth');

class UserAuthentication  {
    constructor(data){
        this.name = data.name,
        this.lastname = data.lastname,
        this.email = data.email,
        this.password = data.password
    }

    async createUserInFirebase() {
        if (!this.email || !this.password) {
            throw new Error('Incomplete information');
        } else {
            return auth.createUser(this.email, this.password);
        }
    }
}

module.exports = UserAuthentication;