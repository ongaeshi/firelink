//
// @brief
// @author ongaeshi
// @date   2011/04/29

const fl = require("firelink_lib");
const simpleStorage = require("simple-storage");
const storage = simpleStorage.storage;
var notify = require("notify");
const tabs = require("tabs");
const clipboard = require("clipboard");

exports.redoLink = function(label, linkdata) {
  fl.copyLinkAndNotify(label, fl.currentLinkform(), linkdata);
}

function allTabs(label, linkform, separateText) {
  // 切り替え
  fl.changeLinkform(linkform);

  // テキスト生成
  var text = "";
  
  for each (var tab in tabs) {
    if (!tab.isPinned) {
      var linkdata = {text: tab.title, title: tab.title, url: tab.url};
      text += fl.createText(linkform, linkdata) + separateText;
    }
  }

  fl.copyText(text);
  fl.notifyClipboard(label);
}

exports.allTabs = function(label, linkform) {
  allTabs(label, linkform, "\n");
}

exports.allTabsSpace = function(label, linkform) {
  allTabs(label, linkform, "\n\n");
}

exports.setLinkFormIndex = function(index) {
  if (0 <= index && index < storage.linkformData.length) {
    storage.currentIndex = index;
    notify.n("Linkform No." + (index + 1), fl.currentLabel());
  }
}

exports.importFromClipboard = function(panel) {
  fl.notifyClipboard("Import from clipboard");
  

  let linkformData = [
    {name:"PlainText",   format:"%text%\\n%url%"},
    {name:"HTML",        format:"<a href=\"%url%\">%text%</a>"},
  ];
  
  panel.postMessage({kind: "import", data: linkformData});

  //panel.postMessage({kind: "import", data: fl.text2JSON(clipboard.get())});
}

exports.exportFromClipboard = function() {
  clipboard.set( fl.json2Text(storage.linkformData) );
  fl.notifyClipboard("Export from clipboard");
}

