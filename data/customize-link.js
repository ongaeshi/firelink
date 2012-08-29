// イベント登録
$(function() {
  var okMessage = function() {
    return {
      kind: 'ok',
      select_no: parseInt($('#kind-select option:selected').val(), 10),
      linkdata: {
        text:    $('#text-input').val(),
        url:     $('#url-input').val(),
        title:   $('#title-input').val()
      }
    };
  };
              
  // okボタンを押した
  $("#ok-button").click(function() {
    self.postMessage(okMessage());
  });

  // enterキーを押下
  $('body').keypress(function (e) {
    if ((e.keyCode && e.keyCode == 13)) {
      self.postMessage(okMessage());
    }
  });  

  // canselボタンを押した
  $("#close-button").click(function() {
    self.postMessage({kind: 'close'});
  });
});

// Add-on Script からのメッセージ受け取り
self.on('message', function(msg) {
  switch (msg.kind) {
   case "init":
    // Dump.p(msg.linkformData);
    var options = msg.linkformData.map(function(v) {
      return '<option value="' + v.no + '">' + v.name + '</option>';
    }).join("");
    
    $('#kind-select').html(options);
    $('#kind-select').val(msg.select_no); // 初期位置
    $('#text-input').val(msg.linkdata.text);
    $('#url-input').val(msg.linkdata.url);
    $('#title-input').val(msg.linkdata.title);
    self.postMessage({kind: 'show'});
    break;
  }
});
