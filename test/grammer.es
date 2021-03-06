###############################################################################
# comment.line.number-sign.espresso

# keyword.other.punctuation.espresso
: @ ` $
@ ` $ :
` $ : @
$ : @ `
@(@ a@ @ @b @)@
:(: a: : :b :):
$($ a$ $ $b $)$
`(` a` ` `b `)`
;(; a; ; ;b ;);

# keyword.operator.quote.espresso
quote
quote(quote -quote quote quote- quote)quote
unquote
unquote(unquote -unquote unquote unquote- unquote)unquote

# keyword.operator.assignment.espresso
let(let -let let let- let)let
var(var -var var var- var)var
const(const -const const const- const)const
local(local -local local local- local)local
locon(locon -locon locon locon- locon)locon
export(export -export export export- export)export
import(import -import import import- import)import
load(load -load load load- load)load
fetch(fetch -fetch fetch fetch- fetch)fetch

# keyword.control.flow.espresso
if
if(if -if if if- if)if
for
for(for -for for for- for)for
while
while(while -while while while- while)while
break
break(break -break break break- break)break
continue
continue(continue -continue continue continue- continue)continue

# keyword.control.preposition.espresso
else
else(else -else else else- else)else
in
in(in -in in in- in)in

# keyword.control.procedure.espresso
redo
redo(redo -redo redo redo- redo)redo
return
return(return -return return return- return)return
exit
exit(exit -exit exit exit- exit)exit

# support.function.self.espresso
do
do(do -do do do- do)do

# variable.language.espresso
this
this(this -this this this- this)this
arguments
arguments(arguments -arguments arguments arguments- arguments)arguments
that
that(that -that that that- that)that
operation
operation(operation -operation operation operation- operation)operation
operand
operand(operand -operand operand operand- operand)operand

# storage.type.generic.espresso
(type type "bool")
(bool bool "bool")
(string string "string")
(number number "number")
(date date "date")
(range range "range")
(symbol symbol "symbol")
(tuple tuple "tuple")
(lambda lambda "lambda")
(function function "function")
(operator operator "operator")
(iterator iterator "iterator")
(promise promise "promise")
(array array "array")
(class class "class")
(object object "object")

# constant.language.espresso
null
null(null null null: null :null null@ null @null null)null
true
true(true true true: true :true true@ true @true true)true
false
false(false false false: false :false false@ false @false false)false
descending
descending(descending descending descending: descending :descending descending@ descending @descending descending)descending
equivalent
equivalent(equivalent equivalent equivalent: equivalent :equivalent equivalent@ equivalent @equivalent equivalent)equivalent
ascending
ascending(ascending ascending ascending: ascending :ascending ascending@ ascending @ascending ascending)ascending

# meta.operator.operator-decl.espresso
=?(=?(=? x )=? )

# meta.operator.lambda-decl.espresso
=(=(= x )= )
=(=(=: x )=: )
->(->(-> x )-> )
->(->(->: x )->: )
=>(=>(=> x )=> )
=>(=>(=> x : x )=> y : y)

# keyword.operator.global.espresso
+
(+)
(+(+ + +)
?
(?)
(?(? ? ?)
!
(!)
(!(! ! !))
~
(~)
(~(~ ~ ~))
not
(not)
(not(not not not))

# keyword.operator.double.espresso
++
(++)
(++(++ ++ ++))
--
(--)
(--(-- -- --))

# keyword.operator.general.espresso
(x ? t f)
((1 + 1)? t f)
(x ?* t f)
((1 + 1)?* t f)
(x ?? t f)
((1 + 1)?? t f)
(x || t f)
((1 + 1)|| t f)
and
(x and t f)
((1 + 1) and t f)
or
(x or t f)
((1 + 1) or t f)

# keyword.operator.bool.espresso
fails
(x fails)
((a is b) fails)
succeeds
(x succeeds)
((a is b) succeeds)

# meta.operator.arithmetic.espresso
+((1 + 2)+ 3)
++((1 ++ 2)++ 3)
+=((1 += 2)+= 3)

-((1 - 2)- 3)
--((1 -- 2)-- 3)
-=((1 -= 2)-= 3)

*((1 * 2)* 3)
*=((1 *= 2)*= 3)

/((1 / 2)/ 3)
/=((1 /= 2)/= 3)

%(% (1 % 2)% 3)
%=((1 %= 2)%= 3)

# meta.operator.bitwise.espresso
&(& (a & b)& c)
&=(&= (a &= b)&= c)

|(| (a | b)| c)
|=(|= (a |= b)|= c)

^(^ (a ^ b)^ c)
^=(^= (a ^= b)^= c)

<<(<< (a << b)<< c)
<<=(<<= (a <<= b)<<= c)

>>(>> (a >> b)>> c)
>>=(>>= (a >>= b)>>= c)

>>>(>>> (a >>> b)>>> c)
>>>=(>>>= (a >>>= b)>>>= c)

# meta.operator.comparison.espresso
==(== (a == b)== c)
!=(!= (a != b)!= c)

===(=== (a === b)=== c)
!==(!== (a !== b)!== c)

>(> (a > b)> c)
>=(>= (a >= b)>= c)

<(< (a < b)< c)
<=(<= (a <= b)<= c)

# meta.function.entity.espresso (null)
(((empty is) is) is x)
(((is-not is-not) is-not) is-not x)
(((equals equals) equals) equals x)
(((not-equals not-equals) not-equals) not-equals x)
(((compares-to compares-to) compares-to) compares-to x)
(((is-empty is-empty) is-empty) is-empty x)
(((not-empty not-empty) not-empty) not-empty x)
(((is-a is-a) is-a) is-a x)
(((is-an is-an) is-an) is-an x)
(((is-not-a is-not-a) is-not-a) is-not-a x)
(((is-not-an is-not-an) is-not-an) is-not-an x)
(((to-code to-code) to-code) to-code x)
(((to-string to-string) to-string) to-string x)

# meta.function.type.espresso (type)
(((of of) of) of x)
(((reflect reflect) reflect) reflect x)
(((seal seal) seal) seal x)
(((is-sealed is-sealed) is-sealed) is-sealed x)

# meta.constant.empty.espresso
(type empty)
(bool empty)
(string empty)
(number empty)
(date empty)
(range empty)
(symbol empty)
(tuple empty)

# meta.function.empty.espresso
(operator empty)
(lambda empty)
(function empty)
(iterator empty)
(promise empty)
(array empty)
(object empty)
(class empty)

# meta.function.other.empty.espresso
(((empty empty) empty) empty y)

# meta.operator.noop.espresso
(operator noop)

# meta.lambda.noop.espresso
(lambda noop)
(function noop)

# meta.lambda.static.espresso
(lambda static)

# meta.function-collection-espresso: string, tuple, array
length((length length) length)length
first((first first) first)first
first-of((first-of first-of) first-of)first-of
last((last last) last)last
last-of((last-of last-of) last-of)last-of
copy((copy copy) copy)copy
slice((slice slice) slice)slice
concat((concat concat) concat)concat

# meta.function-string-type-espresso
((string of-chars) of-chars)
((string of-code) of-code)
((string unescape) unescape)
((string format) format)
# meta.function-string-espresso
starts-with((starts-with starts-with) starts-with)starts-with
ends-with((ends-with ends-with) ends-with)ends-with
trim((trim trim) trim)trim
trim-left((trim-left trim-left) trim-left)trim-left
trim-right((trim-right trim-right) trim-right)trim-right
replace((replace replace) replace)replace
to-upper((to-upper to-upper) to-upper)to-upper
to-lower((to-lower to-lower) to-lower)to-lower
split((split split) split)split
as-chars((as-chars as-chars) as-chars)as-chars
char-at((char-at char-at) char-at)char-at

# meta.constant-number-espresso
max((number max) max)
min((number min) min)
smallest((number smallest) smallest)
infinite((number infinite) infinite)
-infinite((number -infinite) -infinite)
max-int((number max-int) max-int)
min-int((number min-int) min-int)
bits((number bits) bits)
max-bits((number max-bits) max-bits)
min-bits((number min-bits) min-bits)
invalid((number invalid) invalid)
# meta.function-number-type-espresso
parse((number parse) parse)
parse-int((number parse-int) parse-int)
of-int((number of-int) of-int)
of-bits((number of-bits) of-bits)
# meta.function-number-espresso
is-valid((n is-valid) is-valid)
is-invalid((n is-invalid) is-invalid)
is-int((n is-int) is-int)
is-not-int((n is-not-int) is-not-int)
is-bits((n is-bits) is-bits)
is-not-bits((n is-not-bits) is-not-bits)
is-finite((n is-finite) is-finite)
is-infinite((n is-infinite) is-infinite)
as-int((n as-int) as-int)
as-bits((n as-bits) as-bits)
st((n st) st)
nd((n nd) nd)
rd((n rd) rd)
th((n th) th)
plus((n plus) plus)
minus((n minus) minus)
times((n times) times)
divided-by((n divided-by) divided-by)
ceil((n ceil) ceil)
floor((n floor) floor)
round((n round) round)
trunc((n trunc) trunc)

# meta.constant-date-espresso
invalid((date invalid) invalid)
# meta.function-date-type-espresso
parse((date parse) parse)
of-utc((date of-utc) of-utc)
now((date now) now)
timestamp((date timestamp) timestamp)
timezone((date timezone) timezone)
# meta.function-date-espresso
is-valid((d is-valid) is-valid)
is-invalid((d is-invalid) is-invalid)
date-fields((d date-fields) date-fields)
time-fields((d time-fields) time-fields)
all-fields((d all-fields) all-fields)
week-day((d week-day) week-day)
timestamp((d timestamp) timestamp)

# meta.constant-symbol-espresso
etc((symbol etc) etc)
all((symbol all) all)
any((symbol any) any)
quote((symbol quote) quote)
lambda((symbol lambda) lambda)
stambda((symbol stambda) stambda)
function((symbol function) function)
operator((symbol operator) operator)
let((symbol let) let)
var((symbol var) var)
const((symbol const) const)
local((symbol local) local)
locon((symbol locon) locon)
escape((symbol escape) escape)
begin((symbol begin) begin)
end((symbol end) end)
comma((symbol comma) comma)
semicolon((symbol semicolon) semicolon)
period((symbol period) period)
literal((symbol literal) literal)
pairing((symbol pairing) pairing)
subject((symbol subject) subject)
comment((symbol comment) comment)
in((symbol in) in)
else((symbol else) else)

# meta.function-symbol-type-espresso
((symbol of-shared) of-shared)
((symbol is-safe) is-safe)

# meta.function-symbol-espresso
key((sym key) key)
is-safe((sym is-safe) is-safe)
is-unsafe((sym is-unsafe) is-unsafe)

# meta.constant-tuple-espresso
((tuple blank) blank)
((tuple unknown) unknown)
((tuple lambda) lambda)
((tuple stambda) stambda)
((tuple function) function)
((tuple operator) operator)
((tuple array) array)
((tuple object) object)
# meta.function-tuple-type-espresso
((tuple accepts) accepts)
((tuple atom-of) atom-of)
((tuple of-plain) of-plain)
((tuple from) from)
((tuple from-plain) from-plain)
# meta.function-tuple-espresso
is-plain((t is-plain) is-plain)
not-plain((t not-plain) not-plain)
source-map((t source-map) source-map)
iterate((t iterate) iterate)
merge((t merge) merge)
to-array((t to-array) to-array)

# meta.function-operation-espresso
parameters((f parameters) parameters)
body((f body) body)
is-static((f is-static) is-static)
is-const((f is-const) is-const)
is-generic((f is-generic) is-generic)
not-generic((f not-generic) not-generic)
generic((f generic) generic)
is-bound((f is-bound) is-bound)
not-bound((f not-bound) not-bound)
apply((f apply) apply)
bind((f bind) bind)

# meta.function-iterator-type-espresso
((iterator of-unsafe) of-unsafe)
# meta.function-iterator-espresso
skip((iter skip) skip)
keep((iter keep) keep)
select((iter select) select)
map((iter map) map)
reduce((iter reduce) reduce)
count((iter count) count)
for-each((iter for-each) for-each)
sum((iter sum) sum)
average((iter average) average)
join((iter join) join)
collect((iter collect) collect)
finish((iter finish) finish)

# meta.function-global-promise-espresso
commit((commit)commit)
commit*((commit*)commit*)
commit?((commit?)commit?)

# meta.object-promise-espresso
waiting((waiting)waiting)waiting
async((async)async)async

# meta.constants-waiting-promise-espresso
result((waiting result) result)result
excuse((waiting excuse) excuse)excuse

# meta.function-async-promise-espresso
resolve((async resolve) resolve)resolve
reject((async reject) reject)reject

# meta.constant-promise-espresso
nothing((promise nothing) nothing)

# meta.function-promise-type-espresso
((promise of-resolved) of-resolved)
((promise of-rejected) of-rejected)
((promise of-all) of-all)
((promise all) all)
((promise of-any) of-any)
((promise any) any)

# meta.function-promise-espresso
is-cancellable((prom is-cancellable) is-cancellable)
cancel((prom cancel) cancel)
then((prom then) then)
finally((prom finally) finally)

# meta.function-array-type-espresso
((array from) from)
# meta.function-array-espresso
trace((a trace) trace)
retrace((a retrace) retrace)
append((t append) append)
get((a get) get)
set((a set) set)
reset((a reset) reset)
clear((a clear) clear)
remove((a remove) remove)
replace((a replace) replace)
has((a has) has)
contains((a contains) contains)
swap((a swap) swap)
insert((a insert) insert)
delete((a delete) delete)
splice((a splice) splice)
push((a push) push)
pop((a pop) pop)
enqueue((a enqueue) enqueue)
dequeue((a dequeue) dequeue)
reverse((a reverse) reverse)
sort((a sort) sort)
find((a find) find)

# meta.function-object-type-espresso
((object of-generic) of-generic)
((object is-generic) is-generic)
((object not-generic) not-generic)
((object of-plain) of-plain)
((object is-plain) is-plain)
((object not-plain) not-plain)
((object assign) assign)
((object get) get)
((object set) set)
((object reset) reset)
((object clear) clear)
((object has) has)
((object owns) owns)
object fields-of ((object fields-of) fields-of)

# meta.function-class-type-espresso
((class attach) attach)
# meta.function-class-espresso
default((c default) default)
as((c as) as)
from((c from) from)
to-object((c to-object) to-object)
constructor((i constructor) constructor)
activator((i activator) activator)

# meta.function.runtime.espresso
compile((compile)compile)compile
compiler((compiler)compiler)compiler
tokenize((tokenize)tokenize)tokenize
tokenizer((tokenizer)tokenizer)tokenizer
eval((eval)eval)eval
run((run)run)run
env((env)env)env

# meta.function.lib.espresso
print((print)print)print
printf((printf)printf)printf
warn((warn)warn)warn
max((max)max)max
min((min)min)min
espress((espress)espress)espress

# meta.operator.lib.espresso
(debug)
(log)
(log v)
(log v v)
(log verbose verbose)
(log i i)
(log info  info)
(log w w)
(log warn warn)
(log warning warning)
(log e e)
(log err err)
(log error error)
(log d d)
(log debug debug)

# meta.function-uri-lib-espresso
((uri encode) encode)
((uri decode) decode)
((uri escape) escape)
uri unescape ((uri unescape) unescape)

# meta.function-json-lib-espresso
((json of) of)
((json parse) parse)

# meta.constant-math-lib-espresso
((math e) e)
((math pi) pi)
((math ln-2) ln-2)
((math ln-10) ln-10)
((math log-e) log-e)
((math log2-e) log2-e)
((math sqrt-2) sqrt-2)
((math sqrt-1/2) sqrt-1/2)

# meta.function-math-lib-espresso
((math sin) sin)
((math cos) cos)
((math tan) tan)
((math asin) asin)
((math acos) acos)
((math atan) atan)
((math atan2) atan2)
((math exp) exp)
((math pow) pow)
((math ln) ln)
((math log) log)
((math log2) log2)
((math sqrt) sqrt)
((math abs) abs)
((math max) max)
((math min) min)
((math random) random)

# support.variable.object.lib.espresso
uri
uri(uri uri uri)uri
json
json(json json json)json
math
math(math math math)math

# support.class.lib.espresso
emitter
emitter(emitter emitter emitter)emitter
timer
timer(timer timer timer)timer

# meta.function-emitter-espresso
on((e on) on)
off((e off) off)
emit((e emit) emit)

# meta.function-timer-class-espresso
((timer timeout) timeout)
((timer countdown) countdown)

# meta.function-timer-espresso
((t start) start)
((t is-elapsing) is-elapsing)
((t stop) stop)

# meta.function.test.espresso
(define define)(define define)
(should should) (should should)
(test test) (test test)

# meta.operator.test.espresso
(assert assert) (assert assert)

# numbers
00 01 07 08 09 0a
00i 01i 07i 08i 09i 0ai
0i 1i 11i 12i 18i 19i 1a
0x1234567890abcdef 0xg
0x1234567890abcdefi 0xgi
0x1234567890ABCDEF 0xG
0x1234567890ABCDEFi 0xGi
0b0011 0b0022
0b0011i 0b0022i
-0 0
-1 1
-1.03 1.03
-1.03e+12
-1.03E-12

# string.quoted.double.espresso
"123$bcd\"''$\t xyz" 123

# string.format.single.espresso
'" 123 $() xyz'

# comment.line.hash.espresso
# single line comment
123 # single line comment

# comment.block.hash.espresso
#( block comment )#
123 true#( block comment )#123
#( multiple lines comment
  multiple lines comment
)#
123 null#( multiple lines comment
  multiple lines comment
)#123
