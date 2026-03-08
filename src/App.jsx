import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';
import Chatbot from './components/Chatbot';
import PorkbotPeeker from './components/PorkbotPeeker';
import PorkbotCursorThief from './components/PorkbotCursorThief';
import Reviews from './components/Reviews';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  return (
    <CartProvider>
      <div className="app">


        <Header />

        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Hero />
          <ProductGrid />
          <Reviews />
        </motion.main>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={styles.footer}
        >
          <div className="container" style={styles.footerContent}>
            <span style={styles.footerBrand}>Carnitas El Patrón</span>
            <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em', marginTop: '2rem' }}>
              &copy; 2026 GUADALAJARA, JALISCO. TODOS LOS DERECHOS RESERVADOS.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem', fontSize: '0.75rem', opacity: 0.5 }}>
              HECHO CON <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}><Heart size={12} fill="var(--primary)" color="var(--primary)" /></motion.div> PARA LOS AMANTES DEL BUEN TACO.
            </div>
          </div>
        </motion.footer>

        <CartSidebar />
        <PorkbotPeeker />
        <PorkbotCursorThief />
        <Chatbot />
      </div>
    </CartProvider>
  );
}

const styles = {
  footer: {
    padding: '8rem 0',
    backgroundColor: 'var(--bg-color)',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    color: 'var(--text-muted)',
    marginTop: '10rem',
  },
  footerContent: {
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  },
  footerBrand: {
    fontFamily: 'var(--font-serif)',
    fontSize: '1.8rem',
    color: 'var(--accent)',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    marginBottom: '2rem',
    display: 'block'
  }
};

export default App;
