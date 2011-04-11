//
// @file 
// @brief  設定パネル
// @author ongaeshi
// @date   2011/04/07

var ctable = null;

self.on('message', function(linkformData) {
  if (ctable == null) {
    ctable = new CocoaTable(linkformData, ['name', 'format']);
      
    ctable._listener.onUpdated = function () {
      postMessage(ctable.to_json());
    }
  }
});
