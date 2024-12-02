async function saveAluno() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    const i = alunos.length > 0 ? alunos[alunos.length - 1].id + 1 : 1;

    const id = document.getElementById('alunoId').value;
    const nome = document.getElementById('alunoNome').value;
    const cpf = document.getElementById('alunoCpf').value;
    const rg = document.getElementById('alunoRg').value;
    const email = document.getElementById('alunoEmail').value;
    const instituicao = document.getElementById('alunoInstituicao').value;
    const endereco = document.getElementById('alunoEndereco').value;
    const curso = document.getElementById('alunoCurso').value;
    if (nome) {
        const aluno = {id: id || i, nome: nome,cpf: cpf, rg: rg, email: email, instituicao: instituicao, endereco: endereco, curso: curso};
        const alunoList = document.getElementById('alunoList');

        if (id) {
            const existingAluno = document.querySelector(`#alunoList li[data-id='${id}']`);
            if (existingAluno) {
                existingAluno.innerHTML = `${aluno.nome} - ${aluno.cpf} - ${aluno.email} 
                            <button class="btn btn-warning btn-sm float-right ml-2" onclick="editAluno(${aluno.id})">Editar</button>
                            <button class="btn btn-danger btn-sm float-right" onclick="deleteAluno(${aluno.id}, this)">Remover</button>`;

                alunos[id - 1] = {id: id, nome: nome,cpf: cpf, rg: rg, email: email, instituicao: instituicao, endereco: endereco, curso: curso};
                localStorage.setItem("alunos", JSON.stringify(alunos));
            }
        } else {
            alunos.push(aluno);
            localStorage.setItem("alunos", JSON.stringify(alunos));

            const newUser = "Aluno" + i;
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.setAttribute('data-id', aluno.id);
            li.innerHTML = `${aluno.nome} - ${aluno.cpf} - ${aluno.email} 
                        <button class="btn btn-warning btn-sm float-right ml-2" onclick="editAluno(${aluno.id})">Editar</button>
                        <button class="btn btn-danger btn-sm float-right" onclick="deleteAluno(${aluno.id}, this)">Remover</button>`;
            alunoList.appendChild(li);
        }
        document.getElementById('alunoForm').reset();
        document.getElementById('alunoId').value = '';
        if (!saldos[aluno.id]) {
            saldos[aluno.id] = 0;
        }
    }
}

function editAluno(id) {
    const aluno = JSON.parse(localStorage.getItem("alunos"))[id - 1];
    document.getElementById('alunoId').value = aluno.id;
    document.getElementById('alunoNome').value = aluno.nome;
    document.getElementById('alunoCpf').value = aluno.cpf;
    document.getElementById('alunoRg').value = aluno.rg;
    document.getElementById('alunoEmail').value = aluno.email;
    document.getElementById('alunoInstituicao').value = aluno.instituicao;
    document.getElementById('alunoEndereco').value = aluno.endereco;
    document.getElementById('alunoCurso').value = aluno.curso;
}

function deleteAluno(id, element) {
    const aluno = document.querySelector(`#alunoList li[data-id='${id}']`);
    let alunos = JSON.parse(localStorage.getItem("alunos"));
    alunos = alunos.filter(i => i.id !== id);
    localStorage.setItem("alunos", JSON.stringify(alunos));
    let users = JSON.parse(localStorage.getItem("users"));
    users = users.filter(i => i !== `Aluno${id}`);
    localStorage.setItem("users", JSON.stringify(users));
    if (aluno) {
        aluno.remove();
        delete saldos[id];
    }
}

function loadAlunos() {
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    const alunoList = document.getElementById('alunoList');
    alunoList.innerHTML = "";
    alunos.forEach(aluno => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.setAttribute('data-id', aluno.id);
        li.innerHTML = `${aluno.nome} - ${aluno.cpf} - ${aluno.email} 
                        <button class="btn btn-warning btn-sm float-right ml-2" onclick="editAluno(${aluno.id})">Editar</button>
                        <button class="btn btn-danger btn-sm float-right" onclick="deleteAluno(${aluno.id}, this)">Remover</button>`;
        alunoList.appendChild(li);
    })
}