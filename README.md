NoteForge 📝
---
NoteForge is a modern, full-stack note-taking application built with Next.js and Node.js. It allows users to create, manage, and organize their notes securely in an elegant, responsive interface. Designed for speed, simplicity, and scalability, NoteForge is your personal productivity hub.
---

✨ Features

✅ Secure User Authentication (JWT-based)

✅ Create, Edit, and Delete Notes

✅ Responsive UI optimized for all devices

✅ Protected Routes for authenticated users

✅ Persistent Login using cookies

✅ Email OTP Verification for signup

✅ Minimal, Modern Design
---
```
🛠 Tech Stack
Frontend

Next.js 15 (App Router + Turbopack)

React Hooks

Tailwind CSS for styling

Axios for API calls

js-cookie for managing tokens

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT (JSON Web Tokens) for authentication

bcrypt for password hashing

📂 Project Structure
NoteForge/
│
├── backend/               # Express.js backend
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   └── server.js          # Entry point
│
├── frontend/              # Next.js frontend
│   ├── src/app/           # App Router pages
│   ├── components/        # UI components
│   ├── styles/            # Global and custom styles
│   └── package.json
│
└── README.md

⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/your-username/noteforge.git
cd noteforge

2. Backend Setup
cd backend
npm install


Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=5000


Start the backend:

npm run server

3. Frontend Setup
cd ../frontend
npm install


Create a .env file inside the frontend folder:

NEXT_PUBLIC_API_BASE=http://localhost:5000


Start the frontend:

npm run dev

🚀 Run in Production

Build the frontend for production:

npm run build
npm run start

🔐 Authentication Flow

Signup → Email OTP verification → Dashboard access

JWT stored in cookies for persistent login

Protected routes for authenticated users

📸 Screenshots

(Add your UI screenshots here – Dashboard, Login, Signup, etc.)

📦 Deployment

Deploy easily on:

Frontend → Vercel

Backend → Render
 / Railway

📝 License

MIT License

Developed by Anurudha Sarkar

```
