async function sendMoedas() {
    const id = document.getElementById('envioId').value;
    const professor = document.getElementById('professorId').value;
    const aluno = document.getElementById('alunoIdSend').value;
    const moedas = document.getElementById('quantMoedas').value;
    const mensagem = document.getElementById('mensagem').value;

    if (professor.trim() !== "" && aluno.trim() !== "" && mensagem.trim() !== "" && !isNaN(moedas) && moedas >= 0)  {
        const envio = {professor, aluno, moedas, mensagem};
        try {
            let response = await fetch(`http://localhost:8080/envio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(envio)
            });
            if (response.ok) {
                document.getElementById('envioForm').reset();
                document.getElementById('envioId').value = '';
                await loadExtrato('envioList');
            }
        } catch (error) {
            console.error('Erro ao realizar a transação:', error);
        }

    } else {
        alert('Preencha todos os campos!');
    }

}