const divChamados = document.getElementById('andamento');
const divPendentes = document.getElementById('pendente');
const divConcluidos = document.getElementById('concluido');



function createElementoChamados(chamado) {
    const elemento = `<div id="item${chamado.id}" class="kanban-item bg-light p-3 my-2" draggable="true" ondragstart="drag(event)">
                        <p> ${chamado.assunto}</p>
                    </div>`;
    return elemento;

}
async function rederizarchamados() {
    const resposta = await fetch('http://localhost:3000/chamados');
    const chamados = await resposta.json();

    chamados.forEach(chamado => {
        const elemento = createElementoChamados(chamado);
        if (chamado.status === 'Pendente') {
            divPendentes.innerHTML += elemento;
        } else if (chamado.status === 'Concluido') {
            divConcluidos.innerHTML += elemento;
        } else {
            divChamados.innerHTML += elemento;
        }
    });


}
function esconderElemento(elemento) {
    [divChamados, divPendentes, divConcluidos].forEach(div => {
        if (div !== elemento) {
            div.style.display = 'none';
        }
        else {
            div.style.display = 'block';
        }
    })

}
function mostraElemento(elemento) {
    [divChamados, divPendentes, divConcluidos].forEach(div => {
        div.style.display = 'block';

    })
}




rederizarchamados();
