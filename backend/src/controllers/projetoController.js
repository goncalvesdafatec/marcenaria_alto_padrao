/*const pool = require('../config/database');

const projetoController = {
    // Listar todos os projetos
    listarTudo: async (req, res) => {
        try {
            const [results] = await pool.query('SELECT * FROM projetos');
            res.json(results);
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao buscar projetos.' });
        }
    },

    // Criar um novo projeto
    criar: async (req, res) => {
        const { cliente_id, status, valor_total } = req.body;
        try {
            const query = `INSERT INTO projetos (cliente_id, status, data_criacao, valor_total) VALUES (?, ?, NOW(), ?)`;
            await pool.query(query, [cliente_id, status, valor_total]);
            res.status(201).json({ mensagem: 'Projeto criado com sucesso!' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao criar projeto.' });
        }
    },

    // Atualizar status ou valor do projeto
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { status, valor_total } = req.body;
        try {
            await pool.query('UPDATE projetos SET status = ?, valor_total = ? WHERE id = ?', [status, valor_total, id]);
            res.json({ mensagem: 'Projeto atualizado!' });
        } catch (err) {
            res.status(500).json({ erro: 'Erro ao atualizar projeto.' });
        }
    }
};

module.exports = projetoController;*/



const pool = require('../config/database');

const projetoController = {
    // 1. Listar todos os projetos (Retorna exatamente as colunas do banco)
    listarTudo: async (req, res) => {
        try {
            // Faz a consulta direto na tabela real
            const [results] = await pool.query('SELECT id, cliente_id, status, data_criacao, valor_total FROM projetos');
            
            // Retorna o JSON limpo para o frontend
            return res.json(results);
        } catch (err) {
            console.error("Erro ao buscar projetos no banco:", err);
            return res.status(500).json({ erro: 'Erro ao buscar projetos no banco de dados.' });
        }
    },

    // 2. Criar um novo projeto (Alinhado com as colunas reais)
    criar: async (req, res) => {
        const { cliente_id, status, valor_total } = req.body;
        try {
            const query = `INSERT INTO projetos (cliente_id, status, data_criacao, valor_total) VALUES (?, ?, NOW(), ?)`;
            await pool.query(query, [cliente_id, status, valor_total]);
            
            return res.status(201).json({ mensagem: 'Projeto criado com sucesso!' });
        } catch (err) {
            console.error("Erro ao criar projeto:", err);
            return res.status(500).json({ erro: 'Erro ao criar projeto.' });
        }
    },

    // 3. Atualizar status ou valor do projeto
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { status, valor_total } = req.body;
        try {
            await pool.query('UPDATE projetos SET status = ?, valor_total = ? WHERE id = ?', [status, valor_total, id]);
            
            return res.json({ mensagem: 'Projeto atualizado com sucesso!' });
        } catch (err) {
            console.error("Erro ao atualizar projeto:", err);
            return res.status(500).json({ erro: 'Erro ao atualizar projeto.' });
        }
    }
};

module.exports = projetoController;