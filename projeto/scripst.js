// script.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const btnSortear = document.getElementById('btn');
    const feedbackDiv = document.getElementById('feedback');

    // Função principal para sortear os números
    function sortearNumeros(event) {
        event.preventDefault(); // Previne o comportamento padrão do formulário, se houver

        // 1. Obter os valores de entrada
        const qtdInput = document.getElementById('qtd');
        const minInput = document.getElementById('min');
        const maxInput = document.getElementById('max');
        const noRepeatCheckbox = document.getElementById('noRepeat');

        let qtd = parseInt(qtdInput.value);
        let min = parseInt(minInput.value);
        let max = parseInt(maxInput.value);
        const noRepeat = noRepeatCheckbox.checked;

        // 2. Validação dos dados
        if (isNaN(qtd) || isNaN(min) || isNaN(max)) {
            exibirFeedback('Por favor, preencha todos os campos com números válidos.', 'error');
            return;
        }

        if (min >= max) {
            exibirFeedback('O valor MÍNIMO deve ser menor que o valor MÁXIMO.', 'error');
            return;
        }

        if (qtd <= 0) {
            exibirFeedback('A quantidade de números a sortear deve ser maior que zero.', 'error');
            return;
        }

        const rangeSize = max - min + 1;

        if (noRepeat && qtd > rangeSize) {
            exibirFeedback(`Com a opção "Não repetir número" ativada, a quantidade de números a sortear (${qtd}) não pode ser maior que o intervalo disponível (${rangeSize}).`, 'error');
            return;
        }

        // 3. Lógica de Sorteio
        let numerosSorteados = [];

        if (noRepeat) {
            // Sorteio sem repetição (usando o algoritmo de Fisher-Yates simplificado para seleção)
            let numerosDisponiveis = [];
            for (let i = min; i <= max; i++) {
                numerosDisponiveis.push(i);
            }

            // Garante que não tentaremos sortear mais números do que o disponível
            const numToDraw = Math.min(qtd, numerosDisponiveis.length);

            for (let i = 0; i < numToDraw; i++) {
                const randomIndex = Math.floor(Math.random() * numerosDisponiveis.length);
                const numeroSorteado = numerosDisponiveis.splice(randomIndex, 1)[0]; // Remove e pega o número
                numerosSorteados.push(numeroSorteado);
            }

        } else {
            // Sorteio com repetição
            for (let i = 0; i < qtd; i++) {
                // Fórmula: Math.floor(Math.random() * (max - min + 1)) + min
                const numeroSorteado = Math.floor(Math.random() * (max - min + 1)) + min;
                numerosSorteados.push(numeroSorteado);
            }
        }

        // 4. Exibir o resultado
        exibirResultado(numerosSorteados, min, max);
    }

    // Função para exibir mensagens de erro ou status
    function exibirFeedback(mensagem, tipo = 'info') {
        feedbackDiv.innerHTML = `<p class="${tipo}">${mensagem}</p>`;
        feedbackDiv.className = `message ${tipo}`;
    }

    // Função para exibir o resultado do sorteio
    function exibirResultado(numeros, min, max) {
        // Cria a lista de números sorteados
        const listaNumerosHTML = numeros.map(num => `<span class="numero-sorteado">${num}</span>`).join('');

        // Cria o cabeçalho do resultado
        const resultadoHTML = `
            <h3>RESULTADO DO SORTEIO</h3>
            <p>Intervalo: ${min} a ${max}</p>
            <div class="numeros-container">
                ${listaNumerosHTML}
            </div>
            <p class="success">Sorteio realizado com sucesso!</p>
        `;

        feedbackDiv.innerHTML = resultadoHTML;
        feedbackDiv.className = 'message success';
    }

    // 5. Adicionar o listener ao botão
    btnSortear.addEventListener('click', sortearNumeros);

    // Adiciona um listener para o formulário também, caso o usuário pressione Enter
    form.addEventListener('submit', sortearNumeros);

    // Feedback inicial
    exibirFeedback('Defina os parâmetros e clique em "Sortear" para começar.', 'info');
});
