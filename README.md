# Durga Puja Donation & Expense Management System

A full-stack web application developed to manage donations, volunteer records, receipts, and expenses for a Durga Puja mandal.

## Live Demo

- **Frontend:** https://durga-puja-management.vercel.app
- **Backend:** https://durga-puja-management.onrender.com

## Project Overview

The system provides an admin dashboard to manage financial activities and maintain organized records during Durga Puja events.

## Features

- **Dashboard:** View total donations, total expenses, and remaining balance.
- **Donation Management:** Add and manage donation records.
- **Volunteer Management:** Maintain volunteer information.
- **Receipt Management:** Manage donation receipts.
- **Expense Management:** Record and track event expenses.
- **Bill Uploads:** Upload expense bill images using Cloudinary.
- **Database Management:** Store application data using MongoDB Atlas.

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |
| Version Control | Git, GitHub |

## Project Structure

```text
durga-puja-management/
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       └── routes/
├── frontend/
│   ├── public/
│   └── src/
└── README.md
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd durga-puja-management
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example` and configure your environment variables.

### 3. Frontend setup

```bash
cd frontend
npm install
```

Configure `VITE_API_URL` in your frontend environment.

### 4. Run the application

Start the backend and frontend separately using the scripts defined in their respective `package.json` files.

## Environment Variables

**Backend**
- PORT
- MONGO_URI
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET

**Frontend**
- VITE_API_URL

Never upload actual credentials or `.env` files to GitHub.

## Developer

**Somesh Raut**

- GitHub: https://github.com/somesh0412
- LinkedIn: https://www.linkedin.com/in/somesh-raut-04457529a/
