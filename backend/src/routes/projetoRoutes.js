/*const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');

//router.get('/projetos', projetoController.listarTudo);
router.get('/teste-projetos', projetoController.listarTudo);
router.post('/projetos', projetoController.criar);
router.put('/projetos/:id', projetoController.atualizar);

module.exports = router;*/

/*const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET http://localhost:3000/api/projetos
router.get('/', async (req, res) => {
    try {
        // Faz a busca na sua tabela real de projetos do MySQL
        const [results] = await pool.query('SELECT * FROM projetos');
        return res.json(results);
    } catch (err) {
        console.error("Erro ao buscar projetos:", err);
        return res.status(500).json({ erro: err.message });
    }
});

module.exports = router;*/



const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController'); // Certifique-se de que este caminho está correto

// GET http://localhost:3000/api/projetos
// Agora a rota chama o método correto do Controller!
router.get('/', projetoController.listarTudo);

module.exports = router;