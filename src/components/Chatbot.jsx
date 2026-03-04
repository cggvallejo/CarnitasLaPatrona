import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const Chatbot = () => {
    const { addToCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "¡Hola! Soy el Patrón-Bot 🤠. ¿Qué se te antoja hoy?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [currentOrder, setCurrentOrder] = useState({ products: [], location: '', paymentMethod: '' });
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = inputValue;
        setInputValue('');

        // Lógica de respuesta del bot
        setTimeout(() => {
            processBotResponse(currentInput);
        }, 600);
    };

    const addBotMessage = (text) => {
        setMessages(prev => [...prev, { id: Date.now(), text, sender: 'bot' }]);
    };

    const processBotResponse = async (inputText) => {
        try {
            // Preparar historial para Gemini (debe empezar con 'user')
            // Omitimos el primer mensaje de bienvenida del bot para cumplir la regla de Gemini
            const history = messages.slice(1).map(m => ({
                role: m.sender === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }]
            }));

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${apiUrl}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: inputText, history })
            });

            const data = await response.json();
            let botText = data.text;

            // Detectar si hay un resumen de pedido en el mensaje
            if (botText.includes('[ORDER_SUMMARY]')) {
                const parts = botText.split('[ORDER_SUMMARY]');
                const jsonPart = parts[1].split('[/ORDER_SUMMARY]')[0];
                botText = parts[0] + (parts[1].split('[/ORDER_SUMMARY]')[1] || '');

                try {
                    const orderData = JSON.parse(jsonPart);
                    setCurrentOrder(orderData);

                    // Sincronizar con el carrito global si hay productos
                    if (orderData.products && orderData.products.length > 0) {
                        orderData.products.forEach(p => {
                            const productBase = products.find(prod => prod.name.toLowerCase().includes(p.name.toLowerCase()));
                            if (productBase) {
                                for (let i = 0; i < p.quantity; i++) addToCart(productBase);
                            }
                        });
                    }

                    // Si el mensaje indica confirmación definitiva, disparamos WhatsApp
                    if (botText.toLowerCase().includes('enviado') || botText.toLowerCase().includes('cocina')) {
                        setTimeout(() => {
                            handleWhatsAppClick();
                            setCurrentOrder({ products: [], location: '', paymentMethod: '' });
                        }, 2000);
                    }
                } catch (e) {
                    console.error("Error al parsear el resumen del pedido:", e);
                }
            }

            addBotMessage(botText.trim());
        } catch (error) {
            console.error("Error en Patrón-Bot:", error);
            addBotMessage("¡Híjole! Tuve un problema al procesar tu mensaje. ¿Me lo repites? 🤠");
        }
    };

    const handleWhatsAppClick = () => {
        const phone = "523312345678"; // Número de ejemplo
        const total = currentOrder.products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
        const itemsList = currentOrder.products.map(p => `- ${p.quantity}x ${p.name}`).join('\n');

        const message = `¡Hola Patrón! Vengo del nuevo Chatbot con IA 🤠. Aquí está mi pedido:\n\n` +
            `*Detalle del Pedido:*\n${itemsList}\n\n` +
            `*Total:* $${total.toFixed(2)}\n\n` +
            `*Dirección de Entrega:* ${currentOrder.location}\n` +
            `*Método de Pago:* ${currentOrder.paymentMethod}\n\n` +
            `¡Espero mis carnitas con ansias! 🌮✨`;

        const encodedLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(encodedLink, '_blank');
    };

    return (
        <div style={styles.chatWrapper}>
            {/* Botón Flotante */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    ...styles.launcher,
                    animation: !isOpen ? 'pulse-soft 2s infinite' : 'none'
                }}
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {/* Ventana de Chat */}
            {isOpen && (
                <div style={styles.window} className="animate-pop">
                    <div style={styles.header}>
                        <div style={styles.botInfo}>
                            <span style={styles.botAvatar}>🤠</span>
                            <div>
                                <h4 style={styles.botName}>Patrón-Bot</h4>
                                <small style={styles.botStatus}>En línea</small>
                            </div>
                        </div>
                    </div>

                    <div style={styles.messages} ref={scrollRef}>
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                style={{
                                    ...styles.messageRow,
                                    justifyContent: msg.sender === 'bot' ? 'flex-start' : 'flex-end'
                                }}
                            >
                                <div style={{
                                    ...styles.messageBubble,
                                    backgroundColor: msg.sender === 'bot' ? '#f0f0f0' : 'var(--primary)',
                                    color: msg.sender === 'bot' ? '#333' : 'white',
                                    borderRadius: msg.sender === 'bot' ? '0 15px 15px 15px' : '15px 15px 0 15px'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={styles.inputArea}>
                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            style={styles.input}
                        />
                        <button onClick={handleSend} style={styles.sendBtn}>➤</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    chatWrapper: {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        fontFamily: 'Outfit, sans-serif',
    },
    launcher: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary)',
        color: 'white',
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
        border: 'none',
        cursor: 'pointer',
    },
    window: {
        position: 'absolute',
        bottom: '80px',
        right: '0',
        width: '320px',
        height: '450px',
        backgroundColor: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    header: {
        padding: '1.2rem',
        backgroundColor: 'var(--primary)',
        color: 'white',
    },
    botInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
    },
    botAvatar: {
        fontSize: '1.8rem',
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: '45px',
        height: '45px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
    },
    botName: {
        margin: 0,
        fontSize: '1rem',
    },
    botStatus: {
        opacity: 0.8,
        fontSize: '0.75rem',
    },
    messages: {
        flex: 1,
        padding: '1rem',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        backgroundColor: '#f9f9f9',
    },
    messageRow: {
        display: 'flex',
        width: '100%',
    },
    messageBubble: {
        maxWidth: '80%',
        padding: '0.8rem 1rem',
        fontSize: '0.9rem',
        lineHeight: '1.4',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    inputArea: {
        padding: '1rem',
        borderTop: '1px solid #eee',
        display: 'flex',
        gap: '0.5rem',
    },
    input: {
        flex: 1,
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
        outline: 'none',
    },
    sendBtn: {
        backgroundColor: 'var(--primary)',
        color: 'white',
        width: '35px',
        height: '35px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
    }
};

export default Chatbot;
