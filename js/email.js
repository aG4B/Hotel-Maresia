
(function() {
    emailjs.init('SVoFyU6yL-HgvPUcG');  
})();


function enviarEmail(para, assunto, mensagem) {
    console.log(`Enviando e-mail para ${para}...`);
    console.log(`Assunto: ${assunto}`);
    console.log(`Mensagem: ${mensagem}`);


    emailjs.send("service_d3bbzc6", "template_s2pczc8", {
        to_email: para,           
        subject: assunto,         
        message: mensagem         
    }).then((response) => {
        console.log('E-mail enviado com sucesso', response);
    }, (error) => {
        console.error('Erro ao enviar o e-mail', error);  
        alert("Erro ao enviar o e-mail. Verifique a configuração do EmailJS.");
    });
}
