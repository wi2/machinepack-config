var vfs = require("vinyl-fs")
  , _ = require("lodash/object")
  , xmlParse = require('xml-parser')
  , path = require("path")
  , configuration = require("./config");

module.exports.getFiles = function (p, merge, nomethod, freeze, done) {
  var stream = vfs.src(p)
    , that = this
    , files = [];
  stream.on('error', done);
  stream.on('data', function(file){
    files.push(file);
  });
  stream.on('end', function(){
    if (nomethod) {
      done ( that.mergeJson(files, merge) )
    } else {
      done( configuration(that.mergeJson(files, merge), freeze) );
    }
  });
  return;
}

module.exports.mergeJson = function (data, merge) {
  var config = {}
    , tmp = data.map( function (file) {
      var contents = file.contents.toString();
      switch(path.extname(file.path)) {
        case '.xml':
          contents = JSON.stringify(xmlParse(contents));
          break;
        case '.csv':
          var jsonObj = [];
          var csv = contents.split(/\r\n|\n|\r/);
          var k = csv[0].split(",");
          for(var i=1;i < csv.length;i++) {
            var content = csv[i].split(",");
            var tmp = {};
            for(var j=0;j < k.length; j++) {
              try {
                tmp[k[j]] = content[j];
              } catch(err) {
                tmp[k[j]] = "";
              }
            }
            jsonObj.push(tmp);
          }
          contents = JSON.stringify(jsonObj);
          break;
      }
      return contents;
    });

  if (merge){
    for(var i=0,len=tmp.length; i<len; i++){
      _.assign(config, JSON.parse(tmp[i]))
    }
  } else {
    for(var i=0,len=tmp.length; i<len; i++){
      config[path.basename(
        data[i].path,
        path.extname(data[i].path)
      )] = JSON.parse(tmp[i]);
    }
  }

  return config;
}

module.exports.iterate = function (configs, ret, freeze, done) {
  if (configs.length) {
    var item = configs.shift()
      , that = this;
    this.getFiles(item.path, item.merge||false, true, freeze, function(data){
      ret[item.name] = data;
      that.iterate(configs, ret, freeze, done)
    });

  } else {
    done( configuration(ret, freeze) );
  }
}
