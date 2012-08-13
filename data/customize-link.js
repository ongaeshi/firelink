// イベント登録
$(function() {
  // okボタンを押した
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

  // enterキーを押下
  $('body').keypress(function (e) {
    if ((e.keyCode && e.keyCode == 13)) {
      var msg = {
        kind: 'ok',
        linkdata: {
          text: $('#text-input').val(),
          url: $('#url-input').val(),
          title: $('#title-input').val()
        }
      };
      self.postMessage(msg);
    }
  });  

  // canselボタンを押した
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
    $('h1').html(msg.label);
    $('#text-input').val(msg.linkdata.text);
    $('#url-input').val(msg.linkdata.url);
    $('#title-input').val(msg.linkdata.title);
    break;
  }
});
