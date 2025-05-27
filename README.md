# 📝 BlogCraft - Modern Blogging Platform

A beautiful, full-stack blogging platform built with React, Express, and PostgreSQL. Create, share, and discover amazing stories with a vibrant community of writers.

![BlogCraft Preview](https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## ✨ Features

### 🎨 **Beautiful User Interface**
- Modern, responsive design with Tailwind CSS
- Dark/light mode support
- Smooth animations and transitions
- Mobile-first approach

### ✍️ **Rich Writing Experience**
- Intuitive blog post editor with preview mode
- Support for images, formatting, and code blocks
- Draft saving functionality
- Tag system for better organization

### 🔐 **Secure Authentication**
- JWT-based authentication system
- Secure password hashing with BCrypt
- Protected routes and user sessions
- User profile management

### 💬 **Community Features**
- Comment system for reader engagement
- User profiles and author pages
- Advanced search functionality
- Real-time interactions

### 🏗️ **Modern Architecture**
- Full-stack TypeScript application
- RESTful API design
- Database integration with Drizzle ORM
- Component-based frontend architecture

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blogcraft.git
   cd blogcraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/blogcraft
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000` to see your BlogCraft platform!

## 📁 Project Structure

```
blogcraft/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── lib/            # Utilities and configurations
│   │   └── hooks/          # Custom React hooks
│   └── index.html
├── server/                 # Backend Express application
│   ├── db.ts              # Database configuration
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data access layer
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and validation
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Wouter** - Lightweight routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type-safe server development
- **PostgreSQL** - Robust database
- **Drizzle ORM** - Type-safe database queries
- **JWT** - Authentication tokens
- **BCrypt** - Password hashing

### Development Tools
- **Vite** - Fast build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **tsx** - TypeScript execution

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new user account |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user profile |

### Blog Post Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all published posts |
| GET | `/api/posts/:id` | Get specific post with comments |
| POST | `/api/posts` | Create new post (auth required) |
| PUT | `/api/posts/:id` | Update post (auth required) |
| DELETE | `/api/posts/:id` | Delete post (auth required) |
| GET | `/api/posts/search` | Search posts by query/tags |

### Comment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts/:id/comments` | Get post comments |
| POST | `/api/posts/:id/comments` | Add comment (auth required) |
| DELETE | `/api/comments/:id` | Delete comment (auth required) |

## 🎯 Usage Examples

### Creating Your First Post

1. Register an account or log in
2. Click "Write" in the navigation
3. Add a compelling title and content
4. Use tags to categorize your post
5. Preview your post before publishing
6. Click "Publish Post" to share with the community

### Engaging with Content

- Browse posts on the homepage
- Use the search feature to find specific topics
- Leave thoughtful comments on posts you enjoy
- Follow interesting authors

## 🚀 Deployment

### Environment Setup

For production deployment, ensure these environment variables are set:

```env
DATABASE_URL=your-production-database-url
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

### Build for Production

```bash
npm run build
npm start
```

## 🤝 Contributing

We welcome contributions to BlogCraft! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Write TypeScript for type safety
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits focused and descriptive

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Beautiful images provided by [Unsplash](https://unsplash.com)
- Icons from [Lucide React](https://lucide.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)

## 📧 Support

If you have any questions or need help:

- Open an issue on GitHub
- Check out our [documentation](docs/)
- Join our community discussions

---

**Made with ❤️ by the BlogCraft team**

*Happy blogging! 🎉*