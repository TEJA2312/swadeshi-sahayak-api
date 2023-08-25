const translate = require('../configurations/googleTranslationApi');

async function languageDetection(text) {
  try{
    let detections = await translate.detect(text);
    return detections[0].language;
  }catch(error){
    throw Object.assign(new Error('failed to detect language'), { statusCode: 500 });
  }
}

module.exports = languageDetection;