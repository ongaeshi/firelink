//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/08

const contextMenu = require("context-menu");
const MenuLib = require("menu_lib");

exports.create = function() {
  var defaultLinkFormData = [
    ["PlainText", "PlainText", "%text%\n%url%"],
    ["HTML", "HTML", "<a href=\"%url%\">%text%</a>"],
    ["TiddlyWiki", "TiddlyWiki", "[[%text%|%url%]]"],
    ["hatena", "hatena", "[%url%:title=%text%]"]
  ];

  var plaintextItem  = MenuLib.addLinkformItem("PlainText", "PlainText", "%text%\n%url%");
  var htmlItem       = MenuLib.addLinkformItem("HTML", "HTML", "<a href=\"%url%\">%text%</a>");
  var tiddlywikiItem = MenuLib.addLinkformItem("TiddlyWiki", "TiddlyWiki", "[[%text%|%url%]]");
  var tiddlywikiListItem = MenuLib.addLinkformItem("TiddlyWiki(list)", "TiddlyWikiList", "* [[%text%|%url%]]");
  var hatenaItem = MenuLib.addLinkformItem("hatena", "hatena", "[%url%:title=%text%]");
  var hatenaListItem = MenuLib.addLinkformItem("hatena(list)", "hatenaList", "- [%url%:title=%text%]");
  var linkSettings = [plaintextItem, htmlItem, tiddlywikiItem, tiddlywikiListItem, hatenaItem, hatenaListItem];

  var linkformMenu = contextMenu.Menu({
    label: "リンク形式",
    items: linkSettings
  });

  return linkformMenu;
}


