require('dotenv').config();
//import express
const express = require("express");

const cookieParser = require('cookie-parser');

//instance of express app
const app = express()

//define a port our server will listen from
const port = 7000;

//connect to db
const connect = require('./db/db')
connect();

//add cookie parser
app.use(cookieParser())

//corss origin resource configuration
const cors = require("cors");
const corsOptions = {
    origin: 'http://localhost:3333', // Replace with your actual frontend URL
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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