//
// @file 
// @brief  firelink本体
// @author ongaeshi
// @date   2011/01/10

const SetupMenu = require('setup_menu');

exports.main = function(options, callbacks) {
  // creatre link form
//   if (!storage.linkFormData)
//     storage.linkFormData = defaultLinkFormData;
//   setupLinkFormItem();
  
  // set current link form
//   if (!storage.currentLinkForm)
//     storage.currentLinkForm = MenuAction.find(tiddlywikiItem.data).linkform;

  SetupMenu.setupAll();
};

