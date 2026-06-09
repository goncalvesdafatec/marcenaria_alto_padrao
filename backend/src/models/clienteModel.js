const db = require('../config/database');

const clienteModel = {
    // READ ALL
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM clientes ORDER BY id DESC');
        return rows;
    },

    // READ BY ID
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
        return rows[0];
    },

    // CREATE
    create: async (nome, telefone, email) => {
        const [result] = await db.query(
            'INSERT INTO clientes (nome, telefone, email) VALUES (?, ?, ?)',
            [nome, telefone, email]
        );
        return { id: result.insertId, nome, telefone, email };
    },

    // UPDATE
    update: async (id, nome, telefone, email) => {
        await db.query(
            'UPDATE clientes SET nome = ?, telefone = ?, email = ? WHERE id = ?',
            [nome, telefone, email, id]
        );
        return { id, nome, telefone, email };
    },

    // DELETE
    delete: async (id) => {
        const [result] = await db.query('DELETE FROM clientes WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
};

module.exports = clienteModel;