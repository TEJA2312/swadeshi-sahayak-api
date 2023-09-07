const whatsAppWarehouse = require('../warehouse/whatsApp.warehouse');
const languageDetection = require('../../../utils/languageDetection.utils');
const translateText = require('../../../utils/translateText.utils');
const openai = require('../../../configurations/gpt.config')

const whatsAppController = {

  converse: async (requestBody, userId) => {
    try {
    
    if(!requestBody.question) throw Object.assign(new Error('question is required'), { statusCode: 500 });

     const locale = await languageDetection(requestBody.question);

     let question = requestBody.question;

     if(locale !== 'en') question = await translateText(requestBody.question, 'en');

     await whatsAppWarehouse.createWhatsAppHistory({
      userId: userId,
      role: 'user',
      multilingualContent: requestBody.question,
      content: question,
      locale: locale
     })
         
     let finalMessagesArray = await whatsAppController.getContextForGPT(requestBody.question, userId, locale)
    
     finalMessagesArray.push({ role: "system", content: "Below is the user's actual query for you to answer:"})
     finalMessagesArray.push({ role: "user", content: question });

     const chatCompletion = await openai.chat.completions.create({
       messages: finalMessagesArray,
       model: "gpt-3.5-turbo",
     });

     let response = chatCompletion.choices[0].message.content;

     if(locale !== 'en') response = await translateText(response, locale);

     await whatsAppWarehouse.createWhatsAppHistory({
      userId: userId,
      role: 'assistant',
      multilingualContent: response,
      content: chatCompletion.choices[0].message.content,
      locale: locale
     })
 
     return { output: response, english: chatCompletion.choices[0].message.content }
 
    } catch(error){
      throw error;
    }
 
  },
  

  getContextForGPT: async (search, userId, locale) => {
    try{
      
      let finalContextArray = [
        { role: "system", content: "You are a helpful assistant. Your response will translated to users user-preferred language (by us not by you) so avoid using proverbs, idioms, and wordplay" },
        { role: "system", content: "I have provided both relevant messages that match the user\'s query and the latest messages both of which may or may not be related to the user's query" }
      ]

      const relevantMessages = await whatsAppWarehouse.searchInWhatsAppHistory(search, userId, locale);

      const latestMessages = await whatsAppWarehouse.getLatestWhatsAppHistory(userId);

      if(relevantMessages.length !== 0) {
        finalContextArray.push({ role: "system", content: "Here is some relevant context that matches the user\'s query:" });
        finalContextArray = [...finalContextArray, ...relevantMessages];
      }
      
      if(latestMessages.length !== 0) {
        finalContextArray.push({ role: "system", content: "Here are some recent messages of the user:" });
        finalContextArray = [...finalContextArray, ...latestMessages ]
       }
            
      return finalContextArray

    } catch(error) {
      throw error;
    }    
  }

}

module.exports = whatsAppController;