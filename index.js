
/**
 * Print stylesheet.
 */

var el = document.createElement('style');
el.setAttribute('id', '__printer__');
el.setAttribute('media', 'print');
document.getElementsByTagName('head')[0].appendChild(el);
var style = el.sheet || el.styleSheet;
el = undefined;

/**
 * Expose `print`.
 */

module.exports = print;

/**
 * Print HTML elements on a printer.
 */

function print(el) {
  var id = el.getAttribute('id');

  style.insertRule('body * { display: none; }', 0);
  style.insertRule('#' + id + ' { display: block; }', 1);

  window.print();

  setTimeout(function(){
    style.deleteRule(1);
    style.deleteRule(0);
  }, 1000);
}