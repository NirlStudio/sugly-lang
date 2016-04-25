($define "function form" (=()
  ($should "return the symbol value of a string" (= ()
    (assert equal (` sym) ($symbol "sym"))
    (assert equal (` $) ($symbol "$"))
    (assert equal (` `) ($symbol "`"))
    (assert equal (` @) ($symbol "@"))
    (assert equal (` :) ($symbol ":"))

    (assert equal null ($symbol "sym("))
    (assert equal null ($symbol "(sym"))
    (assert equal null ($symbol "s(ym"))

    (assert equal null ($symbol "s)ym"))
    (assert equal null ($symbol "s$ym"))
    (assert equal null ($symbol "s`ym"))
    (assert equal null ($symbol "s'ym"))
    (assert equal null ($symbol "s@ym"))
    (assert equal null ($symbol "s:ym"))
    (assert equal null ($symbol "s\"ym"))
    (assert equal null ($symbol "s#ym"))
    (assert equal null ($symbol "s\\ym"))
    (assert equal null ($symbol "s\rym"))
    (assert equal null ($symbol "s\nym"))
    (assert equal null ($symbol "s\tym"))
    (assert equal null ($symbol "s ym"))
).

($define "operator form" (=()
  ($should "return the symbol value of a string" (= ()
    (assert equal (` sym) (symbol "sym"))
    (assert equal (` $) (symbol "$"))
    (assert equal (` `) (symbol "`"))
    (assert equal (` @) (symbol "@"))
    (assert equal (` :) (symbol ":"))

    (assert equal null (symbol "sym("))
    (assert equal null (symbol "(sym"))
    (assert equal null (symbol "s(ym"))

    (assert equal null (symbol "s)ym"))
    (assert equal null (symbol "s$ym"))
    (assert equal null (symbol "s`ym"))
    (assert equal null (symbol "s'ym"))
    (assert equal null (symbol "s@ym"))
    (assert equal null (symbol "s:ym"))
    (assert equal null (symbol "s\"ym"))
    (assert equal null (symbol "s#ym"))
    (assert equal null (symbol "s\\ym"))
    (assert equal null (symbol "s\rym"))
    (assert equal null (symbol "s\nym"))
    (assert equal null (symbol "s\tym"))
    (assert equal null (symbol "s ym"))
).

($define "keyOfSymbol" (=()
  ($should "return the string key of a symbol" (= ()
    (assert equal "sym" ($keyOfSymbol (` sym))
).

($define "Symbol object" (= ()
  ($should "be reserved" (= ()
    (assert equal "object" (typeof ($Symbol)))
).
