//
// @file 
// @brief  firelink本体
// @author ongaeshi
// @date   2011/01/10

var contextMenu = require("context-menu");
var fl = require("firelink_lib");

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

var dummyItem = contextMenu.Item({
  label: "ダミー",
  data: "dummy",
});

// --------------------------------------

var plaintextItem = contextMenu.Item({
  label: "PlainText",
});

var htmlItem = contextMenu.Item({
  label: "HTML",
});

var tiddlywikiItem = contextMenu.Item({
  label: "*TiddlyWiki",
});

var linkformMenu = contextMenu.Menu({
  label: "リンク形式",
  items: [plaintextItem, htmlItem, tiddlywikiItem],
});

// --------------------------------------

var settingItem = contextMenu.Item({
  label: "設定",
});

// --------------------------------------

contextMenu.Menu({
  label: "Fire Link",

  contentScript: 'on("click", function (node, data) { postMessage({kind:data, url:document.location.href, title:document.title}); });',

  items: [copyItem, dummyItem, dummyItem, contextMenu.Separator(), linkformMenu, settingItem],

  onMessage: function (data) {
    switch (data.kind) {
    case "copyItem":
      copyItem_callback(data);
      break;
    }
  },
});
