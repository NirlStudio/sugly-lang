'use strict'

module.exports = function function_ ($void) {
  var $ = $void.$
  var $Tuple = $.tuple
  var $Symbol = $.symbol
  var Tuple$ = $void.Tuple
  var Signal$ = $void.Signal
  var Symbol$ = $void.Symbol
  var warn = $void.warn
  var lambda = $void.lambda
  var evaluate = $void.evaluate
  var function_ = $void.function
  var createLambdaSpace = $void.createLambdaSpace
  var createFunctionSpace = $void.createFunctionSpace

  $void.lambdaOf = function lambdaOf (space, clause, offset) {
    // compile code
    var code = [$Symbol.lambda]
    var params = formatParameters(clause.$[offset++], space)
    code.push(params[1])
    params = params[0]
    var body = clause.$.slice(offset) || []
    if (body.length > 0) {
      var tbody = new Tuple$(body, true)
      code.push(tbody)
      return lambda(createLambda(params, tbody, space.app), new Tuple$(code))
    } else {
      code.push($Tuple.blank) // empty body
      return params.length < 1 ? $.lambda.noop : lambda(function () {
        return null
      }, new Tuple$(code))
    }
  }

  function createLambda (params, tbody, app) {
    var $lambda = function () {
      var scope = createLambdaSpace(app)
      // populate arguments
      for (var i = 0; i < params.length; i++) {
        var param = params[i]
        scope.local[param[0]] = i < arguments.length ? arguments[i] : param[1]
      }
      scope.prepare($lambda, this, Array.prototype.slice.call(arguments))
      // execution
      while (true) { // redo
        try {
          var result = evaluate(tbody, scope)
          clearContext(scope)
          return result
        } catch (signal) {
          clearContext(scope)
          if (signal instanceof Signal$) {
            if (signal.id === 'redo') { // clear space context
              scope = prepareToRedo(createLambdaSpace(app),
                $lambda, this, params, signal.value, signal.count)
              continue
            } else if (signal.id !== 'exit') {
              // return, break & continue if they're not in loop.
              return signal.value
            }
            throw signal
          }
          warn('lambda > unexpected error:', signal)
          return null
        }
      }
    }
    return $lambda
  }

  $void.functionOf = function functionOf (space, clause, offset) {
    // compile code
    var code = [$Symbol.function]
    var params = formatParameters(clause.$[offset++], space)
    code.push(params[1])
    params = params[0]
    var body = clause.$.slice(offset) || []
    if (body.length > 0) {
      var tbody = new Tuple$(body, true)
      code.push(tbody)
      return function_(
        createFunction(params, tbody, space.local, space.locals, space.app),
        new Tuple$(code)
      )
    } else {
      code.push($Tuple.blank) // empty body
      return params.length < 1 ? $.function.noop : function_(function () {
        return null
      }, new Tuple$(code))
    }
  }

  function createFunction (params, tbody, local, locals, app) {
    var parent = {
      local: local,
      locals: locals,
      app: app
    }
    var $func = function () {
      var scope = createFunctionSpace(parent)
      // populate arguments
      for (var i = 0; i < params.length; i++) {
        var param = params[i]
        scope.local[param[0]] = i < arguments.length ? arguments[i] : param[1]
      }
      scope.prepare($func, this, Array.prototype.slice.call(arguments))
      // execution
      while (true) { // redo
        try {
          var result = evaluate(tbody, scope)
          clearContext(scope)
          return result
        } catch (signal) {
          clearContext(scope)
          if (signal instanceof Signal$) {
            if (signal.id === 'redo') { // clear space context
              scope = prepareToRedo(createFunctionSpace(parent),
                $func, this, params, signal.value, signal.count)
              continue
            } else if (signal.id !== 'exit') {
              // return, break & continue if they're not in loop.
              return signal.value
            }
            throw signal
          } // for unexpected errors
          warn('function > unexpected error:', signal)
          return null
        }
      }
    }
    return $func
  }

  // to prepare a new context for redo
  function prepareToRedo (scope, me, t, params, value, count) {
    scope.context.do = me
    scope.context.this = typeof t === 'undefined' ? null : t
    var args = scope.context['arguments'] = count === 0 ? []
      : count === 1 ? [value] : value
    for (var i = 0; i < params.length; i++) {
      var param = params[i]
      scope.local[param[0]] = i < args.length ? args[i] : param[1]
    }
    return scope
  }

  // accepts param, (param ...) or ((param default-value) ...)
  // returns [params-list, code]
  function formatParameters (params, space) {
    if (params instanceof Symbol$) {
      return [[[params.key, null]], params]
    }
    if (!(params instanceof Tuple$) || params.$.length < 1) {
      return [[], $Tuple.empty]
    }
    var args = []
    var code = []
    var hasDefault = false
    var counter = 0
    params = params.$
    for (var i = 0; i < params.length; i++) {
      var param = params[i]
      if (param instanceof Symbol$) {
        args.push([param.key, null])
        code.push([param, null])
        counter++
      } else if (param instanceof Tuple$ && param.length > 0) {
        var sym = param.$[0]
        if (sym instanceof Symbol$) {
          if (param.length < 2) {
            args.push([sym.key, null])
            code.push([sym, null])
            counter++
          } else {
            var value = evaluate(param.$[1], space)
            hasDefault = $Tuple.accepts(value) && value !== null
            args.push([sym.key, hasDefault ? value : null])
            code.push([sym, hasDefault ? value : null])
            counter++
          }
        }
      }
    }
    if (counter === 0) {
      return [[], $Tuple.empty]
    }
    if (counter === 1 && !hasDefault) {
      return [args, code[0][0]]
    }
    var list = []
    for (i = 0; i < code.length; i++) {
      var pair = code[i]
      if (pair[1] === null) {
        list.push(pair[0])
      } else {
        list.push(new Tuple$(pair))
      }
    }
    return [args, new Tuple$(list)]
  }
}

function clearContext (scope) {
  delete scope.context.do
  delete scope.context.this
  delete scope.context.arguments
}
