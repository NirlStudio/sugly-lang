'use strict'

var $export = require('../export')

function getFields () {
  return function object$get_fields () {
    return Object.getOwnPropertyNames(this)
  }
}

function hasField ($void) {
  var ownsProperty = $void.ownsProperty
  return function object$has_field (name) {
    return typeof name !== 'string' ? null : ownsProperty(this, name)
  }
}

function removeField ($void) {
  var ownsProperty = $void.ownsProperty

  return function object$remove_field (name) {
    if (typeof name !== 'string') {
      return null
    }
    var value
    if (ownsProperty(this, name)) {
      value = this[name]
      delete this[name]
    } else {
      value = null
    }
    return value
  }
}

function hasProperty () {
  return function object$has_property (name) {
    if (typeof name !== 'string') {
      return null
    }
    return typeof this[name] !== 'undefined'
  }
}

function getProperty () {
  return function object$get_property (name) {
    if (typeof name !== 'string') {
      return null
    }
    var value = this[name]
    return typeof value === 'undefined' ? null : value
  }
}

function setProperty () {
  return function object$set_property (name, value) {
    if (typeof name !== 'string') {
      return null
    }
    return (this[name] = (typeof value === 'undefined' ? null : value))
  }
}

function combine (create) {
  return function object$combine () {
    var objs = [this]
    Array.prototype.push.apply(objs, arguments)
    return create.apply(null, objs)
  }
}

function merge () {
  return function object$merge () {
    if (typeof this === 'object' && this !== null) {
      for (var i = 0; i < arguments.length; i++) {
        Object.assign(this, arguments[i])
      }
    }
  }
}

function objectClone () {
  return function object$clone () {
    if (typeof this === 'object' && this !== null) {
      var obj = Object.create(Object.getPrototypeOf(this))
      Object.assign(obj, this)
      return obj
    }
    return null
  }
}

function toCode ($) {
  return function Object$to_code () {
    return $.encode.object(this)
  }
}

function objectIndexer () {
  return function object$indexer (name, value) {
    if (typeof name !== 'string') {
      return null
    }
    switch (arguments.length) {
      case 1:
        value = this[name]
        return typeof value === 'undefined' ? null : value
      case 2:
        return (this[name] = (typeof value === 'undefined' ? null : value))
      default:
        return null
    }
  }
}

module.exports = function ($void) {
  var $ = $void.$
  var Type = $void.Type
  var isPrototypeOf = $void.isPrototypeOf

  var Class = $.Class
  var proto = Class.proto

  // object property & field (owned property) manipulation
  // retrieve field names
  $export(proto, 'get-fields', getFields())
  // test the existence by a field name
  $export(proto, 'has-field', hasField($void))
  // remove a field from an object
  $export(proto, 'remove-field', removeField())
  // test a property (either owned or inherited) name
  $export(proto, 'has-property', hasProperty())
  // retrieve the value of a property
  $export(proto, 'get-property', getProperty())
  // set the value of a field
  $export(proto, 'set-property', setProperty())

  // generate a new object by comine this object and other objects.
  $export(proto, 'combine', combine(Class.create))
  // shallowly copy fields from other objects to this object.
  $export(proto, 'merge', merge())
  // to create a shallow copy of this instance with the same type.
  $export(proto, 'clone', objectClone())

  // support general operators
  $export(proto, '+', combine(Class.create))
  $export(proto, '+=', merge(proto))

  // define an object's type attributes
  $export(proto, 'is-type', function object$is_type () {
    return false
  })
  $export(proto, 'is-type-of', function object$is_type_of (value) {
    return false
  })
  $export(proto, 'super', function object$super () {
    return null
  })
  $export(proto, 'get-type', function object$get_type () {
    return isPrototypeOf(proto, this) ? Object.getPrototypeOf(this).type : Class
  })
  $export(proto, 'is-instance', function object$is_instance () {
    return true
  })
  $export(proto, 'is-instance-of', function object$is_instance_of (type) {
    if (!(type instanceof Type)) {
      return false
    }
    return isPrototypeOf(type.proto, this) ||
      (typeof this === 'object' && type === Class) // for native objects
  })

  // default object persistency & describing logic
  $export(proto, 'to-code', toCode($))
  $export(proto, 'to-string', toCode($))

  // default object emptiness logic
  $export(proto, 'is-empty', function object$is_empty () {
    return Object.getOwnPropertyNames(this).length > 0
  })
  $export(proto, 'not-empty', function object$not_empty () {
    return Object.getOwnPropertyNames(this).length < 1
  })

  // indexer: override to implement setter.
  $export(proto, ':', objectIndexer())

  // override to boost - an object is always true
  $export(proto, '?', function object$bool_test (a, b) {
    return typeof a === 'undefined' ? true : a
  })

  // An object is the container of all its fields
  // iterator: iterate all field names and values
  require('./object-iterator')($)
}
