/*const express = require('express');
const router = express.Router();
const orcamentoController = require('../controllers/orcamentoController');

// Definição das rotas do CRUD de orçamentos
router.get('/orcamentos', orcamentoController.listarTudo);
router.get('/orcamentos/:id', orcamentoController.buscarPorId);
router.post('/orcamentos', orcamentoController.criar);
router.put('/orcamentos/:id', orcamentoController.atualizar);
router.delete('/orcamentos/:id', orcamentoController.deletar);

module.exports = router;*/






const express = require('express');
const router = express.Router();
const pool = require('../config/database');

//  SALVAR ORÇAMENTO (POST http://localhost:3000/api/orcamentos)
// Usamos apenas '/' aqui porque o '/api/orcamentos' já foi definido no app.js
router.post('/', async (req, res) => {
    console.log(" Dados do orçamento recebidos no backend:", req.body);
    
    const { id_cliente, total, itens } = req.body;

    // Se o seu HTML não estiver enviando o cliente ou a lista de itens, o servidor bloqueia aqui
    if (!id_cliente || !itens || itens.length === 0) {
        return res.status(400).json({ erro: "ID do cliente ou itens do orçamento estão faltando!" });
    }

    try {
        //  QUERY DE EXEMPLO: Ajuste os nomes abaixo ('cliente_id', 'total_geral') 
        // para baterem exatamente com os nomes das colunas da sua tabela no banco!
        const [result] = await pool.query(
            'INSERT INTO orcamentos (id_cliente, valor_total) VALUES (?, ?)',
            [id_cliente, total]
        );

        console.log(" Orçamento salvo com sucesso! ID:", result.insertId);
        return res.status(201).json({ mensagem: "Orçamento salvo com sucesso!", id: result.insertId });

    } catch (err) {
        console.error(" Erro ao inserir orçamento no banco:", err);
        return res.status(500).json({ erro: "Erro interno no banco de dados: " + err.message });
    }
});

//  LISTAR ORÇAMENTOS (GET http://localhost:3000/api/orcamentos)
router.get('/', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM orcamentos');
        return res.json(results);
    } catch (err) {
        console.error(" Erro ao buscar orçamentos:", err);
        return res.status(500).json({ erro: err.message });
    }
});

module.exports = router;