import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import { useCart } from "./CartContext";
import "./productdetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div className="product-detail">
      <div className="image-container">
        <img className="detail-image" src={product.image} alt={product.title} />
      </div>
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p style={{ color: 'black' }}>{product.description}</p>
        <h3>${product.price}</h3>
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductDetail;
