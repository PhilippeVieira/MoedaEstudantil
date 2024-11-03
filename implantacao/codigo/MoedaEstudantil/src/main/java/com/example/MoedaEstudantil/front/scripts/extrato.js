async function loadExtrato(id) {
    try {
        const response = await fetch('http://localhost:8080/extrato');
        if (response.ok) {
            const extrato = await response.json();
            const extratoList = document.getElementById(id);
            extratoList.innerHTML = '';
            extrato.forEach(extrato => {
                const item = document.createElement('div');
                const h2 = document.createElement('h2');
                const button = document.createElement('button');
                const divC = document.createElement('div');
                const divbody = document.createElement('h2');

                item.className = 'accordion-item';
                h2.className = 'accordion-header';
                button.className = 'accordion-button';
                button.type = 'button';
                button.setAttribute('data-bs-toggle', 'collapse');
                button.setAttribute('data-bs-target', '#collapseOne');
                button.setAttribute('aria-expanded', 'true');
                button.setAttribute('aria-controls', 'collapseOne');
                if (id === "envioList"){ // página do professor
                    button.innerText = `${extrato.aluno} -- M$ ${extrato.moedas}`;
                } else if (id === "extratoList"){ // página do aluno
                    button.innerText = `${extrato.professor} -- M$ ${extrato.moedas}`;
                }
                h2.appendChild(button);
                item.appendChild(h2);

                divC.id = 'collapseOne';
                divC.className = 'accordion-collapse collapse show';
                divC.setAttribute('aria-labelledby', 'headingOne');
                divC.setAttribute('data-bs-parent', '#accordionExample');
                divbody.className = 'accordion-body';
                divbody.innerText = extrato.mensagem;
                divC.appendChild(divbody);
                item.appendChild(divC);

                extratoList.appendChild(item);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar alunos:', error);
    }
}