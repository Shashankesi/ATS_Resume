# 🚀 SmartCareer AI - 5-Minute Quick Start

## Installation (2 minutes)

### 1. Terminal 1 - Backend
```bash
cd backend
npm install
npm start
```
Expected: `Server running on port 5000`

### 2. Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```
Expected: `Local: http://localhost:5173/`

## Access (1 minute)

- **Home:** http://localhost:5173/
- **Create Account:** Click "Sign Up"
- **Login:** Use test account or Google

## Test Features (2 minutes)

1. **Home Page** ✅
   - See resume mockup visualization
   - Premium navbar with dropdown
   - Beautiful gradient design

2. **Features Dropdown**
   - Hover over "Features" in navbar
   - See all 6 AI tools listed

3. **Jobs** `/jobs`
   - 8+ job listings
   - Match scoring
   - Save feature

4. **AI Chat** `/ai-chat`
   - Ask career questions
   - Get instant responses
   - Quick question templates

5. **Cover Letter** `/cover-letter`
   - Multi-step wizard
   - AI-generated letters
   - Download/copy options

## Done! 🎉

Your SmartCareer AI is now running with:
- ✅ Premium UI/UX
- ✅ 7 working features
- ✅ Google Sign-In
- ✅ Fully responsive
- ✅ Production ready

---

## Environment Setup (Optional)

Create `.env` in frontend folder:
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
```

Create `.env` in backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartcareer
JWT_SECRET=your_secret_key_here
```

---

## Quick Navigation

### For Users
1. Click "Get Started" on home
2. Register with email/Google
3. Access all 7 features
4. Use AI tools

### For Developers
1. Check `src/pages/` for features
2. Check `src/components/NavbarEnhanced.jsx` for navbar
3. Backend API in `backend/routes/`
4. Styling in `src/index.css`

---

## Next Steps

- [ ] Configure Firebase credentials
- [ ] Connect to MongoDB Atlas
- [ ] Deploy to Vercel/Heroku
- [ ] Add your branding
- [ ] Customize features

**Happy coding! 🎉**
