async function saveEmpresa() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    const i = empresas.length + 1;

    const id = document.getElementById('empresaId').value;
    const nome = document.getElementById('empresaNome').value;
    const cnpj = document.getElementById('empresaCnpj').value;
    if (nome && cnpj) {
        const empresa = {id: id || i, nome: nome, cnpj: cnpj};
        const empresaList = document.getElementById('empresaList');

        if (id) {
            const existingEmpresa = document.querySelector(`#empresaList li[data-id='${id}']`);
            if (existingEmpresa) {
                existingEmpresa.innerHTML = `${empresa.nome} - CNPJ: ${empresa.cnpj} 
                            <button class="btn btn-warning btn-sm float-right ml-2" onclick="editEmpresa(${empresa.id})">Editar</button>
                            <button class="btn btn-danger btn-sm float-right" onclick="deleteEmpresa(${empresa.id}, this)">Remover</button>`;
                empresas[id - 1] = {id: id, nome: nome, cnpj: cnpj};
                localStorage.setItem("empresas", JSON.stringify(empresas));
            }
        } else {
            empresas.push(empresa);
            localStorage.setItem("empresas", JSON.stringify(empresas));

            const newUser = "Empresa" + i;
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
    const empresa = JSON.parse(localStorage.getItem("empresas"))[id-1];
    document.getElementById('empresaId').value = empresa.id;
    document.getElementById('empresaNome').value = empresa.nome;
    document.getElementById('empresaCnpj').value = empresa.cnpj;
}

function deleteEmpresa(id, element) {
    const empresa = document.querySelector(`#empresaList li[data-id='${id}']`);
    if (empresa) {
        empresa.remove();
    }
}

function loadEmpresas() {
    const empresas = JSON.parse(localStorage.getItem("empresas")) || [];
    const empresaList = document.getElementById('empresaList');

    empresas.forEach(empresa => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.setAttribute('data-id', empresa.id);
        li.innerHTML = `${empresa.nome} - CNPJ: ${empresa.cnpj} 
                        <button class="btn btn-warning btn-sm float-right ml-2" onclick="editEmpresa(${empresa.id})">Editar</button>
                        <button class="btn btn-danger btn-sm float-right" onclick="deleteEmpresa(${empresa.id}, this)">Remover</button>`;
        empresaList.appendChild(li);
    })
}