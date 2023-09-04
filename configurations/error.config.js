
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'
  
  console.error(err.stack);

  return res.status(statusCode).json({ error: message });
  
}

module.exports = errorHandler;