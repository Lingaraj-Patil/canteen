// frontend/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍽️ Canteen System
        </Link>

        <div className="nav-menu">
          <Link to="/menu" className="nav-link">Menu</Link>
          
          {user && !isAdmin && (
            <>
              <Link to="/cart" className="nav-link cart-link">
                🛒 Cart {getTotalItems() > 0 && <span className="cart-badge">{getTotalItems()}</span>}
              </Link>
              <Link to="/orders" className="nav-link">My Orders</Link>
            </>
          )}

          {isAdmin && (
            <Link to="/admin" className="nav-link">Admin Dashboard</Link>
          )}

          {user ? (
            <div className="nav-user">
              <span className="nav-username">👤 {user.name}</span>
              <button onClick={handleLogout} className="btn btn-logout">Logout</button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="btn btn-login">Login</Link>
              <Link to="/register" className="btn btn-register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;