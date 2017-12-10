const mongoose = require('mongoose');

const config = require('../config');


module.exports = () => {

  mongoose.connect(config.db.url);
  mongoose.connection
     .once('open', () => {
       console.log('connected to db');
     })
     .on('error', (error) => {
       console.warn('Warning', error);
     });

};
