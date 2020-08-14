const AuthModel = require('./model');

const addUser = async (user) => {
    const authModel = new AuthModel(user);
    await authModel.save();
}

const getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        if (!userId) {
            return reject(new Error('There was no userId to find in Mongo'))
        }
        let filter = {_id: userId};
        const userFound = await AuthModel.findOne(filter);
        resolve(userFound);
    })    
}

module.exports = {
    addUser,
    getUser,
}