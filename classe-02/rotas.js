const express = require('express');
const rotas = express();
const {buscaLocalizacao} = require('./controlador/controladores');

rotas.post("/votacao/:pais/:ip", buscaLocalizacao);

module.exports = rotas;