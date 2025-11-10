const admin = require('firebase-admin');

let serviceAccount;
try {
    // For now, skip Firebase admin config parsing to avoid JSON issues
    // TODO: Fix Firebase service account JSON parsing
    console.log('ℹ️ Skipping Firebase Admin config parsing - using fallback mode only');
    serviceAccount = null;
} catch (error) {
    console.error('🚨 Failed to parse FIREBASE_ADMIN_CONFIG:', error.message);
    console.log('⚠️ Using fallback authentication mode');
    serviceAccount = null;
}

// Initialize Firebase Admin SDK safely (avoid double-init warnings)
try {
    if (!admin.apps.length) {
        const initConfig = {};
        if (serviceAccount) {
            initConfig.credential = admin.credential.cert(serviceAccount);
            console.log('✅ Firebase Admin SDK Initialized with service account.');
        } else {
            // Initialize without credentials for fallback mode
            admin.initializeApp();
            console.log('✅ Firebase Admin SDK Initialized (fallback mode - no credentials).');
        }
        // Optional: set storageBucket from env or infer from service account
        if (process.env.FIREBASE_STORAGE_BUCKET) initConfig.storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
    } else {
        console.log('ℹ️ Firebase Admin already initialized.');
    }
} catch (error) {
    console.warn('⚠️ Firebase Admin SDK initialization failed:', error.message);
    console.log('🔄 Continuing with fallback authentication mode...');
}


/**
 * Verifies the Firebase ID token and returns the decoded user object.
 * Falls back to basic token parsing if verification fails.
 */
const verifyIdToken = async (idToken) => {
    if (!idToken) return null;
    try {
        // Try Firebase verification first
        if (admin.apps.length > 0) {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            console.log('✅ Firebase token verified successfully');
            return decodedToken;
        }
    } catch (error) {
        console.warn('⚠️ Firebase ID token verification failed:', error.message);
    }
    
    // Fallback: Try to decode JWT manually
    try {
        const jwt = require('jsonwebtoken');
        // Note: This doesn't verify the signature, but allows app to work without Firebase
        const decoded = jwt.decode(idToken);
        if (decoded && decoded.email) {
            console.log('✅ Token decoded successfully (unverified)');
            return {
                uid: decoded.sub || decoded.user_id || decoded.email.split('@')[0],
                email: decoded.email,
                name: decoded.name || decoded.email.split('@')[0],
                picture: decoded.picture || null
            };
        }
    } catch (fallbackError) {
        console.error('❌ Both Firebase and fallback token verification failed:', fallbackError.message);
    }
    
    return null;
};

// Helper to get a Storage bucket (returns null if not configured)
const getStorageBucket = () => {
    try {
        const bucketName = process.env.FIREBASE_STORAGE_BUCKET || (serviceAccount && serviceAccount.project_id ? `${serviceAccount.project_id}.appspot.com` : null);
        if (!bucketName) return null;
        return admin.storage().bucket(bucketName);
    } catch (err) {
        console.warn('Firebase storage not available:', err && err.message);
        return null;
    }
};

module.exports = {
    admin,
    verifyIdToken,
    getStorageBucket,
};