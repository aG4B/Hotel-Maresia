
document.getElementById("reserva-form").addEventListener("submit", function(event) {
    event.preventDefault();


    var checkInDate = document.getElementById("check-in-date").value;
    var checkOutDate = document.getElementById("check-out-date").value;
    var numRooms = document.getElementById("num-rooms").value;
    var roomType = document.getElementById("room-type").value;





    console.log("Data de check-in:", checkInDate);
    console.log("Data de check-out:", checkOutDate);
    console.log("Número de quartos:", numRooms);
    console.log("Tipo de quarto:", roomType);


    alert("Sua reserva foi recebida com sucesso! Entraremos em contato em breve para confirmar os detalhes.");
});
