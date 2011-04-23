//
// @brief
// @author ongaeshi
// @date   2011/04/24

const fl = require("firelink_lib");
const dateExt = require("date-ext");

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

exports.test_test_run = function(test) {
  test.pass("Test FireLink Lib .....");
  test_parseDate(test);
};





