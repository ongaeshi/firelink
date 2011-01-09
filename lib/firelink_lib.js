//
// @file 
// @brief  firelinkライブラリ
// @author ongaeshi
// @date   2011/01/10

var notify = require("notify");
var clipboard = require("clipboard");

exports.crlf = function() {
  var isWin = false;            // @todo プラットホームの判別
  return isWin ? "\r\n" : "\n";
}

exports.copyText = function(text) {
  clipboard.set(text);
}

exports.chainText = function(text) {
  clipboard.set(clipboard.get() + exports.crlf() + text);
}

exports.createText = function(text, title, url) {
  return "[[" + title + "|" + url + "]]";
}

exports.notifyClipboard = function(title) {
  notify.n(title, clipboard.get());
}


