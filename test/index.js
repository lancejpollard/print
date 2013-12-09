
var assert = require('assert');

describe('print', function(){
  var print = 'undefined' == typeof window
    ? require('..')
    : require('print'); // how to do this better?

  it('should test', function(){
    print(document.querySelector('img'));
  });
});
