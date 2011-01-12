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

function addCommandMenu(label, data, callback)
{
  var item = contextMenu.Item({
    label: label,
    data: data,
  });

  MenuAction.add({
    item: item,
    callback: callback,
  });

  return item;
}

function changeLinkform(action, linkdata) {
  // 使用するリンク形式の切り替え
  fl.dumpObj(action);
}

function addLinkformItem(label, data, linkform)
{
  var item = contextMenu.Item({
    label: label,
    data: data,
  });

  MenuAction.add({
    item: item,
    linkform: linkform,
    callback: changeLinkform,
  });

  return item;
}

// --------------------------------------

var copyItem = addCommandMenu(
  "リンクを生成",
  "copyItem",
  function(action, linkdata) {
    var text = fl.createText(linkdata.title, linkdata.title, linkdata.url);
    fl.copyText(text);
    fl.notifyClipboard(action.item.label);
  }
);

// --------------------------------------

var plaintextItem  = addLinkformItem("PlainText", "PlainText", "%text%\n%url%");
var htmlItem       = addLinkformItem("HTML", "HTML", "<a href=\"%url%\">%text%</a>");
var tiddlywikiItem = addLinkformItem("TiddlyWiki", "TiddlyWiki", "[[%text%|%url%]]");

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

  items: [copyItem, contextMenu.Separator(), linkformMenu, settingItem],

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
