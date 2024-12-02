async function saveProfessor() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const professores = JSON.parse(localStorage.getItem("professores")) || [];
    const i = professores.length > 0 ? professores[professores.length - 1].id + 1 : 1;

    const id = document.getElementById('professorId').value;
    const nome = document.getElementById('professorNome').value;
    const instituicao = document.getElementById('professorInstituicao').value;
    if (nome && instituicao) {
        const professor = {id: id || i, nome: nome, instituicao: instituicao};
        const professorList = document.getElementById('professorList');

        if (id) {
            const existingProfessor = document.querySelector(`#professorList li[data-id='${id}']`);
            if (existingProfessor) {
                existingProfessor.innerHTML = `${professor.nome} - ${professor.instituicao} 
                            <button class="btn btn-warning btn-sm float-right ml-2" onclick="editProfessor(${professor.id})">Editar</button>
                            <button class="btn btn-danger btn-sm float-right" onclick="deleteProfessor(${professor.id}, this)">Remover</button>`;
                professores[id - 1] = {id: id, nome: nome, instituicao: instituicao};
                localStorage.setItem("professores", JSON.stringify(professores));
            }
        } else {
            professores.push(professor);
            localStorage.setItem("professores", JSON.stringify(professores));

            const newUser = "Professor" + i;
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.setAttribute('data-id', professor.id);
            li.innerHTML = `${professor.nome} - ${professor.instituicao} 
                        <button class="btn btn-warning btn-sm float-right ml-2" onclick="editProfessor(${professor.id})">Editar</button>
                        <button class="btn btn-danger btn-sm float-right" onclick="deleteProfessor(${professor.id}, this)">Remover</button>`;
            professorList.appendChild(li);
        }
        document.getElementById('professorForm').reset();
        document.getElementById('professorId').value = '';
        if (!saldos[professor.id]) {
            saldos[professor.id] = 0;
        }
    }
}

function editProfessor(id) {
    const professor = JSON.parse(localStorage.getItem("professores"))[id - 1];
    document.getElementById('professorId').value = professor.id;
    document.getElementById('professorNome').value = professor.nome;
    document.getElementById('professorInstituicao').value = professor.instituicao;
}

function deleteProfessor(id, element) {
    const professor = document.querySelector(`#professorList li[data-id='${id}']`);
    let professores = JSON.parse(localStorage.getItem("professores"));
    professores = professores.filter(i => i.id !== id);
    localStorage.setItem("professores", JSON.stringify(professores));
    let users = JSON.parse(localStorage.getItem("users"));
    users = users.filter(i => i !== `Professor${id}`);
    localStorage.setItem("users", JSON.stringify(users));
    if (professor) {
        professor.remove();
        delete saldos[id];
    }
}

function loadProfessores() {
    const professores = JSON.parse(localStorage.getItem("professores")) || [];
    const professorList = document.getElementById('professorList');
    professorList.innerHTML = "";
    professores.forEach(professor => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.setAttribute('data-id', professor.id);
        li.innerHTML = `${professor.nome} - ${professor.instituicao} 
                        <button class="btn btn-warning btn-sm float-right ml-2" onclick="editProfessor(${professor.id})">Editar</button>
                        <button class="btn btn-danger btn-sm float-right" onclick="deleteProfessor(${professor.id}, this)">Remover</button>`;
        professorList.appendChild(li);
    })
}