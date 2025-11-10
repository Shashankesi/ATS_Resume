const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI || typeof process.env.MONGO_URI !== 'string' || process.env.MONGO_URI.trim() === '') {
            console.error('❌ MONGO_URI not set. Cannot connect to MongoDB. Please set MONGO_URI in backend/.env or environment.');
            // Exit so that developers notice DB misconfiguration instead of running without persistence
            process.exit(1);
        }

        // Attempt to connect to MongoDB
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
        console.error('Please check your MONGO_URI in backend/.env (or environment) and ensure MongoDB Atlas IP whitelist includes your IP or 0.0.0.0/0');
        // Exit so the misconfiguration can't silently allow the server to run without DB
        process.exit(1);
    }
};

module.exports = connectDB;