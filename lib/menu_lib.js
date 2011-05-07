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
const commands = require("commands");

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

exports.addLinkformItems = function(linkformData, header, callback, isPrefix) {
  var result = [];
  
  for (var i = 0; i < linkformData.length; i++) {
    var src = linkformData[i];
    var name = (isPrefix) ? fl.addPrefix(src.name, i) : src.name;
    
    result.push(exports.addLinkformItem(name,
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

// --- callbacks ---

exports.redoLink = function(action, linkdata) {
  commands.redoLink(action.item.label, linkdata);
}

exports.changeLinkform = function(action, linkdata) {
  // 切り替え
  fl.changeLinkform(action.linkform);

  // リンクの生成も同時に行う
  fl.copyLinkAndNotify(action.item.label, action.linkform, linkdata);
}

exports.copyTabs = function(action, linkdata) {
  commands.allTabs(action.item.label, action.linkform);
}

exports.allTabsSpace = function(action, linkdata) {
  commands.allTabsSpace(action.item.label, action.linkform);
}


