const fs = require('fs');

  //----------------------//
 //  Skedge Config File  //
//----------------------//

/* 
Hi Professor,

Welcome to Step 7 of section 15.1 of our final 
report.

We've take the liberty of pre-configuring Skedge
so as to save you time in getting it up and
running for yourself.

If you'd like to try configuring, you can follow
all the instructions found in section 15.1 of the
Final Report.

If you'd rather leave this file as is and skip a 
few steps, you can skip the following steps:

Step 3, Step 6, and Step 7.

Cheers,
Team Cantaloop
*/

// Step 3: Replace the following value here with your 
//connection string obtained from your account on the 
// MongoDB website.
let mongoDBConnectionString = "mongodb+srv://skedge-user:8sDBuOw3zMD4ZpQp@skedge-cantaloop-kueik.mongodb.net/skedge-app";

// Step 6: Replace the following value with the url hosting
// your generated public key.
let publicKeyPastebinURL = "https://pastebin.com/raw/8FH01qXk";

// Step 6: Replace the following value with your public key.
let publicRSAKey = 
`-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEApUJMYxpnsztyInKh8UlV
f+ZPs50RLCl/LTUi70SwB2PiEjGID6Yy5qwi1VIfVjz53TlP51MAL7WTZEIC9ABz
1Paa6Mov0UfisQh2yB7IRw12530I0ZXr3BJPgxwsfkDtWPalbfzkAaM1qiKEYwUC
wtaAbEf7F7uqOmcpknlovEutECNGSLTljV9IGtIN79qS1gN6+Z9PyhCkYy3om6fV
M6oihg+tKAjQ8d0zeUWqUixpTrISDqXGysQGBqnliSjH68y9YZJYXY8GmfHNEpwM
c50JaNREyuIVF1MTOkS4y0K5UFvjuU59tlcnVAkk4XaziSR86tkxvvzx9TT+7tKK
8iaSzip37uenjtYKTKdUl9oXbXjCqIR+Li1maVWVG9FWD2YgXkqBbQvsG/DBmgV7
mpWekbpdFU5dhQ+XvdXvgs88+bqdtRTg6Sh7SyPq7kNCKodkB3fJga6gISxRJy1/
zGjiS3QiKKupqEo2ZLW5OMmwK1CkUn+uHKZi22qXW8Yi4NMEC+5BZ18vu4opxLGh
crnI9HZGG2NGkX18wK+3QxytP5347oNB60BCFzq4Ht+g8FafK0EIzHUjfOMs7N08
459i3wcvQxyGdULouyAaOkf2Oi1XXfkhZfbkXkMwde1X+eJMfxlXBzKU/yZgG8Ha
1r5tXiRcmXGZmsZ7Q6vhR1ECAwEAAQ==
-----END PUBLIC KEY-----`;

// Step 6: Replace the following value with your private key.
let privateRSAKey =
`-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;


//--------------------------------------------------------------//
     //\\
    //  \\     
   //    \\    
  //      \\     DO NOT EDIT FILE PAST HERE
 //        \\  
//          \\ 


frontend_config = `
module.exports = {
    publicKeyPastebinURL:       "${publicKeyPastebinURL}"
}
`
backend_config = `
module.exports = {
    mongoDBConnectionString:    "${mongoDBConnectionString}",
    publicRSAKey:               \`${publicRSAKey}\`,
    privateRSAKey:              \`${privateRSAKey}\`
}
`

fs.writeFile("./skedge-frontend/src/config.js", frontend_config, (err) => {
    if (err) console.log(err);
    console.log("Successfully written frontend config.");
  });
  fs.writeFile("./skedge-backend/config.js", backend_config, (err) => {
    if (err) console.log(err);
    console.log("Successfully written backend config.");
  });