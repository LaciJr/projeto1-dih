const tarefa = document.getElementById("entrada");
const btAdd = document.getElementById("btnAdd");
const btRemove = document.getElementById("btnRemove");
var key = 0;

//Adiciona os itens do localstorage
var tamanhoLista = localStorage.getItem('key')
for (i = 0; i =< tamanhoLista; i++) {

}

//Adicionar nova tarefa
btnAdd.addEventListener('click', event => {
    localStorage.removeItem ('key', key);
    key++;
    localStorage.setItem ('key', key);
    let valorTarefa = tarefa.value.trim()
    localStorage.setItem (key, valorTarefa);
    let novaLi = document.createElement("li");
    novaLi.className = 'linha'
    let novoP = document.createElement("p");
    novaDiv.appendChild(novoP);
    novoP.innerHTML = valorTarefa;
    let listaEntrada = document.getElementById("listaEntrada");
    divEntrada.insertAdjacentElement("afterbegin", novaLi);
});

