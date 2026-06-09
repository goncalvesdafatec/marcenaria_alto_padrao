/*const express = require('express');
const router = express.Router();
const componenteController = require('../controllers/componenteController');

// Mapeamento dos endpoints
router.get('/componentes', componenteController.listarTodos);
router.get('/componentes/item/:itemId', componenteController.buscarPorItem);

module.exports = router;*/


const express = require('express');
const router = express.Router();

console.log(' O arquivo componenteRoutes.js FOI LIDO COM SUCESSO PELO EXPRESS!');

// Rota de teste direta, sem passar pelo controller
router.get('/componentes', (req, res) => {
    res.json({ 
        mensagem: "Se você está lendo isso, a rota funciona! O erro está 100% dentro do arquivo do controller." 
    });
});

module.exports = router;