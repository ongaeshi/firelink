//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/16

(function() {
  
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

function onKeyDown(event) {
  // input or textarea の時は何もしない
  var tag = event.target.tagName && event.target.tagName.toLowerCase();
  if (tag == "input" || tag == "textarea") { return; }

  var linkdata = null;

  // テキスト選択、非選択で変わる
  if (!isSelected(window))
    linkdata = {text:  window.document.title,
                title: window.document.title,
                url:   window.document.location.href};
  else
    linkdata = {text:  window.getSelection().toString(),
                title: window.document.title,
                url:   window.document.location.href};

  // リンク生成
  if (isCtrl(event, window) && event.keyCode == 67/*C*/) {
    if (!isSelected(window)) {
      self.postMessage({kind: 'redoLink', linkdata: linkdata});

    } else if (event.shiftKey) {
      self.postMessage({kind: 'redoLink', linkdata: linkdata});
    }
  }
  
  // Set %text% from Clipboard (Ctrl+X)
  if (isCtrl(event, window) && event.keyCode == 88/*X*/) {
    self.postMessage({kind: 'textFromClipboard', linkdata: linkdata});
  }

  // ダイレクト選択
  if (49 <= event.keyCode && event.keyCode <= 57) {
    self.postMessage({kind: 'select', index: event.keyCode - 49});
  }

  // 0
  if (48 == event.keyCode) {
    self.postMessage({kind: 'select', index: 9});
  }
}

document.addEventListener("keydown", onKeyDown, true);

})();

