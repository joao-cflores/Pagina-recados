if(!localStorage.getItem('usuarios')){
    localStorage.setItem('usuarios', JSON.stringify([]));
}

let usuario = document.getElementById('usuario');
let labelUser = document.getElementById('labelUser')
let senhaCadastro = document.getElementById('senhaCadastro');
let labelSenha = document.getElementById('labelSenha')
let senhaConfirmacao = document.getElementById('senhaConfirmacao');
let labelConfirm = document.getElementById('labelConfirm')
let btnCadastro = document.getElementById('btnCadastro')

usuario.addEventListener('keyup', ()=>{
if(usuario.value.length <= 3){
    labelUser.setAttribute('style', 'color: red')
    labelUser.innerHTML = "Usuário *Insira no mínimo 4 caracteres"
}else{
    labelUser.setAttribute('style', 'color: green')
    labelUser.innerHTML = "Usuário"
}})

senhaCadastro.addEventListener('keyup', ()=>{
if(senhaCadastro.value.length <=5){
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = "Senha *Insira no mínimo 6 caracteres"
}else{
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = "Senha"
}})

senhaConfirmacao.addEventListener('keyup', ()=>{
if(senhaCadastro.value != senhaConfirmacao.value){
    labelConfirm.setAttribute('style', 'color: red')
    labelConfirm.innerHTML = "Confirme sua senha *As senhas não conferem"
}else{
    labelConfirm.setAttribute('style', 'color: green')
    labelConfirm.innerHTML = "Confirme sua senha"
}})


btnCadastro.addEventListener('click', cadastrarUsuario)


function cadastrarUsuario(){
let usuarios =JSON.parse(localStorage.getItem('usuarios'));
if(!usuario.value || !senhaCadastro.value){
    alert ('Preencha todos os campos corretamente!')
    return;
}

if(senhaCadastro.value !== senhaConfirmacao.value){
    alert('As senhas não conferem')
    return;
}

const usuarioExistente = usuarios.some((user) => user.usuario === usuario.value) 

if(usuarioExistente){
    alert('Usuário já cadastrado');
    return
}

const idConta = Math.floor(Math.random() * (1000000 - 10)+10)

const criarUsuario = {
    usuario: usuario.value,
    senha: senhaCadastro.value,
    idConta,
    recados: [],
};

 console.log(criarUsuario);

usuarios.push(criarUsuario);

console.log(usuarios);

localStorage.setItem('usuarios', JSON.stringify(usuarios))

resetarCadastro()
setTimeout(()=>{
    alert("usuario cadastrado")
    window.location.href='login.html'
},1500)
}

function resetarCadastro(){
    usuario.value= '';
    senhaCadastro.value = '';
    senhaConfirmacao.value = '';
}