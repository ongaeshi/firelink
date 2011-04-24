//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/23

const { Trait } = require("traits");
const dateExt = require("date-ext");

exports.test_test_run = function(test) {
  test.pass("Date Module Test .....");

  let today = dateExt.DateExt(); // current time!!

  let d = dateExt.DateExt(new Date(2001, 4, 5, 11, 5), 5); // 注意(0 == January)
  test.assertEqual(d.raw, "Sat May 05 2001 11:05:00 GMT+0900 (JST)");
  test.assertEqual(d.year, 2001);
  test.assertEqual(d.month, 5);
  test.assertEqual(d.day, 5);
  test.assertEqual(d.hour, 11);
  test.assertEqual(d.min, 5);
  test.assertEqual(d.to_s_dateTime(), "2001/05/05 11:05");
  test.assertEqual(d.to_s_DateTime(), "2001-05-05 11:05");
};

