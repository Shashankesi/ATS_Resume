# SmartCareer - Complete Testing & Deployment Guide

## ✅ Testing Checklist

### Unit Testing

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm run test

# Test coverage
npm run test:coverage
```

### E2E Testing

```bash
# Install Playwright
npm install --save-dev @playwright/test

# Run E2E tests
npm run test:e2e

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific test
npx playwright test tests/auth.spec.js
```

### Component Testing Checklist

- [ ] **Authentication**
  - [ ] Register form validation
  - [ ] Login flow with OAuth
  - [ ] Remember me functionality
  - [ ] Password reset flow
  - [ ] Session persistence

- [ ] **Resume Management**
  - [ ] Resume creation
  - [ ] File upload
  - [ ] Resume editing
  - [ ] Resume deletion
  - [ ] Resume export (PDF)

- [ ] **AI Tools**
  - [ ] ATS checker accuracy
  - [ ] Resume improver suggestions
  - [ ] Cover letter generation
  - [ ] Skill suggestions
  - [ ] Feedback accuracy

- [ ] **UI/UX**
  - [ ] Dark/Light mode toggle
  - [ ] Loading skeletons display
  - [ ] Error boundary handling
  - [ ] Toast notifications
  - [ ] Form validation feedback

### Browser Compatibility

```javascript
// Test on:
const browsers = [
  'Chrome (latest)',
  'Firefox (latest)',
  'Safari (latest)',
  'Edge (latest)',
  'Chrome Mobile',
  'Safari Mobile'
];
```

### Performance Testing

```bash
# Lighthouse audit
npm run build
npm install -g serve
serve -s dist
# Open DevTools > Lighthouse

# Bundle analysis
npm install --save-dev webpack-bundle-analyzer
npm run build:analyze

# Performance metrics
npm run test:perf
```

## 🚀 Deployment Process

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Performance optimized (Lighthouse > 90)
- [ ] Security audit completed
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] API endpoints tested
- [ ] Error boundaries implemented
- [ ] Loading states visible
- [ ] Dark mode working
- [ ] Mobile responsive
- [ ] Accessibility checked

### Environment Configuration

**Frontend (.env.production)**
```
VITE_API_URL=https://api.smartcareer.com
VITE_APP_NAME=SmartCareer
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
VITE_GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
```

**Backend (.env.production)**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=YOUR_MONGODB_ATLAS_URI
JWT_SECRET=YOUR_SECURE_JWT_SECRET
JWT_EXPIRE=7d
REFRESH_TOKEN_EXPIRE=30d
GOOGLE_CLIENT_ID=YOUR_GOOGLE_ID
GITHUB_CLIENT_ID=YOUR_GITHUB_ID
CORS_ORIGIN=https://smartcareer.com
```

### Deployment Options

#### 1. Vercel (Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

**vercel.json**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_URL": "@api_url"
  },
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "/index.html",
      "statusCode": 200
    }
  ]
}
```

#### 2. Heroku (Backend)

```bash
# Login to Heroku
heroku login

# Create app
heroku create smartcareer-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=YOUR_URI

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**Procfile**
```
web: node backend/server.js
```

#### 3. AWS (Full Stack)

```bash
# Frontend: S3 + CloudFront
aws s3 sync dist/ s3://smartcareer-frontend/
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"

# Backend: EC2 or Elastic Beanstalk
eb init smartcareer
eb create production
eb deploy
```

#### 4. Docker Deployment

**Dockerfile (Frontend)**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Dockerfile (Backend)**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**docker-compose.yml**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    environment:
      - REACT_APP_API_URL=http://backend:5000

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb+srv://...
      - JWT_SECRET=your_secret
    depends_on:
      - mongodb

  mongodb:
    image: mongo:latest
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

### Post-Deployment

1. **Verify Deployment**
```bash
# Check frontend
curl https://smartcareer.com

# Check backend health
curl https://api.smartcareer.com/api/health

# Check database connection
curl https://api.smartcareer.com/api/auth/register
```

2. **Monitor & Logs**
```bash
# Heroku logs
heroku logs --app smartcareer-api --tail

# AWS CloudWatch
aws logs tail /smartcareer/backend --follow

# Application monitoring
# - Set up Sentry for error tracking
# - Configure DataDog/New Relic for performance
# - Set up PagerDuty for alerts
```

3. **Performance Monitoring**
```bash
# New Relic setup
npm install newrelic

# Sentry setup
npm install @sentry/node @sentry/tracing
```

4. **Security Hardening**
- [ ] Enable HTTPS/SSL
- [ ] Set up WAF rules
- [ ] Configure DDoS protection
- [ ] Enable database backups
- [ ] Set up 2FA for deployment
- [ ] Configure rate limiting
- [ ] Enable CORS properly
- [ ] Update security headers

### Rollback Procedure

```bash
# Vercel
vercel --prod --target production --yes

# Heroku
heroku rollback --app smartcareer-api

# AWS
eb deploy smartcareer --version previous

# Manual rollback
git revert HEAD
git push
npm run deploy
```

## 📊 Monitoring & Maintenance

### Key Metrics to Monitor

1. **Performance**
   - Page load time (target < 2s)
   - API response time (target < 200ms)
   - Error rate (target < 0.1%)
   - Uptime (target > 99.9%)

2. **User Analytics**
   - Daily active users
   - Conversion rate
   - Feature usage
   - User retention

3. **System Health**
   - CPU usage
   - Memory usage
   - Database connections
   - API rate limits

### Automated Testing on Deploy

```yaml
# GitHub Actions (.github/workflows/deploy.yml)
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## 🔧 Troubleshooting

### Common Issues

**Issue: CORS errors in production**
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
```

**Issue: Environment variables not loading**
```bash
# Make sure .env.production exists
# Rebuild: npm run build
# Redeploy
```

**Issue: Database connection timeout**
```bash
# Check MongoDB Atlas IP whitelist
# Add deployment server IP
# Increase connection timeout
```

**Issue: Performance degradation**
```bash
# Enable caching headers
# Implement database indexing
# Use CDN for static assets
# Optimize images
```

## 📝 Post-Launch Tasks

- [ ] Set up analytics (Google Analytics, Mixpanel)
- [ ] Configure email notifications
- [ ] Set up automated backups
- [ ] Create runbooks for common issues
- [ ] Document deployment process
- [ ] Train team on monitoring
- [ ] Set up on-call rotation
- [ ] Create incident response plan

## ✨ Success Metrics

- ✅ 99.9%+ Uptime
- ✅ < 2s Page Load Time
- ✅ < 200ms API Response Time
- ✅ Lighthouse Score > 90
- ✅ Zero Critical Security Issues
- ✅ < 0.1% Error Rate

---

**Last Updated:** November 8, 2025
**Status:** Ready for Production Deployment ✅
