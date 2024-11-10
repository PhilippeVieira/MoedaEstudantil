async function saveProfessor() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const id = document.getElementById('professorId').value;
    const nome = document.getElementById('professorNome').value;
    const instituicao = document.getElementById('professorInstituicao').value;
    if (nome && instituicao) {
        const professor = { id: id || new Date().getTime(), nome, instituicao };
        const professorList = document.getElementById('professorList');

        if (id) {
            const existingProfessor = document.querySelector(`#professorList li[data-id='${id}']`);
            if (existingProfessor) {
                existingProfessor.innerHTML = `${professor.nome} - ${professor.instituicao} 
                            <button class="btn btn-warning btn-sm float-right ml-2" onclick="editProfessor(${professor.id})">Editar</button>
                            <button class="btn btn-danger btn-sm float-right" onclick="deleteProfessor(${professor.id}, this)">Remover</button>`;
            }
        } else {
            const i = users.filter(item => item.startsWith("Professor")).length + 1;
            const newUser = "Professor  " + i;
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
    const professor = document.querySelector(`#professorList li[data-id='${id}']`);
    if (professor) {
        const [nome, instituicao] = professor.textContent.split(' - ');
        document.getElementById('professorId').value = id;
        document.getElementById('professorNome').value = nome.trim();
        document.getElementById('professorInstituicao').value = instituicao.trim();
    }
}

function deleteProfessor(id, element) {
    const professor = document.querySelector(`#professorList li[data-id='${id}']`);
    if (professor) {
        professor.remove();
        delete saldos[id];
    }
}