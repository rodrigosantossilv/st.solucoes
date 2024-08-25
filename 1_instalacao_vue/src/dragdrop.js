// Função para permitir o arraste
function allowDrop(event) {
    event.preventDefault();
}

// Função para iniciar o arraste
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

// Função para lidar com a soltura
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    const dropTarget = event.target;

    // Verifica se o alvo é uma coluna e não um item
    if (dropTarget.classList.contains("kanban-column")) {
        dropTarget.appendChild(draggedElement);
    }
}
