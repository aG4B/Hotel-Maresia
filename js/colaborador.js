
function carregarReservas() {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const lista = document.getElementById('lista-reservas');

    
    lista.innerHTML = '';

    reservas.forEach((reserva, index) => {
        const li = document.createElement('li');
        li.classList.add('reserva-card'); 
        li.innerHTML = `
            <p><strong>Nome:</strong> ${reserva.nome}</p>
            <p><strong>Quarto:</strong> ${reserva.quarto}</p>
            <p><strong>Quantidade de Hóspedes:</strong> ${reserva.hospede}</p>
            <p><strong>Pet:</strong> ${reserva.aceitaPet === 'sim' ? 'Sim' : 'Não'}</p>
            <p><strong>Data de Check-in:</strong> ${new Date(reserva.checkin).toLocaleString()}</p>
            <p><strong>Data de Check-out:</strong> ${new Date(reserva.checkout).toLocaleString()}</p>
            <p><strong>Email:</strong> ${reserva.email}</p>
            <p><strong>Telefone:</strong> ${reserva.telefone}</p>
            <p><strong>Forma de Pagamento:</strong> ${reserva.formaPagamento}</p>
            <p><strong>Inclusos:</strong> 
                ${reserva.inclusos.cafe ? 'Café da manhã, ' : ''} 
                ${reserva.inclusos.almoco ? 'Almoço, ' : ''} 
                ${reserva.inclusos.jantar ? 'Jantar' : ''}
            </p>
            <div class="buttons">
                <button class="accept" onclick="aceitarReserva(${index})">Aceitar</button>
                <button class="cancel" onclick="recusarReserva(${index})">Recusar</button>
            </div>
        `;
        lista.appendChild(li);
    });
}


function aceitarReserva(index) {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const reserva = reservas[index];

    
    enviarEmail(reserva.email, "Reserva Aceita", `
        Sua reserva foi aceita:
        Nome: ${reserva.nome}
        Quarto: ${reserva.quarto}
        Data de Check-in: ${new Date(reserva.checkin).toLocaleString()}
        Data de Check-out: ${new Date(reserva.checkout).toLocaleString()}
        Forma de Pagamento: ${reserva.formaPagamento}
        Inclusos: 
        ${reserva.inclusos.cafe ? 'Café da manhã, ' : ''} 
        ${reserva.inclusos.almoco ? 'Almoço, ' : ''} 
        ${reserva.inclusos.jantar ? 'Jantar' : ''}
    `);

    
    reservas.splice(index, 1);
    localStorage.setItem('reservas', JSON.stringify(reservas));

    
    alert("Reserva aceita!");

    
    const lista = document.getElementById('lista-reservas');
    lista.innerHTML = ''; 

    const voltarBtn = document.createElement('button');
    voltarBtn.textContent = "Voltar à Tela Inicial";
    voltarBtn.style.padding = "10px 15px";
    voltarBtn.style.border = "none";
    voltarBtn.style.backgroundColor = "#4CAF50";
    voltarBtn.style.color = "white";
    voltarBtn.style.borderRadius = "5px";
    voltarBtn.style.cursor = "pointer";
    voltarBtn.style.marginTop = "20px";

    
    voltarBtn.addEventListener("click", () => {
        window.location.href = "index.html"; 
    });

    lista.appendChild(voltarBtn);
}


function recusarReserva(index) {
    const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
    const reserva = reservas[index];

    
    enviarEmail(reserva.email, "Reserva Recusada", `
        Sua reserva foi recusada:
        Motivo: Não há vagas disponíveis no momento.
    `);

    
    reservas.splice(index, 1);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    alert("Reserva recusada!");
    carregarReservas(); 
}


window.onload = carregarReservas;
