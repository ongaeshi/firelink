var gMenuActions = [];

exports.add = function(hash) {
  gMenuActions.push(hash);
}

exports.clear = function() {
  gMenuActions = [];
}

exports.find = function(item_data) {
  for (var i = 0; i < gMenuActions.length; i++) {
    var menuAction = gMenuActions[i];
    if (item_data == menuAction.item.data)
      return menuAction;
  }

  return null;
}
