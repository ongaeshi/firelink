//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/13

const TabBrowser = require("tab-browser");
const clipboard = require("clipboard");
const fl = require("firelink_lib");

function isSelected(window) {
  var sel = window.getSelection();
  if (sel.rangeCount <= 0) return false;
  if (sel.rangeCount > 1) return true;

  var range = sel.getRangeAt(0);
  if (! range.collapsed) return true;
  if (range.startContainer != range.endContainer) return true;
  if (range.startOffset != range.endOffset) return true;
  if (window.document.activeElement.tagName.toLowerCase() != "body") return true;

  return false;
}

function copylink(event, window) {
  if (event.keyCode != 67) return;
  var isWin = (window.navigator.platform.indexOf("Win") != -1);
  var isMac = (window.navigator.platform.indexOf("Mac") != -1);
  if ((!isMac && !event.ctrlKey) || (isMac && !event.metaKey)) return;
  if (isSelected(window)) return;

//   var crlf = isWin ? "\r\n" : "\n";
//   var txt = window.document.title + crlf + window.document.location.href + crlf + crlf;
//   clipboard.set(txt);

  var title = window.document.title;
  var url =  window.document.location.href;
  fl.createLink(fl.currentLabel(), {text: title, title: title, url: url});

//   fl.createLink({text: window.document.title,
//                  title: window.document.title,
//                  url: window.document.location.href});
}

exports.setup = function() {
  TabBrowser.whenContentLoaded(function(window){
    var f = function(event){ copylink(event, window); };
    window.document.addEventListener("keydown", f, true);
  });
}


