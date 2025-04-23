const express=require('express');
const app=express();

app.use(express.json());
app.get("/",(Req,res)=>{
    res.send("Welcome to the School Management System API, the endpoints are /addSchool and /listschools");   
})

const db = require('./model');

db.query('SELECT 1 + 1 AS solution', (err, results) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('DB connected. Result:', results[0].solution); // should log 2
  }
});

app.use("/addSchool",require("./routes/addSchool"));
app.use("/listschools",require("./routes/listschools"));
app.listen(3000,()=>{
    console.log("Server is running on port http://localhost:3000");
})