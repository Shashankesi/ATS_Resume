const request = require('supertest');
const app = require('../app');

describe('SmartCareer API basic checks', () => {
  it('GET / should respond with 200 and health text', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/SmartCareer API Running/i);
  });
});
