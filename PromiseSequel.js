module.exports = {
  /**
   * Executes all promises in a sequence
   */
  all: function(promiseArray) {

    var current = 0;

    return new Promise(function(accept, reject) {

      function next() {

        if (current < promiseArray.length) {
          promiseArray[current]().then(function() {
            current++;
            next();
          }).catch(function(e) {
            reject(e);
          });
        } else {
          accept();
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

    return new Promise(function(accept, reject) {

      function next() {

        if (current < promiseArray.length) {

          promiseArray[current]().then(function(result) {

            if (condition(result)) {
              current++;
              next();
            } else {
              accept(result);
            }

          }).catch(function(e) {
            reject(e);
          });

        } else {
          accept();
        }

      }

      next();

    });

  }

};