const fs = require('fs');
const axios = require('axios');

const loadWords = require('../helpers/loadWords');
const loadImagesFromSearch = require('../helpers/loadImages');
const generateImage = require('../helpers/imageGenerator');


module.exports = (app) => {

  app.get('/api/generate', async (req, res) => {

    try {
      const words = await loadWords();
      console.log(words);
      const rand = Math.floor(Math.random() * words.length);
      const title = words[rand];
      console.log(title);

      const image = await loadImagesFromSearch(title);

      const { url, encodingFormat } = image;
      console.log("Image: \n", image);
      if (!url) {
        // обработать ошибку
        res.end();
        return;
      }
      const fullName = `${Date.parse(new Date())}.${encodingFormat}`;
      console.log(fullName);

      const response = await axios.get(url, {
        responseType: 'stream'
      });

      const wstream = fs.createWriteStream('public/' + fullName);
      response.data.pipe(wstream);

      wstream.on('finish', async () => {
        console.log('file has been written');
        console.log(title);

        const baseImgPath = 'public/' + fullName;
        const outImgPath = await generateImage(baseImgPath, 'public/shab.png', title);

        res.send(outImgPath.split('public/')[1]);
      });

    } catch(error) {
      // throw new Error('error:', error);
      console.log(error);
    }

  });
};
