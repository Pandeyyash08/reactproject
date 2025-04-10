import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import "./productlist.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // <-- Hook for navigation

  const fetchAllProducts = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAllProducts(data);
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setAllCategories(["all", ...data]);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setProducts(allProducts);
    } else {
      const fetchByCategory = async () => {
        try {
          const res = await fetch(
            `https://fakestoreapi.com/products/category/${selectedCategory}`
          );
          const data = await res.json();
          setProducts(data);
        } catch (err) {
          console.error("Failed to fetch category products", err);
        }
      };

      fetchByCategory();
    }
  }, [selectedCategory, allProducts]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="product-page">
      <div className="product-controls">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <button onClick={() => navigate(`/product/${product.id}`)}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p>No products match your search.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
