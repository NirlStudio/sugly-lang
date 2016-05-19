($define "function form" (= ()
  ($should "return false for false, zero and null" (= ()
    (assert false (` ($bool ),
    (assert false (` ($bool false),
    (assert false (` ($bool 0),
    (assert false (` ($bool null),
  ),
  ($should "return true for any other values" (= ()
    (assert true (` ($bool true),
    (assert true (` ($bool 1),
    (assert true (` ($bool -1),
    (assert true (` ($bool ""),
    (assert true (` ($bool "0"),
    (assert true (` ($bool "false"),
    (assert true (` ($bool (@),
    (assert true (` ($bool (object),
  ),
).

($define "operator form" (= ()
  ($should "return false for false, zero and null" (= ()
    (assert false (` (bool ),
    (assert false (` (bool false),
    (assert false (` (bool 0),
    (assert false (` (bool null),
  ),
  ($should "return true for any other values" (= ()
    (assert true (` (bool true),
    (assert true (` (bool 1),
    (assert true (` (bool -1),
    (assert true (` (bool ""),
    (assert true (` (bool "0"),
    (assert true (` (bool "false"),
    (assert true (` (bool (@),
    (assert true (` (bool (object),
  ),
).

($define "Bool type" (= ()
  ($should "be the type object of boolean values" (= ()
    (assert (` ((Bool is-a Type),
    (assert (` ((Bool is-not-a Class),
  ),
).

($define "(Bool value-of x) " (= ()
  ($should "standardize a value to its bool value." (= ()
    (assert (` (Bool value-of true),
    (assert false (` (Bool value-of false),

    (assert (` (Bool value-of 1),
    (assert false (` (Bool value-of 0),

    (assert false (` (Bool value-of null),
    (assert (` (Bool value-of ""),
    (assert (` (Bool value-of "false"),
    (assert (` (Bool value-of (@)),
    (assert (` (Bool value-of (@>)),
).

($define "(Bool and x y z ...)" (= ()
  ($should "give a result by logical AND." (= ()
    (assert (` (Bool and),
    (assert (` (Bool and true),
    (assert false (` (Bool and true false),
    (assert (` (Bool and true 1),
    (assert false (` (Bool and true 0),
    (assert (` (Bool and true (@)),
    (assert false (` (Bool and true null),
).

($define "(Bool or x y z ...)" (= ()
  ($should "give a result by logical OR." (= ()
    (assert false (` (Bool or),
    (assert (` (Bool or true),
    (assert (` (Bool or true false),
    (assert false (` (Bool or false false),
    (assert (` (Bool or false 1),
    (assert false (` (Bool or false 0),
    (assert (` (Bool or false (@)),
    (assert false (` (Bool or false null),
).

($define "(Bool not x)" (= ()
  ($should "give a result by logical NOT." (= ()
    (assert (` (Bool not),
    (assert false (` (Bool not true),
    (assert (` (Bool not false),
    (assert (` (Bool not 0),
    (assert false (` (Bool not 1),
    (assert false (` (Bool not (@)),
    (assert (` (Bool not null),
).

($define "(a is b)" (= ()
  ($should "only return true if a and b are the same bool value." (= ()
    (assert (` (true is true),
    (assert (` (false is false),
    (assert false (` (true is false),
    (assert false (` (false is true),
    (assert false (` (true is null),
    (assert false (` (false is null),
    (assert false (` (true is 0),
    (assert false (` (false is 0),
    (assert false (` (true is 1),
    (assert false (` (false is 1),

    (assert (` (Bool is Bool),
    (assert false (` (Bool is true),
  ),
).

($define "(a equals b)" (= ()
  ($should "only return true if a and b are the same bool value." (= ()
    (assert (` (true equals true),
    (assert (` (false equals false),
    (assert false (` (true equals false),
    (assert false (` (false equals true),
    (assert false (` (true equals null),
    (assert false (` (false equals null),
    (assert false (` (true equals 0),
    (assert false (` (false equals 0),
    (assert false (` (true equals 1),
    (assert false (` (false equals 1),
  ),
).

($define "(bool-value to-code )" (= ()
  ($should "return 'true' for true 'false' for 'false'." (= ()
    (assert "true" (` (true to-code ),
    (assert "false" (` (false to-code),
  ),
).

($define "(bool-value to-string )" (= ()
  ($should "return 'true' for true 'false' for 'false'." (= ()
    (assert "true" (` (true to-string),
    (assert "false" (` (false to-string),
  ),
).

($define "(bool-value and value) or (bool-value && value)" (= ()
  ($should "return result by logical AND." (= ()
    (assert (` (true and true),
    (assert false (` (true and false),
    (assert false (` (false and true),
    (assert false (` (false and false),
    (assert (` (true and),
    (assert (` (true and 1),
    (assert false (` (true and 0),
    (assert false (` (true and null),

    (assert (` (true && true),
    (assert false (` (true && false),
    (assert false (` (false && true),
    (assert false (` (false && false),
    (assert (` (true &&),
    (assert (` (true && 1),
    (assert false (` (true && 0),
    (assert false (` (true && null),
  ),
).
