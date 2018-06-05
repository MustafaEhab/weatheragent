
'use strict';
const http = require('http');
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const host = 'http://api.apixu.com';
const path = '/v1/current.json?key=fdff7e3c29cf427aa30112456180406&q=cairo';

process.env.DEBUG = 'dialogflow:debug';
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
//  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
 // console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  //console.log('this is from me :'+JSON.stringify(request.body.responseId));
  //console.log("this is the date:  "+ JSON.stringify(request.body.queryResult.parameters.date));
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand,MustafaEhab`);
   // agent.add(`I'm sorry, can you try again?`);
}

   function weatherapifu(agent) {
    http.get({host: host, path: path}, (res) => {
        console.log(JSON.stringify(res));
  });

     agent.add(new Suggestion(`Quick Reply`)); //de lw 3yz t3mel suggestion 
     agent.add(new Suggestion(`Suggestion`)); //grbtha marten 
     agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
   }

  let intentMap = new Map();
  intentMap.set('Welcome', welcome);
  intentMap.set('Fallback', fallback);
    intentMap.set('weather', weatherapifu);
    agent.handleRequest(intentMap);
});
