
async function saveEmpresa() {
    const id = document.getElementById('empresaId').value;
    const nome = document.getElementById('empresaNome').value;
    const cnpj = document.getElementById('empresaCnpj').value;
    if (nome && cnpj) {
        const empresa = { nome, cnpj };
        try {
            let response;
            if (id) {
                response = await fetch(`http://localhost:8080/empresas/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(empresa)
                });
            } else {
                response = await fetch('http://localhost:8080/empresas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(empresa)
                });
            }
            if (response.ok) {
                document.getElementById('empresaForm').reset();
                document.getElementById('empresaId').value = '';
                loadEmpresas();
            }
        } catch (error) {
            console.error('Erro ao salvar empresa:', error);
        }
    }
}

async function loadEmpresas() {
    try {
        const response = await fetch('http://localhost:8080/empresas');
        if (response.ok) {
            const empresas = await response.json();
            const empresaList = document.getElementById('empresaList');
            empresaList.innerHTML = '';
            empresas.forEach(empresa => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `${empresa.nome} - CNPJ: ${empresa.cnpj} 
                                <button class="btn btn-warning btn-sm float-right ml-2" onclick="editEmpresa(${empresa.id})">Editar</button>
                                <button class="btn btn-danger btn-sm float-right" onclick="deleteEmpresa(${empresa.id}, this)">Remover</button>`;
                empresaList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar empresas:', error);
    }
}

function editEmpresa(id) {
    fetch(`http://localhost:8080/empresas/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar empresa para edição');
            }
            return response.json();
        })
        .then(empresa => {
            document.getElementById('empresaId').value = empresa.id;
            document.getElementById('empresaNome').value = empresa.nome || '';
            document.getElementById('empresaCnpj').value = empresa.cnpj || '';
        })
        .catch(error => console.error('Erro ao editar empresa:', error));
}

async function deleteEmpresa(id, element) {
    try {
        const response = await fetch(`http://localhost:8080/empresas/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            element.parentElement.remove();
        }
    } catch (error) {
        console.error('Erro ao remover empresa:', error);
    }
}
