// frontend/src/components/User/OrderHistory.jsx
import { useState, useEffect } from 'react';
import { orderAPI } from '../../services/api';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await orderAPI.getUserOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      Pending: 'status-pending',
      Preparing: 'status-preparing',
      Ready: 'status-ready',
      Completed: 'status-completed',
      Cancelled: 'status-cancelled'
    };
    return statusClasses[status] || '';
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <h2>No orders yet</h2>
        <p>Start ordering from our menu!</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <h3>Order #{order._id.slice(-6)}</h3>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <span className={`order-status ${getStatusClass(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <div>
                <strong>Payment:</strong> {order.paymentMethod}
                <span className={`payment-status ${order.paymentStatus === 'Paid' ? 'paid' : 'unpaid'}`}>
                  ({order.paymentStatus})
                </span>
              </div>
              <div className="order-total">
                <strong>Total:</strong> ₹{order.totalAmount}
              </div>
            </div>

            {order.notes && (
              <div className="order-notes">
                <strong>Notes:</strong> {order.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;