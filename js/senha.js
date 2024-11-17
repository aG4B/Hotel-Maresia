
document.getElementById("recuperar-senha-form").addEventListener("submit", function(event) {
    event.preventDefault();
    

    var email = document.getElementById("email").value;

    var emailCadastrado = true; 

    if (!emailCadastrado) {
        alert("O e-mail fornecido não está cadastrado.");
        return;
    }


    var novaSenha = document.getElementById("nova-senha").value;
    var confirmarNovaSenha = document.getElementById("confirmar-nova-senha").value;

    if (novaSenha !== confirmarNovaSenha) {
        alert("As senhas não coincidem.");
        return;
    }





    console.log("Nova senha definida:", novaSenha);
    alert("Senha atualizada com sucesso!");
});
