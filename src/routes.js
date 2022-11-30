const express = require("express");
const routes = new express.Router();

const { LoginUsuario, } = require('./controllers/ControllerSolicitante')
routes.post('/Login', LoginUsuario)
const { CadastroUsuario, CadastroAdmin, CadastroEspaco, } = require('./controllers/ControllerAdmin')
routes.post('/CadastroSolicitante', CadastroUsuario)
routes.post('/CadastroPerfil', CadastroAdmin)
routes.post('/CadastroEspaco', CadastroEspaco)

module.exports = routes;