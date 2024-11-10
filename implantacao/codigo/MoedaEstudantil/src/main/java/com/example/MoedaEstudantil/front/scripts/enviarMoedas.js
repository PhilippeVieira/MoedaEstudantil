function enviarMoedas() {
    const transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

    const origem = document.getElementById('origem').value;
    const destino = document.getElementById('destino').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const mensagem = document.getElementById('mensagem').value;
    if (origem && destino && quantidade >= 0) {
        if (!saldos[origem]) {
            saldos[origem] = 0;
        }
        if (!saldos[destino]) {
            saldos[destino] = 0;
        }

        if (saldos[origem] >= quantidade) {
            saldos[origem] -= quantidade;
            saldos[destino] += quantidade;

            let newEnvio = {professor: origem, aluno: destino, moedas: quantidade, message: mensagem};
            transacoes.push(newEnvio);
            localStorage.setItem("transacoes", JSON.stringify(transacoes));
            loadExtrato("envioMoedas", "envioList");
            document.getElementById('transacaoForm').reset();

        } else {
            alert('Saldo insuficiente para realizar a transação.');
        }
    }
}