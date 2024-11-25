function login(){
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userID = document.getElementById('userID').value.toLowerCase();
    let existe = false;
    for (let u of users){
        if(userID === u.toLowerCase() ){ // User já Cadastrado
            localStorage.setItem("userAtual", JSON.stringify(userID));
            existe = true;
            break;
        }
    }

    if(existe){
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('loginForm').reset();
        userPage(userID);
    }else{
        alert("Usuário não cadastrado");
    }
}

function logado(){
    if((localStorage.getItem("userAtual") !== null)){
        document.getElementById('loginForm').style.display = 'none';
        let u = JSON.parse(localStorage.getItem("userAtual"))
        userPage(u);
    }
}
function userPage(user){
    defUser(user);
    document.getElementById('logoff').style.display = 'block';
    if(user.startsWith("admin")){
        forUser("admin");
    } else if(user.startsWith("aluno")){
        forUser("aluno");
    }else if(user.startsWith("empresa")){
        forUser("empresa");
    }else if(user.startsWith("professor")){
        forUser("professor");
    }
}

function defUser(user){
    if (user !== "") {
        document.getElementById('userTAG').innerText = capFirst(user);
    } else {
        document.getElementById('userTAG').innerText = "";
    }
}
function capFirst(str){
    return str[0].toUpperCase() + str.substring(1);
}

function sair(){
    alert("Usuário deslogado");
    localStorage.removeItem("userAtual");
    document.querySelectorAll('.nav-item').forEach(i => i.style.display = 'none');
    defUser("");
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('logoff').style.display = 'none';
}