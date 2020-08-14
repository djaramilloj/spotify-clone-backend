const AuthModel = require('./model');

const addUser = async (user) => {
    const authModel = new AuthModel(user);
    await authModel.save();
}

module.exports = {
    addUser,
}