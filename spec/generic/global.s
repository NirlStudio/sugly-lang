(define "Special symbols' values" (= ()
  (should "(symbol empty) is resolved to null." (= ()
    (assert null ((symbol empty),
  ),
  (should "(symbol invalid) is resolved to null." (= ()
    (assert null ((symbol invalid),
  ),
  (should "(symbol all) is resolved to null." (= ()
    (assert null ((symbol all),
  ),
  (should "(symbol any) is resolved to null." (= ()
    (assert null ((symbol any),
  ),
  (should "(symbol etc) is resolved to null." (= ()
    (assert null ((symbol etc),
  ),
),

(define "Global constant values" (= ()
  (should "(symbol of \"null\") is resolved to null." (= ()
    (assert null ((symbol of "null"),
  ),
  (should "(symbol of \"true\") is resolved to null." (= ()
    (assert true ((symbol of "true"),
  ),
  (should "(symbol of \"false\") is resolved to null." (= ()
    (assert false ((symbol of "false"),
  ),
),

(define "Punctuations are pure symbols, which is resolved to itself by default" (= ()
  (should "(symbol of \"(\") is resolved to itself." (= ()
    (var sym (symbol of "("),
    (assert sym (sym),
  ),
  (should "(symbol of \")\") is resolved to itself." (= ()
    (var sym (symbol of ")"),
    (assert sym (sym),
  ),
  (should "(symbol of \",\") is resolved to itself." (= ()
    (var sym (symbol of ","),
    (assert sym (sym),
  ),
  (should "(symbol of \";\") is resolved to itself." (= ()
    (var sym (symbol of ";"),
    (assert sym (sym),
  ),
  (should "(symbol of \".\") is resolved to itself." (= ()
    (var sym (symbol of "."),
    (assert sym (sym),
  ),
  (should "(symbol of \"@\") is resolved to itself." (= ()
    (var sym (symbol of "@"),
    (assert sym (sym),
  ),
  (should "(symbol of \":\") is resolved to itself." (= ()
    (var sym (symbol of ":"),
    (assert sym (sym),
  ),
  (should "(symbol of \"#\") is resolved to itself." (= ()
    (var sym (symbol of "#"),
    (assert sym (sym),
  ),
),

(define "Control symbols are pure symbols." (= ()
  (should "(symbol of \"else\") is resolved to itself." (= ()
    (assert else (else),
  ),
  (should "(symbol of \"in\") is resolved to itself." (= ()
    (assert in (in),
  ),
),

(define "Global enum values." (= ()
  (should "(` descending) is resolved to 1." (= ()
    (assert 1 descending),
  ),
  (should "(` equivalent) is resolved to 0." (= ()
    (assert 0 equivalent),
  ),
  (should "(` ascending) is resolved to -1." (= ()
    (assert -1 ascending),
  ),
),