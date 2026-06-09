// LINHA 1 CORRIGIDA: Apontando para o seu arquivo 'database.js'
const pool = require('../config/database'); 

// 1. LISTAR TODOS OS AMBIENTES (GET)
exports.listarTodos = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM ambientes');
        res.json(results);
    } catch (err) {
        console.error('Erro ao listar ambientes:', err);
        res.status(500).json({ erro: 'Erro interno no servidor ao buscar ambientes.' });
    }
};

// 2. BUSCAR AMBIENTES DE UM PROJETO ESPECÍFICO (GET)
exports.buscarPorProjeto = async (req, res) => {
    try {
        const { projetoId } = req.params;
        const [results] = await pool.query('SELECT * FROM ambientes WHERE projeto_id = ?', [projetoId]);
        res.json(results);
    } catch (err) {
        console.error('Erro ao buscar ambientes do projeto:', err);
        res.status(500).json({ erro: 'Erro interno no servidor.' });
    }
};

// 3. CRIAR UM NOVO AMBIENTE (POST)
exports.criar = async (req, res) => {
    try {
        const { projeto_id, nome } = req.body;

        if (!projeto_id || !nome) {
            return res.status(400).json({ erro: 'Os campos projeto_id e nome são obrigatórios.' });
        }

        const [result] = await pool.query('INSERT INTO ambientes (projeto_id, nome) VALUES (?, ?)', [projeto_id, nome]);
        
        res.status(201).json({
            mensagem: 'Ambiente criado com sucesso!',
            id: result.insertId,
            projeto_id,
            nome
        });
    } catch (err) {
        console.error('Erro ao inserir ambiente:', err);
        res.status(500).json({ erro: 'Erro interno ao salvar o ambiente.' });
    }
};

// 4. ATUALIZAR UM AMBIENTE EXISTENTE (PUT)
exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { projeto_id, nome } = req.body;

        if (!projeto_id || !nome) {
            return res.status(400).json({ erro: 'Os campos projeto_id e nome são obrigatórios.' });
        }

        const [result] = await pool.query('UPDATE ambientes SET projeto_id = ?, nome = ? WHERE id = ?', [projeto_id, nome, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Ambiente não encontrado.' });
        }

        res.json({ mensagem: 'Ambiente updated com sucesso!', id, projeto_id, nome });
    } catch (err) {
        console.error('Erro ao atualizar ambiente:', err);
        res.status(500).json({ erro: 'Erro interno ao atualizar o ambiente.' });
    }
};

// 5. DELETAR UM AMBIENTE (DELETE)
exports.deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM ambientes WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Ambiente não encontrado.' });
        }

        res.json({ mensagem: 'Ambiente removido com sucesso!' });
    } catch (err) {
        console.error('Erro ao deletar ambiente:', err);
        res.status(500).json({ erro: 'Erro interno ao deletar o ambiente.' });
    }
};