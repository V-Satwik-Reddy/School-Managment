const router = require('express').Router();
const db=require('../model');
router.post("/", (req, res) => {
    const { name, address, latitude, longitude } = req.body;
  
    if (!name || !address ||!latitude || !longitude) {
      return res.status(400).json({ error: "Invalid input. All fields are required" });
    }
    if (typeof latitude !== 'number' || typeof longitude !== 'number'){
      return res.status(400).json({ error: "Latitude and longitude must be numbers." });
    }
    const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
  
    db.query(query, [name, address, latitude, longitude], (err, result) => {
      if (err) {
        console.error("DB insert error:", err);
        return res.status(500).json({ error: "Database error while adding school." });
      }
  
      res.status(201).json({ message: "School added successfully", schoolId: result.insertId });
    });
  });

module.exports = router;