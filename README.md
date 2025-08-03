# Admin Panel - Full Stack Application

A comprehensive admin panel built with Angular frontend and Node.js backend, integrated with external APIs.

## 🚀 Features

- **User Management**: Create, update, delete, and manage users
- **Product Management**: Manage product catalog with images and categories
- **Order Management**: Track orders, assign engineers, and manage priorities
- **Template Management**: Create and manage templates with filtering
- **Authentication**: Secure login with JWT tokens
- **Role-based Access**: Admin and user role management
- **Responsive Design**: Modern UI that works on all devices

## 🏗️ Architecture

### Frontend (Angular)
- **Framework**: Angular 17
- **UI**: Custom CSS with modern design
- **State Management**: RxJS Observables
- **API Integration**: HTTP Client with external APIs

### Backend (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT tokens
- **Validation**: Custom validators
- **Security**: Helmet, CORS, rate limiting

### External APIs
- **Base URL**: `https://backend.cshare.in/v2`
- **Company ID**: `65ca007ff956d27b357649bd`
- **Authentication**: `/loginV2` (POST with username/password)
- **Templates**: `/template/filter`, `/template/create`, `/template/update`
- **Users**: `/users` (CRUD operations)
- **Products**: `/products` (CRUD operations)
- **Orders**: `/orders` (CRUD operations)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud)
- Angular CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-panel
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Configure environment**
   ```bash
   # Copy environment example
   cd backend
   copy env.example .env
   ```

4. **Update .env file**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/admin_panel_db
   JWT_SECRET=your_jwt_secret_here
   CORS_ORIGIN=http://localhost:4200
   NODE_ENV=development
   ```

### Running the Application

#### Option 1: Start Both Servers (Recommended)
```bash
start-servers.bat
```

#### Option 2: Start Servers Separately

**Backend Server:**
```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Frontend Server:**
```bash
# In a new terminal, from project root
ng serve --open
```

## 🌐 API Endpoints

### External APIs (Production)
- **Base URL**: `https://backend.cshare.in/v2`
- **Company ID**: `65ca007ff956d27b357649bd`
- **Authentication**: `POST /loginV2`
  - Headers: `Content-Type: application/json`
  - Body: `{ "username": "adminCshare", "password": "adminCshare" }`
- **Templates**: 
  - `GET /template/filter` - Filter templates with query parameters
  - `POST /template/create` - Create new template
  - `PUT /template/update` - Update existing template
  - Headers: `companyid`, `x-auth-token`
- **Users**: `GET/POST/PUT/DELETE /users`
- **Products**: `GET/POST/PUT/DELETE /products`
- **Orders**: `GET/POST/PUT/DELETE /orders`

### Local Backend APIs (Development)
- **Base URL**: `http://localhost:5000/api`
- **Authentication**: `POST /auth/loginV2`
- **Users**: `GET/POST/PUT/DELETE /users`
- **Products**: `GET/POST/PUT/DELETE /products`
- **Orders**: `GET/POST/PUT/DELETE /orders`
- **Templates**: `GET/POST/PUT/DELETE /templates`

## 🔧 Configuration

### Switching Between External and Local APIs

The application can be configured to use either external APIs or local backend:

```typescript
// In src/app/core/api.service.ts
private useExternalApis = true; // Set to false for local backend
```

### Authentication Headers

**External APIs:**
- `Content-Type: application/json`
- `companyid: 65ca007ff956d27b357649bd`
- `x-auth-token: <jwt_token>`

**Local Backend:**
- `Content-Type: application/json`
- `Authorization: Bearer <jwt_token>`

### Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/admin_panel_db
JWT_SECRET=your_secret_key
CORS_ORIGIN=http://localhost:4200
NODE_ENV=development
```

## 📁 Project Structure

```
admin-panel/
├── backend/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── validators/         # Input validation
│   └── server.js          # Main server file
├── src/                    # Angular frontend
│   ├── app/
│   │   ├── core/          # Core services and guards
│   │   ├── auth/          # Authentication components
│   │   ├── dashboard/     # Dashboard component
│   │   ├── users/         # User management
│   │   ├── products/      # Product management
│   │   ├── orders/        # Order management
│   │   ├── templates/     # Template management
│   │   └── shared/        # Shared components
│   └── assets/            # Static assets
├── start-servers.bat      # Startup script
└── README.md             # This file
```

## 🔐 Authentication

The application uses JWT tokens for authentication:

1. **Login**: `POST /loginV2` with username/password
2. **Token Storage**: JWT stored in localStorage
3. **Authorization**: Token sent in `x-auth-token` header for external APIs
4. **Logout**: Token removed from localStorage

### Template API Examples

**Create Template:**
```json
POST /template/create
Headers: {
  "Content-Type": "application/json",
  "companyid": "65ca007ff956d27b357649bd",
  "x-auth-token": "<jwt_token>"
}
Body: {
  "name": "Template Name",
  "heading": "Template Heading",
  "description": "Template Description"
}
```

**Update Template:**
```json
PUT /template/update
Headers: {
  "Content-Type": "application/json",
  "companyid": "65ca007ff956d27b357649bd",
  "x-auth-token": "<jwt_token>"
}
Body: {
  "id": "template_id",
  "name": "Updated Name",
  "heading": "Updated Heading",
  "description": "Updated Description"
}
```

**Filter Templates:**
```json
GET /template/filter?template_types=&from=&to
Headers: {
  "companyid": "65ca007ff956d27b357649bd",
  "x-auth-token": "<jwt_token>"
}
```

## 🎨 UI Components

- **Header**: Navigation and user menu
- **Sidebar**: Module navigation
- **Dashboard**: Overview and statistics
- **Forms**: User, product, order, and template forms
- **Tables**: Data display with sorting and filtering
- **Modals**: Confirmation dialogs

## 🚀 Deployment

### Frontend Deployment
```bash
# Build for production
ng build --configuration production

# Deploy to static hosting (Netlify, Vercel, etc.)
```

### Backend Deployment
```bash
# Install production dependencies
npm install --production

# Start production server
npm start
```

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure CORS_ORIGIN is set correctly in backend .env
2. **MongoDB Connection**: Check MONGO_URI in backend .env
3. **Port Conflicts**: Change PORT in backend .env if 5000 is in use
4. **API Errors**: Check external API availability and credentials
5. **Authentication**: Verify JWT token is valid and not expired

### Development Tips

- Use browser dev tools to monitor API calls
- Check backend console for server logs
- Verify MongoDB connection in backend logs
- Test external APIs independently
- Check network tab for API request/response details

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.
