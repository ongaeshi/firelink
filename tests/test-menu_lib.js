//
// @brief
// @author ongaeshi
// @date   2011/04/29

const MenuLib = require("menu_lib");
const clipboard = require("clipboard");

exports.test_test_run = function(test) {
  test.pass("Test MenuLib .....");

  let item = {
    label: "test-menu_lib"
  };

  let action = {
    linkform: "[[%text%|%url%]]",
    item: item
  };

  let linkdata = {text: "TEXT",
                  title: "TITLE",
                  url: "http://www.example.jp"};
  
  MenuLib.redoLink(action, linkdata);
  test.assertEqual("[[TEXT|http://www.example.jp]]", clipboard.get());
  
  MenuLib.changeLinkform(action, linkdata);
  test.assertEqual("[[TEXT|http://www.example.jp]]", clipboard.get());
  
  MenuLib.copyTabs(action, linkdata);
};

