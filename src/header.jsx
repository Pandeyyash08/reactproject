import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./cart";
import "./header.css";

const Header = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="app-header">
      <nav className="nav-bar">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link">Cart ({cartItems.length})</Link>
        <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
      </nav>
    </header>
  );
};

export default Header;
