require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./model');
const helmet = require('helmet');
app.use(helmet());
const cors = require('cors');
app.use(cors());
const compression = require('compression');
app.use(compression());



app.get("/", (req, res) => {
  res.send("Welcome to the School Management System API, the endpoints are /addSchool and /listschools");
});

db.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('DB connected. Result:', results[0].solution);
  }
});

app.use(express.json());
app.use("/addSchool", require("./routes/addSchool"));
app.use("/listschools", require("./routes/listschools"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
