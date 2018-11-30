(define "app/global resolving: $" (= ()
  (should "$ is a pure symbol." (= ()
    (assert $ (symbol of "$"),
  ),
  (should "($ sym) resolves the value of a symbol at the app (global) scope." (= ()
    (let descending 100)
    (assert 100 descending),
    (assert 1 ($ descending),
  ),
  (should "When $ is used in an operator, a dynamic symbol should be generated by an expression." (= ()
    (var op1 (=? sym ($ (symbol of sym),
    (var op2 (=? sym ($ (sym key),

    (assert 1 descending),
    (var descending 100),
    (assert 100 descending),

    (assert 1 (op1 descending),
    (assert 1 (op2 descending),
  ),
),
