import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./productdetail.css"; // Optional: if you have CSS

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      // Item already in cart: update quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // New item
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart"); // Redirect to Cart page
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <div className="image-container">
        <img className="detail-image" src={product.image} alt={product.title} />
      </div>
      <div className="detail-info">
        <h2>{product.title}</h2>
        <h3>${product.price}</h3>
        <p>{product.description}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
