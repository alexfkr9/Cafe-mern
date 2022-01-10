const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
const jsonParser = express.json();

require('dotenv').config();

const indexRouter = require('./routes/routes');
app.use('/', indexRouter);

// Accessing the path module
const path = require("path");



app.use(express.static(__dirname + "/public/image/"));

// If in production, then use static frontend build files.
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    console.log("production");
    app.use(express.static(path.join(__dirname, './client/build')))    
}


const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

// const db = "mongodb+srv://san:master9@cluster0.uksn7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// mongoose.connect( uri || db, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, function(err){
//     if(err) return console.log(err);
//     app.listen(PORT, function(){
//         console.log("server is run ...");
//     });
// }); 


app.listen(PORT, function(){
        console.log("server is run ...");
    });

   
 
