const API_URL = "http://localhost:3000/api";

// =====================
// VARIÁVEIS GLOBAIS
// =====================
let listaItens = [];
let listaDeItensDisponiveis = [];

// =====================
// CARREGAMENTO INICIAL
// =====================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("select-item")) {
        carregarItens();
    }
});

// =====================
// LOGIN
// =====================
function fazerLogin() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email === "admin@marcenaria.com" && senha === "123456") {
        window.location.href = "home.html";
    } else {
        alert("Email ou senha incorretos.");
    }
}
// =====================
// CARREGAR ESTOQUE
// =====================
async function carregarEstoque() {
    try {
        // Consome a rota que você acabou de mapear no backend
        const response = await fetch(`${API_URL}/estoque`);
        
        if (!response.ok) {
            throw new Error(`Status de resposta: ${response.status}`);
        }

        const dadosEstoque = await response.json();
        
        // Captura o corpo da tabela onde os dados serão injetados
        const tbody = document.querySelector("table tbody");
        if (!tbody) return;
        
        // Limpa linhas estáticas antigas
        tbody.innerHTML = "";

        // Renderiza cada linha vinda do MySQL conforme as colunas do HTML
        dadosEstoque.forEach(item => {
            const id = item.id;
            const descricao = item.descricao || item.nome || "Não informada";
            const quantidade = item.quantidade_atual ?? item.quantidade ?? item.qtd ?? 0;
            const preco = Number(item.preco_unitario ?? item.preco ?? 0);
            
            let dataFormatada = "---";
            if (item.data_atualizacao) {
                dataFormatada = new Date(item.data_atualizacao).toLocaleDateString('pt-BR');
            }

            // Monta as colunas exatamente na ordem da sua tabela: 
            // ID, Descrição, Quantidade Atual, Preço Unitário, Data Atualização
            tbody.innerHTML += `
                <tr>
                    <td>${id}</td>
                    <td>${descricao}</td>
                    <td>${quantidade}</td>
                    <td>R$ ${preco.toFixed(2)}</td>
                    <td>${dataFormatada}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error(" Erro ao renderizar estoque:", error);
        alert("Não foi possível carregar o estoque.");
    }
}

// Dispara o carregamento assim que o HTML da página terminar de abrir
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("estoque.html") || document.querySelector("table")) {
        carregarEstoque();
    }
});
// =====================
// CARREGAR ITENS
// =====================

async function carregarItens() {
    try {
        const response = await fetch(`${API_URL}/componentes`);
        const itens = await response.json();

        listaDeItensDisponiveis = itens;

        const select = document.getElementById("select-item");
        select.innerHTML = '<option value="">Selecione o item...</option>';

        itens.forEach(item => {
            const preco = Number(
                item.preco_unitario ??
                item.preco_base ??
                item.preco ??
                item.valor ??
                0
            );

            const option = document.createElement("option");
            option.value = item.id;
            option.textContent = `${item.nome} (R$ ${preco.toFixed(2)})`;

            select.appendChild(option);
        });

    } catch (error) {
        console.error("Erro ao carregar itens:", error);
    }
}

// =====================
// CÁLCULO DINÂMICO
// =====================
function atualizarPrecoExibido() {
    const select = document.getElementById("select-item");
    const campoQtd = document.getElementById("qtd");
    const campoSubtotal = document.getElementById("valor");

    const qtd = Math.max(1, Number(campoQtd.value) || 1);
    const id = Number(select.value);

    if (id === 0) {
        campoSubtotal.value = "0.00";
        return;
    }

    const item = listaDeItensDisponiveis.find(i => i.id === id);

    const preco = Number(
        item?.preco_unitario ??
        item?.preco_base ??
        item?.preco ??
        item?.valor ??
        0
    );

    const subtotal = preco * qtd;
    campoSubtotal.value = subtotal.toFixed(2);
}

// =====================
// ADICIONAR ITEM
// =====================
function adicionarItemALista() {
    const select = document.getElementById("select-item");
    const qtd = Number(document.getElementById("qtd").value) || 1;
    const id = Number(select.value);

    const item = listaDeItensDisponiveis.find(i => i.id === id);

    if (!item) {
        alert("Selecione um item válido!");
        return;
    }

    const preco = Number(
        item.preco_unitario ??
        item.preco_base ??
        item.preco ??
        item.valor ??
        0
    );

    if (preco <= 0) {
        alert("Este item não possui preço válido!");
        return;
    }

    const subtotal = preco * qtd;

    listaItens.push({
        id,
        nome: item.nome,
        qtd,
        preco,
        subtotal
    });

    atualizarTabela();
}

// =====================
// TABELA + TOTAL
// =====================
function atualizarTabela() {
    const tbody = document.querySelector("#tabela-itens tbody");
    if (!tbody) return;
    
    tbody.innerHTML = "";

    let totalGeral = listaItens.reduce((acc, item) => {
        return acc + (Number(item.subtotal) || 0);
    }, 0);

    listaItens.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${item.nome}</td>
                <td>${item.qtd}</td>
                <td>R$ ${(Number(item.subtotal) || 0).toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removerItem(${index})">Remover</button>
                </td>
            </tr>
        `;
    });

    const campoTotal = document.getElementById("valor-total-geral");
    if (campoTotal) {
        campoTotal.innerText = totalGeral.toFixed(2);
    }
}

// =====================
// REMOVER ITEM
// =====================
function removerItem(index) {
    listaItens.splice(index, 1);
    atualizarTabela();
}

// =====================
// SALVAR CLIENTE
// =====================
// =====================
// SALVAR CLIENTE
// =====================
async function salvarCliente() {
    const inputNome = document.getElementById("nome");
    const inputTelefone = document.getElementById("telefone");
    const inputEmail = document.getElementById("emailCliente") || document.getElementById("email");

    const dados = {
        nome: inputNome ? inputNome.value.trim() : "",
        telefone: inputTelefone ? inputTelefone.value.trim() : "",
        email: inputEmail ? inputEmail.value.trim() : ""
    };

    if (!dados.nome || !dados.telefone) {
        alert("Nome e telefone são obrigatórios.");
        return;
    }

    try {
        console.log(" Despachando requisição de cliente:", dados);
        const response = await fetch(`${API_URL}/clientes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        });

        const textoResposta = await response.text();
        console.log(" Resposta crua vinda do Express:", textoResposta);

        if (response.ok) {
            alert("Cliente salvo com sucesso!");
            if (inputNome) inputNome.value = "";
            if (inputTelefone) inputTelefone.value = "";
            if (inputEmail) inputEmail.value = "";
        } else {
            alert("O Servidor Recusou:\n" + textoResposta);
        }

    } catch (error) {
        console.error(" Travamento no Navegador antes do Fetch:", error);
        alert("Erro interno na página: " + error.message);
    }
}

// =====================
// SALVAR ORÇAMENTO
// =====================
async function salvarOrcamento() {
    const campoTotal = document.getElementById("valor-total-geral");
    const totalGeral = campoTotal ? parseFloat(campoTotal.innerText.replace("R$ ", "").replace(",", ".")) || 0 : 0;
    
    // Procura qualquer variação de ID do cliente no seu HTML para não dar nulo
    const inputCliente = document.getElementById("cliente_id") || document.getElementById("id_cliente") || document.getElementById("cliente");
    const clienteId = inputCliente ? parseInt(inputCliente.value) : NaN;
    
    if (isNaN(clienteId)) {
        alert("Por favor, digite um ID de cliente válido.");
        return;
    }

    if (listaItens.length === 0) {
        alert("Adicione itens antes de fechar o orçamento!");
        return;
    }

    // Geração limpa de dados vindos do array global, sem quebrar em strings de R$
    const itensFormatados = listaItens.map(item => ({
        componente_id: item.id,
        item_id: item.id,
        quantidade: item.qtd,
        qtd: item.qtd,
        subtotal: item.subtotal
    }));

    // Mapeamento em espelho para satisfazer qualquer variação do seu arquivo de rotas Node
    const dados = {
        valor_total: totalGeral,
        total: totalGeral,
        total_geral: totalGeral,
        cliente_id: clienteId,
        id_cliente: clienteId,
        vendedor_id: 1, 
        itens: itensFormatados
    };

    try {
        console.log(" Despachando orçamento completo:", dados);
        const response = await fetch(`${API_URL}/orcamentos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const textoResposta = await response.text();
        console.log(" Resposta crua vinda do Express (Orçamento):", textoResposta);

        if (response.ok) {
            alert("Orçamento salvo com sucesso!");
            listaItens = []; 
            limparInterfaceOrcamento();
            window.location.reload(); 
        } else {
            alert("O Servidor Recusou o Orçamento:\n" + textoResposta);
        }
    } catch (err) {
        console.error(" Travamento no Navegador ao enviar orçamento:", err);
        alert("Erro de comunicação física na página.");
    }
}
// =====================
// SALVAR ORÇAMENTO
// =====================

// =====================
// DELETAR ORÇAMENTO
// =====================
async function deletarOrcamento(id) {
    if (!confirm("Tem certeza que deseja excluir este orçamento?")) return;

    try {
        const response = await fetch(`${API_URL}/orcamentos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Orçamento excluído!");
            location.reload();
        } else {
            alert("Erro ao excluir.");
        }
    } catch (err) {
        console.error("Erro ao deletar:", err);
    }
}

// =====================
// CANCELAR ORÇAMENTO
// =====================
async function cancelarOrcamento(id) {
    if (!confirm("Deseja realmente cancelar este orçamento?")) return;

    try {
        const response = await fetch(`${API_URL}/orcamentos/${id}`, {
            method: 'DELETE' 
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
            alert(data.mensagem || "Orçamento cancelado!");
            location.reload(); 
        } else {
            alert("Erro: " + (data.mensagem || "Não foi possível cancelar."));
        }
    } catch (err) {
        console.error("Erro na requisição:", err);
        alert("Erro de conexão com o servidor.");
    }
}
// =====================
// LISTAR PROJETO
// =====================
async function listarProjetos() {
    console.log("Botão Listar Projetos clicado!"); // Log para checar no F12 se a função foi chamada
    const containerResultado = document.getElementById('resultadoProjetos');
    
    if (!containerResultado) {
        console.error("Erro: A div 'resultadoProjetos' não existe no HTML.");
        return;
    }

    containerResultado.innerHTML = `
        <div class="alert alert-info text-center shadow-sm">
            <div class="spinner-border spinner-border-sm me-2" role="status"></div>
            Buscando projetos no banco de dados do servidor...
        </div>
    `;

    try {
        // Usando a URL completa para não ter erro de rota relativa
        const resposta = await fetch('http://localhost:3000/api/projetos');
        
        if (!resposta.ok) {
            throw new Error(`Servidor respondeu com status: ${resposta.status}`);
        }

        const projetos = await resposta.json();
        console.log("Dados recebidos da API:", projetos);

        if (!projetos || projetos.length === 0) {
            containerResultado.innerHTML = `
                <div class="alert alert-warning text-center shadow">
                    Nenhum projeto encontrado no banco de dados.
                </div>
            `;
            return;
        }

        let htmlTabela = `
            <div class="card shadow mt-4">
                <div class="card-header bg-warning text-dark fw-bold">
                    📋 Lista de Projetos Ativos (${projetos.length})
                </div>
                <div class="table-responsive">
                    <table class="table table-hover table-striped mb-0 align-middle">
                        <thead class="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nome do Projeto</th>
                                <th>Cliente (ID)</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        projetos.forEach(proj => {
            // Se as colunas do seu banco usarem nomes como id_projeto ou nome_projeto, 
            // os operadores "||" garantem que o dado apareça mesmo assim!
            const id = proj.id || proj.id_projeto || 'N/A';
            const nome = proj.nome || proj.nome_projeto || 'Projeto Customizado';
            const cliente = proj.id_cliente || proj.cliente_id || 'Não associado';
            const status = proj.status || 'EM ANDAMENTO';

            htmlTabela += `
                <tr>
                    <td class="fw-bold">${id}</td>
                    <td>${nome}</td>
                    <td>${cliente}</td>
                    <td>
                        <span class="badge ${status === 'CONCLUIDO' ? 'bg-success' : 'bg-primary'}">
                            ${status}
                        </span>
                    </td>
                </tr>
            `;
        });

        htmlTabela += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        containerResultado.innerHTML = htmlTabela;

    } catch (erro) {
        console.error("Erro na requisição:", erro);
        containerResultado.innerHTML = `
            <div class="alert alert-danger text-center shadow">
                 Erro ao conectar com a API de projetos.<br>
                <small>${erro.message}</small>
            </div>
        `;
    }
}
// =====================
// LIMPAR INTERFACES
// =====================
function limparInterfaceOrcamento() {
    const tbody = document.querySelector("#tabela-itens tbody");
    if (tbody) tbody.innerHTML = ""; 

    const campoTotal = document.getElementById("valor-total-geral");
    if (campoTotal) campoTotal.innerText = "0.00";

    const inputCliente = document.getElementById("cliente_id") || document.getElementById("id_cliente");
    if (inputCliente) inputCliente.value = "";

    const select = document.getElementById("select-item");
    if (select) select.selectedIndex = 0;
}

function limparFormulario() {
    const inputCliente = document.getElementById("cliente_id") || document.getElementById("id_cliente");
    if (inputCliente) inputCliente.value = "";
    
    const campoValor = document.getElementById("valor");
    if (campoValor) campoValor.value = "";
    
    const campoQtd = document.getElementById("qtd");
    if (campoQtd) campoQtd.value = "1";
    
    const select = document.getElementById("select-item");
    if (select) select.selectedIndex = 0;
}

function calcularTotalCarrinho() {
    return listaItens.reduce((total, item) => {
        return total + (Number(item.subtotal) || 0);
    }, 0);
}