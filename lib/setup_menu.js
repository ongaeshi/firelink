const contextMenu = require("context-menu");
const selection = require("selection");
const SetupCopyItem = require('setup_copy_item');
const SetupLinkFormMenu = require('setup_linkform_menu');
const SetupSettingItem = require('setup_setting_item');
const MenuAction = require("menu_action");
const simpleStorage = require("simple-storage");
const storage = simpleStorage.storage;
const Localize = require('localize');
const MenuLib = require("menu_lib");
const commands = require("commands");
const data = require("self").data;

var menuContextPage = null;
var menuContextSelection = null;
var menuContextSelector = null;

function setupDirectSelectSettingItem() {
  return MenuLib.addCommandMenu(
    commands.getDisableDirectSelect() ? Localize.text.enable_direct_select : Localize.text.disable_direct_select,
    "setup_direct_select_setting",
    MenuLib.toggleDirectSelect
  );
}

function setupIN(rootMenu, context, contentScript, linkformData, currentIndex) {
  // 既に存在していたら削除
  if (rootMenu != null)
    rootMenu.destroy();

  // 子メニューの生成
  var items = null;
  var linkformItems = SetupLinkFormMenu.create(linkformData);
  var settingItem = SetupSettingItem.create();
  var copyItem = SetupCopyItem.create(linkformData);

  if (copyItem != null) {
    items = [];

    // redo
    items.push(copyItem.redo);
    items.push(contextMenu.Separator());

    // Customize Link
    items.push(copyItem.textFromClipboard);
    items.push(contextMenu.Separator());

    // CopyTabs
    items.push(copyItem.copyTabs);
    items.push(copyItem.allTabsSpace);
    items.push(contextMenu.Separator());

    // PlainText, HTML, ..
    for (let i = 0; i < linkformItems.length; i++)
      items.push(linkformItems[i]);

    items.push(contextMenu.Separator());

    // Setting
    items.push(setupDirectSelectSettingItem());
    items.push(settingItem);
  }
  else
    items = [settingItem];

  // ルートメニュー
  rootMenu = contextMenu.Menu({
    label: "Fire Link",
    image: data.url("FireLinkIcon16.png"),
    context: context,
    contentScript: contentScript,
    items: items,
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

exports.setupAll = function() {
  var linkformData = storage.linkformData;
  var currentIndex = storage.currentIndex;

  // メニューコマンドのクリア
  MenuAction.clear();

  // メニューの再生成
  menuContextPage = setupIN(menuContextPage,
                            contextMenu.PageContext(),
                            'self.on("click", function (node, data) { ' +
                            '  var url = document.location.href;' +
                            '  var canonical = document.querySelector(\'link[rel=canonical],link[rel=shorturl],link[rel=shortlink]\');' +
                            '  if (canonical) { url = canonical.href; } ' +
                            '  self.postMessage({data:data, text:document.title, title:document.title, url:url}); ' +
                            '});',
                            linkformData,
                            currentIndex
                           );

  menuContextSelection = setupIN(menuContextSelection,
                                 contextMenu.SelectionContext(),
                                 'self.on("click", function (node, data) { ' +
                                 '  var url = document.location.href;' +
                                 '  var canonical = document.querySelector(\'link[rel=canonical],link[rel=shorturl],link[rel=shortlink]\');' +
                                 '  if (canonical) { url = canonical.href; } ' +
                                 '  self.postMessage({data:data, text:null, title:document.title, url:url}); ' +
                                 '});',
                                 linkformData,
                                 currentIndex
                                );

  menuContextSelector = setupIN(menuContextSelector,
                                contextMenu.SelectorContext('a[href]'),
                                'self.on("click", function (node, data) { ' +
                                '  self.postMessage({data:data, text:node.textContent, title:node.textContent, url:node.href}); ' +
                                '});',
                                linkformData,
                                currentIndex
                               );
}
