//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/08

const contextMenu = require("context-menu");
const fl = require("firelink_lib");
const MenuAction = require("menu_action");
const simpleStorage = require("simple-storage");
const storage = simpleStorage.storage;
const SetupMenu = require('setup_menu');

exports.addCommandMenu = function(label, data, callback) {
  var item = contextMenu.Item({
    label: label,
    data: data
  });

  MenuAction.add({
    item: item,
    callback: callback
  });

  return item;
}

exports.addLinkformItem = function(name, format) {
  var item = contextMenu.Item({
    label: name,
    data: format
  });

  MenuAction.add({
    item: item,
    linkform: format,
    callback: exports.changeLinkform
  });

  return item;
}

exports.createLink = function(action, linkdata) {
  var text = fl.createText(fl.currentLinkform(), linkdata);
  fl.copyText(text);
  fl.notifyClipboard(action.item.label);
}

exports.changeLinkform = function(action, linkdata) {
  // 切り替え
  //notify.nl(action.item.label, action.linkform);
  storage.currentIndex = fl.searchCurrentIndex(action.linkform);

  // リンクの生成も同時に行う
  exports.createLink(action, linkdata);

  // メニューの再生成
  SetupMenu.setupAll();
}

