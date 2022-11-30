const express = require("express");
const routes = new express.Router();

const { LoginUsuario, } = require('./controllers/ControllerSolicitante')
routes.post('/Login', LoginUsuario)
const { CadastroUsuario, } = require('./controllers/ControllerAdmin')
routes.post('/CadastroSolicitante', CadastroUsuario)

module.exports = routes;