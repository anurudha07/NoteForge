NoteForge 

---

NoteForge is a modern, full-stack note-taking app built with Next.js and Node.js. It helps users create, organize, and manage notes securely in a responsive and elegant interface.

---

```

✨ Features -----

✅ Secure user authentication (JWT-based)

✅ Create and delete notes

✅ Email OTP verification & google sigin at ease.

✅ Persistent login with cookies

✅ Protected routes for authenticated users

✅ Responsive and minimal UI for quick MVP development


🛠 ----- Tech Stack -----

Frontend  -  Next.js 15 + TypeScript + Tailwind CSS + 

Backend   -  Node + Express.js

Database  -  MongoDB + Mongoose


⚙️ ----- Setup -----
1. Download zip file 
cd noteforge

2. Backend
cd backend
npm install


Create backend/.env:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
PORT=5000


Run backend:

npm run server

3. Frontend
cd ../frontend
npm install


Create frontend/.env:

NEXT_PUBLIC_API_BASE=http://localhost:5000


Run frontend:

npm run dev

----- 🚀 Production Build -----
npm run build
npm run start

📦 Deployment

Frontend: Vercel

Backend: Render / Railway

📝 License

Developed by Anurudha Sarkar

```


Developed by Anurudha Sarkar
