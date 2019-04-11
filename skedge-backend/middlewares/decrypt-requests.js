const decrypt = require("../web_api_utilities/rsa-encryption").decryptStringWithRsaPrivateKey

module.exports = function (req, res, next) {
    try {
        if(req.method == "POST" && req.body != undefined)
        {
            decryptedBodyString = decrypt(req.body.encrypted_data).toString();
            req.body = JSON.parse(decryptedBodyString);
        }
    } 
    catch (error) {
        console.log(error);
        console.log("---------------------------------------------------------\nReceived encrypted data:");
        console.log(req.body.encrypted_data);
        console.log("---------------------------------------------------------\nDecrypted above data:");
        console.log(req.body);
    }
    
    next();
  }
