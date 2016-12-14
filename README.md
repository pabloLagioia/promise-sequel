# Promise-Sequel
Run promises in sequence

Examples:

## Run all promises in the array one after the other

```
var PromiseSequel = require("promise-sequel");

PromiseSequel.all([
  function() {
    return new Promise(accept, reject) {
      console.log("First promise!");
    }
  },
  function() {
    return new Promise(accept, reject) {
      console.log("Last promise!");
    }
  }
]).then(function() {
  console.log("done!");
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
}).then(function() {
  console.log("done!");
});
```