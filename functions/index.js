const functions = require("firebase-functions");
const axios = require('axios');
const cors = require('cors')({origin: true});

exports.subscribeUser = functions.auth.user().onCreate((user) => {
  console.log('new user signed up from wp and app', user);
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
      'X-MailerLite-ApiKey': 'c10567d2d3efdaba7958420854af1f96', 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
});

exports.subscribeUserFromWP = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    res.send("hello"+ req.body.email);

    console.log('new user signed up from wp', req.body);
    // MailerLite API
    var data = JSON.stringify({
      "email": req.body.email,
      "resubscribe": false,
      "autoresponders": true,
      "type": null
    });
  
    var config = {
      method: 'post',
      url: 'https://api.mailerlite.com/api/v2/groups/111335351/subscribers',
      headers: { 
        'X-MailerLite-ApiDocs': 'true', 
        'X-MailerLite-ApiKey': 'c10567d2d3efdaba7958420854af1f96', 
        'Content-Type': 'application/json'
      },
      data : data
    };
  
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  });
});