import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const Chatbot = () => {
    const { addToCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, role: 'bot', text: "¡Qué onda! Soy el Patrón-Bot 🤠. ¿En qué te ayudo hoy? Tenemos tacos, carnitas por kilo y bebidas bien frías." }
    ]);
    const [inputValue, setInputValue] = useState('');
    const scrollRef = useRef(null);

    const quickReplies = [
        "🌮 Ver Tacos",
        "🥩 Pedir por Kilo",
        "🥤 Bebidas",
        "✅ Confirmar Pedido"
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async (textOverride = null) => {
        const textToSend = typeof textOverride === 'string' ? textOverride : inputValue;
        if (!textToSend.trim() || isLoading) return;

        const userMsg = { id: Date.now(), role: 'user', text: textToSend.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

            const payload = {
                history: messages.map(m => ({ role: m.role, text: m.text })),
                message: textToSend.trim()
            };

            const response = await fetch(`${apiUrl}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || data.error || 'Server error');
            }

            let botResponseText = data.text;

            // Extract ORDER_SUMMARY if present
            const orderMatch = botResponseText.match(/\[ORDER_SUMMARY\](.*?)\[\/ORDER_SUMMARY\]/s);
            if (orderMatch) {
                const jsonStr = orderMatch[1];
                botResponseText = botResponseText.replace(orderMatch[0], '').trim();

                try {
                    const orderData = JSON.parse(jsonStr);
                    if (orderData.products && orderData.products.length > 0) {
                        orderData.products.forEach(p => {
                            const productBase = products.find(prod => prod.name.toLowerCase().includes(p.name.toLowerCase()));
                            if (productBase) {
                                for (let i = 0; i < p.quantity; i++) addToCart(productBase);
                            }
                        });
                    }

                    const phone = "523312345678";
                    const total = orderData.products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
                    const itemsList = orderData.products.map(p => `- ${p.quantity}x ${p.name}`).join('\n');
                    const wpMsg = `¡Hola Patrón! Vengo del Asistente Virtual 🤠. Mi pedido confirmado es:\n\n${itemsList}\n\n*Total:* $${total}\n*Dirección:* ${orderData.location}\n*Pago:* ${orderData.paymentMethod}\n\n¡Gracias!`;

                    setTimeout(() => {
                        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(wpMsg)}`, '_blank');
                    }, 2000);

                } catch (e) {
                    console.error("Error parsing order summary:", e);
                }
            }

            setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: botResponseText || "¡Entendido!" }]);

        } catch (error) {
            console.error("Chatbot Error:", error);
            setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: "Híjole, hubo un problemita técnico con la red 📡. ¿Me repites tu mensaje por favor? 🤠" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.chatWrapper}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    ...styles.launcher,
                    animation: !isOpen ? 'pulse-soft 2s infinite' : 'none'
                }}
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {isOpen && (
                <div style={styles.window} className="animate-pop">
                    <div style={styles.header}>
                        <div style={styles.botInfo}>
                            <span style={styles.botAvatar}>🤠</span>
                            <div>
                                <h4 style={styles.botName}>Patrón-Bot (Nuevo)</h4>
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
                                    justifyContent: msg.role === 'bot' ? 'flex-start' : 'flex-end'
                                }}
                            >
                                <div style={{
                                    ...styles.messageBubble,
                                    backgroundColor: msg.role === 'bot' ? '#f0f0f0' : 'var(--primary)',
                                    color: msg.role === 'bot' ? '#333' : 'white',
                                    borderRadius: msg.role === 'bot' ? '0 15px 15px 15px' : '15px 15px 0 15px'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div style={{ ...styles.messageRow, justifyContent: 'flex-start' }}>
                                <div style={{ ...styles.messageBubble, backgroundColor: '#f0f0f0', color: '#666', fontStyle: 'italic', borderRadius: '0 15px 15px 15px' }}>
                                    Escribiendo...
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={styles.quickRepliesContainer}>
                        {quickReplies.map((reply, idx) => (
                            <button
                                key={idx}
                                style={styles.quickReplyBtn}
                                onClick={() => handleSend(reply)}
                                disabled={isLoading}
                            >
                                {reply}
                            </button>
                        ))}
                    </div>

                    <div style={styles.inputArea}>
                        <input
                            type="text"
                            placeholder="Escribe tu mensaje aquí..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            style={styles.input}
                            disabled={isLoading}
                        />
                        <button onClick={() => handleSend()} style={styles.sendBtn} disabled={isLoading}>➤</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    chatWrapper: { position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, fontFamily: 'Outfit, sans-serif' },
    launcher: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.2)', border: 'none', cursor: 'pointer' },
    window: { position: 'absolute', bottom: '80px', right: '0', width: '340px', height: '500px', backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    header: { padding: '1rem', backgroundColor: 'var(--primary)', color: 'white' },
    botInfo: { display: 'flex', alignItems: 'center', gap: '0.8rem' },
    botAvatar: { fontSize: '1.8rem', backgroundColor: 'rgba(255,255,255,0.2)', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' },
    botName: { margin: 0, fontSize: '1.1rem', fontWeight: 'bold' },
    botStatus: { opacity: 0.9, fontSize: '0.8rem' },
    messages: { flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', backgroundColor: '#fdfdfd' },
    messageRow: { display: 'flex', width: '100%' },
    messageBubble: { maxWidth: '85%', padding: '0.8rem 1rem', fontSize: '0.95rem', lineHeight: '1.4', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
    inputArea: { padding: '0.8rem', borderTop: '1px solid #eee', display: 'flex', gap: '0.5rem', backgroundColor: '#fff' },
    input: { flex: 1, border: '1px solid #ddd', borderRadius: '20px', padding: '0.6rem 1rem', fontSize: '0.95rem', outline: 'none' },
    sendBtn: { backgroundColor: 'var(--primary)', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', border: 'none', cursor: 'pointer' },
    quickRepliesContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem', padding: '0.6rem', backgroundColor: '#fafafa', borderTop: '1px solid #eee' },
    quickReplyBtn: { backgroundColor: '#fdeee8', color: 'var(--primary)', border: '1px solid rgba(230, 81, 0, 0.3)', borderRadius: '15px', padding: '0.4rem 0.8rem', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', fontWeight: '500' }
};

export default Chatbot;
