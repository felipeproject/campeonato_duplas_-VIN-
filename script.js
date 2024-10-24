// Função principal para carregar equipes
async function carregarEquipes() {
    try {
        const url = `equipes.json?t=${new Date().getTime()}`; // Adiciona um timestamp para evitar cache
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }

        const data = await response.json();
        exibirAdmin(data.admin);
        exibirEquipes(data.equipes);
    } catch (error) {
        console.error('Erro ao carregar equipes:', error);
        mostrarMensagemErro('Ocorreu um erro ao carregar as equipes. Tente novamente mais tarde.');
    }
}

// Função para exibir informações do administrador
function exibirAdmin(admin) {
    const adminContainer = document.getElementById('admin');
    adminContainer.innerHTML = `
        <div class="admin-container">
            <img src="imagens/${admin.imagem}" alt="${admin.nome}">
            <h2>${admin.nome}</h2>
        </div>
    `;
}

// Função para exibir as equipes
function exibirEquipes(equipes) {
    const container = document.getElementById('equipesContainer');
    container.innerHTML = ''; // Limpa o conteúdo anterior

    equipes.forEach(equipe => {
        const { dupla, imagens } = equipe;
        const [nick1, nick2] = dupla;
        const link1 = `https://pubg.op.gg/user/${nick1}`;
        const link2 = nick2 === '(aguardando a dupla)' ? nick2 : `https://pubg.op.gg/user/${nick2}`;

        container.innerHTML += `
            <div class="dupla">
                <div class="card">
                    <img src="imagens/${imagens[0]}" alt="${nick1}">
                    <a href="${link1}" target="_blank" class="link-nome">${nick1}</a>
                </div>
                <div class="icon">
                    <img src="imagens/icone_partido.png" alt="Ícone de Partido" class="partido-icon">
                </div>
                <div class="card">
                    <img src="imagens/${imagens[1]}" alt="${nick2}" class="${nick2 === '(aguardando a dupla)' ? 'pulse' : ''}">
                    <a href="${link2}" target="_blank" class="link-nome">${nick2}</a>
                </div>
            </div>`;
    });
}

// Função para mostrar mensagens de erro
function mostrarMensagemErro(mensagem) {
    const container = document.getElementById('equipesContainer');
    const mensagemErro = document.createElement('div');
    mensagemErro.className = 'mensagem-erro';
    mensagemErro.textContent = mensagem;
    container.appendChild(mensagemErro);
}

// Funções para o widget de PIX
function abrirWidget() {
    document.getElementById("widget").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function fecharWidget() {
    document.getElementById("widget").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function copiarChavePix() {
    const chavePix = document.getElementById("pix-key").innerText;
    navigator.clipboard.writeText(chavePix)
        .then(() => {
            mostrarMensagemSucesso('Chave copiada!');
        })
        .catch(err => {
            console.error('Erro ao copiar a chave PIX:', err);
            mostrarMensagemErro('Erro ao copiar a chave PIX.');
        });
}

// Função para mostrar mensagem de sucesso
function mostrarMensagemSucesso(mensagem) {
    const copyMessage = document.getElementById("copyMessage");
    copyMessage.textContent = mensagem;
    copyMessage.style.display = "block";
    setTimeout(() => {
        copyMessage.style.display = "none";
    }, 2000);
}

// Chama a função para carregar as equipes ao carregar a página
document.addEventListener('DOMContentLoaded', carregarEquipes);
