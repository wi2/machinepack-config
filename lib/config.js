var jsonQ = require('json-query');

module.exports = function (conf) {
	var configs = conf;




	return {
		query: function(query, opts) {
			return jsonQ(query, {data: configs}, opts);
		},
		all: function() {
			return configs;
		},
		get: function(name) {
			var args = Array.prototype.slice.call(arguments);
			var obj = args.reduce(function(o, v, i) {
			  return i ? o[v] : configs[v];
			}, {});
			return obj;
		}
	};
};
