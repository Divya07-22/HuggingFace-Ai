# 🏦 KodBank — Full Stack Banking Application

A full-stack banking web application built with **React + Vite** (frontend) and **Node.js + Express + MySQL** (backend), deployed on **Vercel**.

## 🌐 Live Deployment

| Service | URL |
|---------|-----|
| **Backend API** | [https://banking-app-sigma-six.vercel.app](https://banking-app-sigma-six.vercel.app) |
| **Frontend** | *(Your Vercel frontend URL)* |

---

## ✨ Features

- 🔐 **User Registration & Login** with JWT authentication
- 🧾 **Role-based access** — Customer & Admin
- 📊 **Dashboard** with spending analytics and transaction summaries
- 🌙 **Dark theme** premium UI with Tailwind CSS
- ☁️ **Cloud MySQL** via Aiven — persistent database

---

## 🏗️ Project Structure

```
banking-app/
├── Backend/              # Node.js + Express API
│   ├── controllers/      # Auth logic
│   ├── routes/           # API routes
│   ├── db/               # MySQL connection
│   ├── scripts/          # DB init scripts
│   ├── index.js          # Entry point
│   └── vercel.json       # Vercel backend config
│
└── Frontend/             # React + Vite SPA
    ├── src/
    │   ├── pages/        # Login, Register, Dashboard
    │   └── components/   # Sidebar, Cards, Graphs
    ├── vercel.json       # Vercel SPA routing config
    └── vite.config.js    # Dev server proxy
```

---

## ⚙️ Environment Variables

### 🔵 Backend — Add these in Vercel Dashboard

| Variable | Description |
|----------|-------------|
| `DB_HOST` | Aiven MySQL host |
| `DB_PORT` | Aiven MySQL port |
| `DB_USER` | Aiven MySQL username |
| `DB_PASSWORD` | Aiven MySQL password |
| `DB_NAME` | Aiven database name |
| `JWT_SECRET` | Secret key for JWT signing |
| `FRONTEND_URL` | Your deployed frontend Vercel URL (for CORS) |

### 🟠 Frontend — Add in Vercel Dashboard

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Your deployed backend URL: `https://banking-app-sigma-six.vercel.app` |

---

## 🚀 Local Development Setup

### 1. Clone the repo

```bash
git clone https://github.com/Divya07-22/BankingApp.git
cd BankingApp/banking-app
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `Backend/.env`:
```env
DB_HOST=mysql-ca3d7b-sahyadri-fcdc.b.aivencloud.com
DB_PORT=11812
DB_USER=avnadmin
DB_PASSWORD=your_password
DB_NAME=defaultdb
JWT_SECRET=supersecretkey123
PORT=5000
FRONTEND_URL=http://localhost:5173
```

Initialize database and run server:
```bash
npm run init-db
npm run dev
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create `Frontend/.env`:
```env
VITE_API_URL=http://localhost:5000
```

Start dev server:
```bash
npm run dev
```

Open `http://localhost:5173`

---

## ☁️ Vercel Deployment Guide

### Backend
1. Go to [vercel.com](https://vercel.com) → New Project → Import `banking-app/Backend`
2. Set **Root Directory** to `Backend`
3. Add all backend environment variables in **Project Settings → Environment Variables**
4. Deploy ✅

### Frontend
1. New Project → Import `banking-app/Frontend`
2. Set **Root Directory** to `Frontend`
3. Add `VITE_API_URL=https://banking-app-sigma-six.vercel.app` in Environment Variables
4. Deploy ✅
5. Copy your frontend URL and add it as `FRONTEND_URL` in the **backend** project's environment variables
6. Redeploy the backend ✅

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|----------|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express.js |
| Database | MySQL (Aiven Cloud) |
| Authentication | JWT + bcrypt |
| Deployment | Vercel (both services) |
| Icons | Lucide React |
| Charts | Recharts |

---

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login and receive JWT |
| `GET` | `/` | Health check |

---

## 🐛 Bug Fixes Applied (Deployment)

| Issue | Root Cause | Fix |
|-------|------------|-----|
| Login fails on Vercel | Used relative `/api/auth/login` (only works via Vite dev proxy) | Changed to `${VITE_API_URL}/api/auth/login` |
| Register fails on Vercel | `VITE_API_URL` was `localhost:5000` baked into build | Set `VITE_API_URL` in Vercel env vars |
| CORS errors | Backend hardcoded a wrong frontend URL | Backend now reads `FRONTEND_URL` from env var |
| `/login` 404 on Vercel | No SPA routing fallback | Added `Frontend/vercel.json` with rewrites |
