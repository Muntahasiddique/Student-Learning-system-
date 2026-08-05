const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    description: { type: String, required: true, trim: true },

    duration: { type: String, required: true, trim: true },

    enrolledCount: {
      type: Number,

      default: 0,
    },

    rating: {
      type: Number,

      default: 0,
    },

    degree: { type: String, required: true },

    difficulty: { type: String, required: true },
    category: { type: String, required: true },

    price: { type: Number, required: true },

    coursecode: {
      type: String,
      required: [true, "Course code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    instructor: {
      type: String,
      required: true,

      trim: true,
    },
    createdBy: {
      type: String,
      required: true,

      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Course' , courseSchema);
