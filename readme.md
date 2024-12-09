# Society Management System

A comprehensive web application for managing residential facilities, built with React (Frontend) and Node.js/Express (Backend).


test Admin side login 
admin@example.com   
admin123

 test user side login 
user@example.com   
user123  

## 🚀 Features

- Security Management (Guards, Protocols)
- Financial Management (Expenses, Income, Notes)
- Facility Management
- Resident Management
- Visitor Management
- Announcement System

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API communication
- React Hooks for state management

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- Mongoose for database modeling

## 📦 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:
   - Create `.env` file in backend directory
   - Create `.env` file in frontend directory

4. Start the development servers:
```bash
# Start backend server (from backend directory)
npm run dev

# Start frontend development server (from frontend directory)
npm start
```

## 🌐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/society-manager
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📚 API Documentation

### Security Management
- GET /api/security/guards - Get all security guards
- POST /api/security/guards - Create new security guard
- PUT /api/security/guards/:id - Update security guard
- DELETE /api/security/guards/:id - Delete security guard

### Financial Management
- GET /api/financial/expenses - Get all expenses
- POST /api/financial/expenses - Create new expense
- GET /api/financial/incomes - Get all incomes
- POST /api/financial/incomes - Create new income

### Facility Management
- GET /api/facilities - Get all facilities
- POST /api/facilities - Create new facility
- PUT /api/facilities/:id - Update facility
- DELETE /api/facilities/:id - Delete facility

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 🤝 Support

For support, email [your-email] or create an issue in the repository.
**Project Team**
Parth, Pinki, Ravina, and Devang.
