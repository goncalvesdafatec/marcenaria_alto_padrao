/*const pool = require('../config/database');

const vendedorController = {
    // 1. GET - Listar todos os vendedores ativos
    listarTudo: async (req, res) => {
        try {
            console.log(' Buscando dados da tabela vendedor1...');
            const [results] = await pool.query('SELECT * FROM vendedor1 WHERE ativo = 1');
            res.json(results);
        } catch (err) {
            console.error(' Erro ao listar vendedores:', err);
            res.status(500).json({ erro: 'Erro ao buscar vendedores.' });
        }
    },

    // 2. POST - Cadastrar novo vendedor
    criar: async (req, res) => {
        const { nome, comissao } = req.body;
        try {
            const query = `INSERT INTO vendedor1 (nome, comissao, ativo, data_criacao) VALUES (?, ?, 1, NOW())`;
            const [result] = await pool.query(query, [nome, comissao]);
            res.status(201).json({ mensagem: 'Vendedor cadastrado com sucesso!', id: result.insertId });
        } catch (err) {
            console.error(' Erro ao cadastrar vendedor:', err);
            res.status(500).json({ erro: 'Erro ao cadastrar vendedor.' });
        }
    },

    // 3. PUT - Atualizar dados do vendedor
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { nome, comissao } = req.body;
        try {
            const query = `UPDATE vendedor1 SET nome = ?, comissao = ? WHERE id = ?`;
            const [result] = await pool.query(query, [nome, comissao, id]);
            if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Vendedor não encontrado.' });
            res.json({ mensagem: 'Vendedor atualizado com sucesso!' });
        } catch (err) {
            console.error(' Erro ao atualizar vendedor:', err);
            res.status(500).json({ erro: 'Erro ao atualizar vendedor.' });
        }
    },

    // 4. DELETE - Inativação lógica (Soft Delete)
    deletar: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await pool.query('UPDATE vendedor1 SET ativo = 0 WHERE id = ?', [id]);
            if (result.affectedRows === 0) return res.status(404).json({ mensagem: 'Vendedor não encontrado.' });
            res.json({ mensagem: 'Vendedor inativado com sucesso!' });
        } catch (err) {
            console.error(' Erro ao inativar vendedor:', err);
            res.status(500).json({ erro: 'Erro ao inativar vendedor.' });
        }
    }
};

module.exports = vendedorController;*/

const pool = require('../config/database');

const vendedor1Controller = {
    listar: async (req, res) => {
        try {
            const [results] = await pool.query('SELECT * FROM vendedor1 WHERE ativo = 1');
            res.json(results);
        } catch (err) {
            console.error(' Erro no vendedor1:', err);
            res.status(500).json({ erro: 'Erro ao buscar equipe 1.' });
        }
    }
};

module.exports = vendedor1Controller;