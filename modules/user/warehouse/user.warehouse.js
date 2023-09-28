const User = require('../schemas/user.schema');

const userWarehouse = {

  createUser: async (requestBody) => {
    return await User.create(requestBody);
  },
  getUserByEmail: async (email) => {
    return await User.findOne({ email: email }).select('-jwtToken')
  },
  getUserById: async (id) => {
    return await User.findOne({ _id: id });
  },
  updateUserById: async (requestBody, userId) => {
    return await User.findByIdAndUpdate(userId, requestBody, { new: true });
  },

}

module.exports = userWarehouse;