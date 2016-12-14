var chai = require("chai");
var expect = chai.expect;
var assert = chai.assert;

var PromiseSequel = require("./PromiseSequel");

describe("Promise sequence", function () {

  it("should execute all promises", function(done) {

    PromiseSequel.all([
      function() {
        return new Promise(function(accept, reject) {
          accept("promise 1");
        })
      },
      function() {
        return new Promise(function(accept, reject) {
          accept("promise 2");
        })
      },
      function() {
        return new Promise(function(accept, reject) {
          accept("promise 3");
        })
      }
    ]).then(function(results) {
      expect(results.length).to.equal(3);
      expect(results[0]).to.equal("promise 1");
      expect(results[1]).to.equal("promise 2");
      expect(results[2]).to.equal("promise 3");
      done();
    }, function() {
      assert.fail();
    });

  });

  it("should execute promises depending on a condition", function(done) {

    PromiseSequel.some([

      function() {
        return new Promise(function(accept, reject) {
          accept("promise 1");
        })
      },
      function() {
        return new Promise(function(accept, reject) {
          accept("promise 2");
        })
      },
      function() {
        return new Promise(function(accept, reject) {
          accept("promise 3");
        })
      }
      
    ], function(result) {
      return result !== "promise 2";
    }).then(function(results) {
      expect(results.length).to.equal(2);
      expect(results[0]).to.equal("promise 1");
      expect(results[1]).to.equal("promise 2");
      done();
    }, function() {
      assert.fail();
    });

  });

  it("should execute all promises if the condition evaluates true", function(done) {

    PromiseSequel.some([

      function() {
        return new Promise(function(accept, reject) {
          accept("promise 1");
        })
      },
      function() {
        return new Promise(function(accept, reject) {
          accept("promise 2");
        })
      },
      function() {
        return new Promise(function(accept, reject) {
          accept("promise 3");
        })
      }
      
    ], function() {
      return true;
    }).then(function(results) {
      expect(results.length).to.equal(3);
      expect(results[0]).to.equal("promise 1");
      expect(results[1]).to.equal("promise 2");
      expect(results[2]).to.equal("promise 3");
      done();
    }, function() {
      assert.fail();
    });

  });

});