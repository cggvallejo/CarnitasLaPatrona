import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './context/CartContext';
import Chatbot from './components/Chatbot';

function App() {
  const [hasError, setHasError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  React.useEffect(() => {
    const handleError = (event) => {
      setHasError(true);
      setErrorMsg(event.message || 'Error desconocido');
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: '2rem', color: 'red', background: '#fff', minHeight: '100vh' }}>
        <h1>Algo salió mal:</h1>
        <p>{errorMsg}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

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
            <p>Hecho con ❤️ para los amantes del buen taco.</p>
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
