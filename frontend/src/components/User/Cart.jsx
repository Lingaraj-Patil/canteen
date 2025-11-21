// frontend/src/components/User/Cart.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { orderAPI } from '../../services/api';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, parseInt(newQuantity));
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert('Cart is empty!');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map(item => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: getTotalPrice(),
        paymentMethod,
        notes
      };

      await orderAPI.create(orderData);
      alert('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <button className="btn btn-primary" onClick={() => navigate('/menu')}>
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
              <div className="cart-item-actions">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  className="quantity-input"
                />
                <button 
                  className="btn btn-remove" 
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
              <div className="cart-item-total">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="form-group">
            <label>Payment Method</label>
            <select 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <div className="form-group">
            <label>Order Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions?"
              rows="3"
            />
          </div>

          <div className="cart-total">
            <h3>Total: ₹{getTotalPrice()}</h3>
          </div>

          <button 
            className="btn btn-primary btn-block" 
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;