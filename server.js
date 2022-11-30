// require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');
const environement = process.env.NODE_ENV || 'development';
const DB_URL = config.mongoURI[environement];

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Initializing the app
const app = express();

mongoose.connect(DB_URL, { useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
    if (err) console.log(err)
});

// test if the database has connected successfully
let db = mongoose.connection;
db.once('open', ()=>{
    console.log('Database connected successfully. DB URL: ', DB_URL)
})

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder;
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(express.json())


app.use('/', index);
app.use('/image', image);

const PORT = process.env.PORT || 8000;
app.listen(PORT,() =>{
    console.log(`Environment: ${environement}`);
    console.log(`Server is listening at http://localhost:${PORT}`)
});

module.exports = app;
