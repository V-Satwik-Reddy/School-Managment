const router = require('express').Router();
const db=require('../model');
router.get("/", (req, res) => {
  const { latitude, longitude } = req.query;

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ error: "Latitude and longitude are required and must be numbers." });
  }

  const query = `
    SELECT *,
      (6371 * ACOS(
        COS(RADIANS(?)) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(?)) +
        SIN(RADIANS(?)) * SIN(RADIANS(latitude))
      )) AS distance
    FROM schools
    ORDER BY distance ASC
  `;

  db.query(query, [lat, lon, lat], (err, results) => {
    if (err) {
      console.error("Error fetching schools:", err);
      return res.status(500).json({ error: "Failed to fetch schools" });
    }

    res.status(200).json(results);
  });
});

  

  
module.exports = router;