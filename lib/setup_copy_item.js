//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/08

const MenuLib = require('menu_lib');
const Localize = require('localize');
const contextMenu = require("context-menu");

exports.create = function(linkformData) {
  if (linkformData.length > 0) {
    var copyItem = MenuLib.addCommandMenu(
      Localize.text.create_link,
      "copyItem",
      MenuLib.createLink
    );

    var copyTabsMenu = MenuLib.addLinkformMenu(
      Localize.text.copy_tabs,
      linkformData,
      "CopyTabs",
      MenuLib.copyTabs
    );

    return [copyItem, copyTabsMenu];
  }

  return null;
}



