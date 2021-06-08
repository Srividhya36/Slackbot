'use strict';

var express = require('express');
var app = express();
var catalyst = require('zcatalyst-sdk-node');
var request = require('request');

app.use(express.json());

app.post('/listen', (req, res) => {
	console.log("1");
	//var catalystApp = catalyst.initialize(req);
	console.log("Body :"+JSON.stringify(req.body.event.blocks[0].elements[0].elements[0].text))
	var msg_txt = req.body.event.blocks[0].elements[0].elements[0].text;
	var data = JSON.stringify({"document":["I do not like the design of the new model."]});

	//connectors
	var catalystapp = catalyst.initialize(req);
	var connector = catalystapp
 .connection({
 ConnectorName: {
   client_id: {{CLIENT_ID}},
   client_secret:{{CLIENT_SECRET}},
   auth_url: 'http://www.zoho.com/catalyst',
   refresh_url: 'http://www.zoho.com/catalyst',
   refresh_token: '{{REFRESH_TOKEN}}'
  }
 })
 .getConnector('ConnectorName');
 connector.getAccessToken().then((accessToken) => {
		// your logic comes here
		//sentiment analysis API
	console.log("accesstoken"+accessToken)
/*var options = {
  'method': 'POST',
  'url': 'https://api.catalyst.zoho.com/baas/v1/project/5407000000119001/ml/sentiment-analysis',
  'headers': {
    'Authorization': 'Zoho-oauthtoken '+accessToken,
    'Content-Type': 'application/json'
  
  },
  body: JSON.stringify({"document":["I do not like the design of the new model."]})

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
*/
});


	var test = {
		"status":"200",
		"challenge":req.body.challenge
	};
	res.send(test);

});



module.exports = app;
