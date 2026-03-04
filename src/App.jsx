import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';
import Chatbot from './components/Chatbot';
import { Heart } from 'lucide-react';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <main>
          <Hero />
          <ProductGrid />
        </main>
        <footer style={styles.footer}>
          <div className="container" style={styles.footerContent}>
            <p>&copy; 2026 Carnitas "El Patrón" - Guadalajara, Jal.</p>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              Hecho con <Heart size={16} fill="var(--primary)" color="var(--primary)" /> para los amantes del buen taco.
            </p>
          </div>
        </footer>
        <CartSidebar />
        <Chatbot />
      </div>
    </CartProvider>
  );
}

const styles = {
  footer: {
    padding: '4rem 0',
    backgroundColor: 'var(--text-main)',
    color: 'rgba(255,255,255,0.7)',
    marginTop: '4rem',
  },
  footerContent: {
    textAlign: 'center',
  }
};

export default App;
