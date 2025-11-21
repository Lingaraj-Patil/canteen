// frontend/src/components/Admin/AdminDashboard.jsx
import { useState } from 'react';
import MenuManager from './MenuManager';
import OrderManager from './OrderManager';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          📋 Orders
        </button>
        <button
          className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          🍽️ Menu Management
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'orders' && <OrderManager />}
        {activeTab === 'menu' && <MenuManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;