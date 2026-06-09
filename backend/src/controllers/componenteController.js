/*const pool = require('../config/database');

const componenteController = {
    // Listar todos os componentes
    listarTodos: async (req, res) => {
        try {
            const [results] = await pool.query('SELECT * FROM componentes');
            res.json(results);
        } catch (err) {
            console.error('Erro ao listar componentes:', err);
            res.status(500).json({ erro: 'Erro ao buscar componentes no banco de dados.' });
        }
    },

    // Buscar componentes por um item específico
    buscarPorItem: async (req, res) => {
        const { itemId } = req.params;
        try {
            const [results] = await pool.query('SELECT * FROM componentes WHERE item_id = ?', [itemId]);
            res.json(results);
        } catch (err) {
            console.error('Erro ao buscar componentes do item:', err);
            res.status(500).json({ erro: 'Erro ao buscar componentes por item.' });
        }
    }
};

module.exports = componenteController;*/


const pool = require('../config/database');

const componenteController = {
    // Listar todos os componentes
    listarTodos: async (req, res) => {
        console.log(' Executando a query SELECT na tabela componentes...');
        try {
            const [results] = await pool.query('SELECT * FROM componentes');
            console.log(` Query executada com sucesso! Retornados ${results.length} registros.`);
            return res.json(results);
        } catch (err) {
            console.error(' Erro na query de componentes:', err);
            return res.status(500).json({ erro: 'Erro ao buscar componentes no banco de dados.' });
        }
    },

    // Buscar componentes por um item específico
    buscarPorItem: async (req, res) => {
        const { itemId } = req.params;
        try {
            const [results] = await pool.query('SELECT * FROM componentes WHERE item_id = ?', [itemId]);
            return res.json(results);
        } catch (err) {
            console.error(' Erro ao buscar componentes do item:', err);
            return res.status(500).json({ erro: 'Erro ao buscar componentes por item.' });
        }
    }
};

// GARANTA QUE ESSA LINHA EXISTE NO SEU CONTROLLER!
module.exports = componenteController;