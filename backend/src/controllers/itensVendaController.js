const pool = require('../config/database');

const itensVendaController = {
    // 1. GET - Listar todos os itens vendidos no sistema
    listarTudo: async (req, res) => {
        try {
            console.log(' Buscando dados da tabela itens_venda...');
            const [results] = await pool.query('SELECT * FROM itens_venda');
            res.json(results);
        } catch (err) {
            console.error(' Erro ao listar itens de venda:', err);
            res.status(500).json({ erro: 'Erro ao buscar itens de venda.' });
        }
    },

    // 2. GET - Buscar todos os itens de uma venda específica (Filtrado por venda_id)
    buscarPorVenda: async (req, res) => {
        const { venda_id } = req.params;
        try {
            console.log(` Buscando itens da venda_id: ${venda_id}`);
            const [results] = await pool.query('SELECT * FROM itens_venda WHERE venda_id = ?', [venda_id]);
            res.json(results);
        } catch (err) {
            console.error(' Erro ao filtrar itens por venda:', err);
            res.status(500).json({ erro: 'Erro ao filtrar itens por venda.' });
        }
    },

    // 3. POST - Adicionar um item a uma venda
    criar: async (req, res) => {
        const { venda_id, estoque_id, quantidade, preco_unitario } = req.body;
        try {
            const query = `
                INSERT INTO itens_venda (venda_id, estoque_id, quantidade, preco_unitario) 
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await pool.query(query, [venda_id, estoque_id, quantidade, preco_unitario]);
            res.status(201).json({ 
                mensagem: 'Item adicionado à venda com sucesso!', 
                id: result.insertId 
            });
        } catch (err) {
            console.error(' Erro ao adicionar item à venda:', err);
            res.status(500).json({ erro: 'Erro ao adicionar item à venda.' });
        }
    },

    // 4. PUT - Editar quantidade ou preço de um item da venda
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { venda_id, estoque_id, quantidade, preco_unitario } = req.body;
        try {
            const query = `
                UPDATE itens_venda 
                SET venda_id = ?, estoque_id = ?, quantidade = ?, preco_unitario = ? 
                WHERE id = ?
            `;
            const [result] = await pool.query(query, [venda_id, estoque_id, quantity = quantidade, preco_unitario, id]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Item de venda não encontrado.' });
            }
            res.json({ mensagem: 'Item de venda atualizado com sucesso!' });
        } catch (err) {
            console.error(' Erro ao atualizar item de venda:', err);
            res.status(500).json({ erro: 'Erro ao atualizar item de venda.' });
        }
    },

    // 5. DELETE - Remover um item de uma venda (Exclusão física da linha)
    deletar: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await pool.query('DELETE FROM itens_venda WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Item de venda não encontrado.' });
            }
            res.json({ mensagem: 'Item removido da venda com sucesso!' });
        } catch (err) {
            console.error(' Erro ao deletar item de venda:', err);
            res.status(500).json({ erro: 'Erro ao remover item da venda.' });
        }
    }
};

module.exports = itensVendaController;