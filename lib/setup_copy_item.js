const MenuLib = require('./menu_lib');
const Localize = require('./localize');
const contextMenu = require("sdk/context-menu");

exports.create = function(linkformData) {
  if (linkformData.length > 0) {
    var copyItem = MenuLib.addCommandMenu(
      Localize.text.create_link,
      "copyItem",
      MenuLib.redoLink
    );

    var copyTabsMenu = MenuLib.addLinkformMenu(
      Localize.text.copy_tabs,
      linkformData,
      "CopyTabs",
      MenuLib.copyTabs
    );

    var allTabsSpaceMenu = MenuLib.addLinkformMenu(
      Localize.text.all_tabs_space,
      linkformData,
      "AllTabsSpace",
      MenuLib.allTabsSpace
    );

    var textFromClipboard = MenuLib.addCommandMenu(
      Localize.text.text_from_clipboard,
      "TextFromClipboard",
      MenuLib.textFromClipboard
    );

    return {redo: copyItem,
            copyTabs: copyTabsMenu,
            allTabsSpace: allTabsSpaceMenu,
            textFromClipboard: textFromClipboard
           };
  }

  return null;
}
