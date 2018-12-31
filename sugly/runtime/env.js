'use strict'

module.exports = function runtime ($void) {
  var $ = $void.$
  var $export = $void.export
  var emptyObject = $.object.empty

  var environment = Object.assign(Object.create(null), {
    'runtime-core': 'js',
    'runtime-host': typeof window === 'undefined' ? 'native' : 'browser',
    'runtime-version': '0.6.1',
    'is-debugging': false
  })

  $export($, 'env', function (name, defaulue) {
    return typeof name === 'undefined' || name === null
      ? Object.assign(emptyObject(), environment)
      : typeof name !== 'string' ? null
        : typeof environment[name] !== 'undefined' ? environment[name]
          : typeof defaulue !== 'undefined' ? defaulue : null
  })

  $void.env = function (name, value) {
    return typeof value === 'undefined' ? environment[name]
      : (environment[name] = value)
  }

  $void.runtime = function (name, value) {
    name = 'runtime-' + name
    return $void.env(name, value)
  }
}