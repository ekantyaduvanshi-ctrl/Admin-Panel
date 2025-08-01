require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/admin_panel_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create default admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@company.com',
      password: hashedPassword,
      role: 'admin'
    });
    await adminUser.save();
    console.log('👤 Created admin user');

    // Create sample products
    const products = [
      {
        name: 'Laptop',
        description: 'High-performance laptop for business use',
        price: 999.99,
        stock: 50
      },
      {
        name: 'Mouse',
        description: 'Wireless optical mouse',
        price: 29.99,
        stock: 100
      },
      {
        name: 'Keyboard',
        description: 'Mechanical gaming keyboard',
        price: 149.99,
        stock: 25
      },
      {
        name: 'Monitor',
        description: '27-inch 4K monitor',
        price: 399.99,
        stock: 30
      }
    ];

    for (const productData of products) {
      const product = new Product(productData);
      await product.save();
    }
    console.log('📦 Created sample products');

    // Create sample order
    const sampleOrder = new Order({
      user: adminUser._id,
      products: [
        {
          product: (await Product.findOne({ name: 'Laptop' }))._id,
          quantity: 1
        },
        {
          product: (await Product.findOne({ name: 'Mouse' }))._id,
          quantity: 2
        }
      ],
      total: 1059.97,
      status: 'completed'
    });
    await sampleOrder.save();
    console.log('📋 Created sample order');

    console.log('🎉 Database seeded successfully!');
    console.log('\nDefault login credentials:');
    console.log('Email: admin@company.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

seedDatabase(); 