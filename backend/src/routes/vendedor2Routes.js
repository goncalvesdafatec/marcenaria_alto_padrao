const express = require('express');
const router = express.Router();
// O nome do arquivo deve bater EXATAMENTE com o nome do seu controller
const vendedor2Controller = require('../controllers/vendedor2Controller');

router.get('/equipe-2', vendedor2Controller.listar);

module.exports = router;