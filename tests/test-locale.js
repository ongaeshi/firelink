//
// @brief
// @author ongaeshi
// @date 2011/05/17

let prefs = require("preferences-service");
var notify = require("notify");

exports.test_locale = function(test) {
  let locale = prefs.get("general.useragent.locale", "en-US");
  notify.n("local", locale);

  let pool = {
    "Hi!": {
      "ja": {
        "translation": "挨"
      },
      "ja-JP-mac": {
        "translation": "挨"
      },
    },
    "Hello!": {
      "ja": {
        "translation": "こんにちは！"
      },
    },
    "Good bye!": {
      "ja": {
        "translation": "さようなら！"
      },
    },
  };

  test.assertEqual(locale in pool["Hi!"], true);
};

const {classes: Cc, interfaces: Ci, utils: Cu} = Components;

exports.test_locale2 = function(test) {
  test.pass("Test Locale2 .....");

  let locale2 = Cc["@mozilla.org/chrome/chrome-registry;1"]
    .getService(Ci.nsIXULChromeRegistry).getSelectedLocale("global");
  notify.n("local2", locale2);
}




