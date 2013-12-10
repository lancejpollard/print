
var assert = require('assert');
var events = require('event');

describe('print', function(){
  var print = 'undefined' == typeof window
    ? require('..')
    : require('print'); // how to do this better?

  before(function(done){
    events.bind(window, 'load', function(){
      done();
    });
  });

  it('should test', function(){
    //print(document.querySelector('img'));
    print('<img id="image" src="http://tower.github.io/public/img/logo.png"/>');
  });
});
