var should = require('should')
  , conf = require("../index.js")
  , h = require("../lib/helper.js");


describe('Helper', function(){
  it('getfiles', function(done){
    h.getFiles(["samples/ip*.json", "samples/city.json"], true, false, function(data){
      console.log(data);//3 helpers
      console.log("==>", data.get(0, 'city'));
      console.log("==>", data.get(5, 'city'));
      done();
    });
  });

  it('getfiles', function(done){
    h.getFiles(["samples/col*.json", "samples/city.json"], false, false, function(data){
      console.log("==>", data);
      done();
    });
  });
});

describe('get', function(){
  it('get all json and merge it', function(done){
     conf.get({merge: true, path: ["samples/*.json"]})
      .exec(function (err, data) {
        console.log("==>", data);
        done()
      });
  });

  it("get all json and don't merge", function(done){
     conf.get({path: ["samples/*.json"]})
      .exec(function (err, data) {
        console.log("==>", data.get('country', 24));
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
          path: ["samples/*.json"]
        }, {
          merge: false,
          name:'conf2',
          path: ["samples/*.json"]
        }
      ]
     }).exec(function (err, data) {
      console.log("==>", data.get('conf1', 'path'));
      done()
     });
  });
});


describe('load', function(){
  it('load simple get config', function(done){
     conf.load({path: 'samples/load-test-simple.json'}).exec(function (err, data) {
      console.log("==>", data.get('merge'));
      done()
     });
  });
  it('load multiple config', function(done){
     conf.load({path: 'samples/load-test.json'}).exec(function (err, data) {
      console.log(data);
      // console.log(data.get('color'));
      console.log("==>", data.get('color', '1'));
      console.log("==>", data.get('color', '1', 'hexcolor'));
      done()
     });
  });
});

