const axios = require('axios');
const fs = require('fs');


module.exports = () => {

  return new Promise((resolve, reject) => {
    const filename = __dirname + '/../dictionaries/namesRus.txt';
    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) throw reject(err);
      const vineTitlesArr = data.split('\n');
      const rand = Math.floor(Math.random() * vineTitlesArr.length);
      const baseTitle = vineTitlesArr[rand];

      resolve(baseTitle.split(' '));

      // const query = `https://paraphraser.ru/api?c=vector&query=${encodeURIComponent(baseTitle)}&lang=ru&type=vector&token=882a9e4abe9c34f3fe8ca0e8479ef64e02b36def&top=5&scores=0&forms=0`;

      // axios.get(query)
      //   .then(text => {
      //     const returnArr = text.data.response[1].vector;
      //     if (returnArr.length > 0) {
      //       resolve(returnArr);
      //       return;
      //     }
      //     resolve(query);
      //   })
      //   .catch(err => {
      //     reject(err);
      //   });
    });
  });

};
