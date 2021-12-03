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

//função para inserir lista no local storage
function inStorage (listaAtualizada) {
     //converte para JSON
     const listaJSON = JSON.stringify(listaAtualizada);
    
     //insere no localstorage
     localStorage.setItem('atividades', listaJSON);
}

//função para adicionar tarefas novas e do storage
function novaLinha (item) {
    let novaLi = document.createElement("li");
    novaLi.className = `linha`;
    novaLi.id = `${item.id}`;
    
    //adiciona o checkbox
    let checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.id = `check${item.id}`;
    checkbox.className = 'stylecheck';

    //altera o .feito do item de acordo com o checkbox e atualiza o storage/lista
    checkbox.addEventListener ('change', event => {
        if (checkbox.checked) {
            item.feito = true;
            novaLabel.className = 'true'
        }
        else {
            item.feito = false;
            novaLabel.className = 'false'
        }

        inStorage(listaRestaurada);
    });
    novaLi.appendChild(checkbox);
    
    //adiciona o label com a tarefa
    let novaLabel = document.createElement("label");
    novaLabel.setAttribute('for',`check${item.id}`);
    novaLi.appendChild(novaLabel);
    novaLabel.innerHTML = item.valor;

    //verifica se o checkbox está marcado
    if (item.feito == true) {
        checkbox.checked = true;
        novaLabel.className = 'true';
    };

    //adiciona o botão de remover
    let novoBtn = document.createElement("button");
    novoBtn.id = 'btnRemove';
    novoBtn.className =  `btnRemove${item.id}`
    novoBtn.innerHTML = '-';
    //função do botão remover e atualizar o storage/lista
    novoBtn.onclick = function remover() {
        
        //confirmação da remoçao
        if (window.confirm("Tem certeza que deseja excluir esta tarefa?")){
            const removido = document.getElementById(`${item.id}`);
            listaEntrada.removeChild(removido);
    
        //remove da lista
            listaRestaurada.splice(listaRestaurada.indexOf(item), 1);
        };

        inStorage(listaRestaurada);
    };
    novaLi.appendChild(novoBtn);
    
    //insere item
    listaEntrada.insertAdjacentElement("afterbegin", novaLi);
    }

//limpar a entrada depois de inserir item 
function limparEntrada () {
    tarefa.value = '';
}

//Botão para dicionar nova tarefa
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

        inStorage(listaRestaurada);

        limparEntrada(); 
    } 
    else {
        window.alert('É necessário inserir uma tarefa!');
    }
});


