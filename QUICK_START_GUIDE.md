# 🎯 SmartCareer - Quick Start Guide

**Welcome to SmartCareer!** Your AI-powered career companion.

---

## 🚀 Getting Started

### 1. Access the Application
```
Frontend: http://localhost:5173
Backend API: http://localhost:5000
```

### 2. Create an Account or Login

**Option A: Email & Password** ✅
- Click "Sign Up" on home page
- Enter: Name, Email, Password (min 6 chars, 1 uppercase, 1 number)
- You'll be redirected to login
- Enter credentials to access dashboard

**Option B: Google OAuth** ✅
- Click "Sign in with Google"
- Complete Google login
- Auto-creates account if new user
- Falls back to demo mode if offline

**Option C: GitHub OAuth** ⭐ NEW
- Click "Sign in with GitHub"
- Auto-creates GitHub account with unique email
- Full access to all features

**Option D: Microsoft OAuth** ⭐ NEW
- Click "Sign in with Microsoft"
- Auto-creates Microsoft account with unique email
- Full access to all features

**Option E: Demo Account** ✅
- Click "Try as Demo"
- Instant access to full application
- Great for testing features

**Option F: Remember Me** ✅
- Check "Remember me" when logging in
- Your email will be saved for next login
- Secure & localStorage-based

---

## 📊 Dashboard Overview

### Main Dashboard (`/dashboard`)
**View Your Profile:**
- User greeting with your name
- Total resumes created
- Average ATS score
- AI actions used this month

### Quick Actions
1. **Create New Resume** - Opens ATS-scoring resume builder
2. **Upload Resume** - Import existing resume (PDF/DOC)
3. **View My Resumes** - See all your created resumes
4. **Access AI Tools** - Quick access to 6 AI tools

---

## 📝 Create Resume with ATS Score ⭐ NEW

### Navigate to Resume Builder
1. Click "Create New Resume" on Dashboard
2. Or go to `/resume/create`

### Step 1: Fill Your Information
- **Full Name** - Your professional name
- **Job Title** - Target position (e.g., "Full Stack Developer")
- **Email** - Contact email
- **Phone** - Contact phone number
- **Location** - City, Country
- **Professional Summary** - Write 50+ characters about yourself
  - Example: "Experienced Full Stack Developer with 5+ years building scalable web applications using React and Node.js"

### Step 2: Monitor ATS Score
**Real-time ATS Score (0-100%)**

The ATS score updates as you type:
- 10% - Full Name filled
- 10% - Job Title filled
- 10% - Email filled
- 5% - Phone filled
- 5% - Location filled
- 15% - Professional Summary (50+ chars)
- 15% - Skills added
- 10% - Bonus for 5+ skills
- 10% - Experience filled
- 5% - Education filled

**Color Coding:**
- 🟢 **80-100%**: Excellent - Ready to submit
- 🟡 **60-79%**: Good - Fill more fields
- 🟠 **Below 60%**: Needs work - Complete required fields

### Step 3: Add Skills
1. Enter a skill name (e.g., "React")
2. Click "+ Add Skill"
3. Skill appears in the list
4. Click "×" to remove any skill
5. Watch ATS score update in real-time!

**Recommended Skills:**
- Technical: React, Node.js, Python, Java, SQL
- Business: Leadership, Communication, Project Management
- Tools: Git, Docker, AWS, Firebase

### Step 4: Choose Template
Select one of 4 professional templates:

1. **Modern** 
   - Purple to Pink gradient
   - Contemporary design
   - Best for tech roles

2. **Professional**
   - Blue theme
   - Clean & traditional
   - Best for corporate roles

3. **Creative**
   - Green to Orange gradient
   - Unique design
   - Best for creative roles

4. **Minimal**
   - Simple grayscale
   - Elegant & minimal
   - Best for all industries

### Step 5: Read Suggestions
View AI-powered suggestions in real-time:
- What's missing from your resume
- How to improve each section
- Tips to increase ATS score

### Step 6: Submit Resume
1. Fill all required fields
2. Reach ATS score of 50%+ (recommended: 70%+)
3. Click "Create Resume"
4. You'll be taken to the resume editor

