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
const tabs = require("tabs");

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

exports.addLinkformItem = function(name, identifier, format, callback) {
  // ContextMenu::Item#labelに空文字は使えないので、スペースを一つ入れる
  if (name == "") {
    name = " ";
  }
  
  var item = contextMenu.Item({
    label: name,
    data: identifier
  });

  MenuAction.add({
    item: item,
    linkform: format,
    //callback: (callback == null) ? exports.changeLinkform : callback
    callback: callback
  });

  return item;
}

exports.addLinkformItems = function(linkformData, header, callback) {
  var result = [];
  
  for (var i = 0; i < linkformData.length; i++) {
    var src = linkformData[i];
    result.push(exports.addLinkformItem(src.name,
                                        header + "_" + src.format,
                                        src.format,
                                        callback));
  }

  return result;
}

exports.addLinkformMenu = function(label, linkformData, header, callback) {
  return contextMenu.Menu({
    label: label,
    items: exports.addLinkformItems(linkformData, header, callback)
  });  
}

exports.createLink = function(action, linkdata) {
  fl.createLink(action.item.label, linkdata);
}

exports.copyTabs = function(action, linkdata) {
  // 切り替え
  storage.currentIndex = fl.searchCurrentIndex(action.linkform);

  // テキスト生成
  var text = "";
  
  for each (var tab in tabs) {
    if (!tab.isPinned) {
      var linkdata = {text: tab.title, title: tab.title, url: tab.url};
      text += fl.createText(action.linkform, linkdata) + "\n";
    }
  }

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
  // SetupMenu.setupAll();
}

