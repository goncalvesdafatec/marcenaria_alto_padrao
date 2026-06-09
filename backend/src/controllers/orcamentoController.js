const pool = require('../config/database');

const orcamentoController = {
    // 1. GET - Listar todos os orçamentos ativos (Diferentes de Cancelado)
    listarTudo: async (req, res) => {
        try {
            console.log(' Buscando dados da tabela orcamentos...');
            const query = "SELECT * FROM orcamentos WHERE status <> 'CANCELADO'";
            const [results] = await pool.query(query);
            res.json(results);
        } catch (err) {
            console.error(' Erro ao listar orçamentos:', err);
            res.status(500).json({ erro: 'Erro ao buscar orçamentos.' });
        }
    },

    // 2. GET - Buscar orçamento por ID
    buscarPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await pool.query('SELECT * FROM orcamentos WHERE id = ?', [id]);
            if (results.length === 0) {
                return res.status(404).json({ mensagem: 'Orçamento não encontrado.' });
            }
            res.json(results[0]);
        } catch (err) {
            console.error(' Erro ao buscar orçamento:', err);
            res.status(500).json({ erro: 'Erro ao buscar orçamento.' });
        }
    },

    // 3. POST - Criar um novo cabeçalho de orçamento
    criar: async (req, res) => {
        const { id_cliente, data_emissao, valor_total, status, observacoes, id_material, quantidade_solicitada } = req.body;
        try {
            const query = `
                INSERT INTO orcamentos (id_cliente, data_emissao, valor_total, status, observacoes, data_criacao, data_atualizacao, id_material, quantidade_solicitada) 
                VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?, ?)
            `;
            const [result] = await pool.query(query, [
                id_cliente, 
                data_emissao || new Date(), 
                valor_total || 0.00, 
                status || 'ABERTO', 
                observacoes || null,
                id_material || null,
                quantidade_solicitada || null
            ]);
            
            res.status(201).json({ 
                mensagem: 'Orçamento gerado com sucesso!', 
                id: result.insertId 
            });
        } catch (err) {
            console.error(' Erro ao criar orçamento:', err);
            res.status(500).json({ erro: 'Erro ao criar orçamento.' });
        }
    },

    // 4. PUT - Atualizar valores ou status (ex: Mudar de ABERTO para APROVADO)
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { id_cliente, data_emissao, valor_total, status, observacoes, id_material, quantidade_solicitada } = req.body;
        try {
            const query = `
                UPDATE orcamentos 
                SET id_cliente = ?, data_emissao = ?, valor_total = ?, status = ?, observacoes = ?, data_atualizacao = NOW(), id_material = ?, quantidade_solicitada = ? 
                WHERE id = ?
            `;
            const [result] = await pool.query(query, [
                id_cliente, data_emissao, valor_total, status, observacoes, id_material, quantidade_solicitada, id
            ]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Orçamento não encontrado.' });
            }
            res.json({ mensagem: 'Orçamento atualizado com sucesso!' });
        } catch (err) {
            console.error(' Erro ao atualizar orçamento:', err);
            res.status(500).json({ erro: 'Erro ao atualizar orçamento.' });
        }
    },

    // 5. DELETE - Cancelamento lógico do orçamento
    deletar: async (req, res) => {
        const { id } = req.params;
        try {
            const query = "UPDATE orcamentos SET status = 'CANCELADO', data_atualizacao = NOW() WHERE id = ?";
            const [result] = await pool.query(query, [id]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Orçamento não encontrado.' });
            }
            res.json({ mensagem: 'Orçamento cancelado com sucesso!' });
        } catch (err) {
            console.error(' Erro ao cancelar orçamento:', err);
            res.status(500).json({ erro: 'Erro ao cancelar orçamento.' });
        }
    }
};

module.exports = orcamentoController;