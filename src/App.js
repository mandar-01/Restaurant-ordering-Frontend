import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Restaurants from './pages/restaurants';
import Cart from './pages/cart';
import Menu from './pages/menu';
import { CartProvider } from './components/cartContext';


function App() {
  return (
    <CartProvider>
     <Router>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <Link to="/restaurants" className="nav-link">
                Restaurants
              </Link>
              <Link to="/cart" className="nav-link">
                My Cart
              </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element={<Restaurants />}/>
        <Route path="/restaurants" element={<Restaurants />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/restaurants/:restaurantId" element={<Menu />}/>
    </Routes>
    </Router>
    </CartProvider>
  );
}

export default App; 
