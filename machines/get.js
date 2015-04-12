// var fs = require("fs-extra");

module.exports = {

  friendlyName: 'Get',
  description: 'Get simply a config with few json file',
  extendedDescription: 'For example, see tests/test.js (mocha tests/test.js)',

  // cacheable: true,

  inputs: {
    path: {
      typeclass: '*',
      description: "An array of path of json file, ex : see tests/test.js",
      required: true
    },
    merge: {
      example: false,
      description: "if false, the name of the files are the keys else it'll merge at the top",
      required: false
    },
    nomethod: {
      example: false,
      description: "if true, don't attach method 'get', 'all' and some other lodash method (keys, findKeys, ...)",
      required: false
    },
    freeze: {
      example: false,
      description: "if true, freeze config",
      required: false
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.',
    },
    success: {
      description: 'Done.',
      example: {
        all: Function,
        get: Function,
        ass: Function,
        has: Function,
        findKey: Function,
        findLastKey: Function,
        keys: Function,
        values: Function
      }
    }
  },

  fn: function (inputs,exits) {
    require('../lib/helper.js')
      .getFiles(
        inputs.path,
        inputs.merge||false,
        inputs.nomethod||false,
        inputs.freeze||false,
        exits.success);
  },

};
