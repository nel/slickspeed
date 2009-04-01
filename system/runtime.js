SlickSpeed = (function(){  
  //This is a basic function to load js script in head supporting 
  //callback when script is load
  //the callback will work on firefox, Opera, safari 3.X and ie
  function load_script(src, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', src);
    if (callback) {
      if (/KHTML/.test(navigator.userAgent))
        script.addEventListener("load", callback);
      else if (/MSIE/.test(navigator.userAgent)) {
        script.onreadystatechange = function() {
            var rs = this.readyState;
            if ("loaded" === rs || "complete" === rs) {
                n.onreadystatechange = null;
                callback();
            }
        };
      } 
      else
        script.onload = callback;
    }
    head.appendChild(script);
  };
  
  //grab a param from current location url
  function get_url_param(param_name) {
    var regex = new RegExp( "[\\?&]"+param_name+"=([^&#]*)" );
    var results = regex.exec( window.location.href );
    return (results == null) ? "" : results[1]; 
  };
  
  //callback launch when js framework loaded
  function when_script_loaded() {
  };
  
  function get_length(elements){
  	return (typeof elements.length == 'function') ? elements.length() : elements.length;
  };

  function test(selector){
  	try {
  	  var frameworkMethod = eval(SlickSpeed.frameworkMethod);
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
  
  function setup() {
    var framework = get_url_param('framework');
    var f = SlickSpeed.frameworks;
    var id = '';
    var version = '1';
    for(var i in f) {
      if (f[i].id == framework) {
        SlickSpeed.frameworkMethod = f[i].method;
        id = f[i].id;
        if (f[i].version) version =  f[i].version;
      }
    };
    if (!framework || !id || !SlickSpeed.frameworkMethod) return;
    google.load(id, version, {uncompressed:true});
    google.setOnLoadCallback(when_script_loaded);
  };
  
  return {
    frameworks: window.frameworks,
    setup: setup,
    test: test
  };
})();

SlickSpeed.setup();