# define feature sets
(let features (@
  "compile" "exec" "eval" "space"
  "bool" "string" "symbol" "number" "date" "array" "iterate" "encode"
  "object" "function" "is" "typeof" "merge" "if" "while" "for" "for-in"
  "bitwise" "logical" "arithmetic" "concat" "ordering"
  "flow" "pipe" "premise" "operator"
  # to be done.
  "math" "int" "float" "null" "uri" "json"
).

(= (*)
  (let scope (if argc argv features),
  (for name in scope
    ($define name (= name > ()
      ($run (+ "spec/" name),
).
