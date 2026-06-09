/*const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

// Definição dos endpoints de estoque
router.get('/estoque', estoqueController.listarTudo);
router.get('/estoque/:id', estoqueController.buscarPorId);

module.exports = router;*/


const express = require('express');
const router = express.Router();
const pool = require('../config/database');

//  BUSCAR DADOS DO ESTOQUE (GET http://localhost:3000/api/estoque)
router.get('/', async (req, res) => {
    try {
        //  ATENÇÃO: Caso sua tabela se chame 'produtos' ou as colunas tenham nomes diferentes,
        // altere os campos após o SELECT para bater exatamente com o seu banco de dados.
        const [results] = await pool.query(
            'SELECT id, descricao, quantidade_atual, preco_unitario, data_atualizacao FROM estoque'
        );
        
        return res.json(results);
    } catch (err) {
        console.error(" Erro ao buscar dados do estoque no MySQL:", err);
        return res.status(500).json({ erro: "Erro interno no banco de dados: " + err.message });
    }
});

module.exports = router;