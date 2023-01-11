const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true, // zorunlu olarak doldurulmasi gereken alan
    },
    description: {
        type: String,
        required: true,
        trim: true, // basinda ve sonunda bosluklar varsa kaldirir
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
