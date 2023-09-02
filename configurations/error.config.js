
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'
  
  console.error(err.stack);

  if(process.env.NODE_ENV === 'development') return res.status(statusCode).json({ error: message });
  
  return res.status(500).json({ error: "Internal Server Error" });

}

module.exports = errorHandler;