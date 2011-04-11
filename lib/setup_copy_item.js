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
      fl.currentLabel() + "を生成",
      "copyItem",
      MenuLib.createLink
    );

    return copyItem;
  }

  return null;
}



