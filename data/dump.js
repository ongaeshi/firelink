//
// @brief Dump#p (Mimics the Ruby Object#p for JavaScript.)
// @author ongaeshi
// @date   2011/10/09
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
    if (this.is_range(v))
      return this.range_s(v);
    if (this.is_dom(v))
      return this.dom_s(v);
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

  is_array: function(v) {
    return Object.prototype.toString.call(v)=="[object Array]";
  },

  array_s: function(v) {
    var a = [];
    for (var i = 0; i < v.length; i++)
      a.push(this.inspect(v[i]));
    return "[" + a.join(", ") + "]";
  },

  is_dom: function(v) {
    if ((v && typeof(v.nodeType) == 'number') || v === null) {
      if (v.nodeType && v.nodeName && v.appendChild)
        return true;
    }
    return false;
  },

  dom_s: function(v) {
    return this.obj_s({
      attributes: v.attributes,
      baseURI: v.baseURI,
      childNodes: v.childNodes,
       firstChild: v.firstChild,
       lastChild: v.lastChild,
       localName: v.localName,
       namespaceURI: v.namespaceURI,
       nextSibling: v.nextSibling,
      nodeName: v.nodeName,
      // nodePrincipal: v.nodePrincipal, // Need UniversalXPConnect privileges.
      nodeType: v.nodeType,
      nodeValue: v.nodeValue,
      ownerDocument: v.ownerDocument,
      parentNode: v.parentNode,
      prefix: v.prefix,
      previousSibling: v.previousSibling,
      textContent: v.textContent
    });
  },

  is_range: function(v) {
    return v.startContainer !== undefined && v.startOffset  !== undefined && v.endContainer  !== undefined && v.endOffset !== undefined;
  },

  range_s: function(v) {
    return this.obj_s({
      startContainer: this.inspect(v.startContainer),
      startOffset: v.startOffset,
      endContainer: this.inspect(v.endContainer),
      endOffset: v.endOffset,
    });
  }
};

