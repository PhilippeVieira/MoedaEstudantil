async function saveAluno() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const id = document.getElementById('alunoId').value;
    const nome = document.getElementById('alunoNome').value;
    const cpf = document.getElementById('alunoCpf').value;
    const rg = document.getElementById('alunoRg').value;
    const email = document.getElementById('alunoEmail').value;
    const instituicao = document.getElementById('alunoInstituicao').value;
    const endereco = document.getElementById('alunoEndereco').value;
    const curso = document.getElementById('alunoCurso').value;
    if (nome) {
        const aluno = { id: id || new Date().getTime(), nome, cpf, rg, email, instituicao, endereco, curso };
        const alunoList = document.getElementById('alunoList');

        if (id) {
            const existingAluno = document.querySelector(`#alunoList li[data-id='${id}']`);
            if (existingAluno) {
                existingAluno.innerHTML = `${aluno.nome} - ${aluno.cpf} - ${aluno.email} 
                            <button class="btn btn-warning btn-sm float-right ml-2" onclick="editAluno(${aluno.id})">Editar</button>
                            <button class="btn btn-danger btn-sm float-right" onclick="deleteAluno(${aluno.id}, this)">Remover</button>`;
            }
        } else {
            const i = users.filter(item => item.startsWith("Aluno")).length + 1;
            const newUser = "Aluno " + i;
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
    const aluno = document.querySelector(`#alunoList li[data-id='${id}']`);
    if (aluno) {
        const [nome, cpf, email] = aluno.textContent.split(' - ');
        document.getElementById('alunoId').value = id;
        document.getElementById('alunoNome').value = nome.trim();
        document.getElementById('alunoCpf').value = cpf.trim();
        document.getElementById('alunoEmail').value = email.trim();
    }
}

function deleteAluno(id, element) {
    const aluno = document.querySelector(`#alunoList li[data-id='${id}']`);
    if (aluno) {
        aluno.remove();
        delete saldos[id];
    }
}