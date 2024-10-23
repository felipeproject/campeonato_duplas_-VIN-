// valueCollected.js

// Defina o valor da premiação com ponto para valores decimais
const valorP = 40.00;

// Formata o valor como moeda brasileira
function formatarMoeda(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Atualiza o valor exibido no HTML
function atualizarValorArrecadado() {
    const valorArrecadadoElements = document.querySelectorAll('#valorArrecadado, #valorArrecadadoWidget');
    valorArrecadadoElements.forEach(element => {
        element.textContent = formatarMoeda(valorP);
    });
}

// Chama a função para atualizar o valor ao carregar a página
atualizarValorArrecadado();
