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
  
  fl.copyLinkAndNotify("DUMMY", "%text%\\n%url%", linkdata);
  test.assertEqual("YAAOO!! JIPAN\nhttp://www.example.jp", clipboard.get());

  fl.copyLinkAndNotify("DUMMY2", "<a href=\"%url%\">%text%</a>", linkdata);
  test.assertEqual("<a href=\"http://www.example.jp\">YAAOO!! JIPAN</a>", clipboard.get());
}

function test_createText(test) {
  let linkform = "%text%\\n%url%";
  let linkdata = {text: "aaa\nbbb\nccc", title: "", url: "http://www.example.jp"};
  
  test.assertEqual("aaa bbb ccc\nhttp://www.example.jp", fl.createText(linkform, linkdata));

  linkform = "%text%\\n%wikiname%";
  test.assertEqual("aaa bbb ccc\nwww.example.jp", fl.createText(linkform, linkdata)); // 微妙な感じだが害はないので

  linkform = "%text%\\n%wikiname%";
  linkdata = {text: "aaa\nbbb\nccc", title: "", url: "http://www.example.jp/example.dat"};
  test.assertEqual("aaa bbb ccc\nexample.dat", fl.createText(linkform, linkdata));

  linkform = "[[%wikiname%|%text%]]";
  linkdata = {text: "世界遺産 - Wikipedia", title: "", url: "http://ja.wikipedia.org/wiki/%E4%B8%96%E7%95%8C%E9%81%BA%E7%94%A3"};
  test.assertEqual("[[世界遺産|世界遺産 - Wikipedia]]", fl.createText(linkform, linkdata));

  linkform = "[[%wikiname%]]";
  test.assertEqual("[[世界遺産]]", fl.createText(linkform, linkdata));

  linkform = "[[%text%>%wikiname%]]";
  linkdata = {text:"動作実績タイトル", title:"動作実績", url:"http://pukiwiki.cafelounge.net/plus/?%E5%8B%95%E4%BD%9C%E5%AE%9F%E7%B8%BE"};
  test.assertEqual("[[動作実績タイトル>動作実績]]", fl.createText(linkform, linkdata));

  // @todo 何とかしたいのだが、このようにURLとWikiNameの境目が分からないものは無理 (例: MediaWiki)
  //   linkform = "[[%text%>%wikiname%]]";
  //   linkdata = {text:"Title", title:"", url:"http://www.mediawiki.org/MediaWiki/ja"};
  //   test.assertEqual("[[Title>MediaWiki/ja]]", fl.createText(linkform, linkdata));

  linkform = "[[%text%>%wikiname%]]";
  linkdata = {text:"Title", title:"", url:"http://www.mediawiki.org/index.php?ページ名"};
  test.assertEqual("[[Title>ページ名]]", fl.createText(linkform, linkdata));

  linkform = "[[%text%>%wikiname%]]";
  linkdata = {text:"PukiWiki/メーリングリスト - PukiWiki-official", title:"PukiWiki/メーリングリスト - PukiWiki-official", url:"http://pukiwiki.sourceforge.jp/?PukiWiki%2F%E3%83%A1%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%AA%E3%82%B9%E3%83%88"};
  test.assertEqual("[[PukiWiki/メーリングリスト - PukiWiki-official>PukiWiki/メーリングリスト]]", fl.createText(linkform, linkdata));

  linkform = "[[%text%>%wikiname%]]";
  linkdata = {text:"ネットワークプリンタ", title:"ネットワークプリンタ", url:"http://example.com/index.php?%A5%CD%A5%C3%A5%C8%A5%EF%A1%BC%A5%AF%A5%C6%A5%B9%A5%C8"};
  // 今の所、EUC-JPはエンコードに失敗する
  test.assertEqual("[[ネットワークプリンタ>%A5%CD%A5%C3%A5%C8%A5%EF%A1%BC%A5%AF%A5%C6%A5%B9%A5%C8]]", fl.createText(linkform, linkdata));

  linkform = "[[%text%>%wikiname%]]";
  linkdata = {text:"おんがえしの日記/2011/06", title:"おんがえしの日記/2011/06", url:"http://example.com/pukiwiki/index.php?%E3%81%8A%E3%82%93%E3%81%8C%E3%81%88%E3%81%97%E3%81%AE%E6%97%A5%E8%A8%98%2F2011%2F06#entry20110607"};
  test.assertEqual("[[おんがえしの日記/2011/06>おんがえしの日記/2011/06#entry20110607]]", fl.createText(linkform, linkdata));
}

