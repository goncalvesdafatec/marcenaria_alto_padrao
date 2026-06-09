const express = require('express');
const router = express.Router();
// O nome do arquivo deve bater EXATAMENTE com o nome do seu controller
const vendedor1Controller = require('../controllers/vendedor1Controller');

router.get('/equipe-1', vendedor1Controller.listar);

module.exports = router;