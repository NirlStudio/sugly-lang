(for spec in (@
    "quote"
    "app"
    "assignment"
    "control"
    "general"
    "logical"
    "bitwise"
    "arithmetic"
    "object"
    "function"
    "operator"
    "load"
    "import"
    "include"
  ) (load ("operators/" + spec).
