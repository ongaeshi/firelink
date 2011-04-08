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
    result.push(MenuLib.addLinkformItem(src.name, src.format));
  }

  return result;
}

exports.create = function(linkformData) {
  var linkformMenu = contextMenu.Menu({
    label: "リンク形式",
    items: createSrc(linkformData)
  });

  return linkformMenu;
}


