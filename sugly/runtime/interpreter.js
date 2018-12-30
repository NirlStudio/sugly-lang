'use strict'

module.exports = function interpreter ($void) {
  var $ = $void.$
  var compiler = $.compiler
  var Signal$ = $void.Signal
  var $export = $void.export
  var evaluate = $void.evaluate
  var isApplicable = $void.isApplicable
  var atomicArrayOf = $void.atomicArrayOf
  var createAppSpace = $void.createAppSpace

  // interactively feed & evaluate
  $export($, 'interpreter', function (shell, args, baseUri) {
    if (!isApplicable(shell)) {
      return null
    }
    // formalize arguments values to separate spaces.
    args = Array.isArray(args) ? atomicArrayOf(args) : []
    // save the base uri of whole application.
    if (typeof baseUri !== 'string') {
      baseUri = null
    }
    // save the base uri into environment.
    $void.env('home-uri', baseUri)
    // create a module space.
    var scope = createAppSpace(baseUri)
    scope.populate(args)
    // create compiler.
    var compile = compiler(function (expr, status) {
      if (status) {
        shell.apply(null, [null, 'compiler:' + status].concat(
          Array.prototype.slice.call(arguments, 2)))
        return
      }
      var value = expr[0]
      var src = expr[1]
      try {
        shell(evaluate(value, scope))
      } catch (signal) {
        if (signal instanceof Signal$) {
          if (signal.id === 'return') {
            shell(signal.value)
          } else if (signal.id === 'exit') {
            shell(signal.value, 'exiting')
          } else {
            shell(null, 'warning', 'invalid call to ' + signal.id, [value, src])
          }
        } else {
          shell(null, 'warning', 'unexpected error in evaluation', [signal, value, src])
        }
      }
    })

    return function interpret (text) {
      if (typeof text === 'string') {
        return compile(text) // push input into compiler
      } else {
        return compile() // reset status.
      }
    }
  })
}
