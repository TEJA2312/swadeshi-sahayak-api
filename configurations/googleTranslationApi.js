const { Translate } = require('@google-cloud/translate').v2;

const options = {
  keyFilename: './google_translate_token.json',
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
};

const translate = new Translate(options);

module.exports = translate;