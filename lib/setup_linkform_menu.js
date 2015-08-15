const contextMenu = require("sdk/context-menu");
const MenuLib = require("./menu_lib");
const Localize = require('./localize');

exports.create = function(linkformData) {
  if (linkformData.length > 0) {
    return  MenuLib.addLinkformItems(
      linkformData,
      "ChangeLinkForm",
      MenuLib.changeLinkform,
      true
    );
  }

  return null;
}
