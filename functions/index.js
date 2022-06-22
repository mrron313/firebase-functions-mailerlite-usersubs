const functions = require("firebase-functions");
const axios = require('axios');
const cors = require('cors')({origin: true});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.subscribeUser = functions.auth.user().onCreate((user) => {
  console.log('new user signed up', user);
  // MailerLite API
  var data = JSON.stringify({
    "email": user.email,
    "resubscribe": false,
    "autoresponders": true,
    "type": null
  });

  var config = {
    method: 'post',
    url: 'https://api.mailerlite.com/api/v2/groups/111324133/subscribers',
    headers: { 
      'X-MailerLite-ApiDocs': 'true', 
      'X-MailerLite-ApiKey': 'API_KEY', 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    response.send(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
    response.send(error);
  });
});

