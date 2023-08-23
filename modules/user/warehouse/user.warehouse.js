const User = require('../schemas/user.schema');

const userWarehouse = {

  createUser: async (requestBody) => {
    return await User.create(requestBody);
  },
  getUserByPhoneNumber: async (phone) => {
    return await User.findOne({ phone: phone });
  },
  getUserById: async (id) => {
    return await User.findOne({ _id: id });
  },
  updateUserById: async (requestBody, userId) => {
    return await User.findByIdAndUpdate(userId, requestBody)
  },

}

module.exports = userWarehouse;