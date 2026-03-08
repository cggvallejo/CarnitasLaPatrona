import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import MercadoPagoBtn from './MercadoPagoBtn';
import { CreditCard, Banknote, TabletSmartphone, Trash2, ShoppingCart, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar = () => {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        updateQuantity,
        removeFromCart,
        cartTotal
    } = useCart();

    const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'delivery', 'selection', 'mercadopago'
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [deliveryMode, setDeliveryMode] = useState('local'); // 'local' or 'delivery'
    const [deliveryAddress, setDeliveryAddress] = useState('');

    const handleWhatsAppCheckout = (methodOverride = null) => {
        const method = methodOverride || paymentMethod || 'WhatsApp';
        const methodText = method === 'cash' ? 'Pago en Efectivo' : method === 'terminal' ? 'Pago con Terminal' : 'Pedido de WhatsApp';

        const locText = deliveryMode === 'delivery' ? `Envío a: ${deliveryAddress}` : 'Para recoger en sucursal';

        const phone = "523312345678"; // Reemplazo a número simulado
        const itemsList = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
        const text = encodeURIComponent(`¡Hola Patrón!\nMe gustaría hacer un pedido:\n\n${itemsList}\n\nTotal: $${cartTotal.toFixed(2)}\nMetodo de Pago: ${methodText}\nUbicación: ${locText}\n\nMuchas gracias.`);
        window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
    };

    const handleLocationRequest = () => {
        if (!navigator.geolocation) {
            alert("Tu dispositivo no soporta geolocalización. Por favor, escribe tu dirección manualmente.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
                setDeliveryAddress(mapsLink);
            },
            (error) => {
                alert("No pudimos acceder a tu ubicación o denegaste el permiso. Escribe tu dirección manualmente.");
            },
            { enableHighAccuracy: true }
        );
    };

    const renderCheckoutContent = () => {
        if (cart.length === 0) {
            return <div style={styles.emptyMsg}>Tu carrito está vacío</div>;
        }

        switch (checkoutStep) {
            case 'cart':
                return (
                    <>
                        {cart.map((item) => (
                            <div key={item.id} style={styles.item}>
                                <img src={item.image} alt={item.name} style={styles.itemImage} />
                                <div style={styles.itemInfo}>
                                    <h4 style={styles.itemName}>{item.name}</h4>
                                    <span style={styles.itemPrice}>${item.price.toFixed(2)}</span>
                                    <div style={styles.qtyControls}>
                                        <button onClick={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>-</button>
                                        <span style={{ color: 'var(--accent)' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>+</button>
                                        <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                );
            case 'delivery':
                return (
                    <div style={styles.selectionView}>
                        <h4 style={styles.sectionTitle}>Método de Entrega</h4>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                            <button
                                onClick={() => setDeliveryMode('local')}
                                style={{
                                    ...styles.deliveryToggleBtn,
                                    borderColor: deliveryMode === 'local' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                                    color: deliveryMode === 'local' ? 'var(--accent)' : 'var(--text-muted)'
                                }}
                            >
                                Recoger Local
                            </button>
                            <button
                                onClick={() => setDeliveryMode('delivery')}
                                style={{
                                    ...styles.deliveryToggleBtn,
                                    borderColor: deliveryMode === 'delivery' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)',
                                    color: deliveryMode === 'delivery' ? 'var(--accent)' : 'var(--text-muted)'
                                }}
                            >
                                A Domicilio
                            </button>
                        </div>

                        {deliveryMode === 'delivery' && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <input
                                    type="text"
                                    placeholder="Tu dirección completa..."
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    style={styles.deliveryInput}
                                />
                                <button onClick={handleLocationRequest} style={{ ...styles.locationBtn, marginTop: '1rem' }}>
                                    <MapPin size={16} /> USAR MI UBICACIÓN
                                </button>
                            </motion.div>
                        )}

                        <button
                            style={{ ...styles.primaryBtn, marginTop: '2rem' }}
                            onClick={() => setCheckoutStep('selection')}
                        >
                            CONTINUAR
                        </button>
                    </div>
                );
            case 'selection':
                return (
                    <div style={styles.selectionView}>
                        <h4 style={styles.sectionTitle}>Método de Pago</h4>
                        <button style={styles.methodOption} onClick={() => handleWhatsAppCheckout('cash')}>
                            <Banknote size={24} />
                            <div style={styles.methodDetails}>
                                <span>EFECTIVO</span>
                                <span style={styles.methodDetailsSmall}>Paga al recibir / recoger</span>
                            </div>
                        </button>
                        <button style={styles.methodOption} onClick={() => handleWhatsAppCheckout('terminal')}>
                            <CreditCard size={24} />
                            <div style={styles.methodDetails}>
                                <span>TARJETA (TERMINAL)</span>
                                <span style={styles.methodDetailsSmall}>Solo entregas locales / recoger</span>
                            </div>
                        </button>
                        <button
                            style={{ ...styles.methodOption, borderColor: 'var(--primary)' }}
                            onClick={() => setCheckoutStep('mercadopago')}
                        >
                            <TabletSmartphone size={24} color="var(--primary)" />
                            <div style={styles.methodDetails}>
                                <span>PAGO ONLINE</span>
                                <span style={styles.methodDetailsSmall}>Mercado Pago (Tarjeta/Transferencia)</span>
                            </div>
                        </button>
                    </div>
                );
            case 'mercadopago':
                return (
                    <div style={styles.selectionView}>
                        <h4 style={styles.sectionTitle}>Finalizar Pago Online</h4>
                        <div style={{ padding: '2rem', textAlign: 'center' }}>
                            <MercadoPagoBtn cart={cart} total={cartTotal} />
                            <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                                Serás redirigido a una plataforma segura de pago.
                            </p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.overlay}
                        onClick={() => {
                            setIsCartOpen(false);
                            setCheckoutStep('cart');
                        }}
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={styles.sidebar}
                    >
                        <div style={styles.header}>
                            <h3 style={styles.headerTitle}>
                                {checkoutStep === 'mercadopago' ? 'PAGO SEGURO' :
                                    checkoutStep === 'selection' ? 'SELECCIONAR PAGO' :
                                        checkoutStep === 'delivery' ? 'DETALLES DE ENTREGA' : 'TU CARRITO'}
                            </h3>
                            <button onClick={() => {
                                setIsCartOpen(false);
                                setCheckoutStep('cart');
                            }} style={styles.closeBtn}><X size={24} /></button>
                        </div>

                        <div style={styles.itemsList}>
                            {renderCheckoutContent()}
                        </div>

                        {cart.length > 0 && checkoutStep === 'cart' && (
                            <div style={styles.checkout}>
                                <div style={styles.totalRow}>
                                    <span style={{ color: 'var(--text-muted)', letterSpacing: '0.2em', fontSize: '0.8rem' }}>TOTAL</span>
                                    <span style={styles.totalAmount}>${cartTotal.toFixed(2)}</span>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={styles.primaryBtn}
                                    onClick={() => setCheckoutStep('delivery')}
                                >
                                    PROCEDER AL PAGO
                                </motion.button>
                            </div>
                        )}

                        {checkoutStep !== 'cart' && (
                            <div style={styles.backContainer}>
                                <button
                                    onClick={() => {
                                        if (checkoutStep === 'mercadopago') setCheckoutStep('selection');
                                        else if (checkoutStep === 'selection') setCheckoutStep('delivery');
                                        else setCheckoutStep('cart');
                                    }}
                                    style={styles.backBtn}
                                >
                                    ← VOLVER
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 998,
        backdropFilter: 'blur(20px)',
    },
    sidebar: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '450px',
        backgroundColor: 'var(--bg-color)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        borderLeft: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '3rem',
    },
    header: {
        paddingBottom: '3rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    headerTitle: {
        fontSize: '1.4rem',
        fontFamily: 'var(--font-serif)',
        color: 'var(--accent)',
        fontWeight: 400,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--accent)',
        cursor: 'pointer',
        padding: '0.5rem',
        display: 'flex',
        alignItems: 'center',
    },
    itemsList: {
        flex: 1,
        overflowY: 'auto',
        padding: '2rem 0',
    },
    emptyMsg: {
        textAlign: 'center',
        paddingTop: '6rem',
        color: 'var(--text-muted)',
        fontSize: '1rem',
        fontWeight: 300,
    },
    item: {
        display: 'flex',
        gap: '2rem',
        padding: '2rem 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
    },
    itemImage: {
        width: '80px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '1.5rem',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: '1rem',
        color: 'var(--accent)',
        marginBottom: '0.4rem',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
    itemPrice: {
        fontSize: '0.9rem',
        color: 'var(--primary)',
        fontWeight: 600,
    },
    qtyControls: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        marginTop: '1.2rem',
    },
    qtyBtn: {
        width: '24px',
        height: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'none',
        color: 'var(--accent)',
        cursor: 'pointer',
        fontSize: '0.8rem',
    },
    removeBtn: {
        background: 'none',
        border: 'none',
        color: 'rgba(255, 255, 255, 0.3)',
        padding: '0.5rem',
        cursor: 'pointer',
    },
    checkout: {
        paddingTop: '3rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    },
    totalRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
    },
    totalAmount: {
        fontSize: '1.6rem',
        color: 'var(--accent)',
        fontFamily: 'var(--font-serif)',
        fontWeight: 400,
    },
    primaryBtn: {
        width: '100%',
        padding: '1.4rem',
        backgroundColor: 'var(--accent)',
        color: 'var(--bg-color)',
        fontWeight: 700,
        fontSize: '0.85rem',
        letterSpacing: '0.2em',
        cursor: 'pointer',
        border: 'none',
        textTransform: 'uppercase',
    },
    backContainer: {
        paddingTop: '2rem',
    },
    backBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        letterSpacing: '0.2em',
        cursor: 'pointer',
        textTransform: 'uppercase',
    },
    selectionView: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    sectionTitle: {
        fontSize: '1rem',
        color: 'var(--accent)',
        marginBottom: '2rem',
        textAlign: 'center',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontWeight: 500,
    },
    methodOption: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        color: 'var(--accent)',
        transition: 'var(--transition)',
    },
    methodDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
    },
    methodDetailsSmall: {
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
    },
    deliveryToggleBtn: {
        flex: 1,
        padding: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'transparent',
        color: 'var(--text-muted)',
        cursor: 'pointer',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    },
    deliveryInput: {
        width: '100%',
        padding: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'transparent',
        color: 'var(--accent)',
        fontSize: '0.9rem',
        outline: 'none',
        fontFamily: 'var(--font-sans)',
    },
    locationBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        backgroundColor: 'transparent',
        color: 'var(--primary)',
        border: '1px solid var(--primary)',
        padding: '1rem',
        fontSize: '0.8rem',
        fontWeight: 600,
        cursor: 'pointer',
        textTransform: 'uppercase',
    }
};

export default CartSidebar;
