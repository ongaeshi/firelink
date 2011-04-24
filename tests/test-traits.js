/* -*- tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim:set ts=2 sw=2 sts=2 et: */
//
// @brief  Firefox Add-on SDK traits test.
// @author ongaeshi
// @date   2011/04/23
// @url    https://jetpack.mozillalabs.com/sdk/1.0b4/docs/packages/api-utils/docs/traits.html

const { Trait } = require('traits');

const List = Trait.compose({
  // public API
  // constructor: function List() this._list = [], // bug1
  constructor: function List() {
    this._list = [];
  },
  get length() this._list.length,
  add: function add(item) this._list.push(item),
  remove: function remove(item) {
    let list = this._list;
    let index = list.indexOf(item);
    //if (0 <= index) list.slice(index, 1); // bug2
    if (0 <= index) list.splice(index, 1);
  },
  
  // private API:
  _list: null
});

const Range = List.resolve({
  constructor: null,
  add: '_add',
}).compose({
  min: null,
  max: null,
  get list() this._list.slice(0),
  constructor: function Range(min, max) {
    this.min = min;
    this.max = max;
    this._list = [];
  },
  add: function(item) {
    if (item <= this.max && item >= this.min)
      this._add(item)
  }
});

exports.test_test_run = function(test) {
  test.pass("Traits Test .....");

  let l1 = List();
  test.assertEqual(l1 instanceof List, true);      // true  
  test.assertEqual(l1.length, 0);

  l1.add("test");
  test.assertEqual(l1.length, 1);
  
  let l2 = new List();
  test.assertEqual(l2 instanceof List, true);      // true  
  test.assertEqual(l2.length, 0);
  l2.add("test");
  l2.add("test2");
  l2.add("test");
  l2.add("test3");
  test.assertEqual(l2.length, 4);
  l2.remove("test");
  l2.remove("test");
  test.assertEqual(l2.length, 2);

  let r = Range(0, 10);
  test.assertEqual(r.min, 0);   // 0
  test.assertEqual(r.max, 10);  // 10
  test.assertEqual(r.length, 0); // 0;
  r.add(5);
  test.assertEqual(r.length, 1); // 1
  r.add(12);
  test.assertEqual(r.length, 1); // 1 (12 was not in a range)

  // override test
  {
    // will compose trait with conflict property 'constructor'
    var ConstructableList = List.compose({
      constructor: function List() this._list = Array.slice(arguments)
    });
    // throws error with message 'Remaining conflicting property: constructor'
    test.assertRaises(function(){ConstructableList(1, 2, 3)}, /conflicting property/);
    
    // var ConstructableList = List.overridden({ // bug3
    var ConstructableList = List.override({  
      constructor: function List() this._list = Array.slice(arguments)
    });
    test.assertEqual(ConstructableList(1, 2, 3).length, 3);       // 3
  }

  // toString
  {
    const MyTrait = Trait.compose({
      constructor: function MyTrait() {
        // do your initialization here
      }
    });
    test.assertEqual(MyTrait().toString(), "[object MyTrait]");
    test.assertEqual(Range().toString(), "[object Range]");
  }

  // required
  {
    const Enumerable = Trait.compose({
      list: Trait.required, // listプロパティが無いクラスとはcompose出来ない
      forEach: function forEach(consumer) {
        return this.list.forEach(consumer);
      }
    });

    // Error: Missing required property: list
    test.assertRaises(function() {Enumerable();}, /Missing required property/);  
    
    const EnumerableList = List.compose({
      // get list: this._list.slice(0) // bug 5 
      get list() this._list.slice(0) 
    }, Enumerable);
    
    let c2 = EnumerableList();
    // bug 4 セミコロンが抜けてる
    c2.add('test');
    test.assertEqual(c2.length, 1); // 1
    test.assertEqual(c2.list[0], 'test'); // 'test'
    // c2.forEach(console.log);     // > ×info: 'test' → ○info: test 0 test
  }
};

