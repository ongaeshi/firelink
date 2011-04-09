//
// @file 
// @brief  設定パネル
// @author ongaeshi
// @date   2011/04/07

var textArea = document.getElementById('annotation-box');

// textArea.onkeyup = function(event) {
// //   if (event.keyCode == 13) {
// //     postMessage(textArea.value);
// //     textArea.value = '';
// //   }
// };

self.on('message', function(linkformData) {
//   var data = [
//     {label:"11", format:"12", filter:"13"},
//     {label:"11", format:"12", filter:"13"},
//     {label:"11", format:"12", filter:"13"},
//     {label:"11", format:"12", filter:"13"},
//   ];
  
//   var ctable = new CocoaTable(data, [
//     'label', 'format', 'filter'
//   ] );
  
  var ctable = new CocoaTable(linkformData, [
    'name', 'format'
  ] );

  ctable._listener.onUpdated = function () {
    //var json = ctable.serialize();
    //localStorage[localStorageKey] = json;
  }
  
  window.ctable = ctable;
  
  
//   var textArea = document.getElementById('annotation-box');
//   textArea.value = linkformData[0][2];
//   textArea.focus();
});

var ok_button = document.getElementById('okbutton');

ok_button.onclick = function(event) {
  var defaultLinkformData = [
    {name:"PlainText",   format:"%text%\n%url%"},
    {name:"HTML",        format:"<a href=\"%url%\">%text%</a>"},
    {name:"TiddlyWiki",  format:"[[%text%|%url%]]"},
    {name:"hatena",      format:"[%url%:title=%text%]"}
  ];
  
  postMessage(defaultLinkformData);
}

