module.exports = {

  friendlyName: 'Multiple',
  description: 'Get a multiple config with define some key',
  extendedDescription: 'For example, see tests/test.js (mocha tests/test.js)',

  inputs: {
    schema: {
      typeclass: '*',
      description: "An array of of path json config (see tests/test.js)",
      required: true
    }
  },

  defaultExit: 'success',

  exits: {
    error: {
      description: 'Unexpected error occurred.',
    },
    success: {
      description: 'Done.',
    },
  },

  fn: function (inputs,exits) {
    var h = require('../lib/helper.js');

    h.iterate(inputs.schema, {}, exits.success);
  },

};
