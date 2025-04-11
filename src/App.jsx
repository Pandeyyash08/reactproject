import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./loginpage";
import Home from "./productlist";    
import ProductDetail from "./productdetail";  
import Cart from "./cart.jsx";      

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} /> {/* <-- fixed here */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
