//
// @file 
// @brief  firelinkライブラリ
// @author ongaeshi
// @date   2011/01/10

var notify = require("notify");
var clipboard = require("clipboard");
const simpleStorage = require("simple-storage");
const storage = simpleStorage.storage;
const SetupMenu = require('setup_menu');

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

exports.dateStr = function() {
  var date = new Date();

  var month = date.getMonth() + 1;
  if (month <= 9)
    month = "0" + month;

  var day = date.getDate();
  if (day <= 9)
    day = "0" + day;

  var minutes = date.getMinutes();
  if (minutes <= 9)
    minutes = "0" + minutes;
  
  var str = date.getFullYear()  + "/" + month + "/" + day + " " + date.getHours() + ":" + minutes;

  return str;
}

exports.createText = function(linkform, linkdata) {
  var r = linkform;
  r = r.replace("%text%", linkdata.text);
  r = r.replace("%title%", linkdata.title);
  r = r.replace("%url%", linkdata.url);
  r = r.replace("%date%", exports.dateStr());
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

exports.nextLinkform = function() {
  // 切り替え
  storage.currentIndex++;

  if (storage.currentIndex >= storage.linkformData.length)
    storage.currentIndex = 0;

  // 通知
  notify.n(exports.currentLabel());

  // メニューの再生成
  // @todo 結構重い処理のため、ショートカットキー等だとレスポンスが悪くなる
  // SetupMenu.setupAll();
}

exports.prevLinkform = function() {
  // 切り替え
  storage.currentIndex--;

  if (storage.currentIndex < 0)
    storage.currentIndex = storage.linkformData.length - 1;

  // 通知
  notify.n(exports.currentLabel());

  // メニューの再生成
  // @todo 結構重い処理のため、ショートカットキー等だとレスポンスが悪くなる
  // SetupMenu.setupAll();
}

exports.homeLinkform = function() {
  storage.currentIndex = 0;
  notify.n("home", exports.currentLabel());
}


