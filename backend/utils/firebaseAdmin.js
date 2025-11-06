const admin = require('firebase-admin');

let serviceAccount;
try {
    // Parse the JSON config string from the environment variable
    serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG);
} catch (error) {
    console.error('🚨 Failed to parse FIREBASE_ADMIN_CONFIG. Google Sign-In verification will not work.', error);
    serviceAccount = { projectId: 'mock-project-id' }; 
}

// Initialize Firebase Admin SDK
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase Admin SDK Initialized.');
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

module.exports = {
    admin,
    verifyIdToken,
};