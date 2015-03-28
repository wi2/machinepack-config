var should = require('should');
var conf = require("../index.js");
var h = require("../lib/helper.js");


describe('Helper', function(){
  it('getfiles', function(done){
    h.getFiles(["tests/for-test.json", "tests/*.json"], true, function(data){
      console.log(data);
      done();
    });
  });

  it('getfiles', function(done){
    h.getFiles(["tests/load.json", "tests/get.json"], false, function(data){
      console.log(data);
      done();
    });
  });
});

describe('get', function(){
  it('get all json and merge it', function(done){
     conf.get({merge: true, path: ["tests/*.json"]})
      .exec(function (err, data) {
        console.log(data);
        done()
      });
  });

  it("get all json and don't merge", function(done){
     conf.get({path: ["tests/*.json"]})
      .exec(function (err, data) {
        console.log(data);
        done()
      });
  });
});

describe('multiple', function(){
  it('multiple config merge and not merge with keyname', function(done){
     conf.multiple({
      schema: [
        {
          merge: true,
          name:'conf1',
          path: ["tests/*.json"]
        }, {
          merge: false,
          name:'conf2',
          path: ["tests/*.json"]
        }
      ]
     }).exec(function (err, data) {
      console.log(data);
      done()
     });
  });
});


describe('load', function(){
  it('load simple get config', function(done){
     conf.load({path: 'tests/load-test-simple.json'}).exec(function (err, data) {
      console.log(data);
      done()
     });
  });
  it('load multiple config', function(done){
     conf.load({path: 'tests/load-test.json'}).exec(function (err, data) {
      console.log(data);
      done()
     });
  });
});
