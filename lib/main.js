var contextMenu = require("context-menu");
var clipboard = require("clipboard");
var notify = require("notify");

function copyText(text) {
  clipboard.set(txt);
}

function chainText(text) {
  clipboard.set(clipboard.get() + crlf + txt);
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
  notify.n("**copyItem", data.data);
}

// --------------------------------------

var chainItem = contextMenu.Item({
  label: "リンクを連結",
  data: "chainItem",
});

function chainItem_callback(data) {
  notify.n("**chainItem", data.data);
}

// --------------------------------------

contextMenu.Menu({
  label: "Fire Link",

  contentScript: 'on("click", function (node, data) { postMessage({url:document.URL, node:node, data:data}); });',

  items: [copyItem, chainItem]

  onMessage: function (data) {
    switch (data.data) {
    case "copyItem":
      copyItem_callback(data);
      break;
    case "chainItem":
      chainItem_callback(data);
      break;
    }
  },
});
