const moment = require('moment')

const otpWarehouse = require('../warehouse/otp.warehouse');
const userWarehouse = require('../warehouse/user.warehouse')
const generateOTP = require('../../../utils/otp.utils');
const mailchimpClient = require("@mailchimp/mailchimp_transactional")(process.env.MAILCHIMP_API_KEY);

const otpController = {

  generateOtpForUser: async (userId, email) => {
    try{

      if(!userId || !email) throw new Error('userId and email is required')

      let data = {
        userId: userId,
        otp: generateOTP(6),
        createdAt: moment.utc().toDate()
      }

      const html = `<tbody><tr>
      <td class="mceColumn" data-block-id="-4" valign="top" colspan="12" width="100%" style="padding-top: 0px; padding-bottom: 0px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation">
      <tbody><tr>
      <td class="mceBlockContainer" valign="top" style="background-color: transparent; padding: 0px;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="2" style="background-color: transparent;">
      <tbody><tr><td valign="top" style="min-width: 100%; border-top: 20px solid transparent;">
      </td></tr></tbody></table></td></tr><tr>
      <td class="mceBlockContainer" align="center" valign="top" style="padding: 0px 48px;">
      <img data-block-id="3" width="125" height="auto" alt="Logo" src="https://dim.mcusercontent.com/cs/71fdfdc4009dba9378bea6eb4/images/b8036894-5dd1-5d7f-d723-5cffafb281d7.png?w=125&amp;dpr=2" class="" style="width: 125px; height: auto; max-width: 100%; display: block;"></td></tr><tr>
      <td class="mceBlockContainer" valign="top" style="background-color: transparent; padding: 0px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="4" style="background-color: transparent;">
      <tbody><tr><td valign="top" style="min-width: 100%; border-top: 20px solid transparent;"></td></tr></tbody></table></td></tr><tr>
      <td class="mceBlockContainer" valign="top" style="background-color: rgb(255, 255, 255); padding: 0px 24px;"><div data-block-id="5" data-rich-text="true" class="mceText" id="dataBlockId-5" style="width: 100%;"><div><div contenteditable="true" translate="no" tabindex="-1" class="ProseMirror"><h1><span style="font-size: 32px">
      <span style="font-family: 'Catamaran', sans-serif">Thank you for joining </span></span><span style="color:#1ec55d;">
      <span style="font-size: 32px"><span style="font-family: 'Catamaran', sans-serif">swadeshi</span></span></span><span style="font-size: 32px"><span style="font-family: 'Catamaran', sans-serif"> sahayak AI</span></span></h1></div></div></div></td></tr><tr><td class="mceBlockContainer" valign="top" style="padding: 12px 24px;">
      <div data-block-id="6" data-rich-text="true" class="mceText" id="dataBlockId-6" style="width: 100%;"><div><div contenteditable="true" translate="no" tabindex="-1" class="ProseMirror"><p><span style="font-size: 15px"><span style="font-family: 'Catamaran', sans-serif">Swadeshi Sahayak AI is an open-source initiative designed to empower India's tech-savvy Generation X by leveraging the capabilities of Artificial Intelligence (AI). This project recognizes the distinct challenges encountered by Generation X when navigating the digital realm and aims to close the divide between their requirements and the potential of AI technologies.</span></span></p></div></div></div></td></tr><tr>
      <td class="mceBlockContainer" valign="top" style="background-color: transparent; padding: 0px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="8" style="background-color: transparent;"><tbody><tr><td valign="top" style="min-width: 100%; border-top: 20px solid transparent;"></td></tr></tbody></table></td></tr><tr><td class="mceBlockContainer" valign="top" style="padding: 12px 24px;"><div data-block-id="17" data-rich-text="true" class="mceText" id="dataBlockId-17" style="width: 100%;"><div><div contenteditable="true" translate="no" tabindex="-1" class="ProseMirror"><h1>
      <span style="font-family: 'Catamaran', sans-serif">Your OTP :- ${data.otp}  </span></h1></div></div></div></td></tr><tr>
      <td class="mceBlockContainer" valign="top" style="padding: 12px 24px;">
      <div data-block-id="18" data-rich-text="true" class="mceText" id="dataBlockId-18" style="width: 100%;"><div><div contenteditable="true" translate="no" tabindex="-1" class="ProseMirror"><p>Please enter this OTP code on our website or app to confirm your email address. Please note that this OTP is valid for 10 minutes from the time of this email.</p></div></div></div></td></tr><tr><td class="mceLayoutContainer" valign="top" style="padding: 8px;"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="13" id="section_8fa0979ac908fe501b196da0d79f22e6" class="mceFooterSection"><tbody><tr class="mceRow"><td valign="top" style="background-position: center center; background-repeat: no-repeat; background-size: cover;"><table border="0" cellpadding="0" cellspacing="12" width="100%" role="presentation"><tbody><tr><td class="mceColumn" data-block-id="-3" valign="top" colspan="12" width="100%" style="padding-top: 0px; padding-bottom: 0px; margin-bottom: 12px;"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td class="mceBlockContainer" align="center" valign="top" style="padding: 12px 16px;"><div data-block-id="11" data-rich-text="true" class="mceText" id="dataBlockId-11" style="display: inline-block; width: 100%;"><div><div contenteditable="true" translate="no" tabindex="-1" class="ProseMirror"><p><br class="empty-node"><span style="font-size: 12px">You can </span><a href="*|UPDATE_PROFILE|*" tabindex="-1"><span style="font-size: 12px">update your preferences</span></a><span style="font-size: 12px"> or </span><a href="*|UNSUB|*" tabindex="-1"><span style="font-size: 12px">unsubscribe</span></a></p></div></div></div></td></tr><tr><td class="mceLayoutContainer" align="center" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" data-block-id="-2"><tbody><tr class="mceRow"><td valign="top" style="background-position: center center; background-repeat: no-repeat; background-size: cover;"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td class="mceColumn" data-block-id="-5" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td align="center" valign="top"><div><div data-block-id="12"><a data-href="https://mailchimp.com" data-button-block-id="12" target="_blank" rel="noopener noreferrer"><img width="137" height="53" alt="Email Marketing Powered by Mailchimp" title="Mailchimp Email Marketing" src="https://cdn-images.mailchimp.com/monkey_rewards/intuit-mc-rewards-1.png" style="max-width: 100%;"></a></div></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr>
      </tbody>`

      await otpWarehouse.createOtp(data);
      
      await mailchimpClient.messages.send({ message: {
        html: html,
        subject: "Your OTP for swadeshisahayakai.com",
        from_email: "tejas@swadeshisahayakai.com",
        from_name: "Swadeshi Sahayak Ai",
        to:[{ email: "tejas@swadeshisahayakai.com"  }],
        important: true
       } });

      return true;

    } catch (error) {
      throw error;
    }
  }
}

module.exports = otpController;