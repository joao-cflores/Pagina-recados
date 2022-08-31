
let usuarioLogin = document.getElementById('usuarioLogin');
let labelUser = document.getElementById('labelUser')
let senhaLogin = document.getElementById('senhaLogin');
let labelSenha = document.getElementById('labelSenha')
const btnEntrar = document.getElementById('btnEntrar')
let listUsuarios = []


listUsuarios = JSON.parse(localStorage.getItem('usuarios'))


btnEntrar.addEventListener('click', (event) => {
    event.preventDefault();
    logar();
})

function logar(){

if(!usuarioLogin.value && !senhaLogin.value){
    labelUser.setAttribute('style', 'color: red')
    usuarioLogin.setAttribute('style', 'color: red')
    labelSenha.setAttribute('style', 'color: red')
    senhaLogin.setAttribute('style', 'color: red')
    alert("Usuário ou senha estão vazios! Confira se você está cadastrado.")

} else {
    const item = listUsuarios.find((value) => value.usuario === usuarioLogin.value && value.senha === senhaLogin.value)
    
    if (item===undefined){
        labelUser.setAttribute('style', 'color: red')
        usuarioLogin.setAttribute('style', 'color: red')
        labelSenha.setAttribute('style', 'color: red')
        senhaLogin.setAttribute('style', 'color: red')
        alert('Usuário não encontrado! Cadastre-se')
        return
    }
    const usuarioValido = {
        idConta: item.idConta,
        usuario: item.usuario,
        recados: item.recados,
    }
    
    localStorage.setItem('userLogado', JSON.stringify(usuarioValido))
    window.location.href = 'home.html'
    
}

}