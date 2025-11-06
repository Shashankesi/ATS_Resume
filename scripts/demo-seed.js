#!/usr/bin/env node
/**
 * Demo Seed Script for SmartCareer
 * Populates database with test users and sample resumes
 * Run: node scripts/demo-seed.js
 */

require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../backend/models/User');
const Resume = require('../backend/models/Resume');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/smartcareer_db';

const demoUsers = [
    {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        password: 'DemoPass123!',
        headline: 'Full-Stack Developer',
        location: 'San Francisco, CA'
    },
    {
        name: 'Bob Smith',
        email: 'bob@example.com',
        password: 'DemoPass123!',
        headline: 'Product Manager',
        location: 'New York, NY'
    },
    {
        name: 'Carol Davis',
        email: 'carol@example.com',
        password: 'DemoPass123!',
        headline: 'UX Designer',
        location: 'Austin, TX'
    }
];

const demoResumes = [
    {
        name: 'Alice - Full-Stack Resume',
        rawText: `
Alice Johnson
alice@example.com | (555) 123-4567

SUMMARY
Full-Stack Developer with 5+ years experience in React, Node.js, and MongoDB. 
Passionate about building scalable web applications and mentoring junior developers.

SKILLS
Frontend: React, Vue.js, Tailwind CSS, TypeScript
Backend: Node.js, Express, REST APIs, GraphQL
Database: MongoDB, PostgreSQL, Firebase
DevOps: Docker, AWS (EC2, S3), GitHub Actions
Soft Skills: Leadership, Agile, Problem Solving

EXPERIENCE
Senior Full-Stack Developer | TechCorp Inc. (2021-Present)
- Led migration of legacy system to React + Node.js microservices
- Improved API response time by 60% through optimization
- Mentored 3 junior developers

Full-Stack Developer | StartupXYZ (2019-2021)
- Built customer-facing dashboard using React
- Designed MongoDB schema for real-time analytics
- Implemented CI/CD pipeline using GitHub Actions

Junior Developer | WebAgency LLC (2018-2019)
- Developed 10+ client websites using MERN stack
- Fixed 200+ bugs and improved code quality

EDUCATION
BS Computer Science | State University (2018)
GPA: 3.8/4.0

CERTIFICATIONS
- AWS Solutions Architect Associate (2022)
- Google Cloud Associate Cloud Engineer (2021)
        `
    },
    {
        name: 'Bob - Product Manager Resume',
        rawText: `
Bob Smith
bob@example.com | (555) 234-5678 | LinkedIn: linkedin.com/in/bobsmith

SUMMARY
Product Manager with 8+ years experience leading cross-functional teams to build 
successful SaaS products. Strong background in data-driven decision making and user research.

SKILLS
Product Strategy: Roadmap planning, competitive analysis, market research
Technical: SQL, analytics tools (Tableau, Mixpanel), API integrations
Leadership: Team management, stakeholder communication, agile methodologies
Tools: Figma, Jira, Amplitude, Slack, Notion

EXPERIENCE
Senior Product Manager | CloudSoft (2020-Present)
- Led product strategy for 2 major features serving 50K+ users
- Increased user engagement by 40% through A/B testing
- Managed budget of $500K for vendor partnerships

Product Manager | DataPlatform Co. (2017-2020)
- Owned analytics dashboard product from conception to launch
- Grew user base from 1K to 20K through targeted marketing
- Reduced churn by 25% through customer feedback loops

Associate Product Manager | StartupHub (2015-2017)
- Launched 3 new features and coordinated with engineering team
- Conducted 50+ user interviews for feature validation

EDUCATION
MBA Business Administration | Harvard University (2015)
BS Economics | Boston College (2013)

AWARDS
- Product of the Year 2021 (CloudSoft)
        `
    },
    {
        name: 'Carol - Designer Resume',
        rawText: `
Carol Davis
carol@example.com | (555) 345-6789 | Portfolio: caroldesign.com

SUMMARY
Creative UX/UI Designer with 6+ years experience in product design, 
brand design, and user research. Passionate about creating intuitive and 
beautiful digital experiences that solve real user problems.

SKILLS
Design: Figma, Adobe XD, Sketch, Prototyping
Research: User interviews, usability testing, A/B testing, heatmaps
Front-end: HTML, CSS, Basic JavaScript
Design Systems: Component libraries, design tokens, documentation
Tools: Miro, UserTesting, Google Analytics, Hotjar

EXPERIENCE
Senior UX Designer | DesignStudio Inc. (2020-Present)
- Led redesign of flagship product resulting in 35% improvement in user satisfaction
- Built and maintained design system used by 20+ designers
- Conducted 100+ user interviews and usability tests

UX/UI Designer | CreativeAgency (2018-2020)
- Designed interfaces for 15+ client projects across diverse industries
- Improved conversion rate by 45% for e-commerce client
- Created brand guidelines and visual standards

Junior Designer | StartupLab (2017-2018)
- Contributed to UI design for mobile app (50K+ downloads)
- Learned design thinking and rapid prototyping methods

EDUCATION
BFA Graphic Design | School of Visual Arts (2017)

CERTIFICATIONS
- Google UX Design Certificate (2021)
- Nielsen Norman UX Certification (2020)
        `
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing demo data (optional - comment out for safety)
        // await User.deleteMany({ email: { $in: demoUsers.map(u => u.email) } });
        // console.log('🧹 Cleared existing demo users');

        // Create users
        console.log('\n👤 Creating demo users...');
        const createdUsers = [];
        
        for (const userData of demoUsers) {
            let user = await User.findOne({ email: userData.email });
            if (!user) {
                user = await User.create(userData);
                console.log(`  ✅ Created: ${user.name} (${user.email})`);
            } else {
                console.log(`  ℹ️ Already exists: ${user.name} (${user.email})`);
            }
            createdUsers.push(user);
        }

        // Create resumes for first user
        console.log('\n📄 Creating demo resumes...');
        const firstUser = createdUsers[0];
        
        for (const resumeData of demoResumes) {
            let resume = await Resume.findOne({ user: firstUser._id, name: resumeData.name });
            if (!resume) {
                const calculatedATS = Math.floor(Math.random() * (95 - 60 + 1) + 60); // Random 60-95
                
                resume = await Resume.create({
                    user: firstUser._id,
                    name: resumeData.name,
                    originalFileName: `${resumeData.name}.txt`,
                    fileFormat: 'TXT',
                    rawText: resumeData.rawText,
                    extractedData: {
                        email: firstUser.email,
                        phone: '(555) 123-4567',
                        yearsOfExperience: 5,
                        skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript'],
                        education: ['BS Computer Science']
                    },
                    latestATSScore: {
                        score: calculatedATS,
                        breakdown: {
                            keywords: calculatedATS * 0.85,
                            formatting: calculatedATS * 0.90,
                            structure: calculatedATS * 0.95
                        },
                        suggestions: [
                            'Add more measurable achievements',
                            'Include more technical keywords from job description',
                            'Improve visual formatting consistency'
                        ],
                        calculatedAt: new Date()
                    },
                    data: {
                        profile: {
                            name: firstUser.name,
                            email: firstUser.email,
                            phone: '(555) 123-4567',
                            summary: 'Experienced professional with passion for technology and innovation'
                        },
                        sections: []
                    }
                });

                // Add to user's resume refs
                await User.findByIdAndUpdate(firstUser._id, { $push: { resumeRefs: resume._id } });
                console.log(`  ✅ Created: ${resume.name} (ATS: ${calculatedATS}/100)`);
            } else {
                console.log(`  ℹ️ Already exists: ${resume.name}`);
            }
        }

        console.log('\n✅ Demo data seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`  Users created: ${createdUsers.length}`);
        console.log(`  Sample resumes: ${demoResumes.length} (for first user)`);
        console.log('\n🔑 Test Credentials:');
        demoUsers.forEach(u => console.log(`  Email: ${u.email}, Password: ${u.password}`));

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

// Run seed if called directly
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
