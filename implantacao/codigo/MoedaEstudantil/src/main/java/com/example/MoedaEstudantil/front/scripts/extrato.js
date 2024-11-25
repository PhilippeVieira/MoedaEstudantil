function loadExtrato(id, list) {
    const transacoes = JSON.parse(localStorage.getItem("transacoes"));
    const user = JSON.parse(localStorage.getItem("userAtual"));
    const displayList = document.getElementById(list);
    displayList.innerHTML = '';

    if (transacoes !== null) {
        if (id === "envioMoedas") {// página do professor
            let u = user.split("professor")[1];
            transacoes.filter(t => t.professor === u).forEach(extrato => {
                const i = document.createElement('li');
                i.className = 'list-group-item';
                i.style.whiteSpace = "pre";
                i.innerText = `Enviada = Aluno ${extrato.aluno} - M$ ${extrato.moedas} -->  ${extrato.message}`;
                displayList.appendChild(i);
            });
        } else if (id === "extrato") { // página do aluno
            let u = user.split("aluno")[1];
            transacoes.filter(t => t.aluno === u).forEach(extrato => {
                const i = document.createElement('li');
                i.className = 'list-group-item';
                i.style.whiteSpace = "pre";
                i.innerText = `Recebida = Professor ${extrato.professor} - M$ ${extrato.moedas} -->  ${extrato.message}`;
                displayList.appendChild(i);
            });
        }
    } else {
        const i = document.createElement('h4');
        i.className = 'mt-3 pl-1';
        i.innerText = "-> Ainda não existem transações para este usuário";
        displayList.appendChild(i);
    }
}