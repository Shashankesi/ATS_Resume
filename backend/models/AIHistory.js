const mongoose = require('mongoose');

const aiHistorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    feature: { type: String, required: true },
    mode: { type: String, enum: ['MOCK', 'GEMINI', 'GEMINI_FALLBACK', 'MOCK_CLIENT'], default: 'MOCK' },
    payloadSummary: { type: String },
    resultSummary: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AIHistory', aiHistorySchema);
