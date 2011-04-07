//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/08

const data = require('self').data;
const Panel = require('panel');
const MenuLib = require("menu_lib");

exports.create = function() {
  // 設定メニュー
  var settingPanel = Panel.Panel({
    width: 220,
    height: 220,
    contentURL: data.url('setting.html'),
    contentScriptFile: data.url('setting.js'),
    contentScriptWhen: 'ready',
    onShow: function() {
      this.postMessage(linkSettings); //@todo ストレージからデータを表示
    },
    onMessage: function(annotationText) {
      // データのセーブ
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



