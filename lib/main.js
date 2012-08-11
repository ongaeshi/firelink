//
// @file 
// @brief  firelink本体
// @author ongaeshi
// @date   2011/01/10

const SetupMenu = require('setup_menu');
const simpleStorage = require("simple-storage");
const storage = simpleStorage.storage;
const Shortcut = require('shortcut');

exports.main = function(options, callbacks) {
  // @todo リリース前には設定すること
  // @todo cocoatable.jsと共有
  var defaultLinkformData = [
    {name:"PlainText",   format:"%text%\\n%url%"},
    {name:"HTML",        format:"<a href=\"%url%\">%text%</a>"},
    {name:"Markdown",   format:"[%text%](%url%)"},
    {name:"MediaWiki",   format:"[%url% %text%]"},
    {name:"PukiWiki",   format:"[[%text%>%url%]]"},
    {name:"TiddlyWiki",  format:"[[%text%|%url%]]"},
    {name:"Twitter",     format:"%text% %url%"},
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

  // キーボードショートカット
  Shortcut.setup();
};


