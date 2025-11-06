const mongoose = require('mongoose');

const resumeSectionSchema = mongoose.Schema({
    type: { type: String, required: true }, 
    title: { type: String, required: true },
    content: { type: Object, default: {} }, 
    order: { type: Number, default: 0 },
});

const resumeSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        template: {
            type: String,
            default: 'Modern',
        },
        isATSMode: {
            type: Boolean,
            default: false,
        },
        publicSlug: {
            type: String,
            unique: true,
            sparse: true,
        },
        data: {
            profile: {
                name: { type: String, default: '' },
                email: { type: String, default: '' },
                phone: { type: String, default: '' },
                linkedin: { type: String, default: '' },
                portfolio: { type: String, default: '' },
                summary: { type: String, default: '' },
            },
            sections: [resumeSectionSchema],
        },
        versions: [
            {
                data: { type: Object },
                savedAt: { type: Date, default: Date.now },
                note: { type: String },
            },
        ],
        latestATSScore: {
            score: { type: Number, default: 0 },
            targetJobTitle: { type: String, default: '' },
            lastAnalyzedAt: { type: Date },
        },
    },
    {
        timestamps: true,
    }
);

const Resume = mongoose.model('Resume', resumeSchema);
module.exports = Resume;