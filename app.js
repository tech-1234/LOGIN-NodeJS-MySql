const express = require('express');
const path = require('path');
const mysql = require('mysql');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

// using the public directory for css and js file
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent bu API clients)
app.use(express.json());

// set up cookie
app.use(cookieParser());

// setting up the template engine 
app.set('view engine', 'hbs');

// connecting to the database
db.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('MySql connected');
    }
});

// Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5000, (req, res) => {
    console.log(`Server started on Port 5000`);
});