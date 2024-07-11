//import express
const express = require("express");

//instance of express app
const app = express()

//define a port our server will listen from
const port = 3000;

const connect = require('./db/db')

//connect to db
connect();

//add cookie parser
const cookieParser = require('cookie-parser')

app.use(cookieParser)
//corss origin resource configuration
const cors = require("cors");

app.use(cors());

// setup route connections
const lecAuthRoute = require('./routes/lecturerAuth');
const qrcodeRoute = require('./routes/genQRcode');


// middlewre 
app.use(express.json()); // express request body-parser


//routes
app.use('/auth', lecAuthRoute);
app.use('/app', qrcodeRoute);

// event listner to confirm connection
app.listen(port, ()=>{console.log('server started')});