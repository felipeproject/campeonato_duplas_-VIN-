function carregarEquipes() {
    fetch('equipes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Rede não disponível');
            }
            return response.json();
        })
        .then(data => {
            let admin = data.admin;
            let adminContainer = document.getElementById('admin');
            adminContainer.innerHTML = `
                <div class="admin-container">
                    <img src="imagens/${admin.imagem}" alt="${admin.nome}">
                    <h2>${admin.nome}</h2>
                </div>
            `;

            let container = document.getElementById('equipesContainer');
            data.equipes.forEach(equipe => {
                const nick1 = equipe.dupla[0];
                const nick2 = equipe.dupla[1];
                const link1 = `https://pubg.op.gg/user/${nick1}`;
                const link2 = nick2 === '(aguardando a dupla)' ? nick2 : `https://pubg.op.gg/user/${nick2}`;

                container.innerHTML += `
                    <div class="dupla">
                        <div class="card">
                            <img src="imagens/${equipe.imagens[0]}" alt="${nick1}">
                            <a href="${link1}" target="_blank" class="link-nome">${nick1}</a>
                        </div>
                        <div class="icon">
                            <img src="imagens/icone_partido.png" alt="Ícone de Partido" class="partido-icon">
                        </div>
                        <div class="card">
                            <img src="imagens/${equipe.imagens[1]}" alt="${nick2}" class="${nick2 === '(aguardando a dupla)' ? 'pulse' : ''}">
                            <a href="${link2}" target="_blank" class="link-nome">${nick2}</a>
                        </div>
                    </div>
                `;
            });
        });
}

carregarEquipes();

function abrirWidget() {
    document.getElementById("widget").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function fecharWidget() {
    document.getElementById("widget").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

function copiarChavePix() {
    var chavePix = document.getElementById("pix-key").innerText;
    var tempInput = document.createElement("input");
    tempInput.value = chavePix;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    var copyMessage = document.getElementById("copyMessage");
    copyMessage.style.display = "block";
    setTimeout(function () {
        copyMessage.style.display = "none";
    }, 2000);
}