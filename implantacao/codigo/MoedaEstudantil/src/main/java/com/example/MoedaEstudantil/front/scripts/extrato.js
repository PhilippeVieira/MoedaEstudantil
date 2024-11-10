function loadExtrato(id, list) {
    const transacoes = JSON.parse(localStorage.getItem("transacoes"));
    const displayList = document.getElementById(list);
    displayList.innerHTML = '';

    if (transacoes !== null) {
        transacoes.forEach(extrato => {
            const i = document.createElement('li');
            i.className = 'list-group-item';
            i.style.whiteSpace = "pre";
            if (id === "envioMoedas") { // página do professor
                i.innerText = `Enviada = Aluno ${extrato.aluno} - M$ ${extrato.moedas} -->  ${extrato.message}`;
            } else if (id === "extrato") { // página do aluno
                i.innerText = `Recebida = Professor ${extrato.professor} - M$ ${extrato.moedas} -->  ${extrato.message}`;
            }
            displayList.appendChild(i);
        });
    } else {
        const i = document.createElement('h4');
        i.className = 'mt-3 pl-1';
        i.innerText = "-> Ainda não existem transações para este usuário";
        displayList.appendChild(i);
    }
}