const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const credentials = require('./credentials');

const app = express();

const { username, password, host } = credentials.mongodb;
const url = `mongodb://${username}:${password}@ds129156.mlab.com:29156/${host}`;
mongoose.connect(url);
mongoose.connection
   .once('open', () => {
     console.log('connected to db');
   })
   .on('error', (error) => {
     console.warn('Warning', error);
   });

app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));

require('./routes/index')(app);
require('./routes/generate')(app);

const port = process.env.PORT || 3090;

const server = app.listen(port, () => {
  console.log('Server ready on:', port);
});
