//
// @file 
// @brief  firelink本体
// @author ongaeshi
// @date   2011/01/10

const SetupMenu = require('setup_menu');

exports.main = function(options, callbacks) {
  // creatre link form
//   if (!storage.linkFormData)
//     storage.linkFormData = defaultLinkFormData;
//   setupLinkFormItem();
  
  // set current link form
//   if (!storage.currentLinkForm)
//     storage.currentLinkForm = MenuAction.find(tiddlywikiItem.data).linkform;

  var defaultLinkFormData = [
    ["PlainText", "PlainText", "%text%\n%url%"],
    ["HTML", "HTML", "<a href=\"%url%\">%text%</a>"],
    ["TiddlyWiki", "TiddlyWiki", "[[%text%|%url%]]"],
    ["hatena", "hatena", "[%url%:title=%text%]"],
  ];

  SetupMenu.setupAll(defaultLinkFormData);

  // 作り替えテスト
  var defaultLinkFormData = [
    ["PlainText", "PlainText", "%text%\n%url%"],
    ["HTML", "HTML", "<a href=\"%url%\">%text%</a>"],
    ["TiddlyWiki", "TiddlyWiki", "[[%text%|%url%]]"],
    ["TiddlyWiki(list)", "TiddlyWikiList", "* [[%text%|%url%]]"],
    ["hatena", "hatena", "[%url%:title=%text%]"],
    ["hatena(list)", "hatenaList", "- [%url%:title=%text%]"],
  ];

  SetupMenu.setupAll(defaultLinkFormData);
};


