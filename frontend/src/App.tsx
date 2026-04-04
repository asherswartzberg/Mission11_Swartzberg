import './App.css';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import BuyPage from './pages/BuyPage';
import StorePage from './pages/StorePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<StorePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route
              path="/buy/:bookTitle/:bookId/:price"
              element={<BuyPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminbooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;