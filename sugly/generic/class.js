'use strict'

module.exports = function ($void) {
  var $ = $void.$
  var Type = $.class
  var $Type = $.type
  var $Tuple = $.tuple
  var $Symbol = $.symbol
  var $Object = $.object
  var link = $void.link
  var Tuple$ = $void.Tuple
  var Symbol$ = $void.Symbol
  var ClassType$ = $void.ClassType
  var ClassInst$ = $void.ClassInst
  var isObject = $void.isObject
  var thisCall = $void.thisCall
  var boolValueOf = $void.boolValueOf
  var createClass = $void.createClass
  var isApplicable = $void.isApplicable
  var ownsProperty = $void.ownsProperty
  var sharedSymbolOf = $void.sharedSymbolOf
  var EncodingContext$ = $void.EncodingContext

  // initialize the meta class.
  link(Type, 'empty', createClass)

  // define a class by classes and/or class descriptors.
  link(Type, 'of', function () {
    return as.apply(createClass(), arguments)
  })

  // copy fields from source objects to the target class instance or an object.
  var objectAssign = $Object.assign
  link(Type, 'attach', function (target) {
    if (target instanceof ClassInst$) {
      for (var i = 1; i < arguments.length; i++) {
        var src = arguments[i]
        if (isObject(src)) {
          Object.assign(target, src)
          activate.call(target, src)
        }
      }
      return target
    }
    // fallback to object assign for the class may not exist on target context.
    return objectAssign.apply($Object, arguments)
  })

  // the prototype of classes
  var proto = Type.proto

  // generate an empty instance.
  link(proto, 'empty', function () {
    return Object.create(this.proto)
  })

  // generate an instance without arguments.
  link(proto, 'default', function () {
    return construct.call(Object.create(this.proto))
  })

  // static construction: create an instance by arguments.
  link(proto, 'of', function () {
    return construct.apply(Object.create(this.proto), arguments)
  })

  // static activation: restore an instance by one or more property set.
  link(proto, 'from', function () {
    var inst = Object.create(this.proto)
    for (var i = 0; i < arguments.length; i++) {
      var src = arguments[i]
      if (isObject(src)) {
        Object.assign(inst, src)
        activate.call(inst, src)
      }
    }
    return inst
  })

  // make this class to act as other classes and/or class descriptors.
  var as = link(proto, 'as', function () {
    var type_ = Object.create(null)
    var proto_ = Object.create(null)
    for (var i = arguments.length - 1; i >= 0; i--) {
      var src = arguments[i]
      var t, p
      if (src instanceof ClassType$) {
        t = src
        p = src.proto
      } else if (isObject(src)) {
        p = src
        t = isObject(src.type) ? src.type : {}
      } else {
        t = {}; p = {}
      }
      var j, key
      var names = Object.getOwnPropertyNames(t)
      for (j = 0; j < names.length; j++) {
        key = names[j]
        if (typeof this[key] === 'undefined' || key === 'name') {
          type_[key] = t[key]
        }
      }
      names = Object.getOwnPropertyNames(p)
      for (j = 0; j < names.length; j++) {
        key = names[j]
        if (key !== 'type' && key !== 'static' && !ownsProperty(this.proto, key)) {
          proto_[key] = p[key]
        }
      }
    }
    Object.assign(this, type_)
    Object.assign(this.proto, proto_)
    return this
  })

  // Convert this class's definition to a type descriptor object.
  var toObject = link(proto, 'to-object', function () {
    var typeDef = $Object.empty()
    var names = Object.getOwnPropertyNames(this.proto)
    var i, name
    for (i = 0; i < names.length; i++) {
      name = names[i]
      if (name !== 'type') {
        typeDef[name] = this.proto[name]
      }
    }
    var typeStatic = $Object.empty()
    var hasStatic = false
    names = Object.getOwnPropertyNames(this)
    for (i = 0; i < names.length; i++) {
      name = names[i]
      if (name !== 'proto') {
        typeStatic[name] = this[name]
        hasStatic = true
      }
    }
    hasStatic && (typeDef.type = typeStatic)
    return typeDef
  })

  // Type Verification: a class is a class and a type.
  link(proto, 'is-a', function (type) {
    return type === Type || type === $Type
  })
  link(proto, 'is-not-a', function (type) {
    return type !== Type && type !== $Type
  })

  // Emptiness: shared by all classes.
  link(proto, 'is-empty', function () {
    return !(Object.getOwnPropertyNames(this.proto).length > 1) && !(
      Object.getOwnPropertyNames(this).length > (
        ownsProperty(this, 'name') ? 2 : 1
      )
    )
  })
  link(proto, 'not-empty', function () {
    return Object.getOwnPropertyNames(this.proto).length > 1 || (
      Object.getOwnPropertyNames(this).length > (
        ownsProperty(this, 'name') ? 2 : 1
      )
    )
  })

  // Encoding
  var protoToCode = link(proto, 'to-code', function () {
    return typeof this.name === 'string' && this.name
      ? sharedSymbolOf(this.name.trim()) : $Symbol.empty
  })

  // Description
  var symbolClass = sharedSymbolOf('class')
  var symbolOf = sharedSymbolOf('of')
  var objectToCode = $Object.proto['to-code']
  var tupleToString = $Tuple.proto['to-string']
  link(proto, 'to-string', function () {
    var code = protoToCode.call(this)
    if (code !== $Symbol.empty) {
      return thisCall(code, 'to-string')
    }
    code = objectToCode.call(toObject.call(this))
    if (code.$[0] === $Symbol.object) {
      code.$[1] === $Symbol.pairing ? code.$.splice(2, 0, symbolClass)
        : code.$.splice(1, 0, $Symbol.pairing, symbolClass)
    } else {
      code = new Tuple$([symbolClass, symbolOf, code])
    }
    return tupleToString.call(code)
  })

  var classIndexer = link(proto, ':', function (index, value) {
    var name = typeof index === 'string' ? index
      : index instanceof Symbol$ ? index.key : ''
    return name === 'proto' ? this.objectify()
      : typeof proto[name] !== 'undefined' ? this[name]
        : typeof value === 'undefined' ? this[name]
          : (this[name] = value) // allow to add new class properties directly.
  })

  // export class indexer.
  link(Type, 'indexer', classIndexer)

  // the prototype of class instances
  var instance = proto.proto

  // root instance constructor
  var construct = link(instance, 'constructor', function () {
    if (this.constructor !== construct) {
      this.constructor.apply(this, arguments)
    } else { // behave like (object assign this ...)
      var args = [this]
      args.push.apply(args, arguments)
      $Object.assign.apply($Object, args)
    }
    return this
  })

  // root instance activator: accept a plain object and apply the activator logic too.
  var activate = link(instance, 'activator', function (source) {
    if (this.activator !== activate) {
      this.activator(source)
    }
    return this
  })

  // Enable the customization of Identity.
  var is = link(instance, ['is', '==='], function (another) {
    return (this === another) || (
      this.is !== is && isApplicable(this.is) && boolValueOf(this.is(another))
    )
  })
  link(instance, ['is-not', '!=='], function (another) {
    return !is.call(this, another)
  })

  // Enable the customizaztion of Ordering.
  var compare = link(instance, 'compare', function (another) {
    var ordering
    return this === another || is.call(this, another) ? 0
      : this.compare === compare ? null
        : (ordering = this.compare(another)) > 0 ? 1
          : ordering < 0 ? -1
            : ordering === 0 ? 0 : null
  })

  // Enable the customization of Equivalence.
  var equals = link(instance, ['equals', '=='], function (another) {
    return this === another || is.call(this, another) || (
      this.equals !== equals && isApplicable(this.equals) &&
        boolValueOf(this.equals(another))
    )
  })
  link(instance, ['not-equals', '!='], function (another) {
    return !equals.call(this, another)
  })

  // Emptiness: allow customization.
  var isEmpty = link(instance, 'is-empty', function () {
    var overriding = this['is-empty']
    return overriding !== isEmpty && isApplicable(overriding)
      ? boolValueOf(overriding.call(this))
      : Object.getOwnPropertyNames(this).length < 1
  })
  link(instance, 'not-empty', function () {
    return !isEmpty.call(this)
  })

  // Type Verification
  var isA = link(instance, 'is-a', function (t) {
    if (t === $Object || t === this.type) {
      return true
    }
    var overriding = this['is-a']
    return overriding !== isA && isApplicable(overriding) &&
      boolValueOf(overriding.call(this, t))
  })
  link(instance, 'is-not-a', function (t) {
    return !isA.call(this, t)
  })

  // Enable the customization of Encoding.
  var toCode = link(instance, 'to-code', function (ctx) {
    var overriding = this['to-code']
    if (overriding === toCode) { // not overridden
      return objectToCode.call(this, ctx)
    }
    if (ctx instanceof EncodingContext$) {
      var sym = ctx.begin(this)
      if (sym) { return sym }
    } else {
      ctx = new EncodingContext$(this)
    }
    var code = overriding.call(this)
    return ctx.end(this, this.type,
      $Type.of(code) === $Object
        ? objectToCode.call(code) // downgrading to a common object
        : code instanceof Tuple$ && !code.plain
          ? new Tuple$(code.$) // copy to avoid to corrupt shared tuples.
          : objectToCode.call(this) // ingore invalid overriding method.
    )
  })

  // Enable the customization of Description.
  var toString = link(instance, 'to-string', function () {
    var overriding = this['to-string']
    return overriding === toString
      ? thisCall(toCode.call(this), 'to-string')
      : overriding.apply(this, arguments)
  })

  var indexer = link(instance, ':', function (index, value) {
    var overriding = this[':']
    // setter
    if (typeof value !== 'undefined') {
      return overriding !== indexer ? overriding.apply(this, arguments)
        : typeof index === 'string' ? (this[index] = value)
          : index instanceof Symbol$ ? (this[index.key] = value) : null
    }

    // always return standard methods
    if (typeof index === 'string') {
      value = instance[index]
    } else if (index instanceof Symbol$) {
      value = instance[index.key]
    }
    if (typeof value === 'function') {
      return value
    }

    // default getter
    return overriding !== indexer ? overriding.apply(this, arguments)
      : typeof index === 'string' ? this[index]
        : index instanceof Symbol$ ? this[index.key] : null
  })

  // export type indexer.
  link(proto, 'indexer', indexer)
}
