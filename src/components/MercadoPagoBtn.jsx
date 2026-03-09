import React, { useEffect, useRef, useId } from 'react';

const MercadoPagoBtn = ({ amount, onPaymentReady }) => {
    const rawId = useId();
    const containerId = `paymentBrick_container_${rawId.replace(/:/g, '')}`;
    const controllerRef = useRef(null);
    const mpRef = useRef(null);

    useEffect(() => {
        if (!window.MercadoPago) return;
        let isMounted = true;

        const mp = new window.MercadoPago('APP_USR-39ce3633-4cdc-40c3-a549-b642b90740bd', {
            locale: 'es-MX'
        });
        mpRef.current = mp;

        const bricksBuilder = mp.bricks();

        const renderPaymentBrick = async (bricksBuilder) => {
            const container = document.getElementById(containerId);
            if (container) {
                // Limpieza física total
                container.innerHTML = `<div id="${containerId}_loading_msg"></div>`;
                const loadingMsg = document.getElementById(`${containerId}_loading_msg`);
                if (loadingMsg) {
                    loadingMsg.innerHTML = '<p style="text-align:center;padding-top:2rem;color:#666;">Cargando módulo de pago seguro...</p>';
                }
            }

            try {
                const settings = {
                    initialization: {
                        amount: amount,
                    },
                    customization: {
                        paymentMethods: {
                            creditCard: "all",
                            debitCard: "all",
                        },
                    },
                    callbacks: {
                        onReady: () => {
                            const loadingElement = document.getElementById(`${containerId}_loading_msg`);
                            if (loadingElement) loadingElement.style.display = 'none';
                        },
                        onSubmit: ({ selectedPaymentMethod, formData }) => {
                            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                            return new Promise((resolve, reject) => {
                                fetch(`${apiUrl}/process_payment`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ formData }),
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.status === 'approved') {
                                            alert("✅ ¡Pago APROBADO! ID: " + data.id);
                                            resolve();
                                        } else {
                                            alert("⚠️ Estado del pago: " + data.status);
                                            resolve();
                                        }
                                    })
                                    .catch(error => {
                                        alert("❌ Error de comunicación.");
                                        reject();
                                    });
                            });
                        },
                        onError: (error) => {
                            console.error("MP Error:", error);
                        },
                    },
                };

                const controller = await bricksBuilder.create(
                    'payment',
                    containerId,
                    settings
                );

                if (!isMounted) {
                    controller.unmount();
                    return;
                }
                controllerRef.current = controller;
            } catch (e) {
                console.error("Failed to render MP Brick", e);
            }
        };

        renderPaymentBrick(bricksBuilder);

        return () => {
            isMounted = false;
            if (controllerRef.current) {
                // El método unmount() es la forma correcta de limpiar el Brick
                if (typeof controllerRef.current.unmount === 'function') {
                    controllerRef.current.unmount();
                }
                controllerRef.current = null;
            }
        };
    }, [amount]);

    return (
        <div style={styles.container}>
            <div id={containerId}>
                <div id={`${containerId}_loading_msg`} style={styles.loadingMsg}>
                    <p>Cargando módulo de pago seguro...</p>
                    <small style={styles.note}>Nota: Requiere una Public Key válida de Mercado Pago para renderizar el formulario completo.</small>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginTop: '2rem',
        padding: '3rem',
        backgroundColor: 'rgba(232, 208, 159, 0.05)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        minHeight: '500px',
        border: '1px solid rgba(232, 208, 159, 0.15)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    },
    loadingMsg: {
        textAlign: 'center',
        paddingTop: '5rem',
        color: 'var(--accent)',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '1.2rem',
    },
    note: {
        display: 'block',
        marginTop: '2rem',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        opacity: 0.8,
        letterSpacing: '0.05em'
    }
}

export default MercadoPagoBtn;
