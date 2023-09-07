const userWarehouse = require('../modules/user/warehouse/user.warehouse');

const phoneToUserId = async (req, res, next) => {
  try{
    
   if(!req.body.phone && !req.query.phone) throw new Error('source: middleware || phone number is required for this route') 
 
   let phoneNumber = req.body.phone || req.query.phone;
   const user = await userWarehouse.getUserByPhoneNumber(phoneNumber);
   
   if(!user) throw new Error('source: middleware || phone number not registered');

   req.userId = user._id;
   next();

  }catch(error){
    next(error);
  }
}

module.exports = phoneToUserId;