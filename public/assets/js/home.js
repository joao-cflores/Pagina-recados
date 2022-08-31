let usuarioLogado =  JSON.parse(localStorage.getItem('userLogado'))
imprimirRecados()

if (!usuarioLogado) {
    sair();
}

let recado = document.getElementById('recado')
let descricao = document.getElementById('descricao')
const btnGravar = document.getElementById('btnGravar')
let form = document.getElementById('formulario')
const btnSair = document.getElementById('btnSair')

btnSair.addEventListener('click', () => {
    localStorage.removeItem('userLogado');
    sair();
  });

btnGravar.addEventListener('click', (event) =>{
    event.preventDefault();
    gravarRecado();
})

function sair() {
    return (window.location.href = 'login.html');
  }

function gravarRecado() {
    if(!recado.value || !descricao.value){
        alert('Campos vazios!')
        return
    }

    const id = Math.floor(Math.random() * (1000 - 10) + 10);
    const newRecado = {
        id,
        recado: recado.value,
        descricao: descricao.value
    }

    usuarioLogado.recados.push(newRecado)
    localStorage.setItem("userLogado", JSON.stringify(usuarioLogado))
    // limparRecado()
    imprimirRecados()
}

function limparRecado() {
    
}

function imprimirRecados() {
    let tabela = document.getElementById('table');
    tabela.innerHTML = '';

    for(let i in usuarioLogado.recados) {
        let tr = tabela.insertRow();
    
        let td_id = tr.insertCell();
        let td_recado = tr.insertCell();
        let td_descricao = tr.insertCell();
        let td_acao = tr.insertCell(); 

        td_id.innerHTML= usuarioLogado.recados[i].id;
        td_recado.innerHTML = usuarioLogado.recados[i].recado;
        td_descricao.innerHTML = usuarioLogado.recados[i].descricao;
       
        let btnEditar = document.createElement("button")  
        btnEditar.textContent = 'Editar';
        btnEditar.addEventListener('click', () => editarRecado(usuarioLogado.recados[i]));

        let btnExcluir = document.createElement("button")  
        btnExcluir.textContent = 'Excluir';
        btnExcluir.addEventListener('click', () => deletarRecado(usuarioLogado.recados[i].id));

        td_acao.appendChild(btnEditar)
        td_acao.appendChild(btnExcluir)
        
        tabela.appendChild(tr)


        
    }

}

function editarRecado(msg){
    let recado = prompt("Editar recado:", msg.recado);
    let descricao = prompt("Editar descricao:", msg.descricao);

    const deletarRecados = usuarioLogado.recados.filter((recado) => recado.id !== msg.id);
    usuarioLogado.recados = deletarRecados

    const newRecado = {
        id : msg.id,
        recado: recado,
        descricao: descricao
    }

    usuarioLogado.recados.push(newRecado)
    localStorage.setItem("userLogado", JSON.stringify(usuarioLogado))
    limparRecado()
    imprimirRecados()
}
  
function deletarRecado(id){
    const confirmeRecado = confirm('Tem certeza que deseja apagar?')
    if(!confirmeRecado){
        alert('Isso Ai, não apagou!',id)
        return;
    }
    const deletarRecados = usuarioLogado.recados.filter((recado) => recado.id !== id);
    usuarioLogado.recados = deletarRecados
    localStorage.setItem("userLogado", JSON.stringify(usuarioLogado))
    imprimirRecados();
}


