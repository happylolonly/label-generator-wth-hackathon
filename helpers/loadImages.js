var Bing = require('../modules/bing')({ accKey: "df71dc906c3f4b698e521f84e3bba21e" });

module.exports = (search) => new Promise((resolve, reject) => {
  console.log('search', search);

  const words = search.split(' ');
  const word = words[1] || words[0];
  Bing.images(word, {
    count: 5,
  }, (error, res, body) => {
      if (error) {
        reject(error);
      }
      const random = Math.round(Math.random() * 4);
      resolve(body.value[random]);
    });
});
