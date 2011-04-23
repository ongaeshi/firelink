//
// @brief
// @author ongaeshi
// @date   2011/04/24

//const notify = require("simple-notify").notify;
const prefs = require("preferences-service");
const xhr = require("xhr");

// Preferences
serviceurl_pref = 'extensions.copyshorturl.serviceURL';
serviceurl_default = 'http://is.gd/api.php?longurl=%URL%';

/** Create a short URL from is.gd, tinyurl, etc. */
exports.createShortUrl = function(url) {
  let req = new xhr.XMLHttpRequest();

  req.open("GET", prefs.get(serviceurl_pref, serviceurl_default).replace(
    '%URL%', encodeURIComponent(url)), false);
  req.send(null);
  if (req.status == 200) {
    //         notify("No short URL found. Created alternative URL instead:\n" +
    //                url + ' --> ' + req.responseText);
    return req.responseText.trim();
  } else {
    //        notify('ZOMG, error creating short URL.');
    return false;
  }
}