---

## 💼 AI Tools (6 Tools)

### 1. ATS Checker (`/ats-checker`)
**Purpose**: Check your resume's ATS compatibility

**How to Use:**
1. Navigate from Dashboard or Features menu
2. Upload or paste your resume text
3. View ATS score and breakdown
4. Get improvement suggestions
5. Fix issues and re-check

**What It Checks:**
- Keyword optimization
- Format compatibility
- Content structure
- Readability score

---

### 2. Resume Improver (`/resume-improver`)
**Purpose**: Get AI suggestions to enhance your resume

**How to Use:**
1. Navigate from Dashboard or Features menu
2. Select or upload a resume
3. Get AI-powered enhancement suggestions
4. Review improvements
5. Accept or customize changes

**Improvement Areas:**
- Grammar & spelling
- Action verbs and impact
- Achievement quantification
- Keyword density

---

### 3. Skills Suggestion (`/skills-suggestion`)
**Purpose**: Discover in-demand skills for your role

**How to Use:**
1. Navigate from Dashboard or Features menu
2. Select your job title or industry
3. View trending skills
4. See salary data by skill
5. Add recommended skills to your resume

**Information Provided:**
- In-demand skills for your industry
- Average salary with each skill
- Market demand trends
- Learning resources

---

### 4. Cover Letter Generator (`/cover-letter`)
**Purpose**: Create tailored cover letters for job applications

**How to Use:**
1. Navigate from Dashboard or Features menu
2. Enter job title and company name
3. Upload your resume or enter details
4. Select cover letter style
5. Generate AI-powered cover letter
6. Edit and customize as needed
7. Export as PDF or Word

**Customization:**
- Professional tone
- Conversational tone
- Emphasize achievements
- Focus on culture fit

---

### 5. Job Finder (`/jobs`)
**Purpose**: Discover live job opportunities with skill matching

**How to Use:**
1. Navigate from Dashboard or Features menu
2. View recommended jobs
3. See your skill match percentage
4. Click a job to view details
5. Click external link to apply on job board

**Job Sources:**
- 🔗 **Indeed** - Largest job board
- 🔗 **LinkedIn** - Professional network
- 🔗 **Glassdoor** - Company reviews + jobs
- 🔗 **Monster** - Classic job portal
- 🔗 **Stack Overflow** - Tech jobs

**Features:**
- Job title and company name
- Location and salary range
- Skill match percentage
- Required skills highlighted

---

### 6. Career Coach (`/ai-chat`)
**Purpose**: Get career advice from AI chatbot

**How to Use:**
1. Navigate from Dashboard or Features menu
2. Type your career question
3. AI responds with tailored advice
4. Continue conversation
5. Conversation history is saved

**Example Questions:**
- "How do I transition from frontend to full-stack?"
- "What skills should I learn for DevOps?"
- "How do I negotiate my salary?"
- "How to prepare for senior developer interviews?"

---

## 🎨 Theme Toggle

### Switch Between Dark & Light Mode
1. Look for the theme toggle button in navbar (top right)
2. Click to switch between:
   - 🌙 **Dark Mode** - Dark background, light text
   - ☀️ **Light Mode** - Light background, dark text
3. Theme automatically saves to your browser
4. Your preference persists across sessions

**Tips:**
- Use dark mode for late night coding
- Use light mode for professional meetings
- Theme applies to all pages automatically

---

## 📱 Mobile Experience

SmartCareer works perfectly on mobile devices!

### Mobile Breakpoints
- **Small phones** (320px): Optimized single-column layout
- **Large phones** (640px): Adjusted spacing
- **Tablets** (1024px): Multi-column layout
- **Desktop** (1440px+): Full experience

### Touch-Friendly Features
- Large buttons for easy tapping
- Swipe-friendly navigation
- Responsive forms
- Smooth animations on mobile

---

## 🔐 Security & Privacy

