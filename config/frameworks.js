window.frameworks = [
  {
    name: "MooTools stable",
    method: "$$",
    id: "mootools",
    version: "1"
  },
  {
    name: "Prototype stable",
    method: "$$",
    id: "prototype",
    version: "1"
  },
  {
    name: "Dojo stable",
    method: "dojo.query",
    id: "dojo",
    version: "1"
  },
  {
    name: "JQuery stable",
    method: "jQuery",
    id: "jquery",
    version: "1"
  }
]

/*
just add a framework here following the conventions to add another framework, this is just a Json array of hash.
the function parameter is to choose the right css selector function name
the id param is the id of the framework according to google jsapi
and the version param is the version you want (1 means lastest version of the 1 branch)

Drawbacks:
the yui version available though google js api does not seems to have the YAHOO.Util.Selector part :/

{
  name: "MooTools",
  method: "$$",
  file: "mootools.js"
}

*/