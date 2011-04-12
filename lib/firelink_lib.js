//
// @file 
// @brief  firelinkライブラリ
// @author ongaeshi
// @date   2011/01/10

var notify = require("notify");
var clipboard = require("clipboard");
const simpleStorage = require("simple-storage");
const storage = simpleStorage.storage;

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

exports.createText = function(linkform, linkdata) {
  var r = linkform;
  r = r.replace("%text%", linkdata.text);
  r = r.replace("%title%", linkdata.title);
  r = r.replace("%url%", linkdata.url);
  return r;
}

exports.notifyClipboard = function(title) {
  notify.n(title, clipboard.get());
}

exports.dumpObj = function(o){
  var str = "";
  for(var i in o) {
    str = str + "\n" + i + "\t"+ o[i];
  }
  console.log(str);
}

exports.currentLinkform = function() {
  if (storage.currentIndex < storage.linkformData.length)
    return storage.linkformData[storage.currentIndex].format;
  else
    return storage.linkformData[0].format;
}

exports.currentLabel = function() {
  if (storage.currentIndex < storage.linkformData.length)
    return storage.linkformData[storage.currentIndex].name;
  else
    return storage.linkformData[0].name;
}

exports.searchCurrentIndex = function(linkform) {
  for (var i = 0; i < storage.linkformData.length; i++) {
    if (storage.linkformData[i].format == linkform) 
      return i;
  }
  return 0;
}

exports.linkformDataNum = function() {
  return storage.linkformData.length;
}

exports.createLink = function(label, linkdata) {
  var text = exports.createText(exports.currentLinkform(), linkdata);
  exports.copyText(text);
  exports.notifyClipboard(label);
}

