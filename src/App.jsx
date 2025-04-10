import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./loginpage";
import Home from "./productlist";    
import ProductDetail from "./productdetail";        
// other imports...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<ProductDetail/>} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
