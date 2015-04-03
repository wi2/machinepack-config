var should = require('should')
  , conf = require("../index.js")
  , h = require("../lib/helper.js");


describe('Helper', function(){
  it('getfiles', function(done){
    h.getFiles(["samples/ip*.json", "samples/city.json"], true, false, true, function(data){
      console.log("4 methods:\n ", data);
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
     conf.get({merge: true, path: ["samples/*.*", "samples/*.json"]})
      .exec(function (err, data) {
        // console.log("==>", data.all());
        should( data.get('root', 'name') ).be.equal('employees');
        should( data.get(25, 'job') ).be.equal('Mechanical Systems Engineer');
        done()
      });
  });

  it("get all xml and json and don't merge", function(done){
     conf.get({path: ["samples/*.*"]})
      .exec(function (err, data) {
        // console.log(data);
        // console.log("==>", data.get('jsonschema', 'root', 'name'));
        should( data.get('jsonschema', 'root', 'name') ).be.equal('employees');
        should( data.get('country', 24, 'code') ).be.equal('SE');
        should( data.get('country', 24) ).be.type('object');

        should( data.has('country') ).be.equal(true);
        should( data.has('code') ).be.equal(false);
        should( data.has('country', 24,'code') ).be.equal(true);
        should( data.has('country', '0','code') ).be.equal(true);


        should( data.findKey('jsonschema','name') ).be.equal('root');
        should( data.findKey('country','code') ).be.equal('0');

        should( data.findLastKey('jsonschema','name') ).be.equal('root');
        should( data.findLastKey('country','code') ).be.equal('99');


        var se = data.ass({test:'yep'},'country', 24);
        should( se.test ).be.equal('yep');
        should( se.code ).be.equal('SE');
        done()
      });
  });
});



describe('methods', function(){

  it("get method", function(done){
     conf.get({path: ["samples/*.*"]})
      .exec(function (err, data) {
        // console.log(data);
        // console.log("==>", data.get('jsonschema', 'root', 'name'));
        should( data.get('jsonschema', 'root', 'name') ).be.equal('employees');
        should( data.get('country', 24, 'code') ).be.equal('SE');
        should( data.get('country', 24) ).be.type('object');
        done()
      });
  });

  it("has method", function(done){
     conf.get({path: ["samples/*.*"]})
      .exec(function (err, data) {

        should( data.has('country') ).be.equal(true);
        should( data.has('code') ).be.equal(false);
        should( data.has('country', 24,'code') ).be.equal(true);
        should( data.has('country', '0','code') ).be.equal(true);
        done()
      });
  });

  it("findKey & findLastKey method", function(done){
     conf.get({path: ["samples/*.*"]})
      .exec(function (err, data) {

        should( data.findKey('jsonschema','name') ).be.equal('root');
        should( data.findKey('country','code') ).be.equal('0');

        should( data.findLastKey('jsonschema','name') ).be.equal('root');
        should( data.findLastKey('country','code') ).be.equal('99');
        done()
      });
  });

  it("ass method : return an extended clone", function(done){
     conf.get({path: ["samples/*.*"]})
      .exec(function (err, data) {

        var se = data.ass({test:'yep'},'country', 24);
        should( se.test ).be.equal('yep');
        should( se.code ).be.equal('SE');
        done()
      });
  });

  it("keys and values method", function(done){
     conf.get({path: ["samples/*.*"]})
      .exec(function (err, data) {
        should( data.values('country').length ).be.equal(10);
        should( data.keys('country').length ).be.equal(10);

        should( data.values('country', 0).length ).be.equal(100);
        should( data.keys('country', 0).length ).be.equal(100);

        done()
      });
  });
});


