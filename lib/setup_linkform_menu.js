//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/08

const contextMenu = require("context-menu");
const MenuLib = require("menu_lib");
const Localize = require('localize');

exports.create = function(linkformData) {
  if (linkformData.length > 0) {
    return  MenuLib.addLinkformItems(
      linkformData,
      "ChangeLinkForm",
      MenuLib.changeLinkform
    );
  }

  return null;
}


