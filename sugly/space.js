'use strict'

require('./polyfill')

var JS = global || window

function exportTo (container, name, obj) {
  if (typeof obj === 'object' || typeof obj === 'function') {
    if (!obj.identityName) {
      var owner = container.identityName
      obj.identityName = '(' + owner + ' "' + name + '")'
    }
  }

  container[name] = obj
  return obj
}

function exportJSFunction (container, name, func) {
  if (!func) {
    func = JS[name]
  }
  exportTo(container, name, function () {
    return func.apply(null, arguments)
  })
}

function exportFunction (container, name, owner, func) {
  exportTo(container, name, function () {
    return func.apply(owner, arguments)
  })
}

function copyJSObject (name, jsObject) {
  var copied = {}
  copied.identityName = '($"' + name + '")'

  var keys = Object.getOwnPropertyNames(jsObject)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var prop = jsObject[key]
    if (typeof prop === 'function') {
      exportFunction(copied, key, jsObject, prop)
    } else {
      copied[key] = prop
    }
  }
  return copied
}

function exportSymbol () {
  var $Symbol = require('./symbol')()
  $Symbol.identityName = '($"Symbol")'

  $Symbol.for.identityName = '(Symbol "for")'
  $Symbol.keyFor.identityName = '(Symbol "keyFor")'
  $Symbol.isKey.identityName = '(Symbol "isKey")'
  $Symbol.is.identityName = '(Symbol "is")'

  return $Symbol
}

function exportNumber () {
  var $Number = {}
  $Number.identityName = '($"Number")'

  $Number.NaN = JS.NaN
  $Number.Infinity = JS.Infinity

  $Number.MAX_VALUE = Number.MAX_VALUE
  $Number.MIN_VALUE = Number.MIN_VALUE

  $Number.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || (Math.pow(2, 53) - 1)
  $Number.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -(Math.pow(2, 53) - 1)

  $Number.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY
  $Number.POSITIVE_INFINITY = Number.POSITIVE_INFINITY

  exportTo($Number, 'isFinite', function Number$isFinite (value) {
    return typeof value === 'number' ? JS.isFinite(value) : false
  })
  exportTo($Number, 'isNaN', function Number$isNaN (value) {
    return typeof value === 'number' ? JS.isNaN(value) : true
  })

  exportTo($Number, 'isInteger', Number.isInteger ? function Number$isInteger (value) {
    return Number.isInteger(value)
  } : function Number$isInteger (value) {
    return typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value
  })
  exportTo($Number, 'isSafeInteger', Number.isSafeInteger ? function Number$isSafeInteger (value) {
    return Number.isSafeInteger(value)
  } : function Number$isSafeInteger (value) {
    return $Number.isInteger(value) && Math.abs(value) <= $Number.MAX_SAFE_INTEGER
  })

  exportTo($Number, 'parseFloat', function Number$parseFloat (value) {
    return typeof value === 'undefined' || value === null ? 0 : JS.parseFloat(value)
  })
  exportTo($Number, 'parseInt', function Number$parseInt (value, radix) {
    return typeof value === 'undefined' || value === null ? 0 : JS.parseInt(value, radix)
  })

  return $Number
}

function exportDate () {
  var $Date = {}
  $Date.identityName = '($"Date")'

  exportTo($Date, 'now', function Date$now () {
    return new Date()
  })
  exportTo($Date, 'getTime', Date.now ? function Date$time () {
    return Date.now()
  } : function Date$time () {
    return new Date().getTime()
  })
  exportTo($Date, 'parse', function Date$parse (value) {
    return typeof value !== 'string' ? new Date(0) : new Date(value)
  })
  exportTo($Date, 'utc', function Date$utc () {
    return new Date(Date.UTC.apply(Date, arguments))
  })

  return $Date
}

function exportArray () {
  var $Array = {}
  $Array.identityName = '($"Array")'

  exportTo($Array, 'of', function Array$of () {
    var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
    var result = []
    for (var i = 0; i < args.length; i++) {
      var item = args[i]
      if (Array.isArray(item)) {
        result.push.apply(result, item)
      } else {
        result.push(item)
      }
    }
    return result
  })

  return $Array
}

function exportBitwiseOperators () {
  var Bit = {}
  Bit.identityName = '($"Bit")'

  exportTo(Bit, 'and', function Bit$and (left, right) {
    if (!Number.isInteger(left)) {
      left = 0
    }
    if (!Number.isInteger(right)) {
      right = 0
    }
    return left & right
  })

  exportTo(Bit, 'or', function Bit$or (left, right) {
    if (!Number.isInteger(left)) {
      left = 0
    }
    if (!Number.isInteger(right)) {
      right = 0
    }
    return left | right
  })

  exportTo(Bit, 'xor', function Bit$xor (left, right) {
    if (!Number.isInteger(left)) {
      left = 0
    }
    if (!Number.isInteger(right)) {
      right = 0
    }
    return left ^ right
  })

  exportTo(Bit, 'not', function Bit$not (bits) {
    if (!Number.isInteger(bits)) {
      bits = 0
    }
    return ~bits
  })

  exportTo(Bit, 'lshift', function Bit$lshift (bits, offset) {
    if (!Number.isInteger(bits)) {
      bits = 0
    }
    return bits << offset
  })

  exportTo(Bit, 'rshift', function Bit$lshift (bits, offset) {
    if (!Number.isInteger(bits)) {
      bits = 0
    }
    return bits >> offset
  })

  exportTo(Bit, 'zrshift', function Bit$lshift (bits, offset) {
    if (!Number.isInteger(bits)) {
      bits = 0
    }
    return bits >>> offset
  })

  return Bit
}

