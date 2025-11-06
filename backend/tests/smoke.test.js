/**
 * Smoke Tests for SmartCareer Backend
 * Tests critical endpoints: /api/health, /api/auth/register, /api/resume/upload
 * Run: npm test (with jest configured in package.json)
 */

const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Resume = require('../models/Resume');
const path = require('path');
const fs = require('fs');

// Test token (will be generated during test)
let authToken = '';
let testUserId = '';

describe('SmartCareer Backend - Smoke Tests', () => {
    
    // Clean up before all tests
    beforeAll(async () => {
        // Optional: Connect to test database if not already connected
        console.log('🧪 Starting smoke tests...');
    });

    // Clean up after all tests
    afterAll(async () => {
        console.log('✅ Smoke tests completed.');
    });

    describe('Health & Status', () => {
        test('GET /api/health - should return 200 OK', async () => {
            const response = await request(app)
                .get('/api/health')
                .expect(200);

            expect(response.body).toHaveProperty('status', 'ok');
            expect(response.body).toHaveProperty('env');
            expect(response.body).toHaveProperty('uptime');
            console.log('✅ Health check passed');
        });
    });

    describe('Authentication', () => {
        test('POST /api/auth/register - should register a new user', async () => {
            const userData = {
                name: 'Test User',
                email: `test-${Date.now()}@example.com`,
                password: 'TestPassword123!'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body).toHaveProperty('token');
            expect(response.body).toHaveProperty('email', userData.email);
            authToken = response.body.token;
            testUserId = response.body._id;
            console.log('✅ User registration passed');
        });

        test('POST /api/auth/login - should login user and return token', async () => {
            const userData = {
                email: `test-${Date.now()}@example.com`,
                password: 'TestPassword123!'
            };

            // First register
            await request(app)
                .post('/api/auth/register')
                .send(userData);

            // Then login
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: userData.email, password: userData.password })
                .expect(200);

            expect(response.body).toHaveProperty('token');
            console.log('✅ User login passed');
        });
    });

    describe('Resume Upload', () => {
        test('POST /api/resume/upload - should upload and parse a text resume', async () => {
            // Ensure user is registered first
            const userData = {
                name: 'Resume Test User',
                email: `resume-test-${Date.now()}@example.com`,
                password: 'TestPassword123!'
            };

            const regResponse = await request(app)
                .post('/api/auth/register')
                .send(userData);

            const token = regResponse.body.token;

            // Create a mock resume file (text)
            const resumeContent = `
John Doe
john@example.com
(555) 123-4567

SUMMARY
Experienced Full-Stack Developer with 5 years in React, Node.js, and MongoDB.

SKILLS
- React, Vue.js, Angular
- Node.js, Express, REST APIs
- MongoDB, PostgreSQL, Firebase
- Docker, AWS, CI/CD

EXPERIENCE
Senior Developer at TechCorp (2020-Present)
- Led team of 3 engineers
- Improved app performance by 40%

Developer at StartupXYZ (2018-2020)
- Built customer-facing features
- Implemented CI/CD pipeline

EDUCATION
BS Computer Science - State University (2018)
`;

            const resumePath = path.join(__dirname, 'test-resume.txt');
            fs.writeFileSync(resumePath, resumeContent);

            try {
                const response = await request(app)
                    .post('/api/resume/upload')
                    .set('Authorization', `Bearer ${token}`)
                    .attach('file', resumePath)
                    .expect(201);

                expect(response.body).toHaveProperty('message');
                expect(response.body).toHaveProperty('file');
                expect(response.body).toHaveProperty('resume');
                expect(response.body).toHaveProperty('analysis');
                expect(response.body.analysis).toHaveProperty('atsScore');
                console.log('✅ Resume upload and parsing passed');
                console.log(`   ATS Score: ${response.body.analysis.atsScore}`);
                console.log(`   Skills Found: ${response.body.analysis.skillsFound}`);
            } finally {
                // Clean up test file
                if (fs.existsSync(resumePath)) {
                    fs.unlinkSync(resumePath);
                }
            }
        });
    });

    describe('AI Routes', () => {
        test('POST /api/ai/generic - should return mock AI response', async () => {
            // Register user first
            const userData = {
                name: 'AI Test User',
                email: `ai-test-${Date.now()}@example.com`,
                password: 'TestPassword123!'
            };

            const regResponse = await request(app)
                .post('/api/auth/register')
                .send(userData);

            const token = regResponse.body.token;

            const response = await request(app)
                .post('/api/ai/generic')
                .set('Authorization', `Bearer ${token}`)
                .send({ prompt: 'Analyze my career trajectory' })
                .expect(200);

            expect(response.body).toHaveProperty('response');
            expect(typeof response.body.response).toBe('string');
            console.log('✅ AI generic endpoint passed (MOCK mode)');
        });
    });

    describe('Error Handling', () => {
        test('GET /api/health-invalid - should return 404', async () => {
            await request(app)
                .get('/api/health-invalid')
                .expect(404);
            console.log('✅ 404 error handling passed');
        });

        test('POST /api/resume/upload without auth - should return 401', async () => {
            await request(app)
                .post('/api/resume/upload')
                .expect(401);
            console.log('✅ 401 auth error handling passed');
        });
    });
});
