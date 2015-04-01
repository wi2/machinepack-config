var jsonQ = require('json-query');

module.exports = function (conf, freeze) {
  var configs = conf;
  if (freeze)
    const confs = conf;

  return {
    query: function(query, opts) {
      return jsonQ(query, {data: confs||configs}, opts);
    },
    all: function() {
      return confs||configs;
    },
    get: function() {
      var args = Array.prototype.slice.call(arguments);
      return args.reduce(function(o, v, i) {
        return i ? o[v] : confs ? confs[v] : configs[v];
      }, {});
    }
  };
};
