const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));

require('./routes/index')(app);
require('./routes/generate')(app);

const port = process.env.PORT || 3090;

const server = app.listen(port, () => {
  console.log('Server ready on:', port);
});
