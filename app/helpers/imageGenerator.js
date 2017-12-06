const Jimp = require('jimp');

const transliterate = require('./index').transliterate;


module.exports = async (img1, img2, text) => {
  console.log('text to print ' + text);

  try {
    const image = await Jimp.read(img1);
    const image2 = await Jimp.read(img2);
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

    image.resize(500, 450);
    image2.resize(500, 450);
    image.composite(image2, 0, 0);
    const textPosX = 250 - (text.length) * 8;
    image.print(font, textPosX, 330, transliterate()(text)); // нужно потом порефакторить функцию
    image.quality(60);
    image.write(`${img1}`);

    return img1;
  } catch(error) {
      console.log(error);
  }

};
