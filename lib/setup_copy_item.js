//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/08

const MenuLib = require('menu_lib');
const fl = require("firelink_lib");

exports.create = function(currentIndex) {
  if (fl.linkformDataNum() > 0) {
    var copyItem = MenuLib.addCommandMenu(
      // fl.currentLabel() + "を生成",
      "Create Link",
      "copyItem",
      MenuLib.createLink
    );

    var copyTabs = MenuLib.addCommandMenu(
      "全てのタブを連結",
      "copyTabs",
      MenuLib.copyTabs
    );

    return [copyItem, copyTabs];
  }

  return null;
}



