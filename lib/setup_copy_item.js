//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/08

const MenuLib = require('menu_lib');
const fl = require("firelink_lib");
const Localize = require('localize');

exports.create = function(currentIndex) {
  if (fl.linkformDataNum() > 0) {
    var copyItem = MenuLib.addCommandMenu(
      Localize.text.create_link,
      "copyItem",
      MenuLib.createLink
    );

    var copyTabs = MenuLib.addCommandMenu(
      Localize.text.copy_tabs,
      "copyTabs",
      MenuLib.copyTabs
    );

    return [copyItem, copyTabs];
  }

  return null;
}



