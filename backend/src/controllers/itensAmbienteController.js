const pool = require('../config/database');

const itensAmbienteController = {
    // Listar todos os itens cadastrados no sistema
    listarTudo: async (req, res) => {
        try {
            console.log(' Buscando dados da tabela itens_ambiente...');
            const [results] = await pool.query('SELECT * FROM itens_ambiente');
            res.json(results);
        } catch (err) {
            console.error(' Erro ao listar itens do ambiente:', err);
            res.status(500).json({ erro: 'Erro ao buscar itens do ambiente.' });
        }
    },

    // Buscar itens de um ambiente específico (Filtrado por ambiente_id)
    buscarPorAmbiente: async (req, res) => {
        const { ambiente_id } = req.params;
        try {
            console.log(` Buscando itens do ambiente_id: ${ambiente_id}`);
            const [results] = await pool.query('SELECT * FROM itens_ambiente WHERE ambiente_id = ?', [ambiente_id]);
            res.json(results);
        } catch (err) {
            console.error(' Erro ao filtrar itens por ambiente:', err);
            res.status(500).json({ erro: 'Erro ao filtrar itens por ambiente.' });
        }
    }
};

module.exports = itensAmbienteController;