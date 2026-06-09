const pool = require('../config/database');

const opcoesComponenteController = {
    // 1. GET - Listar todas as opções de componentes
    listarTudo: async (req, res) => {
        try {
            console.log(' Buscando dados da tabela opcoes_componente...');
            const [results] = await pool.query('SELECT * FROM opcoes_componente');
            res.json(results);
        } catch (err) {
            console.error(' Erro ao listar opções de componente:', err);
            res.status(500).json({ erro: 'Erro ao buscar opções de componente.' });
        }
    },

    // 2. GET - Buscar opções de um componente específico
    buscarPorComponente: async (req, res) => {
        const { componente_id } = req.params;
        try {
            console.log(` Buscando opções para o componente_id: ${componente_id}`);
            const [results] = await pool.query('SELECT * FROM opcoes_componente WHERE componente_id = ?', [componente_id]);
            res.json(results);
        } catch (err) {
            console.error(' Erro ao filtrar opções por componente:', err);
            res.status(500).json({ erro: 'Erro ao filtrar opções por componente.' });
        }
    },

    // 3. POST - Cadastrar uma nova opção de variação
    criar: async (req, res) => {
        const { componente_id, descricao, adicional, selecionada } = req.body;
        try {
            const query = `
                INSERT INTO opcoes_componente (componente_id, descricao, adicional, selecionada) 
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await pool.query(query, [componente_id, descricao, adicional, selecionada]);
            res.status(201).json({ 
                mensagem: 'Opção de componente cadastrada com sucesso!', 
                id: result.insertId 
            });
        } catch (err) {
            console.error(' Erro ao cadastrar opção de componente:', err);
            res.status(500).json({ erro: 'Erro ao cadastrar opção de componente.' });
        }
    },

    // 4. PUT - Editar uma opção existente
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { componente_id, descricao, adicional, selecionada } = req.body;
        try {
            const query = `
                UPDATE opcoes_componente 
                SET componente_id = ?, descricao = ?, adicional = ?, selecionada = ? 
                WHERE id = ?
            `;
            const [result] = await pool.query(query, [componente_id, descricao, adicional, selecionada, id]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Opção de componente não encontrada.' });
            }
            res.json({ mensagem: 'Opção de componente atualizada com sucesso!' });
        } catch (err) {
            console.error(' Erro ao atualizar opção de componente:', err);
            res.status(500).json({ erro: 'Erro ao atualizar opção de componente.' });
        }
    },

    // 5. DELETE - Remover fisicamente uma opção de variação
    deletar: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await pool.query('DELETE FROM opcoes_componente WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Opção de componente não encontrada.' });
            }
            res.json({ mensagem: 'Opção de componente removida com sucesso!' });
        } catch (err) {
            console.error(' Erro ao deletar opção de componente:', err);
            res.status(500).json({ erro: 'Erro ao remover opção de componente.' });
        }
    }
};

module.exports = opcoesComponenteController;