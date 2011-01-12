//
// @file 
// @brief  メニューの実行を制御するクラス
// @author ongaeshi
// @date   2011/01/13

var gMenuActions = [];

exports.add = function(hash) {
  gMenuActions.push(hash);
}

exports.find = function(item_data) {
  for (var i = 0; i < gMenuActions.length; i++) {
    var menuAction = gMenuActions[i];
    if (item_data == menuAction.item.data)
      return menuAction;
  }
  
  return null;
}


