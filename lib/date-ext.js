function formatNum(keta, num) {
  var src = new String(num);
  var cnt = keta - src.length;
  if (cnt <= 0) return src;
  while (cnt-- > 0) src = "0" + src; return src;
};

DateExt =  function (date) {

    if(date) { 
        this._date = date;
    } else {
        this._date = new Date();
    }

    this.raw = function() {
        return this._date; 
    };

    this.year = function() { return this._date.getFullYear(); };
    this.month = function () { return this._date.getMonth() + 1; };
    this.day = function() { return this._date.getDate(); };
    this.hour = function() { return this._date.getHours(); };
    this.min = function() { return this._date.getMinutes(); };
    this.Month = function() { return formatNum(2, this.month); };
    this.Day = function() { return formatNum(2, this.day); };
    this.Hour = function() { return formatNum(2, this.hour); };
    this.Min = function() { return formatNum(2, this.min); };

    this.to_s_date = function() {
        return this.year  + "/" + this.Month + "/" + this.Day;
    };

    this.to_s_Date = function() {
        return this.year  + "-" + this.Month + "-" + this.Day;
    };

    this.to_s_dateTime = function() {
        return this.year  + "/" + this.Month + "/" + this.Day + " " + this.Hour + " =" + this.Min;
    };

    this.to_s_DateTime = function() {
        return this.year  + "-" + this.Month + "-" + this.Day + " " + this.Hour + ":" + this.Min;
    };
};

exports.DateExt = DateExt;
