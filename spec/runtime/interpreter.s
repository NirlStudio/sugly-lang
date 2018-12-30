(define "(interpreter )" (= ()
  (should "(interpreter ) returns null." (= ()
    (assert null (interpreter ),
  ),
),

(define "(interpreter shell)" (= ()
  (should "(interpreter an-operator) returns null." (= ()
    (assert null (interpreter (=? (X),
  ),
  (should "(interpreter a-lambda) returns an interpret interface function." (= ()
    (var feedback)
    (var save (=> (fb) (let feedback fb),
    (var shell (:(= () (this (arguments 0))) bind save),
    (var interpret (interpreter shell),
    (assert (:interpret is-a function),

    (var depth (interpret "1"),
    (assert null feedback)
    (assert 1 depth)

    (let depth (interpret "\n(1 + 2)"),
    (assert 1 feedback)
    (assert 2 depth)

    (let depth (interpret "\n"),
    (assert 3 feedback)
    (assert 1 depth)
  ),
  (should "(interpreter a-func) returns an interpret interface function." (= ()
    (var feedback)
    (var shell (=> () (let feedback (arguments 0),
    (var interpret (interpreter shell),
    (assert (:interpret is-a function),

    (var depth (interpret "1"),
    (assert null feedback)
    (assert 1 depth)

    (let depth (interpret "\n(1 + 2)"),
    (assert 1 feedback)
    (assert 2 depth)

    (let depth (interpret "\n"),
    (assert 3 feedback)
    (assert 1 depth)
  ),
),

(define "(interpreter shell args)" (= ()
  (should "put args into the new space as arguments." (= ()
    (var feedback)
    (var shell (=> (fb) (let feedback fb),
    (var interpret (interpreter shell (@ 1 10 100),
    (interpret "((iterator of arguments) sum)\n"),
    (assert 111 feedback)
  ),
  (should "requires args must be an array." (= ()
    (var feedback)
    (var shell (=> (fb) (let feedback fb),
    (var interpret (interpreter shell (@ x:1),
    (interpret "arguments\n"),
    (assert (feedback is-a array),
    (assert (feedback is-empty),
  ),
  (should "only accept atomic values as argument value." (= ()
    (var feedback)
    (var shell (=> (fb) (let feedback fb),
    (var args (@
      null true false -1 0 1 "" " "  "x"
      (range empty) (date empty) (symbol empty) (tuple empty)
      type (=?) (=) (=?) (@) (@:) ((class empty) default)
    ),
    (var interpret (interpreter shell args),
    (interpret "arguments\n"),

    (assert (feedback is-a array),
    (assert (args length) (feedback length),

    (assert null (feedback 0),
    (assert true (feedback 1),
    (assert false (feedback 2),
    (assert -1 (feedback 3),
    (assert 0 (feedback 4),
    (assert 1 (feedback 5),
    (assert "" (feedback 6),
    (assert " " (feedback 7),
    (assert "x" (feedback 8),

    (assert ((feedback 9) is-a range),
    (assert ((feedback 9) is-empty),

    (assert ((feedback 10) is-a date),
    (assert ((feedback 10) is-empty),

    (assert ((feedback 11) is-a symbol),
    (assert ((feedback 11) is-empty),

    (assert ((feedback 12) is-a tuple),
    (assert ((feedback 12) is-empty),
    (for i in (13 (args length))
      (assert null (feedback i),
    ),
  ),
),

(define "(interpreter shell args home-uri)" (= ()
  (should "pass home-uri to new space if it's a string." (= ()
    (var feedback)
    (var shell (=> (fb) (let feedback fb),
    (var interpret (interpreter shell (@ 1 10 100) "/var/tmp/sugly"),
    (interpret "(env \"home-uri\")\n"),
    (assert "/var/tmp/sugly" feedback)

    (let interpret (interpreter shell (@ 1 10 100) ""),
    (interpret "(env \"home-uri\")\n"),
    (assert "" feedback)
  ),
  (should "pass null to new space as home-uri if it's missing or not a string." (= ()
    (var feedback)
    (var shell (=> (fb) (let feedback fb),
    (var interpret (interpreter shell (@ 1 10 100),
    (interpret "(env \"home-uri\")\n"),
    (assert null feedback)

    (let interpret (interpreter shell (@ 1 10 100) true),
    (interpret "(env \"home-uri\")\n"),
    (assert null feedback)
  ),
),
