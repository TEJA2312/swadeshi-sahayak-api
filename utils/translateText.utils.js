const translate = require('../configurations/googleTranslationApi.config')

async function translateText(text, language) {
  try{
    let translations = await translate.translate(text, language);
    return translations[0];
  }catch(error){
    throw Object.assign(new Error(error), { statusCode: 500 });
  }
}

module.exports = translateText;