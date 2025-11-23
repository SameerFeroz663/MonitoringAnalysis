const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8000;

// Middleware
app.use(express.json());

// ✅ FIX: Proper CORS setup
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ FIX: Handle preflight OPTIONS requests
app.options(/.*/, cors());

// DB connection
mongoose.connect("mongodb+srv://ferozsameer07_db_user:5H2Hs8XzpsLCkvAG@sindhgovt.nu0typu.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("MongoDB error:", err));

// Routes
const assessmentRoutes = require('./Controllers/Content');
app.use('/api/assessment', assessmentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
