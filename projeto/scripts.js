function gerarNumber() {
    const min = parseInt(document.getElementById('min').value);
    const max = parseInt(document.getElementById('max').value);
    const resultado = Math.floor(Math.random() * (max - min + 1)) + min;
    document.getElementById('resultado').innerText = `Número sorteado: ${resultado}`;
}