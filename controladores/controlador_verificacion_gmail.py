import smtplib
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Diccionario temporal para guardar códigos {email: codigo}
codigos_verificacion = {}

def enviar_codigo_verificacion(destinatario_email):
    smtp_server = 'smtp.gmail.com'
    smtp_port = 587
    remitente_email = 'no.reply.456.jbctextil@gmail.com'  # Cambia por tu correo
    app_password = 'oxkr dmof bmia glcs'  # Cambia por tu contraseña de aplicación

    codigo = str(random.randint(100000, 999999))
    codigos_verificacion[destinatario_email] = codigo

    mensaje = MIMEMultipart()
    mensaje['From'] = remitente_email
    mensaje['To'] = destinatario_email
    mensaje['Subject'] = 'Código de verificación para tu registro'

    # Cuerpo HTML profesional
    cuerpo_html = f"""
    <html>
    <head>
      <style>
        .container {{
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 10px;
          color: #333;
        }}
        .header {{
          font-size: 20px;
          font-weight: bold;
          color: #4a90e2;
          margin-bottom: 10px;
        }}
        .codigo {{
          font-size: 28px;
          font-weight: bold;
          color: #222;
          background-color: #e1e8f7;
          padding: 10px 20px;
          border-radius: 8px;
          display: inline-block;
          letter-spacing: 6px;
          margin: 20px 0;
        }}
        .footer {{
          font-size: 12px;
          color: #999;
          margin-top: 30px;
        }}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">Código de Verificación</div>
        <p>Gracias por registrarte en nuestra plataforma.</p>
        <p>Tu código de verificación es:</p>
        <div class="codigo">{codigo}</div>
        <p>Por favor, no compartas este código con nadie.</p>
        <div class="footer">Si no solicitaste este correo, ignóralo.</div>
      </div>
    </body>
    </html>
    """

    mensaje.attach(MIMEText(cuerpo_html, 'html'))

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(remitente_email, app_password)
        server.sendmail(remitente_email, destinatario_email, mensaje.as_string())
        server.quit()
        print(f'Código enviado a {destinatario_email}')
        return True
    except Exception as e:
        print(f'Error al enviar correo: {e}')
        return False

def validar_codigo(email, codigo_ingresado):
    codigo_real = codigos_verificacion.get(email)
    if codigo_real and codigo_real == codigo_ingresado:
        # Puedes eliminar el código tras validar para mayor seguridad
        del codigos_verificacion[email]
        return True
    return False
