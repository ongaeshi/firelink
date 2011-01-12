//
// @file 
// @brief  メニューの実行を制御するクラス
// @author ongaeshi
// @date   2011/01/13

var fl = require("firelink_lib");

var gMenuActions = [];

function changeLinkform(action, linkdata) {
  // 使用するリンク形式の切り替え
  fl.dumpObj(action);
}

exports.addCommand = function(item, callback) {
  gMenuActions.push({
    item: item,
    callback: callback,
  });
}

exports.addLinkform = function(item, linkform) {
  gMenuActions.push({
    item: item,
    linkform: linkform,
    callback: changeLinkform,
  });
}

exports.find = function(item_data) {
  for (var i = 0; i < gMenuActions.length; i++) {
    var menuAction = gMenuActions[i];
    //fl.dumpObj(gMenuActions[i]);
    if (item_data == menuAction.item.data)
      return menuAction;
  }
  
  // 設定したitemを探す
  return null;
}


