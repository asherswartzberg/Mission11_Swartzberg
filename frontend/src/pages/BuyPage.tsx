import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/CartItem';

function BuyPage() {
  const navigate = useNavigate();
  const { bookTitle, bookId, price } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      bookTitle: bookTitle || 'Book Not Found',
      price: Number(price),
      quantity: 1,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <div className="bg-light min-vh-100">
      <WelcomeBand />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0 fw-bold">Confirm Purchase</h5>
              </div>
              <div className="card-body text-center py-4">
                <h4 className="mb-1">{bookTitle}</h4>
                <p className="fs-3 fw-bold text-success mb-4">${price}</p>
                <button className="btn btn-dark w-100 mb-2" onClick={handleAddToCart}>
                  🛒 Add to Cart
                </button>
                <button className="btn btn-outline-secondary w-100" onClick={() => navigate(-1)}>
                  ← Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyPage;