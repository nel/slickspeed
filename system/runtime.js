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
  
  /*  Naive implementation, it could be improved by parsing the namespace to preserve
      the binding, currently the binding is document to work with document.querySelector
      or document.getElements. But at one point framework could depend on their namespace binding,
      so it will require to parse the method and extract binding from method
      Currently everything should work fine and it does not seems to add overhead to benchmark  */
  function getFrameworkMethod() {
    return eval(SlickSpeed.frameworkMethod);
  }
  
  function test(selector){
    try {
      document.frameworkMethod = getFrameworkMethod();
      var start = new Date().getTime();
      var i = 1;
      var elements = document.frameworkMethod(selector);
      i ++; document.frameworkMethod(selector);
      i ++; document.frameworkMethod(selector);
      i ++; document.frameworkMethod(selector);
      i ++; document.frameworkMethod(selector);
      i ++; document.frameworkMethod(selector);
      var end = ((new Date().getTime() - start) / i);
      return {'time': Math.round(end), 'found': get_length(elements)};
    } catch(err){
      if (elements == undefined) elements = {length: -1};
      return ({'time': (new Date().getTime() - start) / i, 'found': get_length(elements), 'error': err});
    }
  };
  
  /*  remove callback implementation as it is unnecessary and break crossbrowser compat
      if you experiment race conditions (test launched when lib not yet available then a lock
      will have to be implement though callback) */
  function loadFromFile(file) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file);
    head.appendChild(script);
  }
  
  /*  no callback see loadFromFile comment */
  function loadFromGoogleJsapi(id, version) {
    google.load(id, version);
  }
  
  function setup() {
    var framework = get_url_param('framework');
    if(!framework) return;
    var f = SlickSpeed.frameworks[parseInt(framework)];
    SlickSpeed.frameworkMethod = f.method;
    if (f.file)
      return loadFromFile('./frameworks/' + f.file);
    else if (f.id)
      return loadFromGoogleJsapi(f.id, f.version || '1');
    //no file framework not found
  };
  
  return {
    frameworks: window.frameworks,
    setup: setup,
    test: test,
    getFrameworkMethod: getFrameworkMethod
  };
})();

SlickSpeed.setup();