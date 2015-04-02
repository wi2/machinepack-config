var jsonQ = require('json-query')
  , _ = require("lodash/object");

module.exports = function (conf, freeze) {
  var configs = conf;
  if (freeze)
    const confs = conf;

  var getter = function(arr) {
    return arr.reduce(function(o, v, i) {
      return i ? o[v] : confs ? confs[v] : configs[v];
    }, {});
  }

  return {
    query: function(query, opts) {
      return jsonQ(query, {data: confs||configs}, opts);
    },
    all: function() {
      return confs||configs;
    },
    get: function() {
      return getter(Array.prototype.slice.call(arguments));
    },
    ass: function() {
      var args = Array.prototype.slice.call(arguments);
      return _.assign(args.shift(), getter(args) );
    }
  };
};
