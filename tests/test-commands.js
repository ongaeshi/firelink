//
// @brief
// @author ongaeshi
// @date   2011/04/29

const commands = require("commands");
const fl = require("firelink_lib");
const clipboard = require("clipboard");

exports.test_commands = function(test) {
  test.pass("Test Commands .....");

  // 先頭に戻す
  commands.setLinkFormIndex(0);

  // 前回の値でリンク生成
  commands.redoLink("redo test", {text: "TEXT", title: "TITLE", url: "http://www.example.jp"});
  test.assertEqual("TEXT\nhttp://www.example.jp", clipboard.get());

  // 全てのタブをリンク
  commands.allTabs("DUMMY", "%text%\\n%url%");
  test.assertEqual("\nabout:blank\n", clipboard.get());
  
  commands.allTabsSpace("DUMMY", "%text%\\n%url%");
  test.assertEqual("\nabout:blank\n\n", clipboard.get());

  // リンク種類を直接設定
  commands.setLinkFormIndex(0);
  test.assertEqual(0, fl.currentIndex());
  commands.setLinkFormIndex(1);
  test.assertEqual(1, fl.currentIndex());
  commands.setLinkFormIndex(2);
  test.assertEqual(2, fl.currentIndex());
  commands.setLinkFormIndex(3);
  test.assertEqual(3, fl.currentIndex());
  commands.setLinkFormIndex(500);
  test.assertEqual(3, fl.currentIndex());

  // Export
  commands.exportFromClipboard();
  // let text =
  //   "PlainText\t%text%\\n%url%\n" +
  //   "HTML\t<a href=\"%url%\">%text%</a>\n" +
  //   "Twitter\t%text% %isgd%\n" +
  //   "TiddlyWiki\t[[%text%|%url%]]\n";
  // test.assertEqual(text, clipboard.get());

  // Import
  // commands.importFromClipboard();
};



