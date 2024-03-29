function loadStyle(text) {
  var head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

  head.appendChild(style);

  style.type = 'text/css';
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = text;
  } else {
    style.appendChild(document.createTextNode(text));
  }
}
