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
  data: "copyItem"
});

var chainItem = contextMenu.Item({
  label: "リンクを連結",
  data: "chainItem"
});

contextMenu.Menu({
  label: "Fire Link",

  contentScript: 'on("click", function (node, data) { postMessage({url:document.URL, node:node, data:data}); });',

  onMessage: function (data) {
    notify.nl("FireLink", "url : " + data.url);
    notify.nl("node : " + data.node);
    notify.nl("data : " + data.data);
  },

  items: [copyItem, chainItem]
});
