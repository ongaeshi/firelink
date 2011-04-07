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
const SetupCopyItem = require('setup_copy_item');
const SetupLinkFormMenu = require('setup_linkform_menu');

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

function addLinkformItem(label, data, linkform) {
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

function setupSettingItem() {
  // 設定メニュー
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

  return settingItem;
}

var menuContextPage = null;
var menuContextSelection = null;
var menuContextSelector = null;

function setupContextMenu(rootMenu, context, contentScript) {
  // 既に存在していたら削除
  if (rootMenu != null)
    rootMenu.destroy();

  // 子メニューの生成
  var copyItem = SetupCopyItem.create();
  var linkformMenu = SetupLinkFormMenu.create();
  var settingItem = setupSettingItem();

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

function setupContextMenuAll() {
  // メニューコマンドのクリア
  MenuAction.clear();
  
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
}

// --------------------------------------

exports.main = function(options, callbacks) {
  // creatre link form
//   if (!storage.linkFormData)
//     storage.linkFormData = defaultLinkFormData;
//   setupLinkFormItem();
  
  // set current link form
//   if (!storage.currentLinkForm)
//     storage.currentLinkForm = MenuAction.find(tiddlywikiItem.data).linkform;

  setupContextMenuAll();
};

