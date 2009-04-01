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

function get_url_param(param_name) {
  var regex = new RegExp( "[\\?&]"+param_name+"=([^&#]*)" );
  var results = regex.exec( window.location.href );
  return (results == null) ? "" : results[1]; 
};

function setup() {
  var framework = get_url_param('framework');
  var f = window.frameworks;
  var src = '';
  for(var i in f) {
    if (f[i].name == framework) {
      window.frameworkMethod = f[i].method;
      src = './frameworks/'+ f[i].file;
    }
  };
  if (!framework || !src || !window.frameworkMethod) return;
  load_script(src, when_script_loaded);
};

function when_script_loaded() {
  //could raise
  window.frameworkMethod = eval(window.frameworkMethod);
};

function get_length(elements){
	return (typeof elements.length == 'function') ? elements.length() : elements.length;
};

function test(selector){
	try {
		var start = new Date().getTime();
		var i = 1;
		var elements = window.frameworkMethod(selector);
		i ++; window.frameworkMethod(selector);
		i ++; window.frameworkMethod(selector);
		i ++; window.frameworkMethod(selector);
		i ++; window.frameworkMethod(selector);
		i ++; window.frameworkMethod(selector);
		var end = ((new Date().getTime() - start) / i);
		return {'time': Math.round(end), 'found': get_length(elements)};
	} catch(err){
		if (elements == undefined) elements = {length: -1};
		return ({'time': (new Date().getTime() - start) / i, 'found': get_length(elements), 'error': err});
	}
};

window.onload = setup;