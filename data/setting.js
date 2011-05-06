//
// @file 
// @brief  設定パネル
// @author ongaeshi
// @date   2011/04/07

var ctable = null;

self.on('message', function(msg) {
  switch (msg.kind) {
   case "init":
    if (ctable == null) {
      ctable = new CocoaTable(msg.data, ['name', 'format']);
      
      ctable._listener.onUpdated = function () {
        postMessage({kind: "update", data: ctable.to_json()});
      }

      ctable._listener.onPushButton = function (msg) {
        postMessage({kind: msg});
      }
    }
    break;
    
   case "import":
    ctable.importData(msg.data);
    break;
  }
});
