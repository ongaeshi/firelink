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

  // リンク生成
  if (isCtrl(event, window) && event.keyCode == 67/*C*/) {
    if (!isSelected(window)) {
      if (!event.shiftKey)
        postMessage({kind: 'createLink',
                     linkdata: {text:  window.document.title,
                                title: window.document.title,
                                url:   window.document.location.href}
                    });
      else
        postMessage({kind: 'home'});

    } else if (event.shiftKey) {
        postMessage({kind: 'createLink',
                     linkdata: {text:  window.getSelection().toString(),
                                title: window.document.title,
                                url:   window.document.location.href}
                    });
    }
  }
  
  // リンク切り替え & ホームに戻る
  if (isCtrl(event, window) && event.keyCode == 88/*X*/) {
    if (!isSelected(window)) {
      if (!event.shiftKey)
        postMessage({kind: 'next'});
      else
        postMessage({kind: 'prev'});
    }
  }
}

document.addEventListener("keydown", onKeyDown, true);

})();

