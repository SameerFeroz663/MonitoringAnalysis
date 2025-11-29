const express = require('express');
const router = express.Router();
const Assessment = require('../model/Content');

// Create a new assessment
router.post('/', async (req, res) => {
try {
const entry = new Assessment(req.body);
const saved = await entry.save();

res.status(201).json({  
  message: "📌 Assessment Saved Successfully",  
  data: saved  
});  

} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Get all assessments
router.get('/', async (req, res) => {
try {
const data = await Assessment.find().sort({ createdAt: -1 });
res.json(data);
} catch (err) {
res.status(500).json({ error: err.message });
}
});

// Update an assessment by ID
router.put('/:id', async (req, res) => {
try {
const updated = await Assessment.findByIdAndUpdate(
req.params.id,
req.body,
{ new: true, runValidators: true }
);
if (!updated) {  
  return res.status(404).json({ message: "❌ Assessment not found" });  
}  

res.json({  
  message: "✏️ Assessment Updated Successfully",  
  data: updated  
});  

} catch (err) {
res.status(500).json({ error: err.message });
}
});
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Assessment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "❌ Assessment not found" });

    res.json({ message: "🗑️ Assessment Deleted Successfully", data: deleted });
  } catch (err) {
    console.error("Delete Error:", err); // <-- add this
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
