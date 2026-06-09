/*const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');

// Rotas do CRUD para a tabela vendas
router.get('/vendas', vendaController.listarTudo);
router.get('/vendas/:id', vendaController.buscarPorId);
router.post('/vendas', vendaController.criar);
router.put('/vendas/:id', vendaController.atualizar);
router.delete('/vendas/:id', vendaController.deletar);

module.exports = router;*/


const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');

// =======================
// ROTAS CORRETAS (REST)
// Base já é /api/vendas no app.js
// =======================

// GET /api/vendas
router.get('/', vendaController.listarTudo);

// GET /api/vendas/:id
router.get('/:id', vendaController.buscarPorId);

// POST /api/vendas
router.post('/', vendaController.criar);

// PUT /api/vendas/:id
router.put('/:id', vendaController.atualizar);

// DELETE /api/vendas/:id
router.delete('/:id', vendaController.deletar);

module.exports = router;