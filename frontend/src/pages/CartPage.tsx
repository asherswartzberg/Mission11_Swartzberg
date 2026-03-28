import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';
import WelcomeBand from '../components/WelcomeBand';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-light min-vh-100">
      <WelcomeBand />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-7">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0 fw-bold">🛒 Your Cart</h5>
              </div>
              <div className="card-body p-0">
                {cart.length === 0 ? (
                  <p className="text-muted text-center py-5">Your cart is empty.</p>
                ) : (
                  <ul className="list-group list-group-flush">
                    {cart.map((item: CartItem) => (
                      <li
                        key={item.bookId}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <span className="fw-semibold">{item.bookTitle} {item.quantity}x</span>
                          <span className="text-success ms-2">${item.price.toFixed(2)}</span>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => removeFromCart(item.bookId)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center bg-white">
                <span className="fs-5 fw-bold">Total: <span className="text-success">${total.toFixed(2)}</span></span>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-secondary" onClick={() => navigate('/store')}>
                    ← Continue Browsing
                  </button>
                  <button className="btn btn-dark">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;