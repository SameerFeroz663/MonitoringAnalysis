const mongoose = require("mongoose");

const AgricultureRowSchema = new mongoose.Schema({
  sno: {
    type: Number,
    required: true,
  },
  outputIndicator: {
    type: String,
    required: true,
  },
  yearlyTarget: {
    type: Number,
    required: true,
  },
  currentMonth: {
    type: Number,
    required: true,
  },
  totalAchievement: {
    type: Number,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  packageA: {
    type: Number,
    default: 0,
  },
  packageB: {
    type: Number,
    default: 0,
  },
  packageC: {
    type: Number,
    default: 0,
  },
});

// Wrap multiple rows inside one full assessment record
const AgricultureAssessmentSchema = new mongoose.Schema(
  {
    rows: {
      type: [AgricultureRowSchema],
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AgricultureAssessment", AgricultureAssessmentSchema);