### Your Data is Safe
- ✅ Passwords encrypted with Bcrypt
- ✅ JWT tokens for secure sessions
- ✅ SSL/TLS encryption (production)
- ✅ Rate limiting to prevent abuse
- ✅ No tracking or data selling

### Best Practices
1. Use strong passwords (min 6 chars, 1 uppercase, 1 number)
2. Log out on shared computers
3. Enable "Remember me" only on personal devices
4. Update password periodically
5. Keep browser updated

---

## ⚙️ Account Settings

### Access Your Settings
1. Click user avatar in navbar
2. Select "Settings"
3. Update your information

### Available Settings
- ✅ Change password
- ✅ Update profile information
- ✅ View login history
- ✅ Download your data
- ✅ Delete account

---

## 🆘 Troubleshooting

### Login Issues

**"Invalid credentials"**
- ✅ Check email spelling
- ✅ Verify password (case-sensitive)
- ✅ Reset password if forgotten

**"Email already exists"**
- ✅ Try logging in instead
- ✅ Use different email for new account

**OAuth not working (Google/GitHub/Microsoft)**
- ✅ Check internet connection
- ✅ Clear browser cookies and cache
- ✅ Try demo account instead
- ✅ Use email/password as fallback

### Resume Creation Issues

**ATS score not updating**
- ✅ Refresh the page
- ✅ Clear browser cache
- ✅ Try different browser

**Skills not adding**
- ✅ Enter skill name and click "Add"
- ✅ Check for duplicate skills
- ✅ Use valid skill names

**Can't save resume**
- ✅ Check all required fields are filled
- ✅ Ensure ATS score is 50%+ (recommended)
- ✅ Try different browser

### Job Links Not Opening

**External job links not working**
- ✅ Check pop-up blocker settings
- ✅ Allow new tabs in browser
- ✅ Try different browser
- ✅ Report issue to support

---

## 📞 Support & Help

### Get Help
- 📧 **Email**: support@smartcareer.com
- 💬 **Chat**: Click "Support" in Help menu
- 📚 **Documentation**: Click "Docs" in Help menu
- ❓ **FAQ**: Click "FAQ" in Help menu

### Common Questions

**Q: Can I edit my resume after creating it?**
A: Yes! Click "Edit" on any resume from your dashboard.

**Q: How often is the job data updated?**
A: Job recommendations are updated in real-time from our partners.

**Q: Can I export my resume to PDF?**
A: Yes! Click "Download" when viewing your resume.

**Q: Is my data stored securely?**
A: Yes! We use industry-standard security and encryption.

**Q: Can I delete my account?**
A: Yes, go to Settings → Account → Delete Account.

---

## 🎓 Pro Tips

### Maximize Your ATS Score
1. ✅ Use keywords from job descriptions
2. ✅ Include 5+ relevant skills
3. ✅ Write detailed professional summary (100+ words)
4. ✅ Quantify achievements (numbers & percentages)
5. ✅ Use standard formatting (no graphics/special fonts)

### Land More Interviews
1. 🎯 Customize resume for each job
2. 📊 Maintain 70%+ ATS score
3. 📝 Use action verbs (Developed, Managed, Implemented)
4. 🔑 Include relevant keywords
5. 📧 Follow up after applying

### Build Your Skills
1. 📈 Use Skills Suggestion tool monthly
2. 📚 Learn trending skills in your industry
3. 💪 Update resume with new skills
4. 🎓 Get certifications
5. 🤝 Join professional communities

### Career Growth
1. 💭 Use Career Coach for advice
2. 📋 Create multiple resume versions
3. 🎨 Use different templates for different roles
4. 📊 Track your ATS score improvements
5. 🚀 Set career goals quarterly

---

## 🎉 Welcome to SmartCareer!

You're now ready to build an amazing career! 

**Next Steps:**
1. Create your first resume with ATS score
2. Explore all 6 AI tools
3. Find your next job opportunity
4. Get career coaching advice
5. Share SmartCareer with friends

**Let's build a better career together! 🚀**

---

**Questions?** Visit `/support` or email support@smartcareer.com

**Generated**: November 8, 2025  
**Version**: 1.0.0  
**Status**: ✅ Complete

