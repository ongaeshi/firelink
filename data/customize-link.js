// ボタンイベント
$(function() {
  $("#ok-button").click(function() {
    var msg = {
      kind: 'ok',
      linkdata: {
        text: $('#text-input').val(),
        url: $('#url-input').val(),
        title: $('#title-input').val()
      }
    };
    self.postMessage(msg);
  });

  $("#close-button").click(function() {
    var msg = {
      kind: 'close'
    };
    self.postMessage(msg);
  });
});

// Add-on Script からのメッセージ受け取り
self.on('message', function(msg) {
  switch (msg.kind) {
   case "init":
    // Dump.p(msg.linkdata);
    $('#text-input').val(msg.linkdata.text);
    $('#url-input').val(msg.linkdata.url);
    $('#title-input').val(msg.linkdata.title);
    break;
  }
});
