const tarefa = document.getElementById("entrada");
const btnAdd = document.getElementById("btnAdd");
const listaEntrada = document.getElementById("listaEntrada");

//pega do storage
let storage = localStorage.getItem('atividades');
var listaRestaurada = [];

//carrega os itens do storage
if (storage) {
    listaRestaurada = JSON.parse(storage)
    for(i = 0; i < listaRestaurada.length; i++) {
        let itensAntigos = listaRestaurada[i];
        carregar(itensAntigos);
    };
};

//função para adicionar itens na lista sem adicionar no storage
function carregar(item) {
    let novaLi = document.createElement("li");
    novaLi.className = `linha ${item.id}`;
    
    //adiciona o checkbox
    let checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className = `check check${item.id}`;
    checkbox.onclick = `riscar(${item.id})`;
    novaLi.appendChild(checkbox);
    
    //adiciona o label com a tarefa
    let novaLabel = document.createElement("label");
    novaLabel.setAttribute('for', `check${item.id}`);
    novaLi.appendChild(novaLabel);
    novaLabel.innerHTML = item.valor;

    //adiciona o botão de remover
    let novoBtn = document.createElement("button");
    novoBtn.id = 'btnRemove';
    novoBtn.className =  `btnRemove${item.id}`
    novoBtn.innerHTML = '-';
    novoBtn.onclick = `remover(${item.id})`;
    novaLi.appendChild(novoBtn);
    
    //insere item na lista
    listaEntrada.insertAdjacentElement("afterbegin", novaLi);
}

//função para adicionar itens na lista e no storage
function novaLinha (item) {
    let novaLi = document.createElement("li");
    novaLi.className = `linha ${item.id}`;
    
    //adiciona o checkbox
    let checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.id = `check check${item.id}`;
    //checkbox.onclick = riscar(item.id);
    novaLi.appendChild(checkbox);
    
    //adiciona o label com a tarefa
    let novaLabel = document.createElement("label");
    novaLabel.setAttribute('for', `check${item.id}`);
    novaLi.appendChild(novaLabel);
    novaLabel.innerHTML = item.valor;

    //adiciona o botão de remover
    let novoBtn = document.createElement("button");
    novoBtn.id = 'btnRemove';
    novoBtn.className =  `btnRemove${item.id}`
    novoBtn.innerHTML = '-';
    //document.getElementById('btnRemove').onclick = remover(item.id);
    novaLi.appendChild(novoBtn);
    
    //insere item na lista
    listaEntrada.insertAdjacentElement("afterbegin", novaLi);
    listaRestaurada.push(item);

    //converte para JSON
    const listaJSON = JSON.stringify(listaRestaurada);

    //insere no localstorage
    localStorage.setItem('atividades', listaJSON);
    }

//limpar a entrada depois de inserir item 
function limparEntrada () {
    tarefa.value = '';
}

//Adicionar nova tarefa
btnAdd.addEventListener('click', event => {
    if (tarefa.value != '') {
        const item = {
            id: parseInt(listaRestaurada.length),
            valor: tarefa.value,
            feito: false,
        }
        novaLinha(item);
        limparEntrada(); 
    } 
    else {
        window.alert('É necessário inserir uma tarefa!');
    }
});

function remover(id) {
    const removido = document.getElementsByClassName(`${id}`);
    listaEntrada.removeChild(removido);
}


