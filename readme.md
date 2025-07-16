# Digital Archive Project

This repository contains the full-stack source code for the **Digital Archive Project**, a web-based legal documentation system developed for managing and archiving reports of human rights violations. It features multi-role authentication, secure file upload, and a dynamic dashboard interface for tracking legal cases.

## 🚀 Features

### Backend
- RESTful API built with Express.js and TypeScript
- User authentication with JWT (Access + Refresh tokens)
- Role-based access control (RBAC)
- File upload integration via AWS S3
- MongoDB database access using Mongoose
- Modular and scalable architecture

### Frontend
- Vite-powered React.js SPA
- Client-side routing with React Router DOM
- Global state management via Zustand and Context API
- Tailwind CSS for styling
- Axios for API communication

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, TypeScript, Mongoose, JWT, AWS SDK
- **Frontend:** React.js, Vite, Zustand, Tailwind CSS
- **Database:** MongoDB
- **Other:** Postman, Axios, dotenv, React Router DOM

## 📁 Project Structure

```
DIGITAL-ARCHIVE-PROJECT/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   └── app.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   └── main.jsx
│   └── package.json
```

## ⚙️ Getting Started

### Backend

1. Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. For production build:
```bash
npm run build-start
```

### Frontend

1. Navigate to the frontend directory and install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

## 📄 License

This project is **not open source**. All rights reserved © 2025 Mehmet Yıldırım. See [LICENSE](./LICENSE) for more information.
