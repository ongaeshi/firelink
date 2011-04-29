//
// @brief
// @author ongaeshi
// @date   2011/04/29

const fl = require("firelink_lib");
const simpleStorage = require("simple-storage");
const storage = simpleStorage.storage;
var notify = require("notify");
const tabs = require("tabs");

exports.redoLink = function(label, linkdata) {
  fl.copyLinkAndNotify(label, fl.currentLinkform(), linkdata);
}

exports.nextLinkform = function() {
  // 切り替え
  storage.currentIndex++;

  if (storage.currentIndex >= storage.linkformData.length)
    storage.currentIndex = 0;

  // 通知
  notify.n(fl.currentLabel());
}

exports.prevLinkform = function() {
  // 切り替え
  storage.currentIndex--;

  if (storage.currentIndex < 0)
    storage.currentIndex = storage.linkformData.length - 1;

  // 通知
  notify.n(fl.currentLabel());
}

exports.homeLinkform = function() {
  storage.currentIndex = 0;
  notify.n("Change Home", fl.currentLabel());
}

exports.secondLinkform = function() {
  storage.currentIndex = 1;
  notify.n("Change Second", fl.currentLabel());
}

exports.thirdLinkform = function() {
  storage.currentIndex = 2;
  notify.n("Change Third", fl.currentLabel());
}

function allTabs(label, linkform, separateText) {
  // 切り替え
  fl.changeLinkform(linkform);

  // テキスト生成
  var text = "";
  
  for each (var tab in tabs) {
    if (!tab.isPinned) {
      var linkdata = {text: tab.title, title: tab.title, url: tab.url};
      text += fl.createText(linkform, linkdata) + separateText;
    }
  }

  fl.copyText(text);
  fl.notifyClipboard(label);
}

exports.allTabs = function(label, linkform) {
  allTabs(label, linkform, "\n");
}

exports.allTabsSpace = function(label, linkform) {
  allTabs(label, linkform, "\n\n");
}

exports.setLinkFormIndex = function(index) {
  if (0 <= index && index < storage.linkformData.length) {
    storage.currentIndex = index;
    notify.n("Linkform No." + (index + 1), fl.currentLabel());
  }
}


