var should = require('should')
  , conf = require("../index.js")
  , h = require("../lib/helper.js");


describe('Helper', function(){
  it('getfiles', function(done){
    h.getFiles(["samples/ip*.json", "samples/city.json"], true, false, true, function(data){
      console.log("3 helpers: ", data);
      // console.log("==>", data.get(0, 'city'));
      // console.log("==>", data.get(5, 'city'));
      should(data).be.type('object');
      should(data).not.be.type('string');
      should( data.get(0, 'city') ).be.equal('Nartkala');
      done();
    });
  });

  it('getfiles', function(done){
    h.getFiles(["samples/col*.json", "samples/city.json"], false, false, false, function(data){
      // console.log("==>", data.get('city',50));
      should (data.get('city',50, 'id')).be.equal(51)
      should (data.get('city',50, 'id')).not.be.equal('51')
      done();
    });
  });
});

describe('get', function(){
  it('get all json and merge it', function(done){
     conf.get({merge: true, path: ["samples/*.json"]})
      .exec(function (err, data) {
        // console.log("==>", data.get(25,'job'));
        should( data.get(25, 'job') ).be.equal('Mechanical Systems Engineer');
        done()
      });
  });

  it("get all json and don't merge", function(done){
     conf.get({path: ["samples/*.json"]})
      .exec(function (err, data) {
        // console.log("==>", data.get('country', 24));
        should( data.get('country', 24) ).be.type('object');
        should( data.get('country', 24, 'code') ).be.equal('SE');
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
      // console.log("==>", data.get('conf1', 'path'));
      should( data.get('conf1', 'path') ).be.type('object');
      should( data.get('conf1', 'path')[0] ).be.equal('samples/*.json');

      done()
     });
  });
});


describe('load', function(){
  it('load simple get config', function(done){
     conf.load({path: 'samples/load-test-simple.json'}).exec(function (err, data) {
      // console.log("==>", data.get('merge'));
      should( data.get('merge') ).be.type('boolean');
      should( data.get('merge') ).be.equal(true);
      done()
     });
  });
  it('load multiple config', function(done){
     conf.load({path: 'samples/load-test.json'}).exec(function (err, data) {
      // console.log(data);
      // console.log(data.get('color'));
      // console.log("==>", data.get('color', '1'));
      // console.log("==>", data.get('color', '1', 'hexcolor'));
      should( data.get('color', 1) ).be.type('object');
      should( data.get('color', 1, 'hexcolor') ).be.equal('#186');
      done()
     });
  });
});


describe('get', function(){
  it('get all xml, json and merge it', function(done){
     conf.get({merge: true, path: ["samples/*.xml", "samples/*.json"]})
      .exec(function (err, data) {
        // console.log("==>", data.get(25,'job'));
        should( data.get('$schema') ).be.equal('http://json-schema.org/draft-04/schema#');
        should( data.get(25, 'job') ).be.equal('Mechanical Systems Engineer');
        done()
      });
  });

  it("get all xml and json and don't merge", function(done){
     conf.get({path: ["samples/*.*"]})
      .exec(function (err, data) {
        // console.log("==>", data.get('jsonschema' ,'$schema'));
        should( data.get('jsonschema' ,'$schema') ).be.equal('http://json-schema.org/draft-04/schema#');
        should( data.get('country', 24, 'code') ).be.equal('SE');
        should( data.get('country', 24) ).be.type('object');


        done()
      });
  });
});
