const clienteModel = require('../models/clienteModel');

const clienteController = {
    listarTodos: async (req, res) => {
        try {
            const clientes = await clienteModel.getAll();
            return res.status(200).json(clientes);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar clientes.', details: error.message });
        }
    },

    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const cliente = await clienteModel.getById(id);
            if (!cliente) return res.status(404).json({ message: 'Cliente não encontrado.' });
            return res.status(200).json(cliente);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar o cliente.', details: error.message });
        }
    },

    // nova criação 

    criar: async (req, res) => {
        try {
            const { nome, telefone, email } = req.body;
            if (!nome) return res.status(400).json({ message: 'O campo nome é obrigatório.' });
            
            const novoCliente = await clienteModel.create(nome, telefone, email);
            return res.status(201).json(novoCliente);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar cliente.', details: error.message });
        }
    },

    atualizar: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, telefone, email } = req.body;

            const clienteExiste = await clienteModel.getById(id);
            if (!clienteExiste) return res.status(404).json({ message: 'Cliente não encontrado.' });

            const clienteAtualizado = await clienteModel.update(id, nome, telefone, email);
            return res.status(200).json(clienteAtualizado);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar cliente.', details: error.message });
        }
    },

    deletar: async (req, res) => {
        try {
            const { id } = req.params;
            const deletado = await clienteModel.delete(id);
            if (!deletado) return res.status(404).json({ message: 'Cliente não encontrado.' });
            
            return res.status(200).json({ message: 'Cliente deletado com sucesso!' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar cliente.', details: error.message });
        }
    }
};

module.exports = clienteController;