'use strict'

// for any object, the object.proto.to-code will always be called firstly,
// in the default to-code, the object.to-code will be called.
// the same for the constructor: to ensure the instance will always be returned.
// for object:
//  - anything defined in type cannot be overridden in instance
//  - object.proto.* will allow the overridden and ensure the consistency and type safe.

var createIndex = function () {
  var index = new Map()
  return {
    get: index.get.bind(index),
    set: function (key, value) {
      index.set(key, value)
      return value
    },
    add: function (key, value) {
      index.set(key, value)
      return value
    }
  }
}

module.exports = function encodingIn ($void) {
  var $ = $void.$
  var $Tuple = $.tuple
  var $Array = $.array
  var $Object = $.object
  var $Symbol = $.symbol
  var Tuple$ = $void.Tuple
  var Symbol$ = $void.Symbol
  var isObject = $void.isObject
  var thisCall = $void.thisCall
  var sharedSymbolOf = $void.sharedSymbolOf

  var symbolLocals = sharedSymbolOf('_')
  var symbolObject = sharedSymbolOf('object')
  var symbolClass = sharedSymbolOf('class')
  var symbolAppend = sharedSymbolOf('append')
  var symbolAssign = sharedSymbolOf('assign')
  var symbolAttach = sharedSymbolOf('attach')

  var normalize = function (type) {
    type = type['to-code']()
    return type === $Symbol.empty ? symbolObject : type
  }
  var createInst = function (type) {
    return type === $Array ? $Tuple.array
      : type === $Object || (type = normalize(type)) === symbolObject
        ? $Tuple.object
        : new Tuple$([$Symbol.literal, $Symbol.pairing, type])
  }
  var updateInst = function (ref, type, code) {
    // remove unnecessary activation for data entity.
    var items = code.$
    if (items.length > 2 && items[0] === $Symbol.literal &&
      items[1] === $Symbol.pairing && (items[2] instanceof Symbol$)
    ) {
      var cls = items[2].key
      if (cls !== 'array' && cls !== 'object' && cls !== 'class') {
        items.length > 3 ? items.splice(1, 2) : items.splice(2, 1)
      }
    }
    return type === $Array
      ? new Tuple$([ref, symbolAppend, code])
      : type === $Object || (type = normalize(type)) === symbolObject
        ? new Tuple$([symbolObject, symbolAssign, ref, code])
        : new Tuple$([symbolClass, symbolAttach, ref, code])
  }

  $void.EncodingContext = function (root, printing) {
    this.objects = createIndex()
    this.objects.add(this.root = root, null)
    this.clist = []
    this.shared = []
    this.printing = printing
  }
  $void.EncodingContext.prototype = {
    _createRef: function (offset) {
      var ref = new Tuple$([symbolLocals, this.shared.length])
      this.shared.push(offset)
      return ref
    },
    begin: function (obj) {
      var offset = this.objects.get(obj)
      if (typeof offset === 'undefined') { // first touch
        return this.objects.add(obj, null)
      }
      var ref
      if (offset === null) { // to be recursively reused.
        offset = this.clist.length
        ref = this._createRef(offset)
        this.objects.set(obj, offset)
        this.clist.push([ref, null, null])
        return ref
      }
      var record = this.clist[offset]
      ref = record[0]
      if (!ref) { // to be reused.
        ref = record[0] = this._createRef(offset)
        var code = record[2]
        var newCode = new Tuple$(code.$) // copy code of value.
        code.$ = ref.$ // update original code from value to ref.
        record[2] = newCode // save the new code of value.
      }
      return ref
    },
    encode: function (obj) {
      return typeof obj === 'undefined' || obj === null ? null
        : typeof obj === 'number' || typeof obj === 'string' ? obj
          : (Array.isArray(obj) || isObject(obj))
            ? thisCall(obj, 'to-code', this)
            : thisCall(obj, 'to-code')
    },
    end: function (obj, type, code) {
      // try to supplement type to code
      if (type !== $Array && type !== $Object && type.name) {
        if (code.$[1] !== $Symbol.pairing) {
          code.$.splice(1, 0, $Symbol.pairing, sharedSymbolOf(type.name))
        } else if (code.$.length < 3) {
          code.$.splice(2, 0, sharedSymbolOf(type.name))
        }
      }
      // assert(code instanceof Tuple$)
      var offset = this.objects.get(obj)
      // assert(typeof offset !== 'undefined')
      if (offset === null) {
        offset = this.clist.length
        this.objects.set(obj, offset)
        this.clist.push([null, type, code])
        return obj === this.root ? this._finalize(offset) : code
      }
      // recursive reference
      var record = this.clist[offset]
      record[1] = type
      record[2] = code
      return obj === this.root ? this._finalize(offset) : record[0]
    },
    _finalize: function (rootOffset) {
      if (this.shared.length < 1) {
        // no circular or shared array/object.
        return this.clist[rootOffset][2]
      }
      var args = [$Symbol.literal] // (@ ...)
      var body = [new Tuple$([ // (local _ args) ...
        $Symbol.local, symbolLocals, new Tuple$(args)
      ])]
      var root
      for (var i = 0; i < this.shared.length; i++) {
        var offset = this.shared[i]
        var record = this.clist[offset]
        args.push(createInst(record[1]))
        offset === rootOffset
          ? (root = updateInst.apply(null, record))
          : body.push(updateInst.apply(null, record))
      }
      body.push(root || this.clist[rootOffset][2])
      return new Tuple$([ // (=>:() (local _ (@ ...)) ...)
        $Symbol.function, $Symbol.pairing, $Tuple.empty, new Tuple$(body, true)
      ])
    }
  }
}
