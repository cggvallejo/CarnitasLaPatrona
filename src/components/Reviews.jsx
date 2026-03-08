import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, Instagram, Facebook, MapPin, CheckCircle2 } from 'lucide-react';

const Reviews = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [allReviews, setAllReviews] = useState(() => {
        const saved = localStorage.getItem('carnitas_reviews');
        return saved ? JSON.parse(saved) : [
            { id: 1, rating: 5, comment: "¡Las mejores de la ciudad!", date: "Hoy" },
            { id: 2, rating: 5, comment: "Excelente atención y sabor único.", date: "Ayer" }
        ];
    });

    const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Carnitas+El+Patron+Guadalajara"; // Placeholder URL
    const INSTAGRAM_URL = "https://instagram.com/"; // Placeholder
    const FACEBOOK_URL = "https://facebook.com/"; // Placeholder

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) return;

        const newReview = {
            id: Date.now(),
            rating,
            comment,
            date: new Date().toLocaleDateString()
        };

        const updatedReviews = [newReview, ...allReviews];
        setAllReviews(updatedReviews);
        localStorage.setItem('carnitas_reviews', JSON.stringify(updatedReviews));

        setIsSubmitted(true);
    };

    const handleShare = (platform) => {
        const message = `¡Acabo de probar las mejores carnitas en El Patrón! ⭐ ${rating}/5. ${comment}`;
        let url = '';

        switch (platform) {
            case 'google':
                url = GOOGLE_MAPS_URL;
                break;
            case 'instagram':
                url = INSTAGRAM_URL;
                break;
            case 'facebook':
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(message)}`;
                break;
            default:
                break;
        }
        window.open(url, '_blank');
    };

    return (
        <section style={styles.section} id="reviews">
            <div className="container" style={styles.container}>
                <div style={styles.content}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        style={styles.subtitle}
                    >
                        TU OPINIÓN IMPORTA
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={styles.title}
                    >
                        ¿Qué te pareció <br /> <span style={{ color: 'var(--primary)' }}>El Patrón</span>?
                    </motion.h2>
                </div>

                <div style={styles.formCard}>
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onSubmit={handleSubmit}
                                style={styles.form}
                            >
                                <div style={styles.starsContainer}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <motion.button
                                            key={star}
                                            type="button"
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                            style={styles.starBtn}
                                        >
                                            <Star
                                                size={42}
                                                fill={(hover || rating) >= star ? 'var(--primary)' : 'transparent'}
                                                color={(hover || rating) >= star ? 'var(--primary)' : 'rgba(255,255,255,0.2)'}
                                                strokeWidth={1.5}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </motion.button>
                                    ))}
                                </div>

                                <textarea
                                    placeholder="Cuéntanos tu experiencia..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    style={styles.textarea}
                                />

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={rating === 0}
                                    style={{
                                        ...styles.submitBtn,
                                        opacity: rating === 0 ? 0.5 : 1,
                                        cursor: rating === 0 ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    <Send size={18} />
                                    ENVIAR RESEÑA
                                </motion.button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={styles.successContainer}
                            >
                                <CheckCircle2 size={64} color="var(--primary)" style={{ marginBottom: '2rem' }} />
                                <h3 style={styles.successTitle}>¡GRACIAS POR TU APOYO!</h3>
                                <p style={styles.successText}>Tu opinión nos ayuda a seguir siendo "El Patrón".</p>

                                <div style={styles.shareGrid}>
                                    <button onClick={() => handleShare('google')} style={styles.shareBtn}>
                                        <MapPin size={20} />
                                        GOOGLE MAPS
                                    </button>
                                    <button onClick={() => handleShare('instagram')} style={styles.shareBtn}>
                                        <Instagram size={20} />
                                        INSTAGRAM
                                    </button>
                                    <button onClick={() => handleShare('facebook')} style={styles.shareBtn}>
                                        <Facebook size={20} />
                                        FACEBOOK
                                    </button>
                                </div>
                                <button
                                    onClick={() => { setIsSubmitted(false); setRating(0); setComment(''); }}
                                    style={styles.resetBtn}
                                >
                                    DEJAR OTRA RESEÑA
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={styles.reviewsList}>
                    <h3 style={styles.listTitle}>OPINIONES DESTACADAS</h3>
                    <div style={styles.listGrid}>
                        {allReviews.map((rev) => (
                            <motion.div
                                key={rev.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                style={styles.reviewItem}
                            >
                                <div style={styles.itemHeader}>
                                    <div style={styles.itemStars}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={12} fill={i < rev.rating ? 'var(--primary)' : 'transparent'} color={i < rev.rating ? 'var(--primary)' : 'rgba(255,255,255,0.2)'} />
                                        ))}
                                    </div>
                                    <span style={styles.itemDate}>{rev.date}</span>
                                </div>
                                <p style={styles.itemText}>{rev.comment}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const styles = {
    section: {
        padding: '10rem 0',
        backgroundColor: 'var(--bg-color)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    content: {
        textAlign: 'center',
        marginBottom: '5rem',
    },
    subtitle: {
        display: 'block',
        color: 'var(--primary)',
        fontSize: '0.85rem',
        fontWeight: 600,
        letterSpacing: '0.4em',
        marginBottom: '2rem',
    },
    title: {
        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
        fontFamily: 'var(--font-serif)',
        color: 'var(--accent)',
        textTransform: 'uppercase',
        lineHeight: 1.1,
    },
    formCard: {
        width: '100%',
        maxWidth: '700px',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '3rem',
        padding: '4rem',
        position: 'relative',
        overflow: 'hidden',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem',
    },
    starsContainer: {
        display: 'flex',
        gap: '1rem',
    },
    starBtn: {
        background: 'none',
        border: 'none',
        padding: 0,
    },
    textarea: {
        width: '100%',
        height: '150px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        color: 'var(--accent)',
        fontSize: '1rem',
        fontFamily: 'var(--font-sans)',
        outline: 'none',
        resize: 'none',
        transition: 'var(--transition)',
    },
    submitBtn: {
        backgroundColor: 'var(--accent)',
        color: 'var(--bg-color)',
        border: 'none',
        padding: '1.4rem 4rem',
        fontSize: '0.85rem',
        fontWeight: 700,
        letterSpacing: '0.2em',
        borderRadius: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        transition: 'var(--transition)',
    },
    successContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    successTitle: {
        fontSize: '1.8rem',
        fontFamily: 'var(--font-serif)',
        color: 'var(--accent)',
        letterSpacing: '0.1em',
        marginBottom: '1rem',
    },
    successText: {
        color: 'var(--text-muted)',
        fontSize: '1rem',
        marginBottom: '3rem',
    },
    shareGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1.5rem',
        width: '100%',
        marginBottom: '3rem',
    },
    shareBtn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.8rem',
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '2rem',
        color: 'var(--accent)',
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        cursor: 'pointer',
        transition: 'var(--transition)',
    },
    resetBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    reviewsList: {
        width: '100%',
        marginTop: '6rem',
    },
    listTitle: {
        fontSize: '0.8rem',
        letterSpacing: '0.2em',
        color: 'var(--primary)',
        textAlign: 'center',
        marginBottom: '3rem',
    },
    listGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
    },
    reviewItem: {
        backgroundColor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '1.5rem',
        padding: '2rem',
        transition: 'var(--transition)',
    },
    itemHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    itemStars: {
        display: 'flex',
        gap: '0.2rem',
    },
    itemDate: {
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
    },
    itemText: {
        fontSize: '0.85rem',
        color: 'var(--accent)',
        lineHeight: 1.6,
        margin: 0,
    }
};

export default Reviews;
