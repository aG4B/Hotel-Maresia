
function verificarCadastroAnterior() {
    return localStorage.getItem('cadastroRealizado') === 'true';
}


function marcarCadastroRealizado() {
    localStorage.setItem('cadastroRealizado', 'true');
}


function exibirAvisoCadastro() {
    document.getElementById('aviso-cadastro').style.display = 'block';
}


if (verificarCadastroAnterior()) {
    exibirAvisoCadastro();
}


function validarCadastro() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("confirmar-senha").value;

    if (nome === "" || email === "" || senha === "" || confirmarSenha === "") {
        mostrarAlerta("Por favor, preencha todos os campos.");
        return false;
    }

    if (senha !== confirmarSenha) {
        mostrarAlerta("As senhas não coincidem.");
        return false;
    }



    return true;
}


document.getElementById("cadastro-form").addEventListener("submit", function(event) {

    if (!validarCadastro()) {
        event.preventDefault();
    } else {

        marcarCadastroRealizado();
    }
});


document.getElementById("voltar-inicio").addEventListener("click", function() {
    window.location.href = "./index.html"; 
});
