const express = require('express');
const router = express.Router();
const itensOrcamentoController = require('../controllers/itensOrcamentoController');

// Endpoints da API
router.get('/itens-orcamento', itensOrcamentoController.listarTudo);
router.get('/itens-orcamento/orcamento/:orcamento_id', itensOrcamentoController.buscarPorOrcamento);

module.exports = router;