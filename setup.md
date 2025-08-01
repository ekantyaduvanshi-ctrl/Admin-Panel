# Admin Panel Setup Guide

## Quick Setup Steps

### 1. Install Dependencies
```bash
npm install
cd backend
npm install
cd ..
```

### 2. Create Environment File
```bash
cp backend/env.example backend/.env
```

### 3. Start MongoDB
Make sure MongoDB is running on your system or use MongoDB Atlas.

### 4. Seed the Database
```bash
cd backend
npm run seed
cd ..
```

### 5. Start the Application
```bash
npm run dev
```

## Access Points
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5000

## Default Login
- **Email**: admin@company.com
- **Password**: admin123

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your `.env` file has correct `MONGO_URI`
- For local MongoDB: `mongodb://localhost:27017/admin_panel_db`

### Port Issues
- Frontend runs on port 4200
- Backend runs on port 5000
- Check if ports are available

### CORS Issues
- Ensure `CORS_ORIGIN` in `.env` matches your frontend URL
- Default: `http://localhost:4200` 