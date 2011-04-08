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
    {name:"PlainText",   format:"%text%\n%url%"},
    {name:"HTML",        format:"<a href=\"%url%\">%text%</a>"},
    {name:"TiddlyWiki",  format:"[[%text%|%url%]]"},
    {name:"hatena",      format:"[%url%:title=%text%]"}
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


