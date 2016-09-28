"use strict";
var fs = require('fs');

var SettingsManager = function() {
  ///--- Exported API
  this.file_path = './local-settings.json';

  this.loadSettings = function () {
    var contents = fs.readFileSync(this.file_path).toString();
    var settings = JSON.parse(contents);
    return settings;
  }

  this.saveSettings = function (settings) {
    fs.writeFileSync(this.file_path, JSON.stringify(settings));
  }
  
}

module.exports.SettingsManager = SettingsManager;
