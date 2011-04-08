//
// @file 
// @brief  firelink本体
// @author ongaeshi
// @date   2011/01/10

const SetupMenu = require('setup_menu');
const simpleStorage = require("simple-storage");
const storage = simpleStorage.storage;

exports.main = function(options, callbacks) {
  var defaultLinkformData = [
    ["PlainText", "PlainText", "%text%\n%url%"],
    ["HTML", "HTML", "<a href=\"%url%\">%text%</a>"],
    ["TiddlyWiki", "TiddlyWiki", "[[%text%|%url%]]"],
    ["hatena", "hatena", "[%url%:title=%text%]"],
  ];

  // リンク形式データ
  if (!storage.linkformData)
    storage.linkformData = defaultLinkformData;

  // デフォルトのリンク形式
  if (!storage.currentIndex)
    storage.currentIndex = 0;

  // Create menu.
  SetupMenu.setupAll();
};