function exportUriFunctions () {
  var Uri = {}
  Uri.identityName = '($"Uri")'

  exportJSFunction(Uri, 'encode', JS.encodeURI)
  exportJSFunction(Uri, 'encodeComponent', JS.encodeURIComponent)
  exportJSFunction(Uri, 'decode', JS.decodeURI)
  exportJSFunction(Uri, 'decodeComponent', JS.decodeURIComponent)

  return Uri
}

function initializeSpace ($) {
  exportTo($, 'Bool', {}) // reserve Bool
  exportTo($, 'bool', function $bool (value) {
    return typeof value !== 'undefined' && value !== false && value !== null && value !== 0
  })

  exportTo($, 'String', {}) // reserve String
  exportTo($, 'string', function $string () {
    var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
    var str = ''
    for (var i = 0; i < args.length; i++) {
      var value = args[i]
      if (typeof value === 'string') {
        str += value
      } else {
        str += (str.length > 0 ? ' ' : '') + $.encode.value(value)
      }
    }
    return str
  })
  exportTo($, 'stringOfChars', function $stringOfChars () {
    return String.fromCharCode.apply(String, arguments)
  })

  exportTo($, 'Symbol', exportSymbol())
  exportTo($, 'symbol', function $symbol (key) {
    return $.Symbol.for(key)
  })

  exportTo($, 'Number', exportNumber())
  exportTo($, 'number', function $number (value) {
    if (typeof value === 'string') {
      return parseFloat(value)
    }
    if (typeof value === 'number') {
      return value
    }
    return typeof value === 'undefined' || value === null ? 0 : NaN
  })

  exportTo($, 'Object', {}) // reserve Object
  exportTo($, 'object', function $object (prototype) {
    if (typeof prototype !== 'object' || prototype === null) {
      prototype = Object.prototype
    }

    var obj = Object.create(prototype)
    if (arguments.length > 1) {
      var args = [obj]
      args.push.apply(args, Array.prototype.slice.call(arguments, 1))
      Object.assign.apply(Object, args)
    }
    return obj
  })

  exportTo($, 'Function', {}) // reserve Function

  exportTo($, 'Date', exportDate())
  exportTo($, 'date', function $date () {
    var args = [null]
    args.push.apply(args, arguments)
    return new (Date.bind.apply(Date, args))
  })

  exportTo($, 'Array', exportArray())
  exportTo($, 'array', function $array () {
    return arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
  })

  exportTo($, 'range', require('./range'))
  exportTo($, 'iterate', require('./iterate'))
  exportTo($, 'isEmpty', function (obj) { // TODO - to be refined.
    if (typeof obj === 'undefined' || obj === null) {
      return true
    }
    if (typeof obj.length === 'number') {
      return obj.length < 1
    }
    if (typeof obj.size === 'number') {
      return obj.size < 1
    }
    if (typeof obj === 'object') {
      return Object.getOwnPropertyNames(obj).length < 1
    }
    return obj === 0 || obj === false
  })
  exportTo($, 'isNotEmpty', function (obj) {
    return !$.isEmpty(obj)
  })

  exportTo($, 'Bit', exportBitwiseOperators())
  exportTo($, 'Uri', exportUriFunctions())
  exportTo($, 'Math', copyJSObject('Math', JS.Math))
  exportTo($, 'Json', copyJSObject('Json', JS.JSON))
}

module.exports = function (output) {
  var $ = Object.create(null)
  $.identityName = '$'

  // meta information
  var sugly = exportTo($, 'Sugly', {})
  exportTo(sugly, 'runtime', 'js')
  exportTo(sugly, 'version', '0.0.1')
  exportTo(sugly, 'isDebugging', true)

  // import objects from JS environment
  initializeSpace($)

  // compile a piece of code to program/clauses: [[]].
  exportTo($, 'compile', function (code, src) {
    return require('./compiler')($)(code, src)
  })

  // encode function factory
  exportTo($, 'encoder', require('./encoder'))

  // default encode function
  exportTo($, 'encode', require('./encoder')($, true))

  // default output function. depending on $.encode
  exportTo($, 'print', require('./print')($, output))

  // this is only used by runtime itself or its assembler
  $.$export = function (name, obj) {
    exportTo(this, name, obj)
  }

  // placeholder function of $load.
  // Since $load is expected to return a piece of code, it should always
  // return a piece of code.
  var load = exportTo($, 'load', function $load (source, cb) {
    $.print.warn('An implementation of $load should be assembled to sugly.')
    return typeof cb === 'function' ? cb('()') : '()'
  })
  exportTo(load, 'normalize', function $load$normalize (source) {
    return source
  })

  return $
}
