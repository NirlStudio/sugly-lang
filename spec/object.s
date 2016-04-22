($define "function form" (=()
  ($should "return a new object with a type and properties from other objects" (= ()
    (let obj ($object))
    (assert equal "object" (typeof obj),
    (assert equal false (($iterate obj) next),

    (let t ($object))
    (let obj ($object t))
    (assert equal "object" (typeof obj),
    (assert equal true (typeof obj t),
    (assert equal false (($iterate obj) next),

    (let t ($object))
    (let obj ($object t (@ p: 2),
    (assert equal "object" (typeof obj),
    (assert equal true (typeof obj t),
    (let iter ($iterate obj),
    (assert equal true (iter next),
    (assert equal "p" (iter key),
    (assert equal 2 (iter value),
    (assert equal false (iter next),
).

($define "operator form - (object p:v)" (=()
  ($should "return an object with customized properties" (= ()
    (let obj (object))
    (assert equal "object" (typeof obj),
    (assert equal false (($iterate obj) next),

    (let obj (object p: 2),
    (assert equal "object" (typeof obj),
    (let iter ($iterate obj),
    (assert equal true (iter next),
    (assert equal "p" (iter key),
    (assert equal 2 (iter value),
    (assert equal false (iter next),
).

($define "operator form - (@ p:v ...)" (=()
  ($should "return an object with customized properties" (= ()
    (assert equal null (@: p:2),

    (let obj (@ p: 2),
    (assert equal "object" (typeof obj),
    (let iter ($iterate obj),
    (assert equal true (iter next),
    (assert equal "p" (iter key),
    (assert equal 2 (iter value),
    (assert equal false (iter next),
).

($define "operator form - (@ type > p:v ...)" (=()
  ($should "return a new object with a type and customized properties" (= ()
    (let obj (@>))
    (assert equal "object" (typeof obj),
    (assert equal false (($iterate obj) next),

    (let t ($object))
    (let obj (@ t >))
    (assert equal "object" (typeof obj),
    (assert equal true (typeof obj t),
    (assert equal false (($iterate obj) next),

    (let t ($object))
    (let obj (@ t > p: 2),
    (assert equal "object" (typeof obj),
    (assert equal true (typeof obj t),
    (let iter ($iterate obj),
    (assert equal true (iter next),
    (assert equal "p" (iter key),
    (assert equal 2 (iter value),
    (assert equal false (iter next),
).

($define "operator form - (@ obj < p:v ...)" (=()
  ($should "return an updated object with customized properties" (= ()
    (assert equal null (@< p:2),

    (let obj1 (object),
    (let obj2 (@ obj1 <),
    (assert equal true (is obj1 obj2),
    (assert equal "object" (typeof obj1),
    (assert equal false (($iterate obj1) next),

    (let obj1 (object),
    (let obj2 (@ obj1 < p: 2),
    (assert equal true (is obj1 obj2),
    (assert equal "object" (typeof obj1),
    (let iter ($iterate obj1),
    (assert equal true (iter next),
    (assert equal "p" (iter key),
    (assert equal 2 (iter value),
    (assert equal false (iter next),
).

($define "Object object" (= ()
  ($should "be reserved" (= ()
    (assert equal "object" (typeof ($Object)))
).
