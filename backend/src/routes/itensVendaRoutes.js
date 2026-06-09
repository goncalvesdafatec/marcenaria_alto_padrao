const express = require('express');
const router = express.Router();
const itensVendaController = require('../controllers/itensVendaController');

// Rotas do CRUD completo para itens_venda
router.get('/itens-venda', itensVendaController.listarTudo);
router.get('/itens-venda/venda/:venda_id', itensVendaController.buscarPorVenda);
router.post('/itens-venda', itensVendaController.criar);
router.put('/itens-venda/:id', itensVendaController.atualizar);
router.delete('/itens-venda/:id', itensVendaController.deletar);

module.exports = router;