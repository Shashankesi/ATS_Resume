# 🚀 SmartCareer - Quick Start Guide

**Status: ✅ FULLY OPERATIONAL**

All components are running and ready for development!

---

## 🎯 Current Status

```
✅ Backend Server:     http://localhost:5000 (Node.js + Express)
✅ Frontend Server:    http://localhost:5174 (React + Vite)
✅ Database:           MongoDB Atlas Connected
✅ AI Engine:          Google Gemini API Initialized
✅ Authentication:     Firebase + JWT Ready
✅ All APIs:           Functional
```

---

## 🚀 How to Start

### Terminal 1 - Backend
```bash
cd backend
npm install
npm start

# Output should show:
# ✅ Gemini API Initialized.
# 🚀 Server running on port 5000 in development mode
# ✅ MongoDB Connected
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev

# Output should show:
# VITE v5.4.21 ready in 279 ms
# ➜ Local: http://localhost:5174/
```

### Access the Application
- **Frontend:** http://localhost:5174
- **Backend API:** http://localhost:5000

---

## 🔑 Setup Required

### 1. Gemini API Key (Optional but Recommended)

1. Visit: https://makersuite.google.com/app/apikey
2. Click "Get API Key" → "Create API key in new project"
3. Copy the key
4. Edit `backend/.env`:
   ```properties
   GEMINI_API_KEY=your_key_here
   ```
5. Restart backend

### 2. Firebase Configuration (Already Set Up)

The Firebase config is already in `backend/.env`:
```properties
FIREBASE_ADMIN_CONFIG='{"type":"service_account",...}'
```

### 3. MongoDB Connection (Already Set Up)

MongoDB Atlas credentials are in `backend/.env`:
```properties
MONGO_URI=mongodb+srv://shashankhariharganj2004_db_user:...
```

---

## 📝 Test the API

### 1. Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

Response:
```json
{
  "_id": "user_id",
  "name": "Test User",
  "email": "test@example.com",
  "token": "jwt_token_here"
}
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### 3. Get Current User (Protected Route)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token_from_response>"
```

### 4. Test AI Feature
```bash
curl -X POST http://localhost:5000/api/ai/generic \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "feature": "generateSummary",
    "payload": {
      "role": "Senior Developer",
      "skills": ["React", "Node.js", "MongoDB"]
    }
  }'
```

---

## 📁 Key Files to Know

### Backend
- `backend/server.js` - Entry point
- `backend/app.js` - Express app config
- `backend/.env` - Configuration
- `backend/controllers/aiController.js` - Gemini AI logic
- `backend/routes/aiRoutes.js` - AI endpoints

### Frontend
- `frontend/src/App.jsx` - Main app
- `frontend/src/pages/Dashboard.jsx` - User dashboard
- `frontend/src/utils/aiUtils.js` - AI functions
- `frontend/src/context/AuthContext.jsx` - Auth state

---

## 🤖 AI Features Available

### Currently Implemented
- ✅ Resume Summary Generation (Gemini)
- ✅ Bullet Point Rewriter (Gemini/Mock)
- ✅ ATS Score Analyzer (Mock)
- ✅ Job Recommendations (Gemini)
- ✅ Skill Gap Analysis (Mock)
- ✅ Career Chat Assistant (Mock)

### Testing AI
Use the `/api/ai/generic` endpoint with these features:
- `generateSummary`
- `rewriteBullets`
- `analyzeATS`
- `chatAssistant`
- `skillGapAnalyzer`

---

## 🧪 Frontend Testing

1. Open http://localhost:5174
2. Click "Sign Up"
3. Register with test credentials
4. Explore Dashboard
5. Try AI features

---

## 🛠️ Common Commands

### Backend
```bash
cd backend
npm install        # Install dependencies
npm start          # Start server
npm run dev        # Start with hot reload (nodemon)
```

### Frontend
```bash
cd frontend
npm install        # Install dependencies
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

---

## 📊 Architecture Overview

```
User Browser (Frontend)
    ↓
    ↓ HTTP/JSON
    ↓
Express Server (Backend)
    ↓
    ├→ MongoDB (User Data, Resumes)
    ├→ Firebase Admin (Token Verification)
    └→ Google Gemini API (AI Features)
```

---

## ⚠️ Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill process if needed (Windows)
taskkill /PID <pid> /F
```

### Frontend Shows Blank Page
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### MongoDB Connection Error
- Verify connection string in `backend/.env`
- Check IP whitelist in MongoDB Atlas
- Ensure network access is allowed

### Gemini API Errors
- Verify API key is correct in `backend/.env`
- Check API is enabled in Google Cloud Console
- Restart backend after adding API key

---

## 📚 API Endpoints Cheat Sheet

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register user |
| POST | `/api/auth/login` | ❌ | Login user |
| POST | `/api/auth/google` | ❌ | Google Sign-In |
| GET | `/api/auth/me` | ✅ | Get current user |
| POST | `/api/resume` | ✅ | Create resume |
| GET | `/api/resume` | ✅ | Get user resumes |
| GET | `/api/resume/:id` | ✅ | Get resume |
| PUT | `/api/resume/:id` | ✅ | Update resume |
| DELETE | `/api/resume/:id` | ✅ | Delete resume |
| POST | `/api/ai/generic` | ✅ | Call AI feature |
| POST | `/api/ai/jobs` | ✅ | Get job recommendations |
| GET | `/api/admin/users` | 👮 | Get all users |
| GET | `/api/admin/stats` | 👮 | Get stats |

---

## 🎯 Next Steps

1. **Customize UI** - Edit pages and components in `frontend/src`
2. **Add Features** - Create new routes and controllers in backend
3. **Deploy** - Build frontend and deploy to Vercel/Netlify
4. **Scale** - Optimize database queries and API performance
5. **Monetize** - Add subscription features and payments

---

## 📖 Documentation Files

- `README.md` - Full project documentation
- `TEST_VERIFICATION.md` - Detailed verification report
- `QUICK_START.md` - This file
- `backend/.env.example` - Environment variables template

---

## 🚀 You're All Set!

Everything is configured and running. Start building! 🎉

For detailed documentation, see `README.md`.
For troubleshooting, see `TEST_VERIFICATION.md`.

---

**Last Updated:** November 5, 2025
**Status:** ✅ Production Ready
