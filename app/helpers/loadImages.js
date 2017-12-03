const Bing = require('../../modules/bing');
const config = require('../config');

const bing = Bing({ accKey: config.bingKey });

module.exports = (search) => {

  return new Promise((resolve, reject) => {
    const words = search.split(' ');
    const word = words[1] || words[0];
    console.log('search:', word);

    bing.images(word, {count: 5}, (error, res, body) => {
      if (error) {
        console.log(error);
        reject(error);
        return;
      }
      const random = Math.round(Math.random() * 4);
      console.log(body.value[random]);
      resolve(body.value[random]);
    });
  });

};
