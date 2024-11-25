function loadResgatadas() {
    const resgatadas = JSON.parse(localStorage.getItem("resgatadas"));
    const resgateList = document.getElementById('resgateList');
    resgateList.innerHTML= "";
    const user = JSON.parse(localStorage.getItem("userAtual"));
    const idAluno = user.split("aluno")[1];

    if (resgatadas !== null) {
        resgatadas.filter(r => r.idAluno === idAluno).forEach(resgate => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.setAttribute('data-id', resgate.id);
            li.innerHTML = `Empresa ${resgate.empresa} -> ${resgate.descricao} - M$ ${resgate.valor}`;
            resgateList.appendChild(li);
        })
    } else {
        const i = document.createElement('h4');
        i.className = 'mt-3 pl-1';
        i.innerText = "-> Este usuário ainda não resgatou vantagens";
        resgateList.appendChild(i);
    }
}

function loadAvailable() {
    const vantagens = JSON.parse(localStorage.getItem("vantagens"));
    const availableList = document.getElementById('availableList');
    availableList.innerHTML = "";
    const resgatadas = JSON.parse(localStorage.getItem("resgatadas")) || [];
    let ids = resgatadas.map(r => r.id);

    if (vantagens !== null) {
        const disponivel = vantagens.filter(v => !ids.includes(v.id));
        if (disponivel.length !== 0) {
            disponivel.forEach(resgate => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.setAttribute('data-id', resgate.id);
                li.innerHTML = `Empresa ${resgate.empresa} -> ${resgate.descricao} - M$ ${resgate.valor}
                                <button class="btn btn-success btn-sm float-right" onclick="resgataVantagem(${resgate.id})">Resgatar</button>`;
                availableList.appendChild(li);
            })
        } else {
            const i = document.createElement('h4');
            i.className = 'mt-3 pl-1';
            i.innerText = "-> Não existem novas vantagens para regate";
            availableList.appendChild(i);
        }
    } else {
        const i = document.createElement('h4');
        i.className = 'mt-3 pl-1';
        i.innerText = "-> As empresas ainda não criaram vantagens para regate";
        availableList.appendChild(i);
    }
}

function resgataVantagem(id) {
    const vantagem = JSON.parse(localStorage.getItem("vantagens"))[id - 1];
    const resgatadas = JSON.parse(localStorage.getItem("resgatadas")) || [];
    const user = JSON.parse(localStorage.getItem("userAtual"));
    vantagem.idAluno = user.split("aluno")[1];
    resgatadas.push(vantagem);
    localStorage.setItem("resgatadas", JSON.stringify(resgatadas));
    loadResgatadas();
    loadAvailable();
}