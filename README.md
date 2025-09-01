NoteForge 

---

NoteForge is a modern, full-stack note-taking app built with Next.js and Node.js. It helps users create, organize, and manage notes securely in a responsive and elegant interface.


```

✨ Features -----

    Secure user authentication (JWT-based)

    Email OTP verification & google sigin at ease.

    Create : delete notes : user detail card

    Proper form Validation 

    Persistent login with Passport

    Protected routes for authenticated users

    Responsive and minimal UI for quick MVP development


🛠 ----- Tech Stack -----

Frontend  -  Next.js 15 + TypeScript + Tailwind CSS  

Backend   -  Node + TypeScript

Database  -  MongoDB + Mongoose


⚙️ ----- Setup -----

 Download zip file

Environment variable setup


--  .env for frontend   --   ( Create frontend folder it at the root of frontend )

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=2d

# SMTP (Email Service)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:3000



--  .env for frontend   --   ( Create frontend folder it at the root of frontend )

NEXT_PUBLIC_API_BASE=http://localhost:your_port/api
NEXT_PUBLIC_GOOGLE_AUTH_URL=http://localhost:your_port/api/auth/google


    # Frontend Initial Commands -
       cd frontend
       npm i && npm run build
       npm run dev

    # Backend Initial Commands -
       cd backend
       npm i && npm run build
       npm start

 # Note :-  Also add the hosted URI origin to Credentials -> OAuth 2.0 Client IDs 
            -> https://console.cloud.google.com/



----- 🚀 Production Build -----

Frontend 
start command:- npm i && npm run build
run command:-   npm start

Backend
start command:- npm i && npm run build
run command:-   npm start


change .env setup on render

Next Frontend (web services)
:

NEXT_PUBLIC_API_BASE=https://abc.onrender.com/api
NEXT_PUBLIC_GOOGLE_AUTH_URL=https://abc.onrender.com/api/auth/google


Node Backend (web services)
:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=2d

SMTP (Email Service)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FROM_EMAIL=your_email@gmail.com

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your_frontend_hosted_url/api/auth/google/callback

FRONTEND_URL=https://your_frontend_hosted_ur

 # Note :-  Also add the hosted URI origin to Credentials -> OAuth 2.0 Client IDs 
            -> https://console.cloud.google.com/



📦 Deployment

Frontend (Web Services) + Backend (Web Services) ----> Render 

# Note:  You can choose any other relevant cloud options since MVP build within 2 days 
         hence Render choosen for faster MVP deployment 


📝 Developed by Anurudha Sarkar

```

