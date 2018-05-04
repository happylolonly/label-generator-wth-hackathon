const express = require('express');
const config = require('./app/config');

const app = express();

require('./app/helpers/db')();
require('./app/middlewares')(app, express);
require('./app/routes')(app);

const port = process.env.PORT || config.port;

app.listen(port, () => {
  console.log('Server ready on:', port);
});
