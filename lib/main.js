//
// @file 
// @brief  firelink本体
// @author ongaeshi
// @date   2011/01/10

var contextMenu = require("context-menu");
var fl = require("firelink_lib");
var MenuAction = require("menu_action");
var notify = require("notify");

// --------------------------------------

var copyItem = contextMenu.Item({
  label: "リンクを生成",
  data: "copyItem",
});

MenuAction.addCommand(
  // 対応するアイテム
  copyItem,

  // 実行する処理
  function(action, linkdata) {
    var text = fl.createText(linkdata.title, linkdata.title, linkdata.url);
    fl.copyText(text);
    fl.notifyClipboard(action.item.label);
  }
);


// --------------------------------------

var dummyItem = contextMenu.Item({
  label: "ダミー",
  data: "dummy",
});

// --------------------------------------

var plaintextItem = contextMenu.Item({
  label: "PlainText",
  data: "PlainText",
});
MenuAction.addLinkform(plaintextItem, "%text%\n%url%");

var htmlItem = contextMenu.Item({
  label: "HTML",
  data: "HTML",
});
MenuAction.addLinkform(htmlItem, "<a href=\"%url%\">%text%</a>");

var tiddlywikiItem = contextMenu.Item({
  label: "*TiddlyWiki",
  data: "TiddlyWiki",
});
//MenuAction.addLinkform(tiddlywikiItem, "[[%text%|%url%]]");

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

  contentScript: 'on("click", function (node, data) { postMessage({data:data, text:document.title, title:document.title, url:document.location.href}); } );',

  items: [copyItem, dummyItem, dummyItem, contextMenu.Separator(), linkformMenu, settingItem],

  onMessage: function (msg) {
    data = msg.data;
    linkdata = {text:msg.text, title:msg.title, url:msg.url};

    menuAction = MenuAction.find(data);

    if (menuAction)
      menuAction.callback(menuAction, linkdata);
    else
      notify.nl("Error", "Not Found menuAction!!");
  },
});
