import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/images/hero_tacos.png';

const Hero = () => {
    return (
        <section style={styles.hero}>
            <div className="container" style={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={styles.content}
                >
                    <h2 style={styles.subtitle}>Sabor Tradicional</h2>
                    <h1 style={styles.title}>Las Mejores Carnitas de la Región</h1>
                    <p style={styles.description}>
                        Tradición familiar en cada bocado. Nuestra maciza y cuerito son cocinados lentamente en cazos de cobre para lograr ese dorado perfecto y jugosidad incomparable.
                    </p>
                    <motion.a
                        href="#menu"
                        style={styles.cta}
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(211, 84, 0, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Ordenar Ahora <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                    </motion.a>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    style={styles.imageContainer}
                >
                    <img src={heroImage} alt="Delicious Carnitas" style={styles.image} />
                    <div style={styles.blob}></div>
                </motion.div>
            </div>
        </section>
    );
};

const styles = {
    hero: {
        padding: '4rem 0',
        backgroundColor: 'var(--bg-color)',
        overflow: 'hidden',
        position: 'relative',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '4rem',
        flexWrap: 'wrap',
    },
    content: {
        flex: '1',
        minWidth: '300px',
    },
    subtitle: {
        color: 'var(--primary)',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        fontSize: '0.9rem',
        fontWeight: 700,
        marginBottom: '1rem',
        display: 'block',
    },
    title: {
        fontSize: '4rem',
        lineHeight: 1.1,
        marginBottom: '1.5rem',
        color: 'var(--text-main)',
    },
    description: {
        fontSize: '1.1rem',
        color: 'var(--text-muted)',
        marginBottom: '2rem',
        maxWidth: '500px',
    },
    cta: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--primary)',
        color: 'white',
        padding: '1.2rem 2.5rem',
        borderRadius: '50px',
        fontWeight: 700,
        fontSize: '1.1rem',
        boxShadow: '0 4px 15px rgba(211, 84, 0, 0.3)',
        transition: 'var(--transition)',
    },
    imageContainer: {
        flex: '1',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '300px',
    },
    image: {
        width: '100%',
        maxWidth: '500px',
        borderRadius: '30px',
        boxShadow: 'var(--shadow)',
        zIndex: 2,
        position: 'relative',
    },
    blob: {
        position: 'absolute',
        width: '120%',
        height: '120%',
        backgroundColor: 'rgba(211, 84, 0, 0.1)',
        borderRadius: '50%',
        filter: 'blur(50px)',
        zIndex: 1,
    }
};

export default Hero;
