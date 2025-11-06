const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        uid: { // Firebase UID for Google Sign-In users
            type: String,
            unique: true,
            sparse: true, 
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        photo: {
            type: String,
            default: '',
        },
        headline: {
            type: String,
            default: '',
        },
        location: {
            type: String,
            default: '',
        },
        role: {
            type: String,
            required: true,
            enum: ['user', 'admin'],
            default: 'user',
        },
        resumeRefs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Resume',
            },
        ],
    },
    {
        timestamps: true,
    }
);

// Method to compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;