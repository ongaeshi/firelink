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

exports.create = function() {
  // 設定メニュー
  var settingPanel = Panel.Panel({
    width: 800,
    height: 600,
    contentURL: data.url('setting.html'),
    contentScriptFile: [data.url('jquery-1.4.2.min.js'),
                        data.url('cocoatable.js'),
                        data.url('setting.js')],
    contentScriptWhen: 'ready',
    onShow: function() {
      this.postMessage(storage.linkformData);
    },
    onMessage: function(linkformData) {
      if (linkformData) {
        storage.linkformData = linkformData;
        SetupMenu.setupAll();      
      }
      this.hide();
    }
  });

  function showSettingPanel(action, linkdata) {
    settingPanel.show();
  }

  var settingItem = MenuLib.addCommandMenu(
    "設定",
    "settingItem",
    showSettingPanel
  );

  return settingItem;
}



