//
// @file 
// @brief  設定パネル
// @author ongaeshi
// @date   2011/04/07

self.on('message', function(linkformData) {
  // テーブルを空に
  $('#formats').empty();

  // テーブルを生成
  var ctable = new CocoaTable(linkformData, ['name', 'format']);
});

$('#ok_button').bind('click', function(event) {
  var dummyData = [
    {name:"PT",          format:"t:%text%\nu:%url%"},
    {name:"HTML",        format:"<a href=\"%url%\">%text%</a>"},
    {name:"TiddlyWiki",  format:"[[%text%|%url%]]"},
    {name:"hatena",      format:"[%url%:title=%text%]"}
  ];
  postMessage(dummyData);
});

$('#cancel_button').bind('click', function(event) {
  postMessage(null);
});
