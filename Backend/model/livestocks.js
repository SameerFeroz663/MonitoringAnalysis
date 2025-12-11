const mongoose = require("mongoose");
const LivestockRowSchema = new mongoose.Schema({
  description: { type: String, required: true },
  target: { type: String, default: "" },
  progress: { type: String, default: "" },
  district: { type: String, required: true },
  progressDetails: { type: String, default: "" }
});

const LivestockAssessmentSchema = new mongoose.Schema(
  {
    dept: { type: String, default: "Livestock" },
    rows: [LivestockRowSchema],
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LivestockAssessment", LivestockAssessmentSchema);
