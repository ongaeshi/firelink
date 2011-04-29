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
  commands.homeLinkform();

  // 前回の値でリンク生成
  commands.redoLink("redo test", {text: "TEXT", title: "TITLE", url: "http://www.example.jp"});
  test.assertEqual("TEXT\nhttp://www.example.jp", clipboard.get());

  // 移動
  commands.nextLinkform();
  test.assertEqual(1, fl.currentIndex());
  commands.prevLinkform();
  test.assertEqual(0, fl.currentIndex());

  // ダイレクト移動
  commands.homeLinkform();
  test.assertEqual(fl.currentIndex(), 0);
  commands.secondLinkform();
  test.assertEqual(fl.currentIndex(), 1);
  commands.thirdLinkform();
  test.assertEqual(fl.currentIndex(), 2);

  // 全てのタブをリンク
  commands.allTabs("DUMMY", "%text%\n%url%");
  test.assertEqual("\nabout:blank\n", clipboard.get());
  
//   commands.allTabsSpace("DUMMY", "%text%\n%url%");
//   test.assertEqual("\nabout:blank\n\n", clipboard.get());
  
};



