import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/hero_tacos.png';

const Hero = () => {
    return (
        <section style={styles.hero}>
            <div className="container" style={styles.container}>
                <div style={styles.content}>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={styles.subtitle}
                    >
                        EST. 1995 • TRADICIÓN MEXICANA
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={styles.title}
                    >
                        Las Mejores <br />
                        <span style={styles.titleAccent}>Carnitas</span> <br />
                        De La Región
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={styles.description}
                    >
                        Un legado de sabor artesanal, preparado con los ingredientes más frescos y la pasión de nuestra familia.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button style={styles.cta}>
                            EXPLORAR MENÚ
                        </button>
                    </motion.div>
                </div>
                <div style={styles.imageContainer}>
                    <motion.img
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        src={heroImage}
                        alt="Tacos de Carnitas Premium"
                        style={styles.image}
                    />
                </div>
            </div>
        </section>
    );
};

const styles = {
    hero: {
        minHeight: '100vh',
        backgroundColor: 'var(--bg-color)',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 0',
        overflow: 'hidden',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '6rem',
        padding: '0 4rem',
        maxWidth: '1800px',
        margin: '0 auto',
        width: '100%',
    },
    content: {
        flex: '1',
        zIndex: 2,
    },
    subtitle: {
        display: 'block',
        color: 'var(--primary)',
        fontSize: '0.9rem',
        fontWeight: 600,
        letterSpacing: '0.4em',
        marginBottom: '2.5rem',
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 'clamp(3rem, 6vw, 6rem)',
        fontFamily: 'var(--font-serif)',
        lineHeight: '1.05',
        color: 'var(--accent)',
        margin: '0 0 2.5rem 0',
        fontWeight: 400,
        textTransform: 'uppercase',
    },
    titleAccent: {
        color: 'var(--primary)',
    },
    description: {
        fontSize: '1.1rem',
        lineHeight: '1.8',
        color: 'var(--text-muted)',
        marginBottom: '3.5rem',
        maxWidth: '550px',
        fontWeight: 300,
        fontFamily: 'var(--font-sans)',
    },
    cta: {
        backgroundColor: 'var(--accent)',
        color: 'var(--bg-color)',
        border: 'none',
        padding: '1.4rem 4rem',
        fontSize: '0.85rem',
        fontWeight: 700,
        letterSpacing: '0.3em',
        cursor: 'pointer',
        transition: 'var(--transition)',
        textTransform: 'uppercase',
    },
    imageContainer: {
        flex: '1',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        maxWidth: '750px',
        height: 'auto',
        objectFit: 'cover',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 'clamp(2rem, 5vw, 4rem)',
        transition: 'var(--transition)',
    }
};

export default Hero;
