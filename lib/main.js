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

var defaultLinkFormData = [
  ["PlainText", "PlainText", "%text%\n%url%"],
  ["HTML", "HTML", "<a href=\"%url%\">%text%</a>"],
  ["TiddlyWiki", "TiddlyWiki", "[[%text%|%url%]]"],
  ["hatena", "hatena", "[%url%:title=%text%]"]
];

function removeLinkFormItem() {
  linkformMenu.items = [];
}

function createLinkFormItem() {
  var array = [];
  
  for (var i = 0; i < storage.linkFormData.length; i++) {
    var data = storage.linkFormData[i];
    array.push(addLinkformItem(data[0], data[1], data[2]));
  }

  linkformMenu.items = array;
}

function setupLinkFormItem() {
  removeLinkFormItem();
  createLinkFormItem();
}

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

function setupContextMenu(rootMenu, context, contentScript) {
  // 既に存在していたら削除
  if (rootMenu != null)
    rootMenu.destroy();

  // ルートメニュー
  rootMenu = contextMenu.Menu({
    label: "Fire Link",
    context: context,
    contentScript: contentScript, 
    items: [copyItem, contextMenu.Separator(), linkformMenu, settingItem],
    onMessage: function(msg) {
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
  });

  // 結果を返す
  return rootMenu;
}

// --------------------------------------

var menuContextPage = null;
var menuContextSelection = null;
var menuContextSelector = null;

exports.main = function(options, callbacks) {
  // creatre link form
//   if (!storage.linkFormData)
//     storage.linkFormData = defaultLinkFormData;
//   setupLinkFormItem();
  
  // set current link form
//   if (!storage.currentLinkForm)
//     storage.currentLinkForm = MenuAction.find(tiddlywikiItem.data).linkform;

  // メニューの再生成
  menuContextPage = setupContextMenu(menuContextPage,
                                     contextMenu.PageContext(),
                                     'on("click", function (node, data) { ' +
                                     '  postMessage({data:data, text:document.title, title:document.title, url:document.location.href}); ' +
                                     '});'
                                    );

  menuContextSelection = setupContextMenu(menuContextSelection,
                                          contextMenu.SelectionContext(),
                                          'on("click", function (node, data) { ' +
                                          '  postMessage({data:data, text:null, title:document.title, url:document.location.href}); ' +
                                          '});'
                                         );

  menuContextSelector = setupContextMenu(menuContextSelector,
                                         contextMenu.SelectorContext('a[href]'),
                                         'on("click", function (node, data) { ' +
                                         '  postMessage({data:data, text:node.textContent, title:node.textContent, url:node.href}); ' +
                                         '});'
                                        );
};

