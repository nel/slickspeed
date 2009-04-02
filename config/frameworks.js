window.frameworks = [
  {
    name: "MooTools 1.2.1",
    method: "document.getElements",
    id: "mootools",
    version: "1.2.1"
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
  },
  {
    name: "Native querySelectorAll",
    method: "document.querySelectorAll"
  }
]

/*
This is the js frameworks configuration file. Edit this file to add/remove frameworks to test against.

This file is in JSON format, there are two way to load frameworks:

 - using the google jsapi (see http://code.google.com/apis/ajaxlibs/documentation/index.html for list of supported frameworks). The advantage of jsapi loading is that frameworks gets updated automatiquely or you can choose whatever version in a few seconds.
 
To load from jsapi the statement is:

{
  name: "Dojo stable",    //unique name of this framework version
  method: "dojo.query",   //selector method to be used
  id: "dojo",             //framework identifier (see google jsapi doc)
  version: "1"            //version to be loaded (see google jsapi doc), 1 mean that latest stable of the 1.x branch will be loaded
}
 
Drawbacks:
  * Not all library are supported (ext.js ?)
  * YUI frameworks though jsapi does not seems to have selector lib included
  * mootools version 1 seems to load mootools 1.1.0 instead of 1.2.1 weird
  * big brother is watching you

 - using files in ./frameworks folder, just put any js framework in that folder and add it in this conf file. This is great but js framework update quickly so if you want your benchs to stay up to date you will have to work :)

To load from ./frameworks folder declaration is:

{
  name: "JQuery stable",  //unique name of this framework version
  method: "jQuery",       //selector method to be used
  file: "jquery.js"       //filename should be located at ./frameworks/<file>
}

Drawbacks:
  * R you sure you are up to date ?
  * R you sure you have all security fix ?
  * R you sure you want to get beaten by competitors framework cause you are not up to date ?

 - You don't want to load framework ? Ok just don't use options
 {
   name: "Native querySelectorAll",
   method: "document.querySelectorAll"
 }

*/