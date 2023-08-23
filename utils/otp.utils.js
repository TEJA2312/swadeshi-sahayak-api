
function generateOTP (numberOfDigits) {
  
  var i = 0; var otp = '';

  while(i < numberOfDigits){
    otp += `${Math.floor(Math.random() * 10)}`
    i++;
  }
  
  return otp

}

module.exports = generateOTP;