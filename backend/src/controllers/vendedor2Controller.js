const pool = require('../config/database');

const vendedor2Controller = {
    listar: async (req, res) => {
        try {
            // AQUI ESTÁ A CHAVE: apontando para a tabela correta do seu banco
            const [results] = await pool.query('SELECT * FROM vendedor2 WHERE ativo = 1');
            res.json(results);
        } catch (err) {
            console.error(' Erro no vendedor2:', err);
            res.status(500).json({ erro: 'Erro ao buscar equipe 2.' });
        }
    }
};

module.exports = vendedor2Controller;