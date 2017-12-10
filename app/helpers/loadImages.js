const axios = require('axios');
const config = require('../config');


const URL = 'https://pixabay.com/api';

const loadImages = async (search) => {
  const images = await axios.get(URL, {
    params: {
      key: config.pixabayKey,
      q: search,
      lang: 'ru'
    }
  });
  return images.data.hits;
};

const handleNoSearch = () => {
  return {
    url: '',
    encodingFormat: ''
  }
}

module.exports = async (search) => {

  // возможно порефакторить

  console.log(search);

  try {
    let images = await loadImages(search);

    if (!images.length) {
      let splitedSearch = search.split(' ');

      if (!splitedSearch.length) {
        return handleNoSearch();
      }

      images = await loadImages(splitedSearch[1]);

      if (!images.length) {
        images = await loadImages(splitedSearch[0]);

        if (!images.length) {
          return handleNoSearch();
        }

      }
    }

    console.log(images);
    console.log(images.length);

    const random = Math.floor(Math.random() * images.length);

    const image = images[random].webformatURL;
    console.log(image);
    const encodingFormat = image.substr(image.lastIndexOf('.') + 1);


    return {
      url: image,
      encodingFormat,
    }

  } catch (error) {
    console.log('Loading images error: \n', error);

    // нужно найти заглушки, 1-5 картинок
    return handleNoSearch();
  }

};
