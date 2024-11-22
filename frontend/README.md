# Society Management System - Frontend

The frontend application for the society  Management System, built with React and TypeScript.

## 🚀 Features

- Modern, responsive UI built with Tailwind CSS
- Type-safe development with TypeScript
- Component-based architecture
- Secure authentication system
- Real-time data updates
- Interactive dashboards and reports

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components
│   ├── security/       # Security management components
│   ├── financial/      # Financial management components
│   ├── facility/       # Facility management components
│   └── visitor/        # Visitor management components
├── pages/              # Page components
├── services/           # API services
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── context/            # React context providers
└── assets/            # Static assets
```

## 🛠️ Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- Axios
- React Query
- React Hook Form
- Zod for validation

## 🔧 Setup & Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## 📱 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API URL | http://localhost:5000/api |

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📚 Code Style

This project uses:
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks

## 🔄 State Management

- React Context for global state
- React Query for server state
- Local state with useState where appropriate

## 📦 Component Library

Key components include:
- DataTable - Reusable table component
- Modal - Popup dialog component
- Form - Form components with validation
- Card - Container component
- Button - Styled button components

## 🔐 Authentication

- JWT-based authentication
- Protected routes
- Role-based access control
- Automatic token refresh

## 🌐 API Integration

- Axios for API calls
- Interceptors for token management
- Error handling middleware
- Request/response transformers

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## 🎨 Theme Customization

- Tailwind CSS configuration
- Custom color palette
- Typography system
- Spacing scale

## 🔧 Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 Development Guidelines

1. Follow TypeScript best practices
2. Write unit tests for new components
3. Update documentation for new features
4. Follow the existing code style
5. Use conventional commits
