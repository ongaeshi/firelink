const data = require('sdk/self').data;
const Panel = require('sdk/panel');
const MenuLib = require("./menu_lib");
const simpleStorage = require("sdk/simple-storage");
const storage = simpleStorage.storage;
const SetupMenu = require('./setup_menu');
const Localize = require('./localize');
const commands = require("./commands");
const locale = require("./locale");
const fl = require("./firelink_lib");

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
      this.postMessage({kind: "shortening", data: storage.shortening});
    },
    onHide: function() {
      this.postMessage({kind: "save"});
      this.postMessage({kind: "saveshortening"});
    },
    onMessage: function(msg) {
      switch (msg.kind) {
       case "save":
        if (msg.data && !fl.equalHashArray(storage.linkformData, msg.data)) {
          //console.log("save!!");
          storage.linkformData = msg.data;
          SetupMenu.setupAll();
        }
        break;
       case "saveshortening":
        storage.shortening = msg.data;
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
