async function saveVantagem() {
    const vantagens = JSON.parse(localStorage.getItem("vantagens")) || [];
    const user = JSON.parse(localStorage.getItem("userAtual"));
    const empresa = user.split("empresa")[1];

    const id = document.getElementById('vantagemId').value;
    const descricao = document.getElementById('vantagemDescricao').value;
    const valor = document.getElementById('vantagemValor').value;
    if (descricao && valor >= 0) {
        const vantagem = {id: id || vantagens.length + 1, empresa: empresa, descricao: descricao, valor: valor}
        const vantagemList = document.getElementById('vantagemList');
        if (id) {
            const existingVantagem = document.querySelector(`#vantagemList li[data-id='${id}']`);
            if (existingVantagem) {
                existingVantagem.innerHTML = `${vantagem.descricao} - M$ ${vantagem.valor}
                            <button class="btn btn-warning btn-sm float-right ml-2" onclick="editVantagem(${vantagem.id})">Editar</button>
                            <button class="btn btn-danger btn-sm float-right" onclick="deleteVantagem(${vantagem.id}, this)">Remover</button>`;

                vantagens[id-1] = {empresa: empresa, descricao: descricao, valor: valor};
                localStorage.setItem("vantagens", JSON.stringify(vantagens));
            }
        } else {
            vantagens.push(vantagem);
            localStorage.setItem("vantagens", JSON.stringify(vantagens));

            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.setAttribute('data-id', vantagem.id);
            li.innerHTML = `${vantagem.descricao} - M$ ${vantagem.valor}
                        <button class="btn btn-warning btn-sm float-right ml-2" onclick="editVantagem(${vantagem.id})">Editar</button>
                        <button class="btn btn-danger btn-sm float-right" onclick="deleteVantagem(${vantagem.id}, this)">Remover</button>`;
            vantagemList.appendChild(li);
        }
        document.getElementById('vantagemForm').reset();
        document.getElementById('vantagemId').value = '';
    } else {
        alert("Preencha os campos com valores aceitáveis");
    }
}

function editVantagem(id) {
    let vantagem = document.querySelector(`#vantagemList li[data-id='${id}']`);
    if (vantagem) {
        vantagem = vantagem.textContent.split('\n');
        const [descricao, valor] = vantagem[0].split(' - M$ ');
        document.getElementById('vantagemId').value = id;
        document.getElementById('vantagemDescricao').value = descricao.trim();
        document.getElementById('vantagemValor').value = valor.trim();
    }
}
function loadVantagens () {
    const vantagens = JSON.parse(localStorage.getItem("vantagens")) || [];
    let user = JSON.parse(localStorage.getItem("userAtual"));
    let empresa = user.split("empresa")[1];
    const vantagemList = document.getElementById('vantagemList');

    vantagens.filter(v => v.empresa === empresa).forEach(vantagem => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.setAttribute('data-id', vantagem.id);
        li.innerHTML = `${vantagem.descricao} - M$ ${vantagem.valor}
                        <button class="btn btn-warning btn-sm float-right ml-2" onclick="editVantagem(${vantagem.id})">Editar</button>
                        <button class="btn btn-danger btn-sm float-right" onclick="deleteVantagem(${vantagem.id}, this)">Remover</button>`;
        vantagemList.appendChild(li);
    })
}

function deleteVantagem(id, element) {
    const vantagem = document.querySelector(`#vantagemList li[data-id='${id}']`);
    if (vantagem) {
        vantagem.remove();
    }
}