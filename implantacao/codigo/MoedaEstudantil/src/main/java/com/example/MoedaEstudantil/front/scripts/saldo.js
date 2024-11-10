function verificarSaldo() {
    const usuarioId = document.getElementById('usuarioIdSaldo').value;
    if (usuarioId && saldos[usuarioId] !== undefined) {
        document.getElementById('saldoDisplay').innerText = `Saldo do Usuário ${usuarioId}: ${saldos[usuarioId]} moedas`;
    } else {
        document.getElementById('saldoDisplay').innerText = 'Usuário não encontrado ou saldo indisponível.';
    }
}
