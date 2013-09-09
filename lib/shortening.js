// Reference: CopyShort URL

var notify = require("notify");
const xhr = require("xhr");

// Create a short URL from is.gd, tinyurl, etc.
exports.createShortUrl = function(url, shortening) {
  let req = new xhr.XMLHttpRequest();

  req.open("GET", shortening.replace('%URL%', encodeURIComponent(url)), false);
  req.send(null);
  if (req.status == 200) {
    //notify.n("URL Shorten from is.gd.", url + ' --> ' + req.responseText);
    return req.responseText.trim();
  } else {
    notify.n('Error creating short URL.');
    return url;
  }
}
