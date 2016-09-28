///--- Exported API



var getOptions = function(settings,command) {
	console.log('Run command ',command);
	// console.log('Run settings ',settings);
	var _uri = 'http://' + settings.envirioment + ':' + settings.port;
	
	var options = {
    	uri: _uri,
    	method: settings.method,
    	json: true, 
    	header: {
        'Content-Type': 'application/json',
        'Content-Length': undefined
	    }
	};

	var data = {};

	if (command == 'login') {

	    data = {
	      'userName': settings.user,
	      'password': settings.password
	    }
	    
	    options.uri += '/wifiesta-api-auth/v1/auth/';
	    console.log(options.uri);
	    options.method = 'POST';
	    options.body =  data;
	    console.log(options.body)

	    options.header['Content-Length'] = Buffer.byteLength(options.body.data);
	    options.header = options.header;

	} else if (command == 'place-test') {

	    options.uri += '/wifiesta-api-place/v1/places/test';
	    options.method = 'GET';

	} else if (command == 'update-email') {
	    
	} else if (command == 'update-password') {
	    
	} else {
	  	throw 'INVALID_REQUEST_EXCEPTION';
	}
	return options;
}

module.exports = {

  getOptions: getOptions


};
