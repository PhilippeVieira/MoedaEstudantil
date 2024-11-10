async function saveEmpresa() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const id = document.getElementById('empresaId').value;
    const nome = document.getElementById('empresaNome').value;
    const cnpj = document.getElementById('empresaCnpj').value;
    if (nome && cnpj) {
        const empresa = { id: id || new Date().getTime(), nome, cnpj };
        const empresaList = document.getElementById('empresaList');

        if (id) {
            const existingEmpresa = document.querySelector(`#empresaList li[data-id='${id}']`);
            if (existingEmpresa) {
                existingEmpresa.innerHTML = `${empresa.nome} - CNPJ: ${empresa.cnpj} 
                            <button class="btn btn-warning btn-sm float-right ml-2" onclick="editEmpresa(${empresa.id})">Editar</button>
                            <button class="btn btn-danger btn-sm float-right" onclick="deleteEmpresa(${empresa.id}, this)">Remover</button>`;
            }
        } else {
            const i = users.filter(item => item.startsWith("Empresa")).length + 1;
            const newUser = "Empresa " + i;
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.setAttribute('data-id', empresa.id);
            li.innerHTML = `${empresa.nome} - CNPJ: ${empresa.cnpj} 
                        <button class="btn btn-warning btn-sm float-right ml-2" onclick="editEmpresa(${empresa.id})">Editar</button>
                        <button class="btn btn-danger btn-sm float-right" onclick="deleteEmpresa(${empresa.id}, this)">Remover</button>`;
            empresaList.appendChild(li);
        }
        document.getElementById('empresaForm').reset();
        document.getElementById('empresaId').value = '';
    }
}

function editEmpresa(id) {
    const empresa = document.querySelector(`#empresaList li[data-id='${id}']`);
    if (empresa) {
        const [nome, cnpj] = empresa.textContent.split(' - CNPJ: ');
        document.getElementById('empresaId').value = id;
        document.getElementById('empresaNome').value = nome.trim();
        document.getElementById('empresaCnpj').value = cnpj.trim();
    }
}

function deleteEmpresa(id, element) {
    const empresa = document.querySelector(`#empresaList li[data-id='${id}']`);
    if (empresa) {
        empresa.remove();
    }
}