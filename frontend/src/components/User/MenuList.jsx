// frontend/src/components/User/MenuList.jsx
import { useState, useEffect } from 'react';
import { menuAPI } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const MenuList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Beverages', 'Desserts'];

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory]);

  const fetchMenuItems = async () => {
    try {
      const params = selectedCategory && selectedCategory !== 'All' 
        ? { category: selectedCategory } 
        : {};
      const { data } = await menuAPI.getAll(params);
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }
    addToCart(item);
    alert(`${item.name} added to cart!`);
  };

  if (loading) return <div className="loading">Loading menu...</div>;

  return (
    <div className="menu-container">
      <h1>Our Menu</h1>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category || (category === 'All' && !selectedCategory) ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {menuItems.length === 0 ? (
          <p>No items available</p>
        ) : (
          menuItems.map((item) => (
            <div key={item._id} className="menu-card">
              <img src={item.image} alt={item.name} />
              <div className="menu-card-content">
                <h3>{item.name}</h3>
                <p className="menu-description">{item.description}</p>
                <div className="menu-footer">
                  <span className="menu-price">₹{item.price}</span>
                  <span className="menu-category">{item.category}</span>
                </div>
                {item.available ? (
                  <button 
                    className="btn btn-add-cart" 
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button className="btn btn-unavailable" disabled>
                    Unavailable
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MenuList;