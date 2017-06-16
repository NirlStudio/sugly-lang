'use strict'

module.exports = function ($void, JS) {
  var $ = $void.$
  var object = $.object
  var $export = $void.export
  var copyObject = $void.copyObject

  var json = $export($, 'json', object.empty())
  // TODO - type adaptation
  copyObject(json, JS.JSON, {
    'stringify': 'string-of',
    'parse': 'parse'
  })
}
