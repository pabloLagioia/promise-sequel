# Promise-Sequel
Run promises in sequence

Examples:

## Run all promises in the array one after the other

```
var PromiseSequel = require("promise-sequel");

PromiseSequel.all([
  function() {
    return new Promise(accept, reject) {
      return "First promise!";
    }
  },
  function() {
    return new Promise(accept, reject) {
      return "Last promise!";
    }
  }
]).then(function(results) {
  console.log("done!");
  // results[0] => "First promise!"
  // results[1] => "Last promise!"
});
```
## Run promises until the condition is false

```
var PromiseSequel = require("promise-sequel");

PromiseSequel.all([
  function() {
    return new Promise(accept, reject) {
      console.log("First promise!");
      return "yes";
    }
  },
  function() {
    return new Promise(accept, reject) {
      console.log("Last promise!");
      return "no";
    }
  },
  function() {
    return new Promise(accept, reject) {
      console.log("This shouldnt be printed!");
    }
  }
], function(continue) {
  return continue === "yes";
}).then(function(results) {
  console.log("done!");
  // results[0] => "yes"
  // results[1] => "no"
});
```