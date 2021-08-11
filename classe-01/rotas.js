const express = require('express');
const {getInfoDaEmpresa} = require('./controlador/consultas');
const rotas = express();

rotas.get('/empresas/:dominioEmpresa', getInfoDaEmpresa);

module.exports = rotas;