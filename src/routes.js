const express = require("express");
const routes = new express.Router();
/* Início do Roteamento */

/**
 * routes.get('/minharota', minhafuncao)
 * routes.post('/minharota', minhafuncao)
 * routes.put('/minharota', minhafuncao)
 * routes.delete('/minharota', minhafuncao)
 * 
 * routes.get('/minharota/:parametro', minhafuncao)
 */

const {funcao1, funcao2, funcao3} = require('./controllers/teste-controller.js')
routes.get('/funcao1', funcao1)
routes.get('/funcao2', funcao2)
routes.get('/funcao3', funcao3)

/* Fim do Roteamento */
module.exports = routes;