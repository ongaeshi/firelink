//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/08

const MenuLib = require('menu_lib');

exports.create = function() {
  var copyItem = MenuLib.addCommandMenu(
    "リンクを生成",
    "copyItem",
    MenuLib.createLink
  );

  return copyItem;
}



