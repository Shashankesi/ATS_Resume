# 🛠️ SmartCareer Local Usage Guide

This document provides consolidated steps for running the application and testing the core features locally using the provided MOCK AI Mode.

## 1. Project Setup Checklist

Before running, ensure you have:

1.  **MongoDB:** An instance is running (locally on `mongodb://localhost:27017` or via MongoDB Atlas).
2.  **Clean Structure:** The `backend/` and `frontend/` folders are clean and contain all the provided source code.
3.  **.env Files:** You have manually created and configured `.env` files in both the `backend/` and `frontend/` directories, with your unique `JWT_SECRET` and Firebase keys.

## 2. Run Commands

Open two separate terminal windows (one for backend, one for frontend).

### 2.1 Backend (API)

```bash
# Terminal 1
cd smartcareer/backend
npm install
npm start
# Output: 🚀 Server running on port 5000...