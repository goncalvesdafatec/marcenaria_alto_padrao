const express = require('express');
const router = express.Router();
const itensAmbienteController = require('../controllers/itensAmbienteController');

// Endpoints para os itens
router.get('/itens-ambiente', itensAmbienteController.listarTudo);
router.get('/itens-ambiente/ambiente/:ambiente_id', itensAmbienteController.buscarPorAmbiente);

module.exports = router;