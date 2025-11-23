const mongoose = require('mongoose');
const genderSchema = new mongoose.Schema({
  oedema: { type: Number, default: 0 },
  samWithComplication: { type: Number, default: 0 },
  samWithoutComplication: { type: Number, default: 0 },
  mam: { type: Number, default: 0 },
  normal: { type: Number, default: 0 },
  totalChildrenAssessed: { type: Number, default: 0 },
});

const ageGroupSchema = new mongoose.Schema({
  male: { type: genderSchema, required: true },
  female: { type: genderSchema, required: true },
});

const assessmentSchema = new mongoose.Schema({
  district: { type: String, required: true },

  monthName: { type: String, required: true },  
  reportDate: { type: Date, default: Date.now },

  data: {
    age_06_to_23_months: { type: ageGroupSchema, required: true },
    age_24_to_59_months: { type: ageGroupSchema, required: true },
  },

  totals: {
    samWithComplication: { type: Number, default: 0 },
    samWithoutComplication: { type: Number, default: 0 },
    mam: { type: Number, default: 0 },
    normal: { type: Number, default: 0 },
    totalChildrenAssessed: { type: Number, default: 0 },
  }
});

module.exports = mongoose.model("Assessment", assessmentSchema);
