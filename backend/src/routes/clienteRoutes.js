/*const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/clientes', clienteController.listarTodos);
router.get('/clientes/:id', clienteController.buscarPorId);
router.post('/clientes', clienteController.criar);
router.put('/clientes/:id', clienteController.atualizar);
router.delete('/clientes/:id', clienteController.deletar);

module.exports = router;*/

/*const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// LISTAR CLIENTES (TESTE SIMPLES PRIMEIRO)
router.get('/clientes', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM clientes');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao buscar clientes");
    }
});

module.exports = router;*/







const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Certifique-se que o caminho do banco está correto

// 🟢 SALVAR CLIENTE
// O caminho deve ser apenas '/' porque o '/api/clientes' já foi definido no app.use
router.post('/', async (req, res) => {
    try {
        const { nome, telefone, email } = req.body;

        // Validação simples
        if (!nome || !telefone) {
            return res.status(400).send("Nome e telefone são obrigatórios.");
        }

        // Executa a inserção no banco de dados
        const querySql = 'INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)';
        await pool.query(querySql, [nome, telefone, email]);

        // Retorna sucesso para o frontend
        return res.status(201).send("Cliente salvo com sucesso!");

    } catch (err) {
        console.error(" Erro no MySQL ao salvar cliente:", err);
        return res.status(500).send("Erro interno no banco de dados: " + err.message);
    }
});

// Não esqueça de exportar o router no final do arquivo!
module.exports = router;