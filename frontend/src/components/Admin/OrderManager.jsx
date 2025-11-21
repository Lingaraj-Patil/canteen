// frontend/src/components/Admin/OrderManager.jsx
import { useState, useEffect } from 'react';
import { orderAPI } from '../../services/api';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const params = filter ? { status: filter } : {};
      const { data } = await orderAPI.getAllOrders(params);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, { status: newStatus });
      alert('Order status updated!');
      fetchOrders();
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handlePaymentUpdate = async (orderId, paymentStatus) => {
    try {
      await orderAPI.updateStatus(orderId, { paymentStatus });
      alert('Payment status updated!');
      fetchOrders();
    } catch (error) {
      alert('Failed to update payment status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Pending: '#ffc107',
      Preparing: '#17a2b8',
      Ready: '#28a745',
      Completed: '#6c757d',
      Cancelled: '#dc3545'
    };
    return colors[status] || '#000';
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="order-manager">
      <div className="manager-header">
        <h2>Orders Management</h2>
        <select 
          className="filter-select" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="admin-order-card">
              <div className="order-card-header">
                <div>
                  <h3>Order #{order._id.slice(-6)}</h3>
                  <p className="order-customer">
                    👤 {order.user?.name} | 📞 {order.user?.phone}
                  </p>
                  <p className="order-time">
                    🕐 {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div style={{ color: getStatusColor(order.status) }}>
                  <strong>{order.status}</strong>
                </div>
              </div>

              <div className="order-items-list">
                <h4>Items:</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item-row">
                    <span>{item.name}</span>
                    <span>x{item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="order-details">
                <div className="detail-row">
                  <strong>Total Amount:</strong>
                  <span>₹{order.totalAmount}</span>
                </div>
                <div className="detail-row">
                  <strong>Payment Method:</strong>
                  <span>{order.paymentMethod}</span>
                </div>
                <div className="detail-row">
                  <strong>Payment Status:</strong>
                  <span className={order.paymentStatus === 'Paid' ? 'text-success' : 'text-warning'}>
                    {order.paymentStatus}
                  </span>
                </div>
                {order.notes && (
                  <div className="detail-row">
                    <strong>Notes:</strong>
                    <span>{order.notes}</span>
                  </div>
                )}
              </div>

              <div className="order-actions">
                <div className="form-group">
                  <label>Update Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {order.paymentStatus === 'Pending' && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handlePaymentUpdate(order._id, 'Paid')}
                  >
                    Mark as Paid
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderManager;