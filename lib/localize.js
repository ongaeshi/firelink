if (require('locale').get() == "ja")
  var locale = require('localize.ja');
else
  var locale = require('localize.en');

exports.text = locale.text;
