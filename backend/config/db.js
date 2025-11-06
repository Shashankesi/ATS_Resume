const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI || typeof process.env.MONGO_URI !== 'string' || process.env.MONGO_URI.trim() === '') {
            console.warn('⚠️  MONGO_URI not set. Skipping MongoDB connection. The server will run without a database.');
            return;
        }
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Additional options for Atlas
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferCommands: false, // Disable mongoose buffering
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host} (Database: ${conn.connection.name})`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        console.error('Please check your MONGO_URI in .env and ensure MongoDB Atlas IP whitelist includes your IP or 0.0.0.0/0');
        // process.exit(1); // Temporarily commented out to allow server to start for testing
    }
};

module.exports = connectDB;