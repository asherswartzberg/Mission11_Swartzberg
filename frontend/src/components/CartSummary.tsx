import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <button
      className="btn btn-outline-light d-flex align-items-center gap-2"
      onClick={() => navigate('/cart')}
    >
      🛒
      <span className="badge bg-light text-dark ms-1">{cart.length}</span>
      <span className="ms-1">${totalAmount.toFixed(2)}</span>
    </button>
  );
};

export default CartSummary;