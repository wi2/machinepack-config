module.exports = {


  friendlyName: 'Load',
  description: 'Load a config of config\'s file...',
  extendedDescription: 'For example, see tests/test.js (mocha tests/test.js)',

  inputs: {
    path: {
      example: 'test.json',
      description: "A path of json config file",
      required: true
    },
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
    var get = require('machine').build(require('./get'));
    get({path:inputs.path, merge:true}).exec(function(err, data){
      if(data.multiple){
        var multiple = require('machine').build(require('./multiple'));
        multiple({schema: data.multiple}).exec(function(err, result){
          return exits.success(result);
        });
      } else {
        get(data).exec(function(err, result){
          return exits.success(result);
        });
      }
    });

  },

};
