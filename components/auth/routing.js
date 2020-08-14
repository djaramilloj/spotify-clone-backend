const express = require('express');
const Router = express.Router();
const response = require('../../network/response');
const authController = require('./controller');
const controllerResponse = new authController();

Router.get('/', (req, res) => {
    res.send('I am working')
})

Router.post('/signup', (req, res) => {
    const data = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    }
    controllerResponse.createUserInFirebase(data)
        .then(data => response.success(req, res, `user registered successfully with id: ${data}`, 201))
        .catch(error => response.error(req, res, error.message, 500))
})


Router.post('/login', (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
    }
    controllerResponse.login(data)
        .then(data => response.success(req, res, data, 200))
        .catch(error => response.error(req, res, error.message, 500))
})

module.exports = Router;