'use strict'

var RegexNumber = /^-?\d+\.?\d*$/

var keywords = {
  'null': null,
  'true': true,
  'false': false
}

function tokenizer ($, lines, source) {
  var InvalidSymbol = $.Symbol.$InvalidSymbol
  var symbolFor = $.Symbol.for

  var lineNo = 0
  var offset = 0
  var indent = 0
  var current = null

  function nextChar () {
    if (current) {
      return current
    }

    if (lineNo >= lines.length) {
      return null
    }

    var line = lines[lineNo]
    if (offset < line.length) {
      current = line[offset]
      offset += 1
    } else {
      lineNo += 1
      offset = 0
      current = '\n' // insert a virtual new-line
    }
    return current
  }

  function createToken (type) {
    var t = {
      type: type,
      source: source,
      indent: indent,
      startLine: lineNo,
      startOffset: offset - 1
    }
    indent = -1 // clear indent for the first non-whitespace.
    return t
  }

  function finalizeToken (token, value, type) {
    token.value = value
    token.endLine = lineNo
    token.endOffset = offset
    if (type) {
      token.type = type
    }
    return token
  }

  function readString () {
    var token = createToken('value')
    var str = '"'
    var index = offset

    var line = lines[lineNo]
    while (index < line.length) {
      let c = line[index]
      index += 1
      if (c === '"') {
        str += '"'; break
      }
      if (c !== '\\') {
        str += c; continue
      }

      if (index >= line.length) {
        str += '\\n'
      } else if (line[index] === '\r') {
        str += '\\r\\n'
      } else {
        str += '\\' + line[index]
        index += 1; continue
      }

      lineNo += 1
      line = lineNo >= lines.length ? '' : lines[lineNo]
      index = 0
    }

    try {
      offset = index
      return finalizeToken(token, JSON.parse(str))
    } catch (err) {
      finalizeToken(token, 'Invalid string input.', 'error')
      token.data = str
      return token
    }
  }

  function readComment () {
    var line = lines[lineNo]
    var comment = line.substring(offset)
    offset = line.length
    return comment
  }

  function readSymbolOrValue (s) {
    var token = createToken('symbol')

    var n = nextChar()
    while (n) {
      if (InvalidSymbol.test(n)) {
        break
      }
      s += n
      current = null
      n = nextChar()
    }

    if (keywords[s]) {
      return finalizeToken(token, keywords[s], 'value')
    }
    if (RegexNumber.test(s)) {
      return finalizeToken(token, Number.parseFloat(s), 'value')
    }
    return finalizeToken(token, symbolFor(s))
  }

  return function nextToken () {
    var c = nextChar()
    if (c === null) {
      return null // no more
    }

    if (c === '\n') {
      indent = 0 // reset indent status.
    } else if (c === ' ' && indent >= 0) {
      indent += 1 // count leading whitespaces.
    }

    current = null
    switch (c) {
      case '(':
        return finalizeToken(createToken('punctuation'), c)

      case ')':
        let n = nextChar()
        if (n === ',') {
          current = null
          return finalizeToken(createToken('punctuation'), c + n)
        }
        if (n === '.') {
          current = null
          return finalizeToken(createToken('punctuation'), c + n)
        }
        return finalizeToken(createToken('punctuation'), c)

      case '$':
      case '`':
      case '@':
      case ':':
        // single character symbols.
        return finalizeToken(createToken('symbol'), symbolFor(c))

      case "'": // reserved as a punctuation.
        return nextToken()

      case '"':
        return readString()

      case ' ':
      case '\r':
      case '\n':
        // skipping free whitespaces.
        return nextToken()

      case '#':
        // comment to end of the line.
        return finalizeToken(createToken('comment'), readComment())

      case '\t': // The world would be more peceaful now.
        if (indent < 0) {
          return nextToken()
        }
        return finalizeToken(createToken('error'), 'Indent TAB is not allowed.')

      default:
        return readSymbolOrValue(c)
    }
  }
}

module.exports = function ($, code, source) {
  if (typeof code !== 'string') {
    code = '()'
  }

  var lines = code.split('\n')
  return tokenizer($, lines, source)
}
