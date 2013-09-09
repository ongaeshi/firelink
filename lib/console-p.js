// Dump#p (Mimics the Ruby Object#p for JavaScript.)
//
// Dump.p("Hello");                             #=> "Hello"
// Dump.p(1.5);                                 #=> 1.5
// Dump.p([1, [2, [3, 4, 5]], {a:"b", b:"c"}]); #=> [1, [2, [3, 4, 5]], {a:"b", b:"c"}]
// Dump.p(window);                              # これがまだ出来ない..
//

var Dump = {
  p: function(v) {
    console.log(this.inspect(v));
  },

  inspect: function(v) {
    if (this.is_array(v))
      return this.array_s(v);
    else if (typeof v == "object")
      return this.obj_s(v);
    else
      return this.v(v);
  },

  // --------------------------------------
  v: function(v) {
    if (typeof v == "string")
      v = '"' + v.replace(/\n/g, "\\n").replace(/\t/g, "\\t") + '"';

    return v;
  },

  obj_s: function(o) {
    var a = [];
    for(var i in o)
      a.push(i + ": "+ this.v(o[i]));
    return "{" + a.join(", ") + "}";
  },

  array_s: function(v) {
    var a = [];
    for (var i = 0; i < v.length; i++)
      a.push(this.inspect(v[i]));
    return "[" + a.join(", ") + "]";
  },

  // --------------------------------------
  is_array: function(v) { return Object.prototype.toString.call(v)=="[object Array]"; }

};

// a public.
console.p = function (v) { Dump.p(v); }
