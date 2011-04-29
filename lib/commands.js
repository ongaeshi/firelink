//
// @brief
// @author ongaeshi
// @date   2011/04/29

const fl = require("firelink_lib");
const simpleStorage = require("simple-storage");
const storage = simpleStorage.storage;
var notify = require("notify");

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




