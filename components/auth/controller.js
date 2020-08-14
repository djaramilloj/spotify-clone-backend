const auth = require('../../auth/firebaseAuth');
const store = require('./store');

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
            try {
                // create user in auth firebase
                const userFirebase = await auth.createUser(this.email, this.password);                
                const data = {
                    name: this.name,
                    lastname: this.lastname,
                    email: this.email,
                    _id: userFirebase.user.uid,
                }
                await store.addUser(data); // save user data in Mongo
                return data._id;
            } catch(error) {
                throw new Error(`There was an error creating new user: ${error}`);
            }
            
        }
    }
}

module.exports = UserAuthentication;