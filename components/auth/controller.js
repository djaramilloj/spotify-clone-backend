const auth = require('../../auth/firebaseAuth');
const store = require('./store');

class UserAuthentication  {
    constructor(){}

    async createUserInFirebase(data) {
        if (!data.email || !data.password) {
            throw new Error('Incomplete information');
        } else {
            try {
                // create user in auth firebase
                const userFirebase = await auth.createUser(data.email, data.password);                
                const dataToSend = {
                    name: data.name,
                    lastname: data.lastname,
                    email: data.email,
                    _id: userFirebase.user.uid,
                }
                await store.addUser(dataToSend); // save user data in Mongo
                return dataToSend._id;
            } catch(error) {
                throw new Error(`There was an error creating new user: ${error}`);
            }
            
        }
    }

    async login(data) {
        if (!data.email || !data.password) {
            throw new Error('Incomplete information');
        } else {
            try {
                // log user in in firebase
                const userLogged = await auth.signIn(data.email, data.password);                
                // return user data matching firebase Id from mongo
                const userId = userLogged.user.uid;
                const userRetreived = await store.getUser(userId);
                return userId;
            } catch(error) {
                throw new Error(`There was an error getting user Info: ${error}`);
            }
        }
    }

    async getUser(data) {
        if (!data.userId) {
            throw new Error('Incomplete information');
        } else {
            try {          
                // return user data with Id
                const userId = data.userId
                const userRetreived = await store.getUser(userId);
                return userRetreived;
            } catch(error) {
                throw new Error(`There was an error getting user Info: ${error}`);
            }
        }
    }
}

module.exports = UserAuthentication;