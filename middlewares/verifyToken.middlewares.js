const jwt = require('jsonwebtoken');
const userWarehouse = require('../modules/user/warehouse/user.warehouse')

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1]
    if (!token) return res.status(403).json({ message: 'Invalid Authorization' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    
    const userDetails = await userWarehouse.getUserById(decoded.userId);

    if(!userDetails.emailVerified) throw new Error('Email Verification Pending');

    next();

  } catch (error) {
    next(error)
  }
};

module.exports = verifyToken;