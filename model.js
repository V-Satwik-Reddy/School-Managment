const mysql=require('mysql2');
const dotenv = require('dotenv').config();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'school_db'
  });
  
  module.exports = db;