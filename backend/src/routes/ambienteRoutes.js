/*const express = require('express');
const router = express.Router();
const ambienteController = require('../controllers/ambienteController');

// Definição dos endpoints para Ambientes
router.get('/ambientes', ambienteController.listarTodos);
router.get('/ambientes/projeto/:projetoId', ambienteController.buscarPorProjeto);
router.post('/ambientes', ambienteController.criar);
router.put('/ambientes/:id', ambienteController.atualizar);
router.delete('/ambientes/:id', ambienteController.deletar);

module.exports = router;*/



const express = require('express');
const router = express.Router();
const ambienteController = require('../controllers/ambienteController');

// ATENÇÃO: Aqui NÃO colocamos '/api/ambientes', colocamos apenas '/ambientes'
// O Express já vai juntar o '/api' do app.js com o '/ambientes' daqui.
router.get('/ambientes', ambienteController.listarTodos);
router.get('/ambientes/projeto/:projetoId', ambienteController.buscarPorProjeto);
router.post('/ambientes', ambienteController.criar);
router.put('/ambientes/:id', ambienteController.atualizar);
router.delete('/ambientes/:id', ambienteController.deletar);

// Esta linha é CRUCIAL. Se ela não existir, o app.js não consegue ler as rotas!
module.exports = router;