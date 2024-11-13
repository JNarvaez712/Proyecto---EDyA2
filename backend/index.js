const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

// Crear Express App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Aumentar el límite de tamaño del cuerpo de la solicitud
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // Aumentar el límite para datos URL encoded

// Configurar Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    ok: true
  });
});

// Ruta para enviar el recibo por correo
app.post('/send-email', (req, res) => {
  const { email, receiptContent, pdfBase64 } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Recibo de compra',
    text: receiptContent,
    attachments: [
      {
        filename: 'recibo.pdf',
        content: pdfBase64,
        encoding: 'base64'
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).send(error.toString());
    }
    console.log('Correo enviado:', info.response);
    res.status(200).send('Email enviado: ' + info.response);
  });
});

// Escuchar en puerto 4000
app.listen(4000, () => {
  console.log('Servidor corriendo en puerto', 4000);
});