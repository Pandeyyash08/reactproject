import { useState } from "react";
// import { useCart } from "./CartContext";
import "./cart.css";

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <div>
                <h4>{item.title}</h4>
                <p>${item.price}</p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  min="1"
                />
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
      )}
      {showPopup && <div className="popup">Order placed successfully!</div>}
    </div>
  );
};

export default Cart;
