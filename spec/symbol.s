
($define "Symbol object" (= ()
  ($should "exist with its members" (= ()
    (assert "object" (` (typeof ($Symbol),
    (assert "symbol" (` (typeof (Symbol Nothing),
    (assert "function" (` (typeof (Symbol "for"),
    (assert "function" (` (typeof (Symbol "keyFor"),
    (assert "function" (` (typeof (Symbol "isKey"),
    (assert "function" (` (typeof (Symbol "is"),
  ),
  ($should "(Symbol for)" "create an symbol for a key" (= ()
    assert (Symbol Nothing) (` (Symbol for),
    assert (Symbol Nothing) (` (Symbol for null),
    assert (Symbol Nothing) (` (Symbol for 3),
    assert (Symbol Nothing) (` (Symbol for (@)),
    assert (Symbol Nothing) (` (Symbol for (object)),
    assert (Symbol Nothing) (` (Symbol for (= x x)),
    assert (Symbol Nothing) (` (Symbol for ""),
    assert (` sym) (` (Symbol for "sym"),
  ),
  ($should "(Symbol keyFor)" "retrieve the key for a symbol" (= ()
    (assert "" (` (Symbol keyFor),
    (assert "" (` (Symbol keyFor null),
    (assert "" (` (Symbol keyFor 3),
    (assert "" (` (Symbol keyFor (@)),
    (assert "" (` (Symbol keyFor (object)),
    (assert "" (` (Symbol keyFor (= x x)),
    (assert "" (` (Symbol keyFor "symbol"),
    (assert "" (` (Symbol keyFor (Symbol Nothing)),
    (assert "sym" (` (Symbol keyFor (` sym),
  ),
  ($should "(Symbol isKey)" "return true for a valid symbol key." (= ()
    (assert true (` (Symbol isKey "$"))
    (assert true (` (Symbol isKey "`"))
    (assert true (` (Symbol isKey "@"))
    (assert true (` (Symbol isKey ":"))
    (assert true (` (Symbol isKey "sym"))

    (assert false (` (Symbol isKey "sym("))
    (assert false (` (Symbol isKey "(sym"))
    (assert false (` (Symbol isKey "s(ym"))

    (assert false (` (Symbol isKey "s)ym"))
    (assert false (` (Symbol isKey "s$ym"))
    (assert false (` (Symbol isKey "s`ym"))
    (assert false (` (Symbol isKey "s'ym"))
    (assert false (` (Symbol isKey "s@ym"))
    (assert false (` (Symbol isKey "s:ym"))
    (assert false (` (Symbol isKey "s\"ym"))
    (assert false (` (Symbol isKey "s#ym"))
    (assert false (` (Symbol isKey "s\\ym"))
    (assert false (` (Symbol isKey "s\rym"))
    (assert false (` (Symbol isKey "s\nym"))
    (assert false (` (Symbol isKey "s\tym"))
    (assert false (` (Symbol isKey "s ym"))
  ),
  ($should "(Symbol is)" "return true for a symbol." (= ()
    (assert true (` (Symbol is (Symbol Nothing),
    (assert true (` (Symbol is (` sym),

    (assert false (` (Symbol is),
    (assert false (` (Symbol is null),
    (assert false (` (Symbol is true),
    (assert false (` (Symbol is false),
    (assert false (` (Symbol is 2),
    (assert false (` (Symbol is ""),
    (assert false (` (Symbol is "symbol"),
    (assert false (` (Symbol is (@)),
    (assert false (` (Symbol is (object)),
    (assert false (` (Symbol is (= x x),
  ),
).

($define "function form" (=()
  ($should "return the symbol value of a string" (= ()
    (assert "sym" (` (Symbol keyFor ($symbol "sym"),
    (assert (` $) (` ($symbol "$"))
    (assert (` `) (` ($symbol "`"))
    (assert (` @) (` ($symbol "@"))
    (assert (` :) (` ($symbol ":"))

    (assert (Symbol Nothing) (` ($symbol "sym("))
    (assert (Symbol Nothing) (` ($symbol "(sym"))
    (assert (Symbol Nothing) (` ($symbol "s(ym"))

    (assert (Symbol Nothing) (` ($symbol "s)ym"))
    (assert (Symbol Nothing) (` ($symbol "s$ym"))
    (assert (Symbol Nothing) (` ($symbol "s`ym"))
    (assert (Symbol Nothing) (` ($symbol "s'ym"))
    (assert (Symbol Nothing) (` ($symbol "s@ym"))
    (assert (Symbol Nothing) (` ($symbol "s:ym"))
    (assert (Symbol Nothing) (` ($symbol "s\"ym"))
    (assert (Symbol Nothing) (` ($symbol "s#ym"))
    (assert (Symbol Nothing) (` ($symbol "s\\ym"))
    (assert (Symbol Nothing) (` ($symbol "s\rym"))
    (assert (Symbol Nothing) (` ($symbol "s\nym"))
    (assert (Symbol Nothing) (` ($symbol "s\tym"))
    (assert (Symbol Nothing) (` ($symbol "s ym"))
).

($define "operator form" (=()
  ($should "return the symbol value of a string" (= ()
    (assert "sym" (` (Symbol keyFor (symbol "sym"))
    (assert (` $) (` (symbol "$"))
    (assert (` `) (` (symbol "`"))
    (assert (` @) (` (symbol "@"))
    (assert (` :) (` (symbol ":"))

    (assert (Symbol Nothing) (` (symbol "sym("))
    (assert (Symbol Nothing) (` (symbol "(sym"))
    (assert (Symbol Nothing) (` (symbol "s(ym"))

    (assert (Symbol Nothing) (` (symbol "s)ym"))
    (assert (Symbol Nothing) (` (symbol "s$ym"))
    (assert (Symbol Nothing) (` (symbol "s`ym"))
    (assert (Symbol Nothing) (` (symbol "s'ym"))
    (assert (Symbol Nothing) (` (symbol "s@ym"))
    (assert (Symbol Nothing) (` (symbol "s:ym"))
    (assert (Symbol Nothing) (` (symbol "s\"ym"))
    (assert (Symbol Nothing) (` (symbol "s#ym"))
    (assert (Symbol Nothing) (` (symbol "s\\ym"))
    (assert (Symbol Nothing) (` (symbol "s\rym"))
    (assert (Symbol Nothing) (` (symbol "s\nym"))
    (assert (Symbol Nothing) (` (symbol "s\tym"))
    (assert (Symbol Nothing) (` (symbol "s ym"))
).