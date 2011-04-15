//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/13

const TabBrowser = require("tab-browser");
const clipboard = require("clipboard");
const fl = require("firelink_lib");
const selection = require("selection");
const PageMod = require('page-mod');
const data = require('self').data;

function isSelected(window) {
  var sel = window.getSelection();
  if (sel.rangeCount <= 0) return false;
  if (sel.rangeCount > 1) return true;

  var range = sel.getRangeAt(0);
  if (! range.collapsed) return true;
  if (range.startContainer != range.endContainer) return true;
  if (range.startOffset != range.endOffset) return true;
  if (window.document.activeElement.tagName.toLowerCase() != "body") return true;

  return false;
}

function isCtrl(event, window) {
  var isMac = (window.navigator.platform.indexOf("Mac") != -1);

  if (isMac)
    return event.metaKey;
  else
    return event.ctrlKey;
}

function copylink(event, window) {
  // リンク生成
  if (isCtrl(event, window) && event.keyCode == 67/*C*/) {
    if (!isSelected(window)) {
      if (!event.shiftKey)
        fl.createLink(fl.currentLabel(), {text:  window.document.title,
                                          title: window.document.title,
                                          url:   window.document.location.href});
      else
        // 非選択時に Ctrl+Shift+C でホームに戻る
        fl.homeLinkform();

    } else if (event.shiftKey) {
      fl.createLink(fl.currentLabel(), {text:  window.getSelection().toString(),
                                        title: window.document.title,
                                        url:   window.document.location.href});
    }
  }
  
  // リンク切り替え & ホームに戻る
  if (isCtrl(event, window) && event.keyCode == 88/*X*/) {
    if (!isSelected(window)) {
      if (!event.shiftKey)
        fl.nextLinkform();
      else
        fl.prevLinkform();
    }
  }
}

exports.setup = function() {
  PageMod.PageMod({
    include: ['*'],
    contentScriptWhen: 'ready',
    contentScriptFile: data.url('shortcuts.js'),
    onAttach: function onAttach(worker) {
      worker.on('message', function(data) {
        console.log(data.command, data.isSelected);
      });
    }    
  });
  
  TabBrowser.whenContentLoaded(function(window){
    var f = function(event){ copylink(event, window); };
    window.document.addEventListener("keydown", f, true);
  });
}


