
import Booklist from './Booklist'

function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4 py-3 mb-4 shadow-sm">
      <span className="navbar-brand fs-4 fw-bold">📚 The Online Bookstore</span>
    </nav>
  )
}

function App() {
  return (
    <div className="bg-light min-vh-100">
      <Header />
      <div className="container pb-5">
        <Booklist />
      </div>
    </div>
  )
}

export default App