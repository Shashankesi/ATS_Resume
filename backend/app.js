const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const { 
    helmetConfig, 
    getCorsConfig, 
    globalLimiter 
} = require('./middleware/security');
const { swaggerSpec, swaggerUi } = require('./config/swagger');

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const aiRoutes = require('./routes/aiRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const resumeImprovementRoutes = require('./routes/resumeImprovementRoutes');
const advancedResumeRoutes = require('./routes/advancedResumeRoutes');

const app = express();

// Logging middleware
app.use(morgan('combined'));

// Security middleware
app.use(helmetConfig);
app.use(cors(getCorsConfig()));

// Compression middleware for response bodies
app.use(compression());

// Rate limiting
app.use(globalLimiter);

// Body parser with size limits (increased from 10kb to 50kb)
app.use(express.json({ limit: '50kb' })); 
app.use(express.urlencoded({ limit: '50kb', extended: true }));

// Serve static uploads (for uploaded resumes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    maxAge: '1d',
    etag: false,
}));

// Root route
app.get('/', (req, res) => res.json({ 
    message: 'SmartCareer API Running',
    version: '1.0.0',
    status: 'OK'
}));

// Health check (convenience endpoint)
app.get('/api/health', (req, res) => {
    return res.json({
        status: 'ok',
        uptime: process.uptime(),
        env: process.env.NODE_ENV || 'development',
        time: new Date().toISOString()
    });
});

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        url: '/api-docs/swagger.json',
    },
}));

// Swagger JSON endpoint
app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/ai', advancedResumeRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/resume-improvements', resumeImprovementRoutes);

// Error Handler (Simple example)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Something went wrong on the server.',
        error: err.message 
    });
});

module.exports = app;