//
// @brief
// @author ongaeshi
// @date   2011/04/24
//
// Reference: CopyShort URL

var notify = require("notify");
const xhr = require("xhr");

// Setting
var SERVICE_URL = 'http://is.gd/api.php?longurl=%URL%';

// Create a short URL from is.gd, tinyurl, etc.
exports.createShortUrl = function(url) {
  let req = new xhr.XMLHttpRequest();

  req.open("GET", SERVICE_URL.replace('%URL%', encodeURIComponent(url)), false);
  req.send(null);
  if (req.status == 200) {
    notify.n("URL Shorten from is.gd.", url + ' --> ' + req.responseText);
    return req.responseText.trim();
  } else {
    notify.n('Error creating short URL.');
    return false;
  }
}





