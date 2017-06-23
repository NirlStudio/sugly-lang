'use strict'

var proc = require('process')
var os = proc.platform

var exportingColors = ['red', 'gray', 'green', 'underline']

module.exports = function importing (exporting) {
  try { // to load native module
    var colors = require('colors/safe')
    for (var color in exportingColors) {
      exporting[color] = concatWith(colors[color])
    }
  } catch (err) { // create a mock interface if it's missing
    mockColors(exporting)
    exporting['is-missing'] = true
    exporting['-module']['error'] = err
  }
  // give special indicator characters.
  if (os === 'win32') {
    exporting.passed = '\u221a '
    exporting.failed = '\u00d7 '
  } else if (os === 'darwin' || proc.env['DISPLAY']) {
    exporting.passed = '✓ '
    exporting.failed = '✖ '
  } else { // freebsd, etc.
    exporting.passed = '= '
    exporting.failed = 'x '
    // mock them since they looks not working very well.
    exporting.gray = function (text) { return text }
    exporting.underline = function (text) { return text }
  }
  // render special characters
  exporting.passed = exporting.green(colors.passed)
  exporting.failed = exporting.red(colors.failed)
  // it always succeeds.
  return true
}

function concatWith (color) {
  return function () {
    return color(Array.prototype.slice.call(arguments).join(''))
  }
}
// create a mocking interface to coloring text.
function mockColors (exporting) {
  for (var color in exportingColors) {
    exporting[color] = function () {
      return Array.prototype.slice.call(arguments).join('')
    }
  }
}