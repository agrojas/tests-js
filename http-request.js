// var http = require('http');
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
      var token = body.accessToken;
       if (token != undefined) {
          _requestManager.settings.token = token;
          console.log(token)
       }
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
  
  try {
    requestManager.options = requestFactory.getOptions(requestManager.settings,process.argv[2]);
    requestManager.executeRequest();
  } catch(e) {
    // statements
    console.log(e);
    return;
  }
  
  
}

main();