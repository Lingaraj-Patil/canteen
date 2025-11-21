// backend/seedData.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');

dotenv.config();

// Mock Menu Items
const menuItems = [
  {
    "name": "Masala Dosa",
    "description": "Crispy rice crepe filled with spiced potato filling.",
    "price": 60,
    "category": "Breakfast",
    "image": "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    "available": true,
    "preparationTime": 15
  },
  {
    "name": "Idli Sambar",
    "description": "Soft steamed idlis served with sambar.",
    "price": 40,
    "category": "Breakfast",
    "image": "https://images.pexels.com/photos/6529898/pexels-photo-6529898.jpeg",
    "available": true,
    "preparationTime": 10
  },
  {
    "name": "Poha",
    "description": "Flattened rice cooked with onions and spices.",
    "price": 35,
    "category": "Breakfast",
    "image": "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg",
    "available": true,
    "preparationTime": 12
  },
  {
    "name": "Aloo Paratha",
    "description": "Stuffed potato paratha served with curd.",
    "price": 50,
    "category": "Breakfast",
    "image": "https://images.pexels.com/photos/6287762/pexels-photo-6287762.jpeg",
    "available": true,
    "preparationTime": 20
  },
  {
    "name": "Omelette",
    "description": "Two-egg omelette with veggies.",
    "price": 30,
    "category": "Breakfast",
    "image": "https://images.pexels.com/photos/533781/pexels-photo-533781.jpeg",
    "available": true,
    "preparationTime": 7
  },
  {
    "name": "Puri Bhaji",
    "description": "Fried puris served with aloo bhaji.",
    "price": 45,
    "category": "Breakfast",
    "image": "https://images.pexels.com/photos/6297172/pexels-photo-6297172.jpeg",
    "available": true,
    "preparationTime": 15
  },
  {
    "name": "Upma",
    "description": "Semolina cooked with veggies and spices.",
    "price": 30,
    "category": "Breakfast",
    "image": "https://images.pexels.com/photos/5410402/pexels-photo-5410402.jpeg",
    "available": true,
    "preparationTime": 10
  },
  {
    "name": "Pancakes",
    "description": "Fluffy pancakes served with syrup.",
    "price": 55,
    "category": "Breakfast",
    "image": "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
    "available": true,
    "preparationTime": 12
  },

  {
    "name": "Veg Thali",
    "description": "Rice, roti, dal, vegetables, and salad.",
    "price": 120,
    "category": "Lunch",
    "image": "https://images.pexels.com/photos/11113136/pexels-photo-11113136.jpeg",
    "available": true,
    "preparationTime": 20
  },
  {
    "name": "Paneer Butter Masala",
    "description": "Creamy paneer curry with roti.",
    "price": 140,
    "category": "Lunch",
    "image": "https://images.pexels.com/photos/9609856/pexels-photo-9609856.jpeg",
    "available": true,
    "preparationTime": 25
  },
  {
    "name": "Chicken Biryani",
    "description": "Aromatic rice cooked with chicken and spices.",
    "price": 150,
    "category": "Lunch",
    "image": "https://foodish-api.com/images/biryani/biryani40.jpg",
    "available": true,
    "preparationTime": 30
  },
  {
    "name": "Veg Biryani",
    "description": "Fragrant basmati rice cooked with vegetables.",
    "price": 120,
    "category": "Lunch",
    "image": "https://foodish-api.com/images/biryani/biryani3.jpg",
    "available": true,
    "preparationTime": 25
  },
  {
    "name": "Chole Bhature",
    "description": "Spicy chickpeas with fried bhature.",
    "price": 90,
    "category": "Lunch",
    "image": "https://images.pexels.com/photos/6287764/pexels-photo-6287764.jpeg",
    "available": true,
    "preparationTime": 20
  },
  {
    "name": "Fish Curry & Rice",
    "description": "Traditional fish curry served with rice.",
    "price": 160,
    "category": "Lunch",
    "image": "https://images.pexels.com/photos/9609851/pexels-photo-9609851.jpeg",
    "available": true,
    "preparationTime": 30
  },
  {
    "name": "Dal Tadka",
    "description": "Yellow lentils tempered with spices.",
    "price": 80,
    "category": "Lunch",
    "image": "https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg",
    "available": true,
    "preparationTime": 15
  },
  {
    "name": "Chicken Curry Thali",
    "description": "Chicken curry with rice and roti.",
    "price": 160,
    "category": "Lunch",
    "image": "https://foodish-api.com/images/chicken/chicken72.jpg",
    "available": true,
    "preparationTime": 30
  },
  {
    "name": "Rajma Chawal",
    "description": "Kidney bean curry with rice.",
    "price": 95,
    "category": "Lunch",
    "image": "https://images.pexels.com/photos/6287761/pexels-photo-6287761.jpeg",
    "available": true,
    "preparationTime": 20
  },
  {
    "name": "Egg Curry & Rice",
    "description": "Boiled eggs cooked in spicy gravy.",
    "price": 90,
    "category": "Lunch",
    "image": "https://foodish-api.com/images/egg/egg21.jpg",
    "available": true,
    "preparationTime": 20
  },

  {
    "name": "Mix Veg Curry",
    "description": "Mixed vegetables cooked in gravy.",
    "price": 110,
    "category": "Dinner",
    "image": "https://images.pexels.com/photos/5410401/pexels-photo-5410401.jpeg",
    "available": true,
    "preparationTime": 25
  },
  {
    "name": "Jeera Rice",
    "description": "Cumin-flavored basmati rice.",
    "price": 70,
    "category": "Dinner",
    "image": "https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg",
    "available": true,
    "preparationTime": 10
  },
  {
    "name": "Butter Chicken",
    "description": "Creamy tomato gravy cooked with chicken.",
    "price": 180,
    "category": "Dinner",
    "image": "https://foodish-api.com/images/chicken/chicken10.jpg",
    "available": true,
    "preparationTime": 30
  },
  {
    "name": "Palak Paneer",
    "description": "Spinach gravy with paneer cubes.",
    "price": 130,
    "category": "Dinner",
    "image": "https://images.pexels.com/photos/9609857/pexels-photo-9609857.jpeg",
    "available": true,
    "preparationTime": 20
  },
  {
    "name": "Chicken Fried Rice",
    "description": "Stir-fried rice with chicken.",
    "price": 120,
    "category": "Dinner",
    "image": "https://foodish-api.com/images/rice/rice65.jpg",
    "available": true,
    "preparationTime": 15
  },
  {
    "name": "Veg Fried Rice",
    "description": "Stir-fried basmati rice with veggies.",
    "price": 100,
    "category": "Dinner",
    "image": "https://foodish-api.com/images/rice/rice17.jpg",
    "available": true,
    "preparationTime": 15
  },
  {
    "name": "Roti (2 pcs)",
    "description": "Soft whole wheat rotis.",
    "price": 20,
    "category": "Dinner",
    "image": "https://images.pexels.com/photos/6287765/pexels-photo-6287765.jpeg",
    "available": true,
    "preparationTime": 5
  },
  {
    "name": "Paneer Tikka",
    "description": "Grilled marinated paneer.",
    "price": 120,
    "category": "Dinner",
    "image": "https://images.pexels.com/photos/5410403/pexels-photo-5410403.jpeg",
    "available": true,
    "preparationTime": 20
  },

  {
    "name": "French Fries",
    "description": "Golden crispy fries.",
    "price": 40,
    "category": "Snacks",
    "image": "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
    "available": true,
    "preparationTime": 10
  },
  {
    "name": "Spring Rolls",
    "description": "Crispy rolls filled with vegetables.",
    "price": 60,
    "category": "Snacks",
    "image": "https://images.pexels.com/photos/2092903/pexels-photo-2092903.jpeg",
    "available": true,
    "preparationTime": 15
  },
  {
    "name": "Veg Momos",
    "description": "Steamed vegetable dumplings.",
    "price": 60,
    "category": "Snacks",
    "image": "https://images.pexels.com/photos/7788005/pexels-photo-7788005.jpeg",
    "available": true,
    "preparationTime": 12
  },
  {
    "name": "Chicken Momos",
    "description": "Steamed chicken dumplings.",
    "price": 80,
    "category": "Snacks",
    "image": "https://images.pexels.com/photos/9609850/pexels-photo-9609850.jpeg",
    "available": true,
    "preparationTime": 12
  },
  {
    "name": "Chicken Pakora",
    "description": "Crispy chicken fritters.",
    "price": 80,
    "category": "Snacks",
    "image": "https://images.pexels.com/photos/6287768/pexels-photo-6287768.jpeg",
    "available": true,
    "preparationTime": 15
  },
  {
    "name": "Samosa",
    "description": "Crispy potato-filled pastry.",
    "price": 30,
    "category": "Snacks",
    "image": "https://images.pexels.com/photos/5949824/pexels-photo-5949824.jpeg",
    "available": true,
    "preparationTime": 10
  },
  {
    "name": "Vada Pav",
    "description": "Mumbai-style potato vada in bun.",
    "price": 25,
    "category": "Snacks",
    "image": "https://images.pexels.com/photos/5410405/pexels-photo-5410405.jpeg",
    "available": true,
    "preparationTime": 8
  },
  {
    "name": "Pav Bhaji",
    "description": "Mashed spicy vegetables with pav.",
    "price": 70,
    "category": "Snacks",
    "image": "https://images.pexels.com/photos/5410406/pexels-photo-5410406.jpeg",
    "available": true,
    "preparationTime": 15
  },
  {
    "name": "Sandwich",
    "description": "Grilled veg sandwich.",
    "price": 50,
    "category": "Snacks",
    "image": "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg",
    "available": true,
    "preparationTime": 12
  },
  {
    "name": "Chicken Sandwich",
    "description": "Grilled chicken sandwich.",
    "price": 70,
    "category": "Snacks",
    "image": "https://images.pexels.com/photos/1600712/pexels-photo-1600712.jpeg",
    "available": true,
    "preparationTime": 12
  },

  {
    "name": "Masala Chai",
    "description": "Indian spiced tea.",
    "price": 15,
    "category": "Beverages",
    "image": "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg",
    "available": true,
    "preparationTime": 5
  },
  {
    "name": "Coffee",
    "description": "Hot brewed coffee.",
    "price": 20,
    "category": "Beverages",
    "image": "https://images.pexels.com/photos/606545/pexels-photo-606545.jpeg",
    "available": true,
    "preparationTime": 5
  },
  {
    "name": "Cold Coffee",
    "description": "Iced coffee with milk.",
    "price": 50,
    "category": "Beverages",
    "image": "https://images.pexels.com/photos/6542768/pexels-photo-6542768.jpeg",
    "available": true,
    "preparationTime": 8
  },
  {
    "name": "Mango Lassi",
    "description": "Sweet mango yogurt drink.",
    "price": 40,
    "category": "Beverages",
    "image": "https://images.pexels.com/photos/5949881/pexels-photo-5949881.jpeg",
    "available": true,
    "preparationTime": 5
  },
  {
    "name": "Buttermilk",
    "description": "Refreshing spiced chaas.",
    "price": 25,
    "category": "Beverages",
    "image": "https://images.pexels.com/photos/5949880/pexels-photo-5949880.jpeg",
    "available": true,
    "preparationTime": 5
  },
  {
    "name": "Fresh Lime Soda",
    "description": "Lemon soda with mint.",
    "price": 30,
    "category": "Beverages",
    "image": "https://images.pexels.com/photos/11113137/pexels-photo-11113137.jpeg",
    "available": true,
    "preparationTime": 5
  },
  {
    "name": "Chocolate Shake",
    "description": "Thick chocolate milkshake.",
    "price": 70,
    "category": "Beverages",
    "image": "https://images.pexels.com/photos/5949901/pexels-photo-5949901.jpeg",
    "available": true,
    "preparationTime": 8
  },

  {
    "name": "Gulab Jamun",
    "description": "Fried dumplings in sugar syrup.",
    "price": 40,
    "category": "Desserts",
    "image": "https://images.pexels.com/photos/9609852/pexels-photo-9609852.jpeg",
    "available": true,
    "preparationTime": 5
  },
  {
    "name": "Rasmalai",
    "description": "Soft paneer in sweetened milk.",
    "price": 50,
    "category": "Desserts",
    "image": "https://images.pexels.com/photos/9609854/pexels-photo-9609854.jpeg",
    "available": true,
    "preparationTime": 5
  },
  {
    "name": "Fruit Custard",
    "description": "Chilled custard with fresh fruits.",
    "price": 50,
    "category": "Desserts",
    "image": "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg",
    "available": true,
    "preparationTime": 5
  },
  {
    "name": "Ice Cream",
    "description": "Two scoops of flavoured ice cream.",
    "price": 45,
    "category": "Desserts",
    "image": "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg",
    "available": true,
    "preparationTime": 5
  },
  {
    "name": "Jalebi",
    "description": "Crispy sweet jalebis.",
    "price": 35,
    "category": "Desserts",
    "image": "https://images.pexels.com/photos/5410407/pexels-photo-5410407.jpeg",
    "available": true,
    "preparationTime": 5
  },
  {
    "name": "Brownie",
    "description": "Warm chocolate brownie.",
    "price": 60,
    "category": "Desserts",
    "image": "https://images.pexels.com/photos/45202/brownie-dessert-cake-chocolate-45202.jpeg",
    "available": true,
    "preparationTime": 8
  }
];



// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await MenuItem.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert menu items
    const createdMenuItems = await MenuItem.insertMany(menuItems);
    console.log(`✅ Added ${createdMenuItems.length} menu items`);

    
    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();