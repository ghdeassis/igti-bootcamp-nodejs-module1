const nome = "Teste de exportação";

function soma(a, b) {
    return a + b;
}

function subtracao(a, b) {
    return a - b;
}

module.exports = {soma, subtracao, nome};