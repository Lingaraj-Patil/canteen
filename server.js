// server.js
require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
    ╔═══════════════════════════════════════════════╗
    ║  Canteen Management System API Server        ║
    ║  Running in ${process.env.NODE_ENV} mode                   ║
    ║  Server started on port ${PORT}                   ║
    ║  URL: http://localhost:${PORT}                    ║
    ╚═══════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});