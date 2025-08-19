Booking App
A simple web app for booking appointments, with patient slot booking and admin slot management.
Tech Stack

Frontend: React, React Router
Pros: Fast UI, smooth routing.
Cons: Steep learning curve.


Backend: Node.js, Express, MongoDB
Pros: Scalable, flexible data.
Cons: NoSQL risks data inconsistency.


Auth: JWT with cookies
Pros: Secure, stateless.
Cons: Needs careful CORS setup.



Run Locally
Prerequisites: Node.js, MongoDB, npm
Backend:
cd booking-app
npm install
npm start

Frontend:
cd client
npm install
npm run dev

Environment Variables
In backend/.env:
PORT=8000
MONGODB_URI=mongodb://localhost:27017/booking-app
SECRET_KEY=your_jwt_secret

Deployment Steps
Backend (Render):

Create Web Service on Render.
Connect GitHub repo.
Set env vars: PORT, MONGODB_URI, SECRET_KEY.
Set start command: npm start.
Deploy.

Frontend (Vercel):

Create project on Vercel.
Connect GitHub repo (client).
Set build: npm run build, output: dist.
Deploy.

Limitations & Next Steps

Issues: No form validation, weak booking concurrency, generic error messages.
2 Hours:
Add form validation (1 hr).
Improve error messages (0.5 hr).
Fix logout to clear data (0.5 hr).



Architecture Notes

Folders:
Backend: controllers/, middlewares/, models/, routes/ for modularity.
Frontend: src/components/ for reusable UI, App.jsx for routes.
Why: Separates concerns, easy to scale.


Auth & RBAC: JWT in cookies, isAuthenticated sets req.user, isAdmin checks role: "admin".
Errors: Backend returns { success, message }, frontend shows alerts. Add specific error codes for clarity.
