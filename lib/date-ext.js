//
// @brief
// @author ongaeshi
// @date   2011/04/24

const { Trait } = require("traits");

const DateExt = Trait.compose({
  // public API
  constructor: function DateExt(date) {
    if (date == null)
      this._date = new Date();
    else
      this._date = date;
  },
  
  get date() this._date,

  // private API:
  _date: null
});
exports.DateExt = function(options) DateExt(options);
exports.DateExt.prototype = DateExt.prototype;








