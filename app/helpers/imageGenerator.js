const Jimp = require('jimp');
const path = require('path')
const resolvePath = path.resolve

const tangakFontPath = resolvePath(__dirname + "/../fonts/tangak-32-black/tangak-32-black.fnt")

module.exports = async (img1, img2, text) => {
  console.log('text to print ' + text);

  try {
    const image = await Jimp.read(img1);
    const image2 = await Jimp.read(img2);
    const font = await Jimp.loadFont(tangakFontPath);

    console.log(tangakFontPath)

    console.log('image 1 info:')
    console.log(image.bitmap)
    console.log('image 2 info:')
    console.log(image2.bitmap)

    var sizeCoefficient = 32;

    image.resize(500, 450);
    image2.resize(500, 450);
    image.composite(image2, 0, 0);
    const textPosX = 250 - (text.length) * sizeCoefficient / 4;
    const textPosY = 295 + 640 / sizeCoefficient;
    image.print(font, textPosX, textPosY, text);
    image.quality(60);
    image.write(`${img1}`);

    return img1;
  } catch (error) {
    console.log(error);
  }

};
