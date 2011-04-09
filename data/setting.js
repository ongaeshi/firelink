//
// @file 
// @brief  設定パネル
// @author ongaeshi
// @date   2011/04/07

var ctable = null;

self.on('message', function(linkformData) {
  // テーブルを空に
  $('#formats').empty();

  // テーブルを生成
  ctable = new CocoaTable(linkformData, ['name', 'format']);
});

$('#ok_button').bind('click', function(event) {
  postMessage(ctable.to_json());
});

$('#cancel_button').bind('click', function(event) {
  postMessage(null);
});
