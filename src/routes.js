const express = require("express");
const routes = new express.Router();

const { AuthTokenAcesso } = require('./middlewares') // Middleware de Auth do JWT

const { LoginUsuario, BuscarEspacos} = require('./controllers/ControllerUsuarios')
routes.post('/Login', LoginUsuario)
routes.get('/BuscarEspacos', AuthTokenAcesso, BuscarEspacos)

const { 
    CadastroUsuario,
    CadastroAdmin, 
    CadastroEspaco, 
    BuscarUsuarios, 
    DeletarUsuario, 
    BuscarSolicitacoes, 
    AprovarSolicitacoes, 
    DeletarSolicitacoes,
    BuscarAgendamentos,
    DeletarEspacos,
    BuscarAdmins,
} = require('./controllers/ControllerAdmin')
routes.post('/CadastroSolicitante', AuthTokenAcesso, CadastroUsuario)
routes.post('/CadastroPerfil', AuthTokenAcesso, CadastroAdmin)
routes.post('/CadastroEspaco', AuthTokenAcesso, CadastroEspaco)
routes.get('/BuscarSolicitantes', AuthTokenAcesso, BuscarUsuarios)
routes.delete('/DeletarSolicitante/:id', AuthTokenAcesso, DeletarUsuario)
routes.get('/BuscarSolicitacoes', AuthTokenAcesso, BuscarSolicitacoes)
routes.put('/AprovarSolicitacoes/:id', AuthTokenAcesso, AprovarSolicitacoes)
routes.delete('/DeletarSolicitacoes/:id', AuthTokenAcesso, DeletarSolicitacoes)
routes.get('/BuscarAgendamentos', AuthTokenAcesso, BuscarAgendamentos)
routes.delete('/DeletarEspacos/:id', AuthTokenAcesso, DeletarEspacos)
routes.get('/BuscarAdmins', AuthTokenAcesso, BuscarAdmins)

const { 
    SolicitarAgendamento,
    BuscarMeusAgendamentos
} = require ('./controllers/ControllerSolicitantes')
routes.post('/SolicitarAgendamento', AuthTokenAcesso, SolicitarAgendamento)
routes.get('/BuscarMeusAgendamentos', AuthTokenAcesso, BuscarMeusAgendamentos)

module.exports = routes;