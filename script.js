const tarefa = document.getElementById("entrada");
const btAdd = document.getElementById("btnAdd");
const btRemove = document.getElementById("btnRemove");
var key = 0;

//Adicionar nova tarefa
btnAdd.addEventListener('click', event => {
    key++;
    let valorTarefa = tarefa.value.trim()
    localStorage.setItem (key, valorTarefa);
    let novaDiv = document.createElement("div");
    novaDiv.className = 'linha'
    let novoP = document.createElement("p");
    novaDiv.appendChild(novoP);
    novoP.innerHTML = valorTarefa;
    let divEntrada = document.getElementById("divEntrada");
    divEntrada.insertAdjacentElement("afterend", novaDiv);
});

