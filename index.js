
/**
 * Module dependencies.
 */

var event = require('event');

/**
 * Print iframe.
 *
 * @see http://stackoverflow.com/questions/5946607/is-an-empty-iframe-src-valid
 */

var iframe = document.createElement('iframe');
iframe.setAttribute('id', 'print-iframe');
iframe.setAttribute('src', 'about:blank');
iframe.style.width = iframe.style.height = 0;
iframe.style.border = 'none';

(function(){
  event.bind(window, 'load', onload);

  function onload() {
    event.unbind(window, 'load', onload);
    document.body.appendChild(iframe);
  }
})();

/**
 * Expose `print`.
 */

module.exports = print;

/**
 * Print HTML elements on a printer.
 */

function print(str) {
  if ('string' != typeof str) {
    // XXX: outerhtml
    // http://bytes.com/topic/misc/answers/629926-ie7-printing-iframe-solution
    // ie7: document.execCommand('print', false, null);
  }

  var printer = iframe.contentWindow
    ? iframe.contentWindow
    : iframe.contentDocument.document
      ? iframe.contentDocument.document
      : iframe.contentDocument;

  printer.document.open();
  printer.document.write(str);
  //printer.document.close();
  printer.print();

  setTimeout(function(){
    printer.document.close();
  }, 2000);
}
