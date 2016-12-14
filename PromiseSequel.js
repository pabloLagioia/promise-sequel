module.exports = {
  /**
   * Executes all promises in a sequence
   */
  all: function(promiseArray) {

    var current = 0;
    var results = [];

    return new Promise(function(accept, reject) {

      function next() {

        if (current < promiseArray.length) {
          promiseArray[current]().then(function(result) {
            results.push(result);
            current++;
            next();
          }).catch(function(e) {
            reject(e);
          });
        } else {
          accept(results);
        }

      }

      next();

    });

  },
  /**
   * Executes promises in sequence until the result of one of them does not meet a condition
   */
  some: function(promiseArray, condition) {

    var current = 0;
    var results = [];

    return new Promise(function(accept, reject) {

      function next() {

        if (current < promiseArray.length) {

          promiseArray[current]().then(function(result) {

            results.push(result);
            
            if (condition(result)) {
              current++;
              next();
            } else {
              accept(results);
            }

          }).catch(function(e) {
            reject(e);
          });

        } else {
          accept(results);
        }

      }

      next();

    });

  }

};