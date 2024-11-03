
async function saveAluno() {
    const id = document.getElementById('alunoId').value;
    const nome = document.getElementById('alunoNome').value;
    const cpf = document.getElementById('alunoCpf').value;
    const rg = document.getElementById('alunoRg').value;
    const email = document.getElementById('alunoEmail').value;
    const instituicao = document.getElementById('alunoInstituicao').value;
    const endereco = document.getElementById('alunoEndereco').value;
    const curso = document.getElementById('alunoCurso').value;
    if (nome) {
        const aluno = { nome, cpf, rg, email, instituicao, endereco, curso };
        try {
            let response;
            if (id) {
                response = await fetch(`http://localhost:8080/alunos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(aluno)
                });
            } else {
                response = await fetch('http://localhost:8080/alunos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(aluno)
                });
            }
            if (response.ok) {
                document.getElementById('alunoForm').reset();
                document.getElementById('alunoId').value = '';
                await loadAlunos();
            }
        } catch (error) {
            console.error('Erro ao salvar aluno:', error);
        }
    }
}

async function loadAlunos() {
    try {
        const response = await fetch('http://localhost:8080/alunos');
        if (response.ok) {
            const alunos = await response.json();
            const alunoList = document.getElementById('alunoList');
            alunoList.innerHTML = '';
            alunos.forEach(aluno => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `${aluno.nome} - ${aluno.cpf} - ${aluno.email} 
                                <button class="btn btn-warning btn-sm float-right ml-2" onclick="editAluno(${aluno.id})">Editar</button>
                                <button class="btn btn-danger btn-sm float-right" onclick="deleteAluno(${aluno.id}, this)">Remover</button>`;
                alunoList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
    }
}

function editAluno(id) {
    fetch(`http://localhost:8080/alunos/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar aluno para edição');
            }
            return response.json();
        })
        .then(aluno => {
            document.getElementById('alunoId').value = aluno.id;
            document.getElementById('alunoNome').value = aluno.nome || '';
            document.getElementById('alunoCpf').value = aluno.cpf || '';
            document.getElementById('alunoRg').value = aluno.rg || '';
            document.getElementById('alunoEmail').value = aluno.email || '';
            document.getElementById('alunoInstituicao').value = aluno.instituicao || '';
            document.getElementById('alunoEndereco').value = aluno.endereco || '';
            document.getElementById('alunoCurso').value = aluno.curso || '';
        })
        .catch(error => console.error('Erro ao editar aluno:', error));
}

async function deleteAluno(id, element) {
    try {
        const response = await fetch(`http://localhost:8080/alunos/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            element.parentElement.remove();
        }
    } catch (error) {
        console.error('Erro ao remover aluno:', error);
    }
}