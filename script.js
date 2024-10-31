const ulElement = document.querySelector("ul");
const inputElement = document.querySelector("input");
const button = document.querySelector("button");

const tarefas = JSON.parse(localStorage.getItem("@listaTarefas")) || [];

function renderTarefas() {
  ulElement.innerHTML = "";
  tarefas.forEach((todo, posicao) => {
    let liElement = document.createElement("li");

    // Cria o checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.concluida;
    checkbox.onclick = () => marcarConcluida(posicao);

    liElement.appendChild(checkbox);

    // Adiciona o texto da tarefa
    let tarefaText = document.createTextNode(todo.texto);
    liElement.appendChild(tarefaText);

    // Cria o link de exclusão
    let linkElement = document.createElement("a");
    linkElement.setAttribute("href", "#");
    linkElement.textContent = "Excluir";
    linkElement.onclick = (event) => {
      event.stopPropagation(); // Impede que o clique no link marque a tarefa
      deletar(posicao);
    };

    liElement.appendChild(linkElement);
    ulElement.appendChild(liElement);

    // Adiciona a classe 'concluida' se a tarefa estiver concluída
    if (todo.concluida) {
      liElement.classList.add("concluida");
    }
  });
}

function deletar(posicao) {
  tarefas.splice(posicao, 1);
  renderTarefas();
  salvarDados();
}

function marcarConcluida(posicao) {
  tarefas[posicao].concluida = !tarefas[posicao].concluida; // Alterna o estado de concluída
  renderTarefas();
  salvarDados();
}

function adicionarTarefa(event) {
  event.preventDefault();
  if (inputElement.value === "") {
    alert("Adicione uma tarefa");
    return;
  }
  let novaTarefa = { texto: inputElement.value, concluida: false };
  tarefas.push(novaTarefa);
  inputElement.value = "";
  renderTarefas();
  salvarDados();
}

function salvarDados() {
  localStorage.setItem("@listaTarefas", JSON.stringify(tarefas));
}

button.onclick = adicionarTarefa;
renderTarefas();
