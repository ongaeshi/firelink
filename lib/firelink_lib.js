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
const dateExt = require("date-ext");
const isGd = require("is-gd");

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

exports.parseDate = function(linkform, dateExt) {
  let r = linkform;
  r = r.replace("%date%", dateExt.to_s_date(), "g");
  r = r.replace("%Date%", dateExt.to_s_Date(), "g");
  r = r.replace("%datetime%", dateExt.to_s_dateTime(), "g");
  r = r.replace("%DateTime%", dateExt.to_s_DateTime(), "g");
  r = r.replace("%year%", dateExt.year, "g");
  r = r.replace("%month%", dateExt.Month, "g");
  r = r.replace("%day%", dateExt.Day, "g");
  r = r.replace("%hour%", dateExt.Hour, "g");
  r = r.replace("%min%", dateExt.Min, "g");
  r = r.replace("%min%", dateExt.Min, "g");
  return r;
}

exports.isgd = function(linkform, url) {
  let r = linkform;

  if (r.indexOf("%isgd%") != -1)
    r = r.replace("%isgd%", isGd.createShortUrl(url), "g");

  return r;
}

exports.createText = function(linkform, linkdata) {
  var r = linkform;
  r = r.replace("%text%", linkdata.text, "g");
  r = r.replace("%title%", linkdata.title, "g");
  r = r.replace("%url%", linkdata.url, "g");
  r = r.replace("\n", " ", "g");
  r = exports.parseDate(r, dateExt.DateExt(new Date()));
  r = exports.isgd(r, linkdata.url);
  r = r.replace("\\t", "\t", "g");
  r = r.replace("\\n", "\n", "g");
  return r;
}

exports.notifyClipboard = function(title) {
  notify.n(title, clipboard.get());
}

exports.dumpObj = function(o) {
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

// テキストのコピーと通知
exports.copyLinkAndNotify = function(label, linkform, linkdata) {
  var text = exports.createText(linkform, linkdata);
  exports.copyText(text);
  exports.notifyClipboard(label);
}

// リンク形式の切り替え
exports.changeLinkform = function(linkform) {
  storage.currentIndex = exports.searchCurrentIndex(linkform);
}

// 現在リンク位置
exports.currentIndex = function() {
  return storage.currentIndex;
}

