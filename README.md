# TaskMate - Real-Time Task Management Application

TaskMate is a modern, real-time task management application that helps users organize their tasks efficiently with drag-and-drop functionality, real-time updates, and a beautiful responsive interface.

## 🌐 Live Links

- Frontend: [TaskMate Client](https://taskmate-9c56d.web.app)
<!-- - Backend: [TaskMate Server](https://taskmate-server.vercel.app) -->

## ✨ Key Features

- Real-time task synchronization
- Drag-and-drop task organization
- User authentication with Firebase
- Dark/Light theme support
- Responsive design
- Task categorization
- Persistent task ordering

## 🛠️ Technologies Used

### Frontend
- React (v19)
- Vite
- Tailwind CSS
- @dnd-kit (Drag and Drop)
- Firebase Authentication
- React Hot Toast
- Axios
- Server-Sent Events (SSE)

### Backend
- Node.js
- Express.js
- MongoDB
- CORS
- Dotenv
- Morgan (logging)

## 📦 Dependencies

### Frontend Dependencies
```json
{
  "@dnd-kit/core": "^6.0.0",
  "axios": "^1.6.0",
  "firebase": "^10.5.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-hot-toast": "^2.4.1",
  "tailwindcss": "^3.3.0"
}
```

### Backend Dependencies
```json
{
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "mongodb": "^6.2.0",
  "morgan": "^1.10.0"
}
```

## 🚀 Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Firebase account

### Frontend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/rimasultana/TaskMate
   cd taskmate/client
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env` file in the client directory
   ```env
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   VITE_backendUrl=your_backend_url
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to server directory
   ```bash
   cd ../server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create `.env` file in the server directory
   ```env
   DB_USER=your_mongodb_user
   DB_PASS=your_mongodb_password
   PORT=5000
   ```

4. Start the server
   ```bash
   npm start
   ```

## 📱 Usage

1. Sign up/Login using Firebase authentication
2. Create new tasks with title, description, and category
3. Drag and drop tasks between different status columns
4. Edit or delete tasks as needed
5. Toggle between dark and light themes
6. Tasks automatically sync across all open windows

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 👤 Author

**Rima Sultana**
- GitHub: [@rimasultana](https://github.com/rimasultana)
- Portfolio: [rimasultana.com](https://rimasultana.vercel.app/)

## 🙏 Acknowledgments

- Firebase for authentication
- MongoDB Atlas for database hosting
- Vercel for hosting the application
