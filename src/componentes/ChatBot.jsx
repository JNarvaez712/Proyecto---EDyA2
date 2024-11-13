import React, { useState } from 'react';
import '../ChatBot.css';

const faqDatabase = [
  { question: "¿Cuál es el horario de las funciones?", answer: "Nuestras funciones son de 12:00 PM a 11:00 PM todos los días." },
  { question: "¿Cómo puedo comprar entradas en línea?", answer: "Puedes comprar entradas en línea visitando nuestra sección de 'Reserva tus Boletas' en el sitio web." },
  { question: "¿Tienen descuentos para estudiantes?", answer: "Sí, ofrecemos un 20% de descuento para estudiantes con identificación válida." },
  { question: "¿Cuál es su política de reembolso?", answer: "Ofrecemos reembolsos completos hasta 2 horas antes del inicio de la función." },
  { question: "¿Tienen opciones de comida sin gluten?", answer: "Sí, tenemos opciones de palomitas y snacks sin gluten disponibles en nuestra confitería." }
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showFaq, setShowFaq] = useState(true);

  const handleSend = (question) => {
    const messageToSend = question || input.trim();
    if (messageToSend) {
      setMessages(prev => [...prev, { role: 'user', content: messageToSend }]);
      setShowFaq(false);

      setTimeout(() => {
        const faqItem = faqDatabase.find(item =>
          item.question.toLowerCase().includes(messageToSend.toLowerCase())
        );

        const response = faqItem ? faqItem.answer : "Lo siento, no tengo información sobre esa pregunta. ¿Puedo ayudarte con algo más?";
        setMessages(prev => [...prev, { role: 'bot', content: response }]);
      }, 500);

      setInput('');
    }
  };

  const handleBack = () => {
    setShowFaq(true);
    setMessages([]);
  };

  return (
    <div className="chat-container">
      {!isOpen && (
        <button 
          className="chat-button"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chat de ayuda"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3 className="chat-title">Chat de Ayuda</h3>
            <button 
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="chat-body">
            {showFaq ? (
              <div className="faq-container">
                <p className="welcome-message">¡Bienvenido al chat de ayuda! ¿En qué puedo ayudarte hoy?</p>
                <p className="faq-title">Preguntas frecuentes:</p>
                {faqDatabase.map((faq, index) => (
                  <button 
                    key={index}
                    className="faq-button"
                    onClick={() => handleSend(faq.question)}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
                    {msg.content}
                  </div>
                ))}
                <button className="back-button" onClick={handleBack}>
                  Volver a preguntas frecuentes
                </button>
              </>
            )}
          </div>
          <div className="chat-footer">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta..."
                className="chat-input"
              />
              <button type="submit" className="send-button" aria-label="Enviar mensaje">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}