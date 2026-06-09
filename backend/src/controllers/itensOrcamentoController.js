const pool = require('../config/database');

const itensOrcamentoController = {
    // Listar todos os itens de orçamentos do sistema (Geral)
    listarTudo: async (req, res) => {
        try {
            console.log(' Buscando dados da tabela itens_orcamento...');
            const [results] = await pool.query('SELECT * FROM itens_orcamento');
            res.json(results);
        } catch (err) {
            console.error(' Erro ao listar itens do orçamento:', err);
            res.status(500).json({ erro: 'Erro ao buscar itens do orçamento.' });
        }
    },

    // Buscar os itens de um orçamento específico (Filtrado por orcamento_id)
    buscarPorOrcamento: async (req, res) => {
        const { orcamento_id } = req.params;
        try {
            console.log(` Buscando itens do orcamento_id: ${orcamento_id}`);
            const [results] = await pool.query('SELECT * FROM itens_orcamento WHERE orcamento_id = ?', [orcamento_id]);
            res.json(results);
        } catch (err) {
            console.error(' Erro ao filtrar itens por orçamento:', err);
            res.status(500).json({ erro: 'Erro ao filtrar itens por orçamento.' });
        }
    }
};

module.exports = itensOrcamentoController;