
/**
 * Module dependencies.
 */

var event = require('event');

/**
 * Print iframe.
 *
 * @see http://stackoverflow.com/questions/5946607/is-an-empty-iframe-src-valid
 * @see http://stackoverflow.com/questions/1542320/margin-while-printing-html-page
 * @see http://stackoverflow.com/questions/1960939/disabling-browser-print-options-headers-footers-margins-from-page/2780518#2780518
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

  var css = [
    '<style type="text/css" media="print">',
    '  @page {',
    '    size: auto;',  // auto is the current printer page size
    '    margin: 0mm;', // this affects the margin in the printer settings
    '  }',
    '  body {',
    '    background-color:#FFFFFF;',
    '    border: none;',
    '    margin: 0px;',
    '  }',
    '</style>'
  ].join('\n');

  var printer = iframe.contentWindow
    ? iframe.contentWindow
    : iframe.contentDocument.document
      ? iframe.contentDocument.document
      : iframe.contentDocument;

  printer.document.open('text/html', 'replace');
  printer.document.onreadystatechange = onready;
  printer.document.write(css + str);
  printer.document.close();

  function onready() {
    if ('complete' == printer.document.readyState) {
      printer.document.body.focus();
      try {
        // <= IE9
        printer.document.execCommand('print', false, null);
      } catch {
        printer.print(); 
      }
    }
  }
}