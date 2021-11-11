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
        novaLinha(itensAntigos);
    };
};

//função para adicionar itens na lista e no storage
function novaLinha (item) {
    let novaLi = document.createElement("li");
    novaLi.className = `linha`;
    novaLi.id = `${item.id}`;
    
    //adiciona o checkbox
    let checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.id = `check check${item.id}`;
    checkbox.onclick = function riscar () {
        const riscado = document.getElementsByClassName(`checked${item.id}`);
        
    }
    novaLi.appendChild(checkbox);
    
    //adiciona o label com a tarefa
    let novaLabel = document.createElement("label");
    novaLabel.className = `checked${item.id}`;
    novaLi.appendChild(novaLabel);
    novaLabel.innerHTML = item.valor;

    //adiciona o botão de remover
    let novoBtn = document.createElement("button");
    novoBtn.id = 'btnRemove';
    novoBtn.className =  `btnRemove${item.id}`
    novoBtn.innerHTML = '-';
    novoBtn.onclick = function remover() {
        const removido = document.getElementById(`${item.id}`);
        listaEntrada.removeChild(removido);
    
        //remove da lista
        listaRestaurada.splice(item.id);
    
        //converte para JSON
        const listaJSON = JSON.stringify(listaRestaurada);
    
        //insere no localstorage
        localStorage.setItem('atividades', listaJSON);
    };
    novaLi.appendChild(novoBtn);
    
    //insere item
    listaEntrada.insertAdjacentElement("afterbegin", novaLi);
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
        
        //insere na lista
        listaRestaurada.push(item);

        //converte para JSON
        const listaJSON = JSON.stringify(listaRestaurada);
    
        //insere no localstorage
        localStorage.setItem('atividades', listaJSON);

        limparEntrada(); 
    } 
    else {
        window.alert('É necessário inserir uma tarefa!');
    }
});


