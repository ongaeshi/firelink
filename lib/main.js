//
// @file 
// @brief  firelink本体
// @author ongaeshi
// @date   2011/01/10

var contextMenu = require("context-menu");
var fl = require("firelink_lib");
var MenuAction = require("menu_action");
var notify = require("notify");
var selection = require("selection");
var simpleStorage = require("simple-storage");
var storage = simpleStorage.storage;
const data = require('self').data;
const panels = require('panel');

// --------------------------------------

function addCommandMenu(label, data, callback) {
  var item = contextMenu.Item({
    label: label,
    data: data
  });

  MenuAction.add({
    item: item,
    callback: callback
  });

  return item;
}

function createLink(action, linkdata) {
  var text = fl.createText(storage.currentLinkForm, linkdata);
  fl.copyText(text);
  fl.notifyClipboard(action.item.label);
}

function changeLinkform(action, linkdata) {
  // 切り替え
  //notify.nl(action.item.label, action.linkform);
  storage.currentLinkForm = action.linkform;

  // リンクの生成も同時に行う
  createLink(action, linkdata);
}

function addLinkformItem(label, data, linkform)
{
  var item = contextMenu.Item({
    label: label,
    data: data
  });

  MenuAction.add({
    item: item,
    linkform: linkform,
    callback: changeLinkform
  });

  return item;
}

// --------------------------------------

var copyItem = addCommandMenu(
  "リンクを生成",
  "copyItem",
  createLink
);

// --------------------------------------

var plaintextItem  = addLinkformItem("PlainText", "PlainText", "%text%\n%url%");
var htmlItem       = addLinkformItem("HTML", "HTML", "<a href=\"%url%\">%text%</a>");
var tiddlywikiItem = addLinkformItem("TiddlyWiki", "TiddlyWiki", "[[%text%|%url%]]");
var tiddlywikiListItem = addLinkformItem("TiddlyWiki(list)", "TiddlyWikiList", "* [[%text%|%url%]]");
var hatenaItem = addLinkformItem("hatena", "hatena", "[%url%:title=%text%]");
var hatenaListItem = addLinkformItem("hatena(list)", "hatenaList", "- [%url%:title=%text%]");
var linkSettings = [plaintextItem, htmlItem, tiddlywikiItem, tiddlywikiListItem, hatenaItem, hatenaListItem];

var linkformMenu = contextMenu.Menu({
  label: "リンク形式",
  items: linkSettings
});

// --------------------------------------

var settingPanel = panels.Panel({
  width: 220,
  height: 220,
  contentURL: data.url('setting.html'),
  contentScriptFile: data.url('setting.js'),
  contentScriptWhen: 'ready',
  onShow: function() {
    this.postMessage(linkSettings);
  },
  onMessage: function(annotationText) {
    // データのセーブ
  }
});

function showSettingPanel(action, linkdata) {
  settingPanel.show();
}

var settingItem = addCommandMenu(
  "設定",
  "settingItem",
  showSettingPanel
);

// --------------------------------------

function onMessage(msg) {
  var data = msg.data;
  var linkdata = {text:msg.text, title:msg.title, url:msg.url};

  if (selection.text)
    linkdata.text = selection.text;

  var menuAction = MenuAction.find(data);

  if (menuAction)
    menuAction.callback(menuAction, linkdata);
  else
    notify.nl("Error", "Not Found menuAction!!");
}

contextMenu.Menu({
  label: "Fire Link",
  contentScript: 'on("click", function (node, data) { postMessage({data:data, text:document.title, title:document.title, url:document.location.href}); } );',
  items: [copyItem, contextMenu.Separator(), linkformMenu, settingItem],
  onMessage: onMessage
});

contextMenu.Menu({
  label: "Fire Link",
  context: contextMenu.SelectionContext(),
  contentScript: 'on("click", function (node, data) { postMessage({data:data, text:null, title:document.title, url:document.location.href}); } );',
  items: [copyItem, contextMenu.Separator(), linkformMenu, settingItem],
  onMessage: onMessage
});

// --------------------------------------

exports.main = function(options, callbacks) {
  // set default value
  if (!storage.currentLinkForm)
    storage.currentLinkForm = MenuAction.find(tiddlywikiItem.data).linkform;
};

