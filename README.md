# Booking App

A simple web app for booking appointments, with **patient slot booking** and **admin slot management**.

---

## 🛠 Tech Stack

| Layer      | Technology            | Pros                              | Cons                        |
| ---------- | --------------------- | --------------------------------- | --------------------------- |
| **Frontend** | React, React Router   | ⚡ Fast UI, smooth routing         | 📚 Steep learning curve      |
| **Backend**  | Node.js, Express, MongoDB | 🚀 Scalable, flexible data         | ❗ NoSQL risks data inconsistency |
| **Auth**     | JWT with cookies      | 🔒 Secure, stateless               | 📶 Needs careful CORS setup  |

---

## 🚀 Run Locally

**Prerequisites:**  
- Node.js  
- MongoDB  
- npm

**Backend:**
```bash
cd booking-app
npm install
npm start
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file in `backend/`:

```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/booking-app
SECRET_KEY=your_jwt_secret
```

---

## 🌍 Deployment Steps

### Backend (Render):

1. **Create Web Service** on Render.
2. Connect GitHub repo.
3. Set env vars: `PORT`, `MONGODB_URI`, `SECRET_KEY`.
4. Set start command: `npm start`.
5. **Deploy**.

### Frontend (Render):

1. **Create project** on Render.
2. Connect GitHub repo (`client`).
3. Set build: `npm run build`, output: `dist`.
4. **Deploy**.

---

## ⚠️ Limitations & Next Steps

- **Issues:**  
  - No form validation  
  - Weak booking concurrency  
  - Generic error messages

**2 Hours Improvement Plan:**
- ✅ Add form validation _(1 hr)_
- ✅ Improve error messages _(0.5 hr)_
- ✅ Fix logout to clear data _(0.5 hr)_

---

## 🏗 Architecture Notes

**Folder Structure:**

- **Backend:**  
  - `controllers/`, `middlewares/`, `models/`, `routes/` — for modularity.
- **Frontend:**  
  - `src/components/` — reusable UI  
  - `App.jsx` — routes

**Why?**  
➡️ Separates concerns, easy to scale.

---

## 🔑 Auth & RBAC

- **JWT in cookies**
- `isAuthenticated` middleware sets `req.user`
- `isAdmin` checks `role: "admin"`

---

## ⚡ Error Handling

- **Backend:** returns `{ success, message }`
- **Frontend:** shows alerts  
- _Tip: Add specific error codes for clarity_

---
