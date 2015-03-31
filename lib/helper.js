var vfs = require("vinyl-fs")
	, _ = require("lodash/object")
	, path = require("path")
	, configuration = require("./config");


module.exports.getFiles = function (p, merge, nomethod, done) {
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
  		done( configuration(that.mergeJson(files, merge)) );
  	}
  });
  return;
}

module.exports.mergeJson = function (data, merge) {
	var config = {}
		, tmp = data.map( function (file) { return file.contents.toString(); });

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

module.exports.iterate = function (configs, ret, done) {
	if (configs.length) {
		var item = configs.shift()
			, that = this;
		this.getFiles(item.path, item.merge||false, true, function(data){
      ret[item.name] = data;
	    that.iterate(configs, ret, done)
    });

	} else {
		done( configuration(ret) );
	}
}
