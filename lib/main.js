//
// @file 
// @brief  firelink本体
// @author ongaeshi
// @date   2011/01/10

var contextMenu = require("context-menu");
var fl = require("firelink_lib");
var notify = require("notify");

// --------------------------------------

var copyItem = contextMenu.Item({
  label: "リンクを生成",
  data: "copyItem",
});

function copyItem_callback(data) {
  var text = fl.createText(data.title, data.title, data.url);
  fl.copyText(text);
  fl.notifyClipboard(copyItem.label);
}

// --------------------------------------

var chainItem = contextMenu.Item({
  label: "リンクを連結",
  data: "chainItem",
});

function chainItem_callback(data) {
  var text = fl.createText(data.title, data.title, data.url);
  fl.chainText(text);
  fl.notifyClipboard(chainItem.label);
}

// --------------------------------------

contextMenu.Menu({
  label: "Fire Link",

  contentScript: 'on("click", function (node, data) { postMessage({kind:data, url:document.URL, title:document.title}); });',

  items: [copyItem, chainItem],

  onMessage: function (data) {
    switch (data.kind) {
    case "copyItem":
      copyItem_callback(data);
      break;
    case "chainItem":
      chainItem_callback(data);
      break;
    }
  },
});
