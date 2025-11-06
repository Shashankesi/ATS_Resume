# SmartCareer - Deployment Guide

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Database Configuration](#database-configuration)
5. [Environment Variables](#environment-variables)
6. [Deployment Options](#deployment-options)
7. [Security Checklist](#security-checklist)
8. [Monitoring & Maintenance](#monitoring--maintenance)

---

## System Requirements

### Minimum Requirements
- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **MongoDB**: v4.4 or higher
- **Storage**: 2GB minimum
- **Memory**: 2GB RAM minimum

### Recommended
- **Node.js**: v18 LTS
- **npm**: v9 or higher
- **Memory**: 4GB+ RAM
- **SSD**: For better performance

---

## Backend Setup

### 1. Local Development

```bash
cd backend
npm install
cp .env.example .env
```

### 2. Environment Configuration

Create `.env` file in backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/smartcareer
MONGO_DB_NAME=smartcareer

# Authentication
JWT_SECRET=your_jwt_secret_key_min_32_chars
JWT_EXPIRES_IN=7d

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Google Generative AI
GEMINI_API_KEY=your_gemini_api_key
AI_MODE=MOCK # Options: MOCK, GEMINI

# CORS
CORS_ORIGIN=http://localhost:5173,https://smartcareer.vercel.app

# File Upload
MAX_FILE_SIZE=5242880 # 5MB in bytes
ALLOWED_FILE_TYPES=pdf,doc,docx,txt
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
# Server will run on http://localhost:5000
```

### 5. Verify Setup

```bash
curl http://localhost:5000/api/health
# Should return: { status: 'ok' }
```

---

## Frontend Setup

### 1. Local Development

```bash
cd frontend
npm install --legacy-peer-deps
```

### 2. Environment Configuration

Create `.env.local` file in frontend directory:

```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 3. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 4. Start Development Server

```bash
npm run dev
# Frontend will run on http://localhost:5173
```

### 5. Build for Production

```bash
npm run build
# Output will be in ./dist directory
```

---

## Database Configuration

### MongoDB Atlas Setup

1. **Create Account**: https://www.mongodb.com/cloud/atlas
2. **Create Cluster**: 
   - Choose M0 (free tier) for testing
   - Choose M2 or higher for production
3. **Network Access**:
   - Go to Security → Network Access
   - Add IP: `0.0.0.0/0` (allow all) OR your specific IP
   - For production, use specific IP ranges
4. **Database User**:
   - Create database user with strong password
   - Grant readWrite permissions
5. **Connection String**:
   - Copy connection string
   - Replace `<username>`, `<password>`, and `<dbname>`

### Collections

The following collections will be auto-created:

```
- users (indexed: email, authProvider)
- resumes (indexed: userId, createdAt)
- aihistory (indexed: userId, createdAt)
```

---

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `production` |
| `MONGO_URI` | MongoDB connection | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing key | `your_secret_key_here` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIza...` |
| `FIREBASE_*` | Firebase config | See Firebase docs |
| `CORS_ORIGIN` | Allowed origins | `https://app.example.com` |

### Frontend (.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://api.example.com` |
| `VITE_FIREBASE_*` | Firebase config | From Firebase console |

---

## Deployment Options

### Option 1: Vercel (Frontend) + Render (Backend)

#### Deploy Frontend to Vercel

```bash
# 1. Push code to GitHub
git push origin main

# 2. Connect GitHub repo to Vercel
# - Go to https://vercel.com/new
# - Select repository
# - Configure environment variables
# - Deploy

# 3. Environment variables in Vercel:
VITE_API_URL=https://smartcareer-api.onrender.com
VITE_FIREBASE_API_KEY=...
```

#### Deploy Backend to Render

```bash
# 1. Create account at https://render.com
# 2. Create new Web Service
# 3. Connect GitHub repository
# 4. Configure:
#    - Build Command: npm install && npm run build
#    - Start Command: npm run start
# 5. Add environment variables:
MONGO_URI=...
JWT_SECRET=...
GEMINI_API_KEY=...
NODE_ENV=production
# 6. Deploy
```

### Option 2: Docker Deployment

#### Create Docker Images

```bash
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

# Frontend Dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Deploy with Docker Compose

```bash
docker-compose up -d
```

### Option 3: AWS (EC2 + RDS)

1. Create EC2 instance (Ubuntu 22.04 LTS, t3.medium)
2. Create RDS MongoDB cluster
3. Install Node.js and nginx
4. Deploy using PM2 for process management

```bash
# On EC2
sudo apt update && sudo apt upgrade
sudo apt install nodejs npm nginx git
git clone <repo>
cd smartcareer/backend
npm install
npm run build
pm2 start npm --name smartcareer -- start
pm2 startup
pm2 save
```

---

## Security Checklist

### Pre-Deployment

- [ ] All API routes use authentication
- [ ] Input validation on all endpoints
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Helmet security headers enabled
- [ ] API keys not committed to git
- [ ] Database backup enabled
- [ ] SSL certificate obtained

### Environment Variables

- [ ] `JWT_SECRET` is strong (>32 chars)
- [ ] All API keys are production keys
- [ ] CORS_ORIGIN limited to specific domains
- [ ] `NODE_ENV=production`
- [ ] Database credentials strong

### MongoDB

- [ ] IP whitelist configured (not 0.0.0.0/0)
- [ ] Database user has minimal permissions
- [ ] Automatic backups enabled
- [ ] Point-in-time recovery enabled

### Application

- [ ] Error messages don't leak sensitive info
- [ ] Logs are not exposing secrets
- [ ] HTTPS enforced
- [ ] Security headers validated
- [ ] All dependencies up to date

---

## Monitoring & Maintenance

### Health Checks

```bash
# Backend health
curl https://api.example.com/api/health

# Frontend
curl https://app.example.com/index.html
```

### Logs

```bash
# Backend logs (Render)
# Check in Render dashboard

# Frontend errors (Vercel)
# Check in Vercel Analytics

# Database (MongoDB)
# Check in MongoDB Atlas dashboard
```

### Updates

```bash
# Check for updates
npm outdated

# Update packages
npm update
npm audit fix

# Test after updates
npm test
npm run build
```

### Performance Optimization

```bash
# Frontend
- Enable Gzip compression ✓ (already in nginx)
- Optimize images
- Use CDN for static assets
- Enable Service Worker

# Backend
- Database query indexing ✓
- Connection pooling enabled ✓
- Response caching
- API rate limiting ✓
```

---

## Troubleshooting

### Backend Won't Start

```bash
# Check Node version
node --version

# Check port is available
lsof -i :5000

# Check MongoDB connection
npm run test:db

# Check logs
npm run dev 2>&1 | tee debug.log
```

### Frontend Build Fails

```bash
# Clear node_modules
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# Check Node version
node --version

# Clear cache
npm cache clean --force

# Rebuild
npm run build
```

### Database Connection Error

```bash
# Verify connection string
echo $MONGO_URI

# Test connection
mongosh "mongodb+srv://username:password@cluster.mongodb.net/smartcareer"

# Check IP whitelist in MongoDB Atlas
# Add current IP to Network Access
```

---

## First Time Setup Checklist

- [ ] Clone repository
- [ ] Create `.env` files (backend and frontend)
- [ ] Install dependencies: `npm install`
- [ ] Set up MongoDB Atlas
- [ ] Configure Firebase
- [ ] Get Gemini API key
- [ ] Test locally: `npm run dev`
- [ ] Create GitHub repository
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Render
- [ ] Test production deployment
- [ ] Set up monitoring
- [ ] Enable automatic backups

---

## Support & Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Firebase Docs**: https://firebase.google.com/docs
- **Node.js Docs**: https://nodejs.org/docs/
- **React Docs**: https://react.dev

---

## Version Information

- **SmartCareer Version**: 1.0.0
- **Node.js**: v18+
- **React**: 18
- **MongoDB**: v4.4+
- **Last Updated**: November 2025
