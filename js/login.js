
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();


    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;





    if (email === "usuario@email.com" && password === "senha123") {

        window.location.href = "./reserva.html";
    } else {

        alert("E-mail ou senha incorretos. Por favor, tente novamente.");
    }
});
