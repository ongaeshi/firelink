//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/08

const MenuLib = require('menu_lib');
const fl = require("firelink_lib");
const Localize = require('localize');
const contextMenu = require("context-menu");

function createSrc(array) {
  var result = [];
  
  for (var i = 0; i < array.length; i++) {
    var src = array[i];
    result.push(MenuLib.addLinkformItem(src.name,
                                        "CopyTabs_" + src.format,
                                        src.format,
                                        MenuLib.copyTabs));
    //result.push(MenuLib.addLinkformItem(src.name, src.format + "T", MenuLib.changeLinkform));
  }

  return result;
}

exports.create = function(linkformData) {
  if (fl.linkformDataNum() > 0) {
    var copyItem = MenuLib.addCommandMenu(
      Localize.text.create_link,
      "copyItem",
      MenuLib.createLink
    );

//     var copyTabs = MenuLib.addCommandMenu(
//       Localize.text.copy_tabs,
//       "copyTabs",
//       MenuLib.copyTabs
//     );

//     return [copyItem, copyTabs];

    var copyTabsMenu = contextMenu.Menu({
      label: Localize.text.copy_tabs,
      items: createSrc(linkformData)
    });

    return [copyItem, copyTabsMenu];
  }

  return null;
}



