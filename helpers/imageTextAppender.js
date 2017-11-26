var fs = require('fs'),
    gm = require('gm').subClass({imageMagick: false});
    // gm = require;


function appendText(imgPath, text) {
  return new Promise((resolve, reject) => {
    let texts = text.split(' ');

    let outputPath = 'public/final.png';
    console.log('----');


    console.log(imgPath, text);
    console.log(outputPath);

    gm(imgPath)
        // .font("SpectralSC-Regular.ttf", 32)
        // .stroke("#ffffff")
        // .drawText(200, 310, text)
        .write(outputPath, function (err) {
            if (!err) {
              resolve(outputPath);
            }
            if (err) {
              console.log(outputPath);
              console.log('error');
              console.log(err);
              reject(err);
              return;
            }
        });
  })

}

module.exports = appendText;
