const express = require('express');
const router = express.Router();
const opcoesComponenteController = require('../controllers/opcoesComponenteController');

// Rotas do CRUD para opcoes_componente
router.get('/opcoes-componente', opcoesComponenteController.listarTudo);
router.get('/opcoes-componente/componente/:componente_id', opcoesComponenteController.buscarPorComponente);
router.post('/opcoes-componente', opcoesComponenteController.criar);
router.put('/opcoes-componente/:id', opcoesComponenteController.atualizar);
router.delete('/opcoes-componente/:id', opcoesComponenteController.deletar);

module.exports = router;