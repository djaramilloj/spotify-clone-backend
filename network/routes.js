const auth = require('../components/auth/routing');

const routes = (app) => {
    app.use('/auth', auth);
}

module.exports = routes;