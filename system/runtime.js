SlickSpeed = (function(){  
  //grab a param from current location url
  function get_url_param(param_name) {
    var regex = new RegExp( "[\\?&]"+param_name+"=([^&#]*)" );
    var results = regex.exec( window.location.href );
    return (results == null) ? "" :  decodeURIComponent(results[1]); 
  };
  
  function get_length(elements){
  	return (typeof elements.length == 'function') ? elements.length() : elements.length;
  };
  
  //Naive implementation, feel free to implement a new one
  //it seems to have no effect on benchmark
  function getFrameworkMethod() {
    return eval(SlickSpeed.frameworkMethod);
  }
  
  function test(selector){
  	try {
  	  var frameworkMethod = getFrameworkMethod();
  		var start = new Date().getTime();
  		var i = 1;
  		var elements = frameworkMethod(selector);
  		i ++; frameworkMethod(selector);
  		i ++; frameworkMethod(selector);
  		i ++; frameworkMethod(selector);
  		i ++; frameworkMethod(selector);
  		i ++; frameworkMethod(selector);
  		var end = ((new Date().getTime() - start) / i);
  		return {'time': Math.round(end), 'found': get_length(elements)};
  	} catch(err){
  		if (elements == undefined) elements = {length: -1};
  		return ({'time': (new Date().getTime() - start) / i, 'found': get_length(elements), 'error': err});
  	}
  };
  
  /* remove callback implementation as it is unnecessary and break crossbrowser compat
    if you experiment race conditions (test launched when lib not yet available then a lock will have to be implement though callback) */
  function loadFromFile(file) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    head.appendChild(script);
  }
  
  /* no callback see loadFromFile comment */
  function loadFromGoogleJsapi(id, version) {
    google.load(id, version);
  }
  
  function setup() {
    var framework = get_url_param('framework');
    var f = SlickSpeed.frameworks;
    for(var i in f) {
      if (f[i].name == framework) {
        SlickSpeed.frameworkMethod = f[i].method;
        if (f[i].file)
          loadFromFile('./frameworks/' + f[i].file);
        else if (f[i].id)
          loadFromGoogleJsapi(f[i].id, f[i].version || '1', {uncompressed:true});
        else
          alert('framework not found');
      }
    };
  };
  
  return {
    frameworks: window.frameworks,
    setup: setup,
    test: test,
    getFrameworkMethod: getFrameworkMethod
  };
})();

SlickSpeed.setup();