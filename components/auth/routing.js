const express = require('express');
const Router = express.Router();
const response = require('../../network/response');
const authController = require('./controller');
const controllerResponse = new authController();

Router.post('/signup', (req, res) => {
    const data = {
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    }
    controllerResponse.createUserInFirebase(data)
    .then(data =>{
        req.session.userId = data;
        const dataRta = {
            userId: req.session.userId
        }
        res.send(JSON.stringify(dataRta))
        // response.success(req, res, `${req.session.userId}`, 201)
    })
    .catch(error => response.error(req, res, error.message, 500))
})


Router.post('/login', (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
    }
    controllerResponse.login(data)
        .then(data => {
            req.session.userId = data;
            const dataRta = {
                userId: req.session.userId
            }
            res.send(JSON.stringify(dataRta))
            // response.success(req, res, data, 200)
        })
        .catch(error => response.error(req, res, error.message, 500))
})

Router.get('/current-user', (req, res) => {
    const data = {
        userId: req.body.userId,
    }
    controllerResponse.getUser(data)
        .then(data => {
            req.session.userId = data;
            response.success(req, res, data, 200)
        })
        .catch(error => response.error(req, res, error.message, 500))
})

module.exports = Router;