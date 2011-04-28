//
// @brief
// @author ongaeshi
// @date   2011/04/29

const main = require("main");
const MenuLib = require("menu_lib");
const tabs = require("tabs");

function test_copyTabs(test) {
  let defaultLinkformData = [
    {name:"PlainText",   format:"%text%\\n%url%"},
    {name:"HTML",        format:"<a href=\"%url%\">%text%</a>"},
    {name:"Twitter",     format:"%text% %isgd%"},
    {name:"TiddlyWiki",  format:"[[%text%|%url%]]"}
  ];

  let item = {
    label: "DUMMY LABEL",
  }

  let action = {
    linkform: defaultLinkformData[0].format,
    item: item,
  }

  let linkdata = {text: "YAAOO!! JIPAN",
                  title: "YAAOO!! JIPAN",
                  url: "http://www.example.jp"};
  
  //MenuLib.createLink(action, linkdata);
  MenuLib.copyTabs(action, linkdata);
}

function tab_open(test, url, callback) {
  tabs.open({
    url: url,
    onReady: function(tab) {
//       test.assertEqual(tab.url, url);
      test.done();
      callback(test);
    }
  });
  test.waitUntilDone(200000);
}

exports.test_test_run = function(test) {
  test.pass("Main Test");

  main.main();
  tab_open(test, "http://www.google.com/", test_copyTabs);
}

// exports.test_test_run = function(test) {
//   test.pass("Unit test running!");
// };

// exports.test_id = function(test) {
//   test.assert(require("self").id.length > 0);
// };

// exports.test_url = function(test) {
//   require("request").Request({
//     url: "http://www.mozilla.org/",
//     onComplete: function(response) {
//       test.assertEqual(response.statusText, "OK");
//       test.done();
//     }
//   }).get();
//   test.waitUntilDone(20000);
// };

// exports.test_open_tab = function(test) {
//   const tabs = require("tabs");
//   tabs.open({
//     url: "http://ongaeshi.me/",
//     onReady: function(tab) {
//       test.assertEqual(tab.url, "http://ongaeshi.me/");
//       test.done();
//     }
//   });
//   test.waitUntilDone(20000);
// };
