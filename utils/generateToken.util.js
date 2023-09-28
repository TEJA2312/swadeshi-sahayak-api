const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '365d' });
};

module.exports = generateToken;