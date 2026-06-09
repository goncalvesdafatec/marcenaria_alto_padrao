/*const pool = require('../config/database');

const estoqueController = {
    // Listar todos os itens do estoque
    listarTudo: async (req, res) => {
        try {
            console.log(' Buscando dados da tabela estoque...');
            const [results] = await pool.query('SELECT * FROM estoque WHERE ativo = 1');
            res.json(results);
        } catch (err) {
            console.error(' Erro ao listar estoque:', err);
            res.status(500).json({ erro: 'Erro ao buscar dados do estoque.' });
        }

    },

    // Buscar um item específico do estoque pelo ID
    buscarPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await pool.query('SELECT * FROM estoque WHERE id = ?', [id]);
            if (results.length === 0) {
                return res.status(404).json({ mensagem: 'Item não encontrado no estoque.' });
            }
            res.json(results[0]);
        } catch (err) {
            console.error(' Erro ao buscar item do estoque:', err);
            res.status(500).json({ erro: 'Erro ao buscar item do estoque.' });
        }
    }
};

module.exports = estoqueController;*/




/*const pool = require('../config/database');

const estoqueController = {
    listarTudo: async (req, res) => {
        try {
            console.log(' Tentando ler a tabela estoque no MySQL...');
            const [results] = await pool.query('SELECT * FROM estoque'); // Tiramos o WHERE para testar
            console.log(` Sucesso! Encontrados ${results.length} itens no estoque.`);
            res.json(results);
        } catch (err) {
            console.error(' Erro interno no estoqueController:', err);
            res.status(500).json({ erro: 'Erro ao buscar dados do estoque.', detalhe: err.message });
        }
    },

    buscarPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await pool.query('SELECT * FROM estoque WHERE id = ?', [id]);
            if (results.length === 0) {
                return res.status(404).json({ mensagem: 'Item não encontrado no estoque.' });
            }
            res.json(results[0]);
        } catch (err) {
            console.error(' Erro ao buscar item do estoque:', err);
            res.status(500).json({ erro: 'Erro ao buscar item do estoque.' });
        }
    }
};

module.exports = estoqueController;*/






const pool = require('../config/database');

const estoqueController = {
    // 1. GET - Listar tudo (Apenas os ativos)
    listarTudo: async (req, res) => {
        try {
            const [results] = await pool.query('SELECT * FROM estoque WHERE ativo = 1');
            res.json(results);
        } catch (err) {
            console.error(' Erro ao listar estoque:', err);
            res.status(500).json({ erro: 'Erro ao buscar dados do estoque.' });
        }
    },

    // 2. GET - Buscar por ID
    buscarPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await pool.query('SELECT * FROM estoque WHERE id = ? AND ativo = 1', [id]);
            if (results.length === 0) {
                return res.status(404).json({ mensagem: 'Item não encontrado no estoque.' });
            }
            res.json(results[0]);
        } catch (err) {
            console.error(' Erro ao buscar item:', err);
            res.status(500).json({ erro: 'Erro ao buscar item do estoque.' });
        }
    },

    // 3. POST - Cadastrar novo material no estoque
    criar: async (req, res) => {
        const { descricao, unidade_medida, quantidade_actual, preco_unitario } = req.body;
        try {
            const query = `
                INSERT INTO estoque (descricao, unidade_medida, quantidade_atual, preco_unitario, ativo, data_criacao, data_atualizacao) 
                VALUES (?, ?, ?, ?, 1, NOW(), NOW())
            `;
            const [result] = await pool.query(query, [descricao, unidade_medida, quantidade_actual, preco_unitario]);
            
            res.status(201).json({ 
                mensagem: 'Item cadastrado no estoque com sucesso!', 
                id: result.insertId 
            });
        } catch (err) {
            console.error(' Erro ao cadastrar no estoque:', err);
            res.status(500).json({ erro: 'Erro ao cadastrar item no estoque.' });
        }
    },

    // 4. PUT - Atualizar dados do material (Preço, quantidade, etc.)
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { descricao, unidade_medida, quantidade_atual, preco_unitario } = req.body;
        try {
            const query = `
                UPDATE estoque 
                SET descricao = ?, unidade_medida = ?, quantidade_atual = ?, preco_unitario = ?, data_atualizacao = NOW() 
                WHERE id = ? AND ativo = 1
            `;
            const [result] = await pool.query(query, [descricao, unidade_medida, quantidade_atual, preco_unitario, id]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Item não encontrado ou já excluído.' });
            }
            res.json({ mensagem: 'Estoque atualizado com sucesso!' });
        } catch (err) {
            console.error(' Erro ao atualizar estoque:', err);
            res.status(500).json({ erro: 'Erro ao atualizar item do estoque.' });
        }
    },

    // 5. DELETE - Exclusão lógica (Soft Delete mudando ativo para 0)
    deletar: async (req, res) => {
        const { id } = req.params;
        try {
            const query = `UPDATE estoque SET ativo = 0, data_atualizacao = NOW() WHERE id = ?`;
            const [result] = await pool.query(query, [id]);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Item não encontrado.' });
            }
            res.json({ mensagem: 'Item removido do estoque com sucesso (Inativado)!' });
        } catch (err) {
            console.error(' Erro ao deletar do estoque:', err);
            res.status(500).json({ erro: 'Erro ao remover item do estoque.' });
        }
    }
};

module.exports = estoqueController;