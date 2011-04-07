//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/08

const contextMenu = require("context-menu");
const MenuLib = require("menu_lib");

function createSrc(array) {
  var result = [];
  
  for (var i = 0; i < array.length; i++) {
    var src = array[i];
    result.push(MenuLib.addLinkformItem(src[0], src[1], src[2]));
  }

  return result;
}

exports.create = function(linkformData) {
//   var defaultLinkFormData = [
//     ["PlainText", "PlainText", "%text%\n%url%"],
//     ["HTML", "HTML", "<a href=\"%url%\">%text%</a>"],
//     ["TiddlyWiki", "TiddlyWiki", "[[%text%|%url%]]"],
//     ["hatena", "hatena", "[%url%:title=%text%]"]
//   ];

  var linkformMenu = contextMenu.Menu({
    label: "リンク形式",
    items: createSrc(linkformData)
  });

  return linkformMenu;
}