exports.test_test_run = function(test) {
  test.pass("Test FireLink Lib .....");
  test_parseDate(test);
  test_isgd(test);
  test_copyLinkAndNotify(test);
  
  // -- 展開 --
  // fl.changeLinkform("%text% %url%");
  // test.assertEqual(1, fl.currentIndex());

  fl.changeLinkform("fake");    // 見つからない
  test.assertEqual(0, fl.currentIndex());

  fl.changeLinkform("[[%text%|%url%]]");
  test.assertEqual(5, fl.currentIndex());

  // 
  test_createText(test);

  // json2Text
  {
    let json = [
      {name:"PlainText",   format:"%text%\\n%url%"},
      {name:"HTML",        format:"<a href=\"%url%\">%text%</a>"},
      {name:"Twitter",     format:"%text% %isgd%"},
      {name:"TiddlyWiki",  format:"[[%text%|%url%]]"}
    ];

    let text =
      "PlainText\t%text%\\n%url%\n" +
      "HTML\t<a href=\"%url%\">%text%</a>\n" +
      "Twitter\t%text% %isgd%\n" +
      "TiddlyWiki\t[[%text%|%url%]]\n";

    test.assertEqual(fl.json2Text(json), text);
    test.assertEqual(JSON.stringify(fl.text2JSON(text)), JSON.stringify(json));
  }

  // patten2
  {
    let json = [
      {name:"HTML",        format:"<a href=\"%url%\">%text%</a>"},
      {name:"PlainText",   format:"%text%\\n%url%"},
    ];

    let text =
      "HTML\t<a href=\"%url%\">%text%</a>\n" + 
      "PlainText\t%text%\\n%url%\n";

    test.assertEqual(JSON.stringify(fl.text2JSON(text)), JSON.stringify(json));
  }

  // test
  test.assertEqual(fl.addPrefix("hoge", 0), "(1) hoge");
  test.assertEqual(fl.addPrefix("hoge", 1), "(2) hoge");
  test.assertEqual(fl.addPrefix("hoge", 2), "(3) hoge");
  test.assertEqual(fl.addPrefix("hoge", 8), "(9) hoge");
  test.assertEqual(fl.addPrefix("hoge", 9), "(0) hoge");
  test.assertEqual(fl.addPrefix("hoge", 15), "hoge");

  // equalHash
  test.assert(fl.equalHash({a:"a", b:"b"}, {a:"a", b:"b"}));
  test.assert(!fl.equalHash({a:"a", b:"b"}, {a:"a", b:"b", c:"c"}));
  test.assert(fl.equalHash({c:"c", a:"a", b:"b"}, {a:"a", b:"b", c:"c"}));
  test.assert(!fl.equalHash({a:"a", b:"b", c:"c"}, {a:"a", b:"b"}));
  test.assert(!fl.equalHash({c:"c", a:"aa", b:"b"}, {a:"a", b:"b", c:"c"}));

  // equalHashArray
  let a = [
    {a:"a", b:"b"},
    {a:"a", b:"b", c:"c"},
  ];
  
  let b = [
    {a:"a", b:"b"},
    {a:"a", b:"b", c:"c"},
  ];

  let c = [
    {a:"a", b:"b", c:"c"},
    {a:"a", b:"b"},
  ];

  test.assert(fl.equalHashArray(a, b));
  test.assert(!fl.equalHashArray(a, c));
};

