module.exports = {

  friendlyName: 'Multiple',
  description: 'Get a multiple config with define some key',
  extendedDescription: 'For example, see tests/test.js (mocha tests/test.js)',

  // cacheable: true,

  inputs: {
    schema: {
      typeclass: '*',
      description: "An array of of path json config (see tests/test.js)",
      required: true
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
      description: 'Done.'
    },
  },

  fn: function (inputs,exits) {
    require('../lib/helper.js')
      .iterate(inputs.schema, {}, inputs.freeze||false, exits.success);
  },

};
