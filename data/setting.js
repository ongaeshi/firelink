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
      
      ctable._listener.onPushButton = function (msg) {
        self.postMessage({kind: msg});
      }
      
      {
        var a = document.getElementById('link_recommended_settings');
        a.addEventListener('click', function (ev) {
          self.postMessage({kind: "tab_open", url:"http://firelink.ongaeshi.me/setting-collection.html"});
        }, true);
      }

      {
        var a = document.getElementById('link_homepage');
        a.addEventListener('click', function (ev) {
          self.postMessage({kind: "tab_open", url:"http://firelink.ongaeshi.me/"});
          // self.postMessage({kind: "tab_open", url:"https://addons.mozilla.org/firefox/addon/firelink/"});
        }, true);
      }
    }
    break;
    
   case "import":
    ctable.importData(msg.data);
    break;

   case "save":
    self.postMessage({kind: "save", data: ctable.to_json()});
    break;
  }
});
