//
// @file 
// @brief  設定パネル
// @author ongaeshi
// @date   2011/04/07

var textArea = document.getElementById('annotation-box');

textArea.onkeyup = function(event) {
  if (event.keyCode == 13) {
    postMessage(textArea.value);
    textArea.value = '';
  }
};

self.on('message', function() {
  var textArea = document.getElementById('annotation-box');
  textArea.value = '';
  textArea.focus();
});
