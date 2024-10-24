// Defina o valor da premiação com ponto para valores decimais
const valorP = 80.00;

// Formata o valor como moeda brasileira
function formatarMoeda(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Função que anima o valor arrecadado de 0 até o valor desejado
function animarValorArrecadado(valorFinal) {
    const valorElements = document.querySelectorAll('#valorArrecadado, #valorArrecadadoWidget'); // Seleciona ambos os elementos
    let valorAtual = 0;
    const incremento = valorFinal / 100; // Define o incremento baseado no valor final para suavizar a animação

    const intervalo = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(intervalo); // Para a animação quando atingir o valor final
        }

        valorElements.forEach(element => {
            element.innerText = formatarMoeda(valorAtual); // Formatação de moeda e atualização em ambos os elementos
        });
    }, 20); // Velocidade da animação
}

// Inicia a animação ao carregar a página
window.onload = function() {
    animarValorArrecadado(valorP);
};

// valueCollected.js (ou parte equivalente)
function atualizarValorArrecadado() {
    const valorArrecadadoElements = document.querySelectorAll('#valorArrecadado, #valorArrecadadoWidget');
    valorArrecadadoElements.forEach(element => {
        element.textContent = formatarMoeda(valorP);
    });
}

// Chama a função para atualizar o valor ao carregar a página
atualizarValorArrecadado();
