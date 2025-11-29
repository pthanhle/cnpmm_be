const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['ongoing', 'completed', 'canceled'], required: true },
    members: [{ type: String }] // Array of member names or IDs
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);