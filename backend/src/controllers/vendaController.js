/*const pool = require('../config/database');

const vendaController = {
    // 1. GET - Listar todas as vendas registradas
    listarTudo: async (req, res) => {
        try {
            console.log(' Buscando dados da tabela vendas...');
            const [results] = await pool.query('SELECT * FROM vendas');
            res.json(results);
        } catch (err) {
            console.error(' Erro ao listar vendas:', err);
            res.status(500).json({ erro: 'Erro ao buscar dados das vendas.' });
        }
    },

    // 2. GET - Buscar uma venda específica por ID
    buscarPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await pool.query('SELECT * FROM vendas WHERE id = ?', [id]);
            if (results.length === 0) {
                return res.status(404).json({ mensagem: 'Venda não encontrada.' });
            }
            res.json(results[0]);
        } catch (err) {
            console.error(' Erro ao buscar venda:', err);
            res.status(500).json({ erro: 'Erro ao buscar venda específica.' });
        }
    },

    // 3. POST - Cadastrar um novo contrato/venda fechada
    
criar: async (req, res) => {

    const {
        data_venda,
        valor_total,
        vendedor_origem,
        vendedor_id,
        cliente_id
    } = req.body;

    try {

        const query = `
            INSERT INTO vendas
            (
                data_venda,
                valor_total,
                vendedor_origem,
                vendedor_id,
                cliente_id
            )
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await pool.query(query, [
            data_venda || new Date(),
            valor_total,
            vendedor_origem,
            vendedor_id,
            cliente_id
        ]);

        res.status(201).json({
            mensagem: 'Venda cadastrada com sucesso!',
            id: result.insertId
        });

    } catch (err) {

        console.log('================ ERRO MYSQL ================');
        console.log(err);
        console.log('============================================');

        res.status(500).json({
            erro: err.message
        });

    }

},

    // 4. PUT - Atualizar dados da venda (reajuste de valor, troca de vendedor, etc)
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { data_venda, valor_total, vendedor_origem, vendedor_id, cliente_id } = req.body;
        try {
            const query = `
                UPDATE vendas 
                SET data_venda = ?, valor_total = ?, vendedor_origem = ?, vendedor_id = ?, cliente_id = ? 
                WHERE id = ?
            `;
            const [result] = await pool.query(query, [data_venda, valor_total, vendedor_origem, vendedor_id, cliente_id, id]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Venda não encontrada para atualização.' });
            }
            res.json({ mensagem: 'Dados da venda atualizados com sucesso!' });
        } catch (err) {
            console.error(' Erro ao atualizar venda:', err);
            res.status(500).json({ erro: 'Erro ao atualizar dados da venda.' });
        }
    },

    // 5. DELETE - Remover registro de venda
    deletar: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await pool.query('DELETE FROM vendas WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Venda não encontrada.' });
            }
            res.json({ mensagem: 'Registro de venda removido com sucesso!' });
        } catch (err) {
            console.error(' Erro ao deletar venda:', err);
            res.status(500).json({ erro: 'Erro ao remover registro da venda.' });
        }
    }
};

module.exports = vendaController;*/





const pool = require('../config/database');

const vendaController = {
    // 1. GET - Listar todas as vendas
    listarTudo: async (req, res) => {
        try {
            const [results] = await pool.query('SELECT * FROM vendas');
            res.json(results);
        } catch (err) {
            console.error('Erro ao listar vendas:', err);
            res.status(500).json({ erro: 'Erro ao buscar dados das vendas.' });
        }
    },

    // 2. GET - Buscar uma venda específica por ID
    buscarPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await pool.query('SELECT * FROM vendas WHERE id = ?', [id]);
            if (results.length === 0) {
                return res.status(404).json({ mensagem: 'Venda não encontrada.' });
            }
            res.json(results[0]);
        } catch (err) {
            console.error('Erro ao buscar venda:', err);
            res.status(500).json({ erro: 'Erro ao buscar venda específica.' });
        }
    },

    // 3. POST - Cadastrar uma nova venda



    
    
    criar: async (req, res) => {
        const { data_venda, valor_total, vendedor_origem, vendedor_id, cliente_id } = req.body;

        if (!valor_total || !vendedor_id || !cliente_id) {
            return res.status(400).json({ 
                erro: 'Campos obrigatórios ausentes: valor_total, vendedor_id e cliente_id são necessários.' 
            });
        }

        try {
            const dataFormatada = data_venda 
                ? new Date(data_venda).toISOString().slice(0, 19).replace('T', ' ')
                : new Date().toISOString().slice(0, 19).replace('T', ' ');

            const query = `
                INSERT INTO vendas (data_venda, valor_total, vendedor_origem, vendedor_id, cliente_id) 
                VALUES (?, ?, ?, ?, ?)
            `;
            
            const [result] = await pool.query(query, [
                dataFormatada, 
                parseFloat(valor_total), 
                vendedor_origem || 'Padrao', 
                parseInt(vendedor_id), 
                parseInt(cliente_id)
            ]);

            res.status(201).json({ 
                mensagem: 'Venda cadastrada com sucesso!', 
                id: result.insertId 
            });
        } catch (err) {
            console.error('Erro detalhado no MySQL:', err);
            res.status(500).json({ 
                erro: 'Erro interno ao salvar venda.', 
                detalhes: err.message 
            });
        }
    },

    // 4. PUT - Atualizar dados da venda
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { data_venda, valor_total, vendedor_origem, vendedor_id, cliente_id } = req.body;
        
        try {
            const query = `
                UPDATE vendas 
                SET data_venda = ?, valor_total = ?, vendedor_origem = ?, vendedor_id = ?, cliente_id = ? 
                WHERE id = ?
            `;
            const [result] = await pool.query(query, [data_venda, valor_total, vendedor_origem, vendedor_id, cliente_id, id]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Venda não encontrada ou nenhum dado alterado.' });
            }
            res.json({ mensagem: 'Dados da venda atualizados com sucesso!' });
        } catch (err) {
            console.error('Erro ao atualizar venda:', err);
            res.status(500).json({ erro: 'Erro ao atualizar dados da venda.' });
        }
    },

    // 5. DELETE - Remover registro de venda
    deletar: async (req, res) => {
        const { id } = req.params;
        try {
            const [result] = await pool.query('DELETE FROM vendas WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Venda não encontrada.' });
            }
            res.json({ mensagem: 'Registro de venda removido com sucesso!' });
        } catch (err) {
            console.error('Erro ao deletar venda:', err);
            res.status(500).json({ erro: 'Erro ao remover registro da venda.' });
        }
    }
};

module.exports = vendaController;