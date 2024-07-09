//import express
const express = require("express");

//instance of express app
const app = express()

//define a port our server will listen from
const port = process.env.PORT || 3000;

const connect = require('./db/db')

//connect to db
connect();


// setup route connections
const lecAuthRoute = require('./routes/lecturerAuth');
const qrcodeRoute = require('./routes/genQRcode');


// middlewre 
app.use(express.json()); // express request body-parser


//routes
app.use('/', lecAuthRoute);
app.use('/gen', qrcodeRoute);

// event listner to confirm connection
app.listen(port, ()=>{console.log('server started')});