const mongoose = require('mongoose');
const slugify = require('slugify');
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
    slug: {
        type: String,
        unique: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

CourseSchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true,
    });
    next();
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
