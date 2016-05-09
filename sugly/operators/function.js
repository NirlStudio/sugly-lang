'use strict'

module.exports = function operators$function ($) {
  var $operators = $.$operators
  var set = $.$set
  var resolve = $.$resolve
  var seval = $.$eval
  var createSignalOf = $.$createSignalOf

  var symbolValueOf = $.Symbol['value-of']
  var isSymbol = $.Symbol.is

  var SymbolDerive = symbolValueOf('>')
  var SymbolLambdaShort = SymbolDerive
  var SymbolObject = symbolValueOf('@')

  // (= symbols > params body ...)
  // symbols can be symbol or (symbol ...) or (@ prop: value ...)
  function lambdaCreate ($, symbols, params, body) {
    var enclosing = {}
    if (isSymbol(symbols)) {
      set(enclosing, symbols, resolve($, symbols))
      return $.lambda(enclosing, params, body)
    }

    if (!Array.isArray(symbols)) {
      return null // invalid expression
    }

    if (symbols.length < 1) {
      return $.lambda(enclosing, params, body)
    }

    // enclosing context values.
    if (symbols[0] === SymbolObject) {
      // it should be an object expression: (@ prop: value ...)
      var obj = seval(symbols, $)
      if (typeof obj === 'object' && obj !== null) {
        enclosing = obj
      }
    } else {
      // it should be an symbol list: (sym ...)
      for (var i = 0; i < symbols.length; i++) {
        var s = symbols[i]
        if (isSymbol(s)) {
          set(enclosing, s, resolve($, s))
        }
      }
    }

    return $.lambda(enclosing, params, body)
  }

  $operators['='] = function ($, clause) {
    if (clause.length < 3) {
      return null
    }

    if (clause[1] === SymbolDerive) {
      // (= > params body)
      if (clause.length < 4) {
        return null
      }
      return lambdaCreate($, [], clause[2], clause.slice(3))
    }

    if (clause[2] === SymbolLambdaShort) {
      // (= enclosing > params body)
      if (clause.length < 5) {
        return null
      }
      return lambdaCreate($, clause[1], clause[3], clause.slice(4))
    }

    // (= param body ...)
    return $.function(clause[1], clause.slice(2))
  }

  // operator function and closure are more readable aliases of '='
  $operators['function'] = $operators['=']
  $operators['closure'] = $operators['=']

  // (=> params body)
  $operators['=>'] = function ($, clause) {
    if (clause.length < 3) {
      return null
    }
    return lambdaCreate($, [], clause[1], clause.slice(2))
  }

  // operator lambda is a more readable version of '=>'
  $operators['lambda'] = $operators['=>']

  // leave function or module.
  $operators['return'] = createSignalOf('return')
  // leave a module or an event callback
  $operators['exit'] = createSignalOf('exit')
  // request to quit the whole application.
  $operators['halt'] = createSignalOf('halt')
}