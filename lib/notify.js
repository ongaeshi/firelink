//
// @file 
// @brief  firefox4 debug display. (Log and Growl)
// @author ongaeshi
// @date   2011/01/09
//
// ---------------------------------
// @sample
//
// var notify = require("notify");
//
// function display_url(url) {
//   notify.n("URL : " + url);
//   notify.n("Debug", "URL : " + url);
//   notify.nl("URL : " + url);
//   notify.nl("Debug With Log", "URL : " + url);
// }
// ---------------------------------

var notifications = require("notifications");

exports.n = function (title, text) {
  notifications.notify({
    title: title,
    text: text,
  });
}

exports.nl = function (title, text) {
  exports.n(title, text);

  if (text == null)
    console.log(title);
  else
    console.log("[" + title + "] " + text);
}
