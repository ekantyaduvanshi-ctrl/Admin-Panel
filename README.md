# 🏢 Admin Panel

A full-stack admin panel built with Angular frontend and Node.js/Express backend with MongoDB database.

## ✨ Features

- **🔐 Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, User)
  - Secure login/logout functionality

- **👥 User Management**
  - Create, read, update, delete users
  - User role management
  - User search and filtering

- **📦 Product Management**
  - Complete CRUD operations for products
  - Product categorization
  - Inventory tracking

- **📋 Order Management**
  - Order creation and tracking
  - Order history
  - Order status management

- **🎨 Modern UI/UX**
  - Responsive design
  - Material Design components
  - Intuitive navigation

## 🛠️ Tech Stack

### Frontend
- **Angular 17** - Modern web framework
- **TypeScript** - Type-safe JavaScript
- **Angular Material** - UI component library
- **RxJS** - Reactive programming

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd admin-panel
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file
   cd backend
   copy env.example .env
   ```

4. **Database Setup**
   ```bash
   # Seed the database with sample data
   cd backend
   npm run seed
   ```

5. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev
   ```

### Default Credentials
```
Email: admin@company.com
Password: admin123
```

**Note:** The application now uses an external authentication API at `https://backend.cshare.in/v2/loginV2`

## 📡 API Endpoints

### Authentication
- `POST https://backend.cshare.in/v2/loginV2` - User login (External API)
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `GET /api/orders/myorders` - Get user's orders

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run start        # Start Angular development server
npm run backend      # Start backend server

# Backend only
cd backend
npm run dev          # Start backend with nodemon
npm run seed         # Seed database with sample data

# Frontend only
npm run build        # Build for production
npm run test         # Run tests
```

### Project Structure
```
admin-panel/
├── src/                    # Angular frontend
│   ├── app/
│   │   ├── auth/          # Authentication components
│   │   ├── core/          # Core services & guards
│   │   ├── dashboard/     # Dashboard component
│   │   ├── orders/        # Order management
│   │   ├── products/      # Product management
│   │   ├── users/         # User management
│   │   └── shared/        # Shared components
│   └── assets/            # Static assets
├── backend/               # Node.js backend
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── validators/       # Input validation
│   └── server.js         # Main server file
└── README.md
```

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS protection
- Input validation
- Helmet security headers

## 📱 Screenshots

- Login Page
- Dashboard
- User Management
- Product Management
- Order Management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ using Angular & Node.js**
