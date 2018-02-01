'use strict'

module.exports = function evaluate ($void) {
  var $ = $void.$
  var $Operator = $.operator
  var Tuple$ = $void.Tuple
  var Signal$ = $void.Signal
  var Symbol$ = $void.Symbol
  var indexerOf = $void.indexerOf
  var staticOperators = $void.staticOperators

  $void.evaluate = function evaluate (clause, space) {
    if (!(clause instanceof Tuple$)) {
      return clause instanceof Symbol$ ? space.resolve(clause.key) : clause
    }
    var clist = clause.$
    var length = clist.length
    if (length < 1) { // empty clause
      return null
    }
    if (clause.plain) { // a plain expression list (code block)
      var last = null
      for (var i = 0; i < length; i++) {
        last = evaluate(clist[i], space)
      }
      return last
    }
    // The subject and evaluation mode:
    //  implicit: the subject will be invoked if it's a function
    //  explicit: the subject keeps as a subject even it's a function.
    var subject = clist[0]
    var offset = 1
    var implicitMode = true // by default, use implicit mode.
    if (subject instanceof Symbol$) {
      var key = subject.key
      if (key === ':') { // switching to explicit mode.
        if (length < 2) {
          return null // no subject.
        }
        subject = evaluate(clist[1], space)
        if (length === 2) {
          // side effect: no more evaluation if only subject exists
          return subject
        }
        offset = 2
        implicitMode = false // explicit mode
      } else if (staticOperators[subject.key]) { // static operators
        return staticOperators[subject.key](space, clause)
      } else { // a common symbol
        subject = space.resolve(key)
      }
    } else if (subject instanceof Tuple$) { // a statment
      subject = evaluate(subject, space)
    } // else, the subject is a common value.

    // swith subject to predicate if it's apppliable.
    var predicate
    if (typeof subject === 'function' && implicitMode) {
      if (subject.type === $Operator) {
        return subject(space, clause)
      }
      predicate = subject
      subject = null
    } else {
      predicate = null
    }

    // with only subject, apply evaluation to it.
    if (offset >= length && predicate === null) {
      return evaluate(subject, space) // explicitly calling this function.
    }

    var args = []
    if (predicate === null) { // resolve the predicate if there is not.
      predicate = clist[offset++]
      if (predicate instanceof Tuple$) { // nested clause
        predicate = evaluate(predicate, space)
      }
      // try to find a function as verb
      if (predicate instanceof Symbol$) {
        if (predicate.key === ':') {
          predicate = indexerOf(subject) // explicitly calling the indexer
        } else { // implicitly call the indexer
          predicate = indexerOf(subject).call(subject, predicate.key)
          if (typeof predicate !== 'function') {
            return predicate // interpret to getter if the result is not a function.
          }
        }
      } else if (typeof predicate === 'string' || typeof predicate === 'number') {
        // implicitly calling the indexer with index value(s)
        args.push(predicate)
        predicate = indexerOf(subject)
      } else if (typeof predicate !== 'function') {
        return subject // do nothing with the subject.
      }
    }

    // pass the original clause if the predicate is an operator.
    if (predicate.type === $Operator) {
      return predicate(space, clause, subject)
    }

    // evaluate arguments.
    for (; offset < length; offset++) {
      args.push(evaluate(clist[offset], space))
    }

    // evaluate the statement.
    try {
      var result = predicate.apply(subject, args)
      return typeof result === 'undefined' ? null : result
    } catch (signal) {
      if (signal instanceof Signal$) {
        throw signal
      } else {
        console.warn('evaluating > unknow signal:', signal,
          'when evaluating', clause, 'with', args)
        return null
      }
    }
  }
}
