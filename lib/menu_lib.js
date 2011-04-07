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

exports.addLinkformItem = function(label, data, linkform) {
  var item = contextMenu.Item({
    label: label,
    data: data
  });

  MenuAction.add({
    item: item,
    linkform: linkform,
    callback: changeLinkform
  });

  return item;
}

exports.createLink = function(action, linkdata) {
  var text = fl.createText(storage.currentLinkForm, linkdata);
  fl.copyText(text);
  fl.notifyClipboard(action.item.label);
}

exports.changeLinkform = function(action, linkdata) {
  // 切り替え
  //notify.nl(action.item.label, action.linkform);
  storage.currentLinkForm = action.linkform;

  // リンクの生成も同時に行う
  createLink(action, linkdata);
}

