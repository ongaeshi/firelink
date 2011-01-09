var contextMenu = require("context-menu");
var clipboard = require("clipboard");
var notify = require("notify");

function crlf() {
  var isWin = false;            // @todo プラットホームの判別
  return isWin ? "\r\n" : "\n";
}

function copyText(text) {
  clipboard.set(text);
}

function chainText(text) {
  clipboard.set(clipboard.get() + crlf() + text);
}

function createText(text, title, url) {
  return "[[" + title + "|" + url + "]]";
}

// --------------------------------------

var copyItem = contextMenu.Item({
  label: "リンクを生成",
  data: "copyItem",
});

function copyItem_callback(data) {
  var text = createText(data.title, data.title, data.url);
  copyText(text);
  notify.n(copyItem.label, clipboard.get());
}

// --------------------------------------

var chainItem = contextMenu.Item({
  label: "リンクを連結",
  data: "chainItem",
});

function chainItem_callback(data) {
  var text = createText(data.title, data.title, data.url);
  chainText(text);
  notify.n(chainItem.label, clipboard.get());
}

// --------------------------------------

contextMenu.Menu({
  label: "Fire Link",

  contentScript: 'on("click", function (node, data) { postMessage({kind:data, url:document.URL, title:document.title}); });',

  items: [copyItem, chainItem],

  onMessage: function (data) {
    switch (data.kind) {
    case "copyItem":
      copyItem_callback(data);
      break;
    case "chainItem":
      chainItem_callback(data);
      break;
    }
  },
});
