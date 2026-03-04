import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import porkbotImg from '../assets/images/porkbot.png';

const PorkbotPeeker = () => {
    const [isPeeking, setIsPeeking] = useState(false);
    const [peekPosition, setPeekPosition] = useState('bottom-left');

    const positions = [
        'bottom-left',
        'bottom-right',
        'left-center',
        'right-center'
    ];

    useEffect(() => {
        // Intervalo aleatorio para asomarse (entre 10 y 25 segundos)
        const triggerPeek = () => {
            const nextPeekTime = Math.random() * 15000 + 10000;

            setTimeout(() => {
                // Seleccionar posición aleatoria
                const randomPos = positions[Math.floor(Math.random() * positions.length)];
                setPeekPosition(randomPos);
                setIsPeeking(true);

                // Ocultar después de 4 segundos
                setTimeout(() => {
                    setIsPeeking(false);
                    triggerPeek(); // Programar el siguiente
                }, 4000);

            }, nextPeekTime);
        };

        // Iniciar el ciclo inicial con un pequeño retraso
        setTimeout(triggerPeek, 5000);

        return () => { }; // Cleanup básico
    }, []);

    const getInitialAnimation = () => {
        switch (peekPosition) {
            case 'bottom-left': return { x: -100, y: 100, rotate: -45 };
            case 'bottom-right': return { x: 100, y: 100, rotate: 45 };
            case 'left-center': return { x: -100, y: 0, rotate: 90 };
            case 'right-center': return { x: 100, y: 0, rotate: -90 };
            default: return { x: 0, y: 100 };
        }
    };

    const getAnimate = () => {
        switch (peekPosition) {
            case 'bottom-left': return { x: -10, y: 10, rotate: 15 };
            case 'bottom-right': return { x: 10, y: 10, rotate: -15 };
            case 'left-center': return { x: -10, y: 0, rotate: 15 };
            case 'right-center': return { x: 10, y: 0, rotate: -15 };
            default: return { x: 0, y: 0 };
        }
    };

    const getPositionStyles = () => {
        const base = {
            position: 'fixed',
            zIndex: 990, // Justo debajo del chatbot y sidebar
            width: '120px',
            height: '120px',
            pointerEvents: 'none', // Para que no interfiera con clicks
        };

        switch (peekPosition) {
            case 'bottom-left': return { ...base, bottom: '-20px', left: '-20px' };
            case 'bottom-right': return { ...base, bottom: '-20px', right: '100px' }; // Para no chocar con el botón del chat
            case 'left-center': return { ...base, top: '40%', left: '-40px' };
            case 'right-center': return { ...base, top: '40%', right: '-40px' };
            default: return base;
        }
    };

    return (
        <AnimatePresence>
            {isPeeking && (
                <motion.div
                    initial={getInitialAnimation()}
                    animate={getAnimate()}
                    exit={getInitialAnimation()}
                    transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
                    style={getPositionStyles()}
                >
                    <img
                        src={porkbotImg}
                        alt="Porkbot asomándose"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            clipPath: 'circle(48% at 50% 50%)',
                            WebkitClipPath: 'circle(48% at 50% 50%)',
                            filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PorkbotPeeker;
