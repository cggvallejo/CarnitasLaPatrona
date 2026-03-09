import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductGrid = () => {
    const { addToCart } = useCart();

    return (
        <section id="menu" style={styles.section}>
            <div className="container">
                <h2 style={styles.title}>Nuestro Menú</h2>
                <div style={styles.grid}>
                    {products.map((item, index) => (
                        <motion.div
                            key={item.id}
                            style={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <div style={styles.imageContainer}>
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    src={item.image}
                                    alt={item.name}
                                    style={styles.image}
                                />
                                <span style={styles.categoryBadge}>{item.category}</span>
                            </div>
                            <div style={styles.content}>
                                <h3 style={styles.name}>{item.name}</h3>
                                <p style={styles.description}>{item.description}</p>
                                <div style={styles.footer}>
                                    <span style={styles.price}>${item.price.toFixed(2)}</span>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => addToCart(item)}
                                        style={styles.addBtn}
                                    >
                                        AÑADIR +
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
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
    title: {
        fontSize: '3.5rem',
        textAlign: 'center',
        marginBottom: '8rem',
        color: 'var(--accent)',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-serif)',
        fontWeight: 400,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '6rem',
        padding: '0 4rem',
        maxWidth: '1800px',
        margin: '0 auto',
    },
    card: {
        backgroundColor: 'transparent',
        border: 'none',
        transition: 'var(--transition)',
        position: 'relative',
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        height: '350px',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 1,
        borderRadius: '2.5rem',
        transition: 'var(--transition)',
    },
    categoryBadge: {
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        backgroundColor: 'rgba(15, 12, 11, 0.8)',
        backdropFilter: 'blur(10px)',
        color: 'var(--accent)',
        padding: '0.6rem 1.2rem',
        fontSize: '0.7rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 2,
    },
    content: {
        padding: '2.5rem 0',
    },
    name: {
        fontSize: '1.4rem',
        fontFamily: 'var(--font-serif)',
        color: 'var(--accent)',
        marginBottom: '1rem',
        fontWeight: 400,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
    },
    description: {
        fontSize: '0.95rem',
        color: 'var(--text-muted)',
        lineHeight: '1.7',
        marginBottom: '2rem',
        fontWeight: 300,
        height: '3.4rem',
        overflow: 'hidden',
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    },
    price: {
        fontSize: '1.2rem',
        color: 'var(--accent)',
        fontWeight: 500,
        fontFamily: 'var(--font-sans)',
    },
    addBtn: {
        background: 'none',
        border: '1px solid var(--primary)',
        color: 'var(--primary)',
        padding: '0.8rem 2rem',
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.2em',
        cursor: 'pointer',
        transition: 'var(--transition)',
        textTransform: 'uppercase',
    }
};

export default ProductGrid;
