const fs = require('fs');
const axios = require('axios');

const loadWords = require('../helpers/loadWords');
const loadImagesFromSearch = require('../helpers/loadImages');
const generateImage = require('../helpers/imageGenerator');


module.exports = (app) => {

  app.get('/api/generate', async (req, res) => {

    try {
      const titles = await loadWords();
      const rand = Math.floor(Math.random() * titles.length);
      const title = titles[rand];
      console.log(title);
      const data = await loadImagesFromSearch(title);
      console.log("data: " + data);
      if (!data) {
        console.log('no search');
        res.end();
        return;
      }
      const { encodingFormat, contentUrl } = data;
      const fullName = `${Date.parse(new Date())}.${encodingFormat}`;
      console.log(fullName);

      const response = await axios({
        method: 'get',
        url: contentUrl,
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
      throw new Error('error:', error);
    }

  });
};
