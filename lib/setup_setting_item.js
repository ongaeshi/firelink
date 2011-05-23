//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/08

const data = require('self').data;
const Panel = require('panel');
const MenuLib = require("menu_lib");
const simpleStorage = require("simple-storage");
const storage = simpleStorage.storage;
const SetupMenu = require('setup_menu');
const Localize = require('localize');
const commands = require("commands");
const locale = require("locale");

var settingPanel = null;

exports.create = function() {
  // 設定メニュー
  settingPanel = Panel.Panel({
    width: 800,
    height: 800,
    contentURL: data.url('setting.' + locale.get() + '.html'),
    contentScriptFile: [data.url('jquery-1.4.2.min.js'),
                        data.url('cocoatable.js'),
                        data.url('setting.js')],
    contentScriptWhen: 'ready',
    onShow: function() {
      this.postMessage({kind: "init", data: storage.linkformData});
    },
    onHide: function() {
      this.postMessage({kind: "save"});
    },
    onMessage: function(msg) {
      switch (msg.kind) {
       case "save":
        if (msg.data) {
          storage.linkformData = msg.data;
          SetupMenu.setupAll();      
        }
        break;
       case "import":
        commands.importFromClipboard(this);
        break;
       case "export":
        commands.exportFromClipboard();
        break;
       case "clear":
        commands.clearSetting(this);
        break;
       case "restore":
        commands.restoreSetting(this);
        break;
       case "tab_open":
        commands.tabOpen(msg.url);
        break;
      }
    }
  });

  function showSettingPanel(action, linkdata) {
    settingPanel.show();
  }

  var settingItem = MenuLib.addCommandMenu(
    Localize.text.setting,
    "settingItem",
    showSettingPanel
  );

  return settingItem;
}

exports.hideSettingPanel = function() {
  settingPanel.hide();
}




