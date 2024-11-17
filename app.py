from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)


app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'hotelmaresia@gmail.com'
app.config['MAIL_PASSWORD'] = 'H0t3lM4r3s1A@#@'
app.config['MAIL_DEFAULT_SENDER'] = app.config['MAIL_USERNAME']

mail = Mail(app)

def calcular_custo(quarto, checkin, checkout):
    
    precos = {
        "Quarto Simples": 300,
        "Quarto Duplo": 450,
        "Quarto de Luxo": 800
    }
    
    formato_data = '%d/%m/%Y, %H:%M:%S'
    
    
    checkin_date = datetime.strptime(checkin, formato_data)
    checkout_date = datetime.strptime(checkout, formato_data)
    dias = (checkout_date - checkin_date).days

    
    preco_diaria = precos.get(quarto, 0)
    custo_total = dias * preco_diaria
    return custo_total

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.json
        print("Dados recebidos:", data)

        nome = data['nome']
        email = data['email']
        assunto = data['assunto']
        quarto = data['quarto']
        checkin = data['checkin']
        checkout = data['checkout']
        inclusoes = data.get('inclusoes', 'Café da manhã')
        metodo_pagamento = data.get('metodo_pagamento', 'Dinheiro')
        status = 'aceita' if assunto.lower() == 'reserva aceita' else 'recusada'

        
        custo = calcular_custo(quarto, checkin, checkout)

        
        mensagem = f"""
        Olá {nome}, tudo bem?

        Agradecemos sua reserva!

        Sua reserva foi {status} pela nossa equipe!

        Estamos enviando os dados da sua reserva:
        - Seu quarto é o: {quarto}
        - Em nome de: {nome}
        - Data de check-in: {checkin}
        - Data de check-out: {checkout}
        - Está incluído: {inclusoes}

        Seu custo provisionado da reserva foi de: R$ {custo:.2f}, podendo ter novas cobranças!

        Lembrete importante: seu método de pagamento foi {metodo_pagamento}, que deve ser realizado no check-in assim que chegar ao nosso hotel!

        A equipe do Hotel Maresia te aguarda e agradece a preferência!
        """

        
        msg = Message(assunto, recipients=[email])
        msg.body = mensagem

        mail.send(msg)
        print("E-mail enviado com sucesso!")
        return jsonify({'message': 'E-mail enviado com sucesso!'}), 200

    except Exception as e:
        print(f"Erro ao enviar o e-mail: {str(e)}")
        return jsonify({'error': f"Erro ao enviar o e-mail: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
