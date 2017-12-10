const morgan = require('morgan');


module.exports = (app, express) => {

  app.use(morgan('combined'));
  app.use(express.static(__dirname + '/../../public'));

};
