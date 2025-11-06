const admin = require('firebase-admin');

let serviceAccount;
try {
    // Parse the JSON config string from the environment variable
    serviceAccount = process.env.FIREBASE_ADMIN_CONFIG ? JSON.parse(process.env.FIREBASE_ADMIN_CONFIG) : null;
} catch (error) {
    console.error('🚨 Failed to parse FIREBASE_ADMIN_CONFIG. Google Sign-In verification will not work.', error);
    serviceAccount = null;
}

// Initialize Firebase Admin SDK safely (avoid double-init warnings)
try {
    if (!admin.apps.length) {
        const initConfig = {};
        if (serviceAccount) initConfig.credential = admin.credential.cert(serviceAccount);
        // Optional: set storageBucket from env or infer from service account
        if (process.env.FIREBASE_STORAGE_BUCKET) initConfig.storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
        admin.initializeApp(initConfig);
        console.log('✅ Firebase Admin SDK Initialized.');
    } else {
        console.log('ℹ️ Firebase Admin already initialized.');
    }
} catch (error) {
    console.warn('⚠️ Firebase Admin SDK initialization failed (is it already initialized?). Google Auth might fail if config is wrong.');
}


/**
 * Verifies the Firebase ID token and returns the decoded user object.
 */
const verifyIdToken = async (idToken) => {
    if (!idToken) return null;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        return decodedToken;
    } catch (error) {
        console.error('Firebase ID token verification failed:', error.message);
        return null;
    }
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