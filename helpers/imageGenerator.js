const Jimp = require("jimp");

//Если с английского на русский, то передаём вторым параметром true.
transliterate = (
  function () {
    var
      rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),
      eng = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g)
      ;
    return function (text, engToRus) {
      var x;
      for (x = 0; x < rus.length; x++) {
        text = text.split(engToRus ? eng[x] : rus[x]).join(engToRus ? rus[x] : eng[x]);
        text = text.split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase()).join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
      }
      return text;
    }
  }
)();

const generateImage = (image1, image2, text) => {
  console.log('text to print ' + text)
  return new Promise((resolve, reject) => {
    Jimp.read(image1).then(image => {
      Jimp.read(image2).then(image2 => {
        Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => {
          image.resize(500, 450);
          image2.resize(500, 450);
          image.composite(image2, 0, 0);
          var textPosX = 250 - (text.length) * 8;
          console.log(textPosX)
          image.print(font, textPosX, 330, transliterate(text));
          image.quality(60);
          image.write(`${image1}`); // save
          resolve(image1);
        });
      });
    }).catch(err => {
      console.error(err);
    });
  });
};

module.exports = generateImage;
