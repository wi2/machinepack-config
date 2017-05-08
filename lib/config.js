var _ = require("lodash/object");

module.exports = function (conf) {
  var getter = function(arr) {
    return arr.reduce(function(o, v, i) {
      return i ? o[v] : conf[v];
    }, {});
  };

  var spliter = function(arr, isFirst) {
    return {
      item: isFirst ? arr.shift() : arr.pop(),
      array: (arr.length ? getter(arr) : conf)
    }
  };

  return {
    all: function() {
      return conf;
    },
    get: function() {
      return getter(Array.prototype.slice.call(arguments));
    },
    ass: function() {
      var obj = spliter(Array.prototype.slice.call(arguments), true)
      return _.assign( obj.item, obj.array );
    },
    has: function() {
      var obj = spliter(Array.prototype.slice.call(arguments))
      return _.has( obj.array, obj.item );
    },
    findKey: function() {
      var obj = spliter(Array.prototype.slice.call(arguments))
      return _.findKey( obj.array, obj.item );
    },
    findLastKey: function() {
      var obj = spliter(Array.prototype.slice.call(arguments))
      return _.findLastKey( obj.array, obj.item );
    },
    keys: function() {
      var obj = spliter(Array.prototype.slice.call(arguments))
      return _.keys( obj.array, obj.item );
    },
    values: function() {
      var obj = spliter(Array.prototype.slice.call(arguments))
      return _.values( obj.array, obj.item );
    }
  };
};
