var async = require("async");
var request = require('request')
var requestFactory = require('./request-factory');
var fs = require('./file-settings');

var settingsManager = new fs.SettingsManager();
var requestManager = new RequestManager();

function RequestManager(){

  var _requestManager = this;
  _requestManager.settings = {};
  _requestManager.response = {
    'data': ''
  };

  _requestManager.options = {};

  _requestManager.executeRequest = function () {

    request(_requestManager.options, function (err, res, body) {
      if (err) {
        console.log('Error :', err)
        return
      }

      _requestManager.response.data = body;
      console.log(body)
      var token = body.accessToken;
       if (token != undefined) {
          _requestManager.settings.token = token;
          console.log(token)
       }

       // Write new token
       settingsManager.saveSettings(requestManager.settings);
    });

  }

}

function main() {
  try {
    requestManager.settings = settingsManager.loadSettings();
  } catch(e) {
    // statements
    console.log(e);
    return;
  }
  
  var commands = ['login','login']; 
  var requests = []; 
  try {

    for (var i = 0; i < commands.length; i++) {
      
      var localFunction = function(){
       requestManager.options = requestFactory.getOptions(requestManager.settings,commands[i]);
       requestManager.executeRequest();
      }
      requests.push(localFunction());
    
    }

    async.series(requests);
  } catch(e) {
    // statements
    console.log(e);
    return;
  }
  
  
}

main();