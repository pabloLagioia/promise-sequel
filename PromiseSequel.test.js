var chai = require("chai");
var expect = chai.expect;
var assert = chai.assert;

var PromiseSequel = require("./PromiseSequel");

describe("Promise sequence", function () {

  it("should execute all promises", function(done) {

    var resolved = 0;

    PromiseSequel.all([
      function() {
        return new Promise(function(accept, reject) {
          accept(++resolved);
        })
      },
      function() {
        return new Promise(function(accept, reject) {
          accept(++resolved);
        })
      },
      function() {
        return new Promise(function(accept, reject) {
          accept(++resolved);
        })
      }
    ]).then(function() {
      expect(resolved).to.equal(3);
      done();
    }, function() {
      assert.fail();
    });

  });

  it("should execute promises depending on a condition", function(done) {

    var resolved = 0;

    PromiseSequel.some([

      function() {
        return new Promise(function(accept, reject) {
          accept(++resolved);
        })
      },
      function() {
        return new Promise(function(accept, reject) {
          accept(++resolved);
        })
      },
      function() {
        return new Promise(function(accept, reject) {
          accept(++resolved);
        })
      }
      
    ], function(result) {
      return result < 2;
    }).then(function() {
      expect(resolved).to.equal(2);
      done();
    }, function() {
      assert.fail();
    });

  });

});