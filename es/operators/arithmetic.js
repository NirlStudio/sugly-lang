'use strict'

module.exports = function arithmetic ($void) {
  var $ = $void.$
  var $Number = $.number
  var mod = $Number.proto['%']
  var link = $void.link
  var Space$ = $void.Space
  var Symbol$ = $void.Symbol
  var operator = $void.operator
  var evaluate = $void.evaluate
  var staticOperator = $void.staticOperator

  staticOperator('-', function (space, clause) {
    var value = evaluate(clause.$[1], space)
    return typeof value === 'number' ? (-value) : -0
  })

  staticOperator('++', function (space, clause) {
    var clist = clause.$
    var length = clist.length
    if (length < 2) {
      return 1
    }
    var sym = clist[1]
    if (sym instanceof Symbol$) { // (++ symbol)
      var value = space.resolve(sym.key)
      return space.let(sym.key, typeof value === 'number' ? value + 1 : 1)
    }
    // as a normal plus-one operation
    sym = evaluate(sym, space)
    return typeof sym === 'number' ? sym + 1 : 1
  })

  staticOperator('--', function (space, clause) {
    var clist = clause.$
    var length = clist.length
    if (length < 2) {
      return -1
    }
    var sym = clist[1]
    if (sym instanceof Symbol$) { // (-- symbol)
      var value = space.resolve(sym.key)
      return space.let(sym.key, typeof value === 'number' ? value - 1 : -1)
    }
    // as a normal minus-one operation
    sym = evaluate(sym, space)
    return typeof sym === 'number' ? sym - 1 : -1
  })

  // increment a value by one and assign it back to the same variable
  link($Number.proto, '++', operator(function (space, clause, that) {
    if (!(space instanceof Space$)) {
      return 0 // The value of this operator is defined as 0.
    }
    if (typeof that !== 'number' || !clause || !clause.$ || !clause.$.length) {
      that = 0
    }
    var sym = clause.$[0]
    if (sym instanceof Symbol$) {
      space.let(sym.key, that + 1)
    }
    return that
  }))

  // increment a value by one and assign it back to the same variable
  link($Number.proto, '--', operator(function (space, clause, that) {
    if (!(space instanceof Space$)) {
      return 0 // The value of this operator is defined as 0.
    }
    if (typeof that !== 'number' || !clause || !clause.$ || !clause.$.length) {
      that = 0
    }
    var sym = clause.$[0]
    if (sym instanceof Symbol$) {
      space.let(sym.key, that - 1)
    }
    return that
  }))

  // (num += num ... )
  link($Number.proto, '+=', operator(function (space, clause, that) {
    if (!(space instanceof Space$)) {
      return 0 // The value of this operator is defined as 0.
    }
    if (typeof that !== 'number') {
      that = 0
    }
    var clist = clause.$ && clause.$.length ? clause.$ : []
    for (var i = 2; i < clist.length; i++) {
      var value = evaluate(clist[i], space)
      if (typeof value === 'number') {
        that += value
      }
    }
    var sym = clist[0]
    if (sym instanceof Symbol$) {
      space.let(sym.key, that)
    }
    return that
  }))

  // (num -= num ... )
  link($Number.proto, '-=', operator(function (space, clause, that) {
    if (!(space instanceof Space$)) {
      return 0 // The value of this operator is defined as 0.
    }
    if (typeof that !== 'number') {
      that = 0
    }
    var clist = clause.$ && clause.$.length ? clause.$ : []
    for (var i = 2; i < clist.length; i++) {
      var value = evaluate(clist[i], space)
      if (typeof value === 'number') {
        that -= value
      }
    }
    var sym = clist[0]
    if (sym instanceof Symbol$) {
      space.let(sym.key, that)
    }
    return that
  }))

  // (num *= num ... )
  link($Number.proto, '*=', operator(function (space, clause, that) {
    if (!(space instanceof Space$)) {
      return 0 // The value of this operator is defined as 0.
    }
    if (typeof that !== 'number') {
      that = 0
    }
    var clist = clause.$ && clause.$.length ? clause.$ : []
    for (var i = 2; i < clist.length; i++) {
      var value = evaluate(clist[i], space)
      if (typeof value === 'number') {
        that *= value
      }
    }
    var sym = clist[0]
    if (sym instanceof Symbol$) {
      space.let(sym.key, that)
    }
    return that
  }))

  // (num /= num ...)
  link($Number.proto, '/=', operator(function (space, clause, that) {
    if (!(space instanceof Space$)) {
      return 0 // The value of this operator is defined as 0.
    }
    if (typeof that !== 'number') {
      that = 0
    }
    var clist = clause.$ && clause.$.length ? clause.$ : []
    for (var i = 2; i < clist.length; i++) {
      var value = evaluate(clist[i], space)
      if (typeof value === 'number') {
        that /= value
      }
    }
    var sym = clist[0]
    if (sym instanceof Symbol$) {
      space.let(sym.key, that)
    }
    return that
  }))

  // (num %= num ...)
  link($Number.proto, '%=', operator(function (space, clause, that) {
    if (!(space instanceof Space$)) {
      return 0 // The value of this operator is defined as 0.
    }
    if (typeof that !== 'number') {
      that = 0
    }
    var clist = clause.$ && clause.$.length ? clause.$ : []
    if (clist.length > 2) {
      that = mod.call(that, evaluate(clist[2], space))
    }
    var sym = clist[0]
    if (sym instanceof Symbol$) {
      space.let(sym.key, that)
    }
    return that
  }))
}