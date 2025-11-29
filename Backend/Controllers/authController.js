const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

// JWT Secret
const JWT_SECRET = "74ed83cf4fc2fa01d63ac96c536cc3b9";

// ---------------- Register ----------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const exist = await User.findOne({ email });
    if (exist) return res.json({ success: false, msg: "Email already exists" });

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json({ success: true, msg: "User created successfully" });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});
router.put('/users/:id',async(req,res)=>{
  try{
    const {role} = req.body;
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(userId,{role},{new:true,runValidators:true});
    if(user){
      res.json({success:true,msg:"User role updated successfully",user});
    }
    else{
      res.json({success:false,msg:"User not found"});
    }
  }
  catch(err){
    res.json({success:false,msg:err.message});
  }
})
router.delete('/users/:id',async(req,res)=>{
  try{
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if(user){
      res.json({success:true,msg:"User deleted successfully",user});
    }
    else{
      res.json({success:false,msg:"User not found"})
    }
  }
  catch(err){
    res.json({success:false,msg:err.message});
  }
})
router.get("/users", async (req, res) => {
  try {
    // const { name, email, password } = req.body;

    // check if user exists
   const user = await User.find();
   res.json({success:true,users:user});
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});

// ---------------- Login ----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, msg: "Invalid email" });

    // check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ success: false, msg: "Invalid password" });

    // create token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ success: true, token, user });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});

module.exports = router;
