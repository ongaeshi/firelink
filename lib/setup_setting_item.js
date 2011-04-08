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

exports.create = function() {
  // 設定メニュー
  var settingPanel = Panel.Panel({
    width: 500,
    height: 300,
    contentURL: data.url('setting.html'),
    contentScriptFile: data.url('setting.js'),
    contentScriptWhen: 'ready',
    onShow: function() {
      this.postMessage(storage.linkformData);
    },
    onMessage: function(linkformData) {
      storage.linkformData[0][2] = linkformData;
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



