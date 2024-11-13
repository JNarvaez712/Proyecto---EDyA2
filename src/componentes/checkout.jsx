import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import '../checkout.css';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedSeats, selectedCombo, selectedMovie, occupiedSeats } = location.state || {};

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Datos de compra:', formData);

        // Generar el contenido del recibo
        const receiptContent = `
            Nombre: ${formData.name}
            Celular: ${formData.phone}
            Dirección: ${formData.address}
            Película: ${selectedMovie}
            Asientos: ${selectedSeats.join(', ')}
            Combo: ${selectedCombo.name} - ${selectedCombo.description}
            Precio: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(selectedCombo.price)}
        `;

        // Generar el código QR
        const qrCodeDataUrl = await QRCode.toDataURL(receiptContent);

        // Crear el PDF
        const doc = new jsPDF();
        doc.text('Recibo de Compra', 10, 10);
        doc.text(`Nombre: ${formData.name}`, 10, 20);
        doc.text(`Celular: ${formData.phone}`, 10, 30);
        doc.text(`Dirección: ${formData.address}`, 10, 40);
        doc.text(`Película: ${selectedMovie}`, 10, 50);
        doc.text(`Asientos: ${selectedSeats.join(', ')}`, 10, 60);
        doc.text(`Combo: ${selectedCombo.name} - ${selectedCombo.description}`, 10, 70);
        doc.text(`Precio: ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(selectedCombo.price)}`, 10, 80);
        doc.addImage(qrCodeDataUrl, 'PNG', 10, 90, 50, 50);

        const pdfBase64 = doc.output('datauristring').split(',')[1];

        // Enviar el recibo por correo
        await fetch('http://localhost:4000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formData.email,
                receiptContent,
                pdfBase64
            })
        });

        doc.save('recibo.pdf');
        navigate('/');
    };

    const handleBackClick = () => {
        navigate('/purchase', { state: { selectedSeats, selectedCombo, selectedMovie, occupiedSeats } });
    }

    return (
        <div className="checkout-page">
            <div className="back-button-container">
                <button className="back-button" onClick={handleBackClick}>Regresar</button>
            </div>
            <h2>Datos de Compra</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Celular:</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Dirección:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cardNumber">Tarjeta de Crédito/Débito:</label>
                    <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="expiryDate">Fecha de Expiración:</label>
                    <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV:</label>
                    <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
                </div>
                <button type="submit" className="submit-button">Confirmar Compra</button>
            </form>
        </div>
    );
};

export default Checkout;