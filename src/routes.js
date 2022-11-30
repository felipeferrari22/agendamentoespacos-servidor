const express = require("express");
const routes = new express.Router();

const { LoginUsuario, } = require('./controllers/ControllerSolicitante')
routes.post('/Login', LoginUsuario)

module.exports = routes;