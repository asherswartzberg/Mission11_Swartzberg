import CartSummary from './CartSummary';

function WelcomeBand() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-3 shadow-sm mb-4">
      <span className="navbar-brand fs-4 fw-bold">📚 The Online Bookstore</span>
      <CartSummary />
    </nav>
  );
}

export default WelcomeBand;