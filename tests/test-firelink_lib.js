//
// @brief
// @author ongaeshi
// @date   2011/04/24

const fl = require("firelink_lib");
const dateExt = require("date-ext");
const clipboard = require("clipboard");

function test_parseDate(test) {
  {
    let d = dateExt.DateExt(new Date(2001, 4, 5, 11, 5), 5); // 注意(0 == January)
    test.assertEqual(fl.parseDate("%date%", d), "2001/05/05");
    test.assertEqual(fl.parseDate("%Date%", d), "2001-05-05");
    test.assertEqual(fl.parseDate("%datetime%", d), "2001/05/05 11:05");
    test.assertEqual(fl.parseDate("%DateTime%", d), "2001-05-05 11:05");
    test.assertEqual(fl.parseDate("%year%", d), "2001");
    test.assertEqual(fl.parseDate("%month%", d), "05");
    test.assertEqual(fl.parseDate("%day%", d), "05");
    test.assertEqual(fl.parseDate("%hour%", d), "11");
    test.assertEqual(fl.parseDate("%min%", d), "05");
  }

  {
    let d = dateExt.DateExt(new Date(2001, 4, 5, 3, 5), 5); // 注意(0 == January)
    test.assertEqual(fl.parseDate("%hour%", d), "03");
    test.assertEqual(fl.parseDate("%hour%:%min% %year%:%month%:%day%", d), "03:05 2001:05:05");
  }
}

function test_isgd(test) {
  test.assertEqual(fl.isgd("%isgd%", "http://www.yahoo.co.jp"), "http://is.gd/OhDpSf");
  test.assertEqual(fl.isgd("DUMMY %isgd%", "http://www.yahoo.co.jp"), "DUMMY http://is.gd/OhDpSf");
  test.assertEqual(fl.isgd("hogehoge fooga", "http://www.yahoo.co.jp"), "hogehoge fooga");
  test.assertEqual(fl.isgd("hogehoge %ISGD% fooga", "http://www.yahoo.co.jp"), "hogehoge %ISGD% fooga");
}

function test_copyLinkAndNotify(test) {
  let linkdata = {text: "YAAOO!! JIPAN", title: "YAAOO!! JIPAN", url: "http://www.example.jp"};
  
  fl.copyLinkAndNotify("DUMMY", "%text%\n%url%", linkdata);
  test.assertEqual("YAAOO!! JIPAN\nhttp://www.example.jp", clipboard.get());

  fl.copyLinkAndNotify("DUMMY2", "<a href=\"%url%\">%text%</a>", linkdata);
  test.assertEqual("<a href=\"http://www.example.jp\">YAAOO!! JIPAN</a>", clipboard.get());
}

exports.test_test_run = function(test) {
  test.pass("Test FireLink Lib .....");
  test_parseDate(test);
  test_isgd(test);
  test_copyLinkAndNotify(test);

  // -- 展開 --
  fl.changeLinkform("%text% %isgd%");
  test.assertEqual(2, fl.currentIndex());

  fl.changeLinkform("fake");    // 見つからない
  test.assertEqual(0, fl.currentIndex());

  fl.changeLinkform("[[%text%|%url%]]");
  test.assertEqual(3, fl.currentIndex());

};
