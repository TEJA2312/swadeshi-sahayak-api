const whatsAppWarehouse = require('../warehouse/whatsApp.warehouse');
const languageDetection = require('../../../utils/languageDetection.utils');
const translateText = require('../../../utils/translateText.utils');
const openai = require('../../../configurations/gpt.config')

const whatsAppController = {

  converse: async (req, res, next) => {
    try {
    
    if(!req.body.userId || !req.body.question) throw Object.assign(new Error('userId and question is required'), { statusCode: 500 });

     const locale = await languageDetection(req.body.question);

     let question = req.body.question;

     if(locale !== 'en') question = await translateText(req.body.question, 'en');

     await whatsAppWarehouse.createWhatsAppHistory({
      userId: req.body.userId,
      role: 'user',
      multilingualContent: req.body.question,
      content: question,
      locale: locale
     })
         
     let finalMessagesArray = await whatsAppController.getContextForGPT(req.body.question, req.body.userId, locale)
    
     finalMessagesArray.push({ role: "system", content: "Below is the user's actual query for you to answer:"})
     finalMessagesArray.push({ role: "user", content: question });

     const chatCompletion = await openai.chat.completions.create({
       messages: finalMessagesArray,
       model: "gpt-3.5-turbo",
     });

     let response = chatCompletion.choices[0].message.content;

     if(locale !== 'en') response = await translateText(response, locale);

     await whatsAppWarehouse.createWhatsAppHistory({
      userId: req.body.userId,
      role: 'assistant',
      multilingualContent: response,
      content: chatCompletion.choices[0].message.content,
      locale: locale
     })
 
     return res.status(200).json({ output: response, english: chatCompletion.choices[0].message.content });
 
    } catch(error){
     console.error(error)
     next(error);
    }
 
  },
  

  getContextForGPT: async (search, userId, locale) => {
    try{
      
      let finalContextArray = [{ role: "system", content: "You are a helpful assistant. Your response will translated to users preffered language (by us not by you) so avoid using proverbs, idioms, and wordplay" }]

      let result = await whatsAppWarehouse.searchInWhatsAppHistory(search, userId, locale);

      if(result.length === 0){
        const latest = await whatsAppWarehouse.getLatestWhatsAppHistory(userId);
        result = latest.reverse();
      }
      
      if(result.length !== 0) {
        finalContextArray.push({ role: "system", content: "Here is some relevant context that matches the user\'s query:" });
        finalContextArray = [...finalContextArray, ...result ]
       }
            
      return finalContextArray

    } catch(error) {
      console.error(error);
      throw new Error(error);
    }    
  },

  test_getContextForGPT: async (req, res, next) => {
    try{
      
      const locale = await languageDetection(req.query.question);
      const result = await whatsAppController.getContextForGPT(req.query.question, req.query.userId, locale);

      return res.status(200).json(result);

    }catch(error){
     console.error(error)
     next(error);
    }
  }

}

module.exports = whatsAppController;