


const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./config/database');

const app = express();

// 1. CONFIGURAÇÕES GLOBAIS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

//  MONITOR DE REQUISIÇÕES (Muito útil! Vai printar tudo o que entrar no servidor)
app.use((req, res, next) => {
    console.log(` [${req.method}] ${req.url}`);
    next();
});

// =======================
// ROTAS PRINCIPAIS (APIs primeiro)
// =======================
const clienteRoutes = require('./routes/clienteRoutes');
const ambienteRoutes = require('./routes/ambienteRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const itensAmbienteRoutes = require('./routes/itensAmbienteRoutes');
const itensOrcamentoRoutes = require('./routes/itensOrcamentoRoutes');
const itensVendaRoutes = require('./routes/itensVendaRoutes');
const opcoesComponenteRoutes = require('./routes/opcoesComponenteRoutes');
const orcamentoRoutes = require('./routes/orcamentoRoutes');
const vendaRoutes = require('./routes/vendaRoutes');
const projetoRoutes = require('./routes/projetoRoutes');
const vendedor1Routes = require('./routes/vendedor1Routes');
const vendedor2Routes = require('./routes/vendedor2Routes');

// Rotas de dados
app.use('/api/clientes', clienteRoutes);
app.use('/api/ambientes', ambienteRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api/itens-ambiente', itensAmbienteRoutes);
app.use('/api/itens-orcamento', itensOrcamentoRoutes);
app.use('/api/itens-venda', itensVendaRoutes);
app.use('/api/opcoes-componente', opcoesComponenteRoutes);
app.use('/api/orcamentos', orcamentoRoutes);
app.use('/api/vendas', vendaRoutes);
app.use('/api/projetos', projetoRoutes);
app.use('/api/vendedores-1', vendedor1Routes);
app.use('/api/vendedores-2', vendedor2Routes);

// Teste rápido de API
app.get('/api/teste', (req, res) => {
    res.send("API funcionando corretamente!");
});

// Componentes
app.get('/api/componentes', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM componentes');
        res.json(results);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// =======================
// ARQUIVOS ESTÁTICOS (Totalmente corrigidos e blindados)
// =======================

// path.resolve garante o caminho correto saindo de backend/src até a pasta do frontend
const publicPath = path.resolve(__dirname, '..', '..', 'frontend', 'public');

app.use(express.static(publicPath));

// Rota para servir páginas HTML dinamicamente (Garante o carregamento do home.html)
app.get('/:pagina.html', (req, res, next) => {
    const arquivoHtml = path.join(publicPath, `${req.params.pagina}.html`);
    res.sendFile(arquivoHtml, (err) => {
        if (err) {
            next(); // Se o arquivo .html não existir fisicamente, joga para o erro de rota
        }
    });
});

// Página inicial padrão (Login)
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Rota de captura para páginas ou APIs que não existem (404)
app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
        return res.status(404).json({ erro: `Rota de API não encontrada: ${req.url}` });
    }
    res.status(404).send("<h3>Erro 404: Página não encontrada no sistema Alto Padrão!</h3>");
});

// ERRO GLOBAL (Caso quebre no banco de dados)
app.use((err, req, res, next) => {
    console.error(" Erro Capturado no Servidor:", err.stack);
    res.status(500).json({ erro: 'Erro interno no servidor', detalhes: err.message });
});

module.exports = app;