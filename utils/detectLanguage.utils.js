const cld = require('cld');

async function detectInputLanguage(string){
  var locale;
  try { 
    const result = await cld.detect(string);
    locale = result.languages[0].code;
  } catch(error) {
    console.log("lang", error);
    locale = 'en';
  }

  return locale;
}

module.exports = detectInputLanguage;