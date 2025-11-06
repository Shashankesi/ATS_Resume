# SmartCareer - Quick Start Guide

🚀 **Get Started in 5 Minutes**

## Option 1: Local Development (Easiest for Testing)

### Prerequisites
- Node.js v16+ installed
- npm or yarn
- MongoDB Atlas account (free tier available)

### Step 1: Clone & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/smartcareer.git
cd smartcareer

# Install backend dependencies
cd backend
npm install
cp .env.example .env

# Install frontend dependencies (new terminal)
cd frontend
npm install --legacy-peer-deps
```

### Step 2: Configure Environment

**Backend `.env`**:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartcareer
JWT_SECRET=your_secret_key_here_min_32_characters
AI_MODE=MOCK
```

**Frontend `.env.local`**:
```env
VITE_API_URL=http://localhost:5000
```

### Step 3: Start Development Servers

```bash
# Terminal 1: Backend
cd backend
npm run dev
# Backend running on http://localhost:5000

# Terminal 2: Frontend
cd frontend
npm run dev
# Frontend running on http://localhost:5173
```

### Step 4: Test the App

1. Open http://localhost:5173
2. Click "Sign Up"
3. Create an account
4. Upload a resume
5. Try the AI features!

---

## Option 2: Deploy to Production (Recommended)

### Prerequisites
- GitHub account
- Vercel account (for frontend)
- Render account (for backend)
- MongoDB Atlas cluster
- Firebase project

### Step 1: Deploy Backend to Render

1. **Create MongoDB Cluster**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create free M0 cluster
   - Add IP whitelist: `0.0.0.0/0`
   - Create database user
   - Copy connection string

2. **Deploy to Render**
   - Push code to GitHub
   - Go to https://render.com
   - Create new "Web Service"
   - Connect your GitHub repo
   - Set environment variables:
     ```env
     MONGO_URI=mongodb+srv://...
     JWT_SECRET=your_secret_here
     NODE_ENV=production
     ```
   - Deploy!

3. **Note the URL**: `https://smartcareer-api.onrender.com`

### Step 2: Deploy Frontend to Vercel

1. **Build & Push**
   ```bash
   cd frontend
   npm run build
   git add .
   git commit -m "Production build"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Connect GitHub repository
   - Set environment variable:
     ```env
     VITE_API_URL=https://smartcareer-api.onrender.com
     ```
   - Deploy!

3. **Note the URL**: `https://smartcareer.vercel.app`

---

## 🧪 Testing the App

### User Registration
1. Click "Sign Up"
2. Enter email, password, name
3. Click "Create Account"
4. You should see success toast notification

### Resume Upload
1. Go to Dashboard
2. Click "Upload Resume" (floating button or section)
3. Select a PDF, DOCX, or TXT file
4. See ATS analysis and suggestions

### AI Features
1. Click any AI tool card:
   - **AI Summary**: Generate professional summary
   - **ATS Analyzer**: Check resume against job description
   - **Career Coach**: Chat with AI advisor
   - **Skill Gap**: Identify missing skills
   - **Job Matching**: See recommended jobs
   - **Cover Letter**: Generate tailored cover letter

### Theme Toggle
1. Click the Sun/Moon icon in navbar
2. Theme changes instantly
3. Preference is saved

### Achievements
1. Scroll to bottom of dashboard
2. See locked/unlocked achievements
3. Upload more resumes to unlock badges

---

## 📱 Features Overview

### Core Features
- ✅ User authentication (email + Google)
- ✅ Resume upload & parsing (PDF/DOCX/TXT)
- ✅ ATS score calculation (5-factor algorithm)
- ✅ AI-powered suggestions
- ✅ Career coaching chatbot
- ✅ Job recommendations
- ✅ Skill gap analysis
- ✅ Cover letter generator

### UI/UX Features
- ✅ Dark/Light mode toggle
- ✅ Glassmorphic design
- ✅ Smooth animations
- ✅ Toast notifications
- ✅ Responsive mobile design
- ✅ Onboarding tutorial
- ✅ Achievement badges
- ✅ Text-to-speech support

---

## 🔧 Common Issues & Solutions

### Backend Won't Start
```bash
# Check if port 5000 is in use
lsof -i :5000

# If in use, kill the process or use different port
PORT=5001 npm run dev
```

### Database Connection Error
```bash
# Check connection string
echo $MONGO_URI

# Test connection
mongosh "mongodb+srv://username:password@cluster.mongodb.net/"

# Update .env with correct string
```

### Frontend Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Resume Upload Not Working
- Check file is under 5MB
- Ensure file is PDF, DOCX, DOC, or TXT
- Check backend is running on port 5000
- Check CORS is enabled in backend

---

## 📊 Performance Tips

### Frontend
- Enable dark mode (uses less battery on OLED screens)
- Component lazy loading is enabled
- Images are optimized
- CSS is minified

### Backend
- Database queries are indexed
- Rate limiting prevents abuse
- Response compression is enabled
- Connection pooling is configured

---

## 🛡️ Security Notes

- All API requests are rate-limited
- Input is validated on all endpoints
- Passwords are hashed with bcrypt
- JWT tokens expire after 7 days
- CORS is restricted to whitelisted domains
- Security headers are enabled (Helmet)

---

## 📚 Documentation

- **Full Setup**: See `DEPLOYMENT_GUIDE.md`
- **Project Details**: See `PROJECT_SUMMARY.md`
- **Code Structure**: See file paths in PROJECT_SUMMARY.md

---

## 🎯 Next Steps After Setup

1. **Customize Branding**
   - Update logo in `navbar`
   - Change colors in `tailwind.config.js`
   - Update title in `index.html`

2. **Integrate Real AI**
   - Get Gemini API key
   - Set `AI_MODE=GEMINI` in `.env`
   - Test with real AI responses

3. **Add Your Content**
   - Update job descriptions
   - Add company branding
   - Customize welcome messages

4. **Monitor & Optimize**
   - Set up error logging (Sentry)
   - Monitor performance (DataDog)
   - Track usage analytics

---

## 💡 Pro Tips

- **Keyboard Shortcuts**: Tab through form fields quickly
- **Theme Persistence**: Theme preference saved in localStorage
- **Mobile First**: App is fully responsive on mobile
- **Offline Support**: Component data cached in localStorage
- **API Mocking**: Replace mock responses with real Gemini API

---

## 📞 Getting Help

- Check deployment guide troubleshooting section
- Review error messages in browser console
- Check backend logs with `npm run dev`
- Verify all environment variables are set

---

## 🎉 You're All Set!

Your SmartCareer instance is now running!

- 🌐 **Frontend**: http://localhost:5173 (dev) or https://smartcareer.vercel.app (prod)
- ⚙️ **Backend**: http://localhost:5000 (dev) or https://smartcareer-api.onrender.com (prod)
- 📊 **Database**: MongoDB Atlas

**Enjoy building careers! 🚀**
