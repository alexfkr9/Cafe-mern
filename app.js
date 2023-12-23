const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();

const indexRouter = require('./routes/routes');
app.use('/', indexRouter);

// Accessing the path module
const path = require('path');

app.use(express.static(__dirname + '/public/image/'));

// If in production, then use static frontend build files.
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  console.log('production');
  app.use(express.static(path.join(__dirname, './client/build')));
}

const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

const db =
  'mongodb+srv://san:gabuzovg@cluster0.uksn7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

async function start() {
  try {
    await mongoose.connect(db || uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

mongoose.connection.on('connected', function () {
  console.log('Mongo connected');
});

mongoose.connection.on('error', function (err) {
  console.log('Mongo connection error:' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongo disconnected');
});

start();
