var async = require('async');

console.log('in main');

doABunchOfThings(function() {
  console.log('back in main');
});

function doABunchOfThings(fnCallback) {
  async.series([
    function(callback) {
      console.log('step 1');
      callback();
    },
    function(callback) {
    	console.log('step 1.1');
      setTimeout(callback, 2000);
    },
    function(callback) {
      console.log('step 2');
      callback();
    },
    function(callback) {
      console.log('step 2.1');
      setTimeout(callback, 1000);
    },
    function(callback) {
      console.log('step 3');
      callback();
    },
  ], function(err, results) {
    console.log('done with things');
    fnCallback();
  });
}