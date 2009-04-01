SlickSpeed.frameworks = [
  {
    name: "MooTools",
    method: "$$",
    file: "mootools.js"
  },
  {
    name: "Prototype",
    method: "$$",
    file: "prototype.js"
  },
  {
    name: "Dojo",
    method: "dojo.query",
    file: "dojo.js"
  },
  {
    name: "JQuery",
    method: "jQuery",
    file: "jquery.js"
  }
]

/*
just add a framework here following the conventions to add another framework, this is just a Json array of hash.
the function parameter is to choose the right css selector function name
the file is the framework file to be included for the test

{
  name: "MooTools",
  method: "$$",
  file: "mootools.js"
}

*/