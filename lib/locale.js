let prefs = require("sdk/preferences/service");
let notify = require("./notify");

// 現在のロケールを取得
//
// en .. 英語
// ja .. 日本語
//
// en-US 等でも "en" として返す。
// ja-JP-mac 等でも "ja" として返す。
//
exports.get = function(l) {
  let locale = l || prefs.get("general.useragent.locale", "en-US");

  switch (locale) {
   case "ja":
   case "ja-JP-mac":
    return "ja";
  default:
    return "en";
  }
}
