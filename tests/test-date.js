//
// @file 
// @brief
// @author ongaeshi
// @date   2011/04/23

//const DateString = require("date");
const { Trait } = require("traits");
const dateExt = require("date-ext");

//const FlDate = require("fl_date");

// var FlDate = Trait.compose({
//   // public API
//   constructor: function FlDate() {
//     this._date = new Date();
//   },
  
//   get date() this._date,

//   // private API:
//   _date: null
// });

exports.test_test_run = function(test) {
  test.pass("Date Module Test .....");

//   test.assertEqual(DateString.year(), 2011);
//   test.assertEqual(DateString.year(), "2011");

//   test.assertEqual(DateString.month(), "04");

//   test.assertEqual(DateString.day(), "23");

//   test.assertEqual(DateString.hour(), "2");

//   test.assertEqual(DateString.min(), "44");

//   var t = DateString.FlDate(new Date());
  //console.t.

  //DateString.testTrait();

  //let d = FlDate();
  let d = dateExt.DateExt();
  
  console.log(d.date);
};

