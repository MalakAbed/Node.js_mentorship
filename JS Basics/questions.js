// variables

// Q1
console.log(y);
let y = 10;

// Output
ReferenceError: Cannot access 'y' before initialization
// because let variables are in the Temporal Dead Zone before initialization.



// Q2
var a = 2;
var a = 5;
console.log(a);

// Output
5
// because var allows redeclaration in the same scope.


// Q3
let b = 100;
{
    let b = 50;
    console.log(b);
}
console.log(b);

// Output
50
100
// let is block-scoped.


// Q4
const obj = { name: "NodeJS" };
obj.name = "JavaScript";
console.log(obj.name);

// Output
JavaScript
// because const objects allow property mutation.


// Q5
x = 42;
console.log(global.x === x);

// Output
true
// because undeclared variables become properties of the global object.


// Q6
function test() {
    var z = 1;
    return function() {
        z++;
        return z;
    }
}
const fn = test();
console.log(fn(), fn(), fn());

// Output
2 3 4
// due to closure preserving z across calls.





// scopes and functions

// Q7
foo();           // Output: B
var foo = function () { console.log('A'); };
function foo() { console.log('B'); }
foo();           // Output: A
// because function declarations are hoisted before var assignments.


// Q8
function run(x) {
    console.log(x);
    var x = 10;
    console.log(x);
}
run(5);

// Output
5
10
// because the parameter x is overwritten by the var x.


// Q9
{
    function f() { return 1; }
}
console.log(typeof f);

// Output
"undefined" in modern strict mode (because f is block-scoped),
"function" in non-strict mode (because the function declaration is hoisted to the outer scope).  

  
// Q10
const inc = (function () {
    let n = 0;
    return () => ++n;
})();
console.log(inc(), inc(), inc());

// Output
1 2 3
// because the IIFE closure keeps and increments n.


// Q11
const obj = {
    val: 7,
    a: () => this.val,
    b() { return this.val; }
};
console.log(obj.a(), obj.b());

// Output
undefined 7
// because arrow functions don’t bind this but normal methods do.


// Q12
const model = {
    x: 3,
    getX() { return this.x; }
};
const fn = model.getX;
console.log(fn());

// Output
undefined
// when extracted, this is not bound to model, so this.x is undefined.


// Q13
const user = { id: 42, get() { return this.id; } };
const g = user.get.bind({ id: 99 });
console.log(g());

// Output
99
// .bind explicitly sets this to { id: 99 }.


// Q14
function sum(a = 2, b = a * 3, c = b + a) {
    return a + b + c;
}
console.log(sum());

// Output
16
// Defaults are a=2, b=6, c=8, so result = 2+6+8=16.


// Q15
const f = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
};
const g = f;
f = null;
console.log(g(4));

// Output
TypeError: Assignment to constant variable.
// f is declared with const, so f = null throws before g(4) runs; 
  // the inner name fact would allow recursion only if reassignment didn’t error.
  

// Q16
function outer() {
    const inner = () => Array.from(arguments).length;
    return inner(1,2,3);
}
console.log(outer(10, 20));

// Output
2
// Arrow functions capture arguments from their outer scope, so it counts outer’s args = 2.


// Q17
const out = [];
for (var i = 0; i < 3; i++) {
    out.push(() => i);
}
console.log(out[0](), out[1](), out[2]());

// Output
3 3 3
// var is function-scoped, so all closures share the same i, which ends as 3.


// Q18
function h(x) {
    {
        let x = x || 5;
        console.log(x);
    }
}
h(0);

// Output
ReferenceError: Cannot access 'x' before initialization
// The inner let x shadows the parameter, so x on the right side is accessed before initialization (TDZ).


// Q19
function applyTwice(fn, n) {
    return fn(fn(n));
}
let base = 2;
function addBase(x) { return x + base; }
base = 3;
console.log(applyTwice(addBase, 4));

// Output
10
// with base=3, first addBase(4)=7, then addBase(7)=10.


// Q20
const counter = {
    n: 0,
    inc: () => ++this.n
};
console.log(counter.inc(), counter.inc());

// Output
NaN NaN
// Arrow functions don’t bind this, so this.n is undefined (global this), making the result NaN (Not a Number).


// Q21
const obj = {
    x: 10,
    normal: function () { return this.x; },
    arrow: () => this.x
};
console.log(obj.normal(), obj.arrow());

// Output
10 undefined
// normal functions bind this to the object, but arrow functions inherit this from the outer scope.


// Q22
function* gen() {
    yield 1;
    yield 2;
    return 3;
}
const g = gen();
console.log(g.next().value, g.next().value, g.next().value);

// Output
1 2 3
// Generators yield 1, then 2, and finally return 3 (appears as .value on the last done: true).


// Q23
async function f() {
    return 5;
}
f().then(v => console.log(v));

// Output
5
// async always returns a Promise, which resolves with value 5.

  
// Q24
(function(n) {
    console.log(n * n);
})(4);

// Output
16
// Immediately Invoked Function Expression (IIFE) squares 4.


// Q25
function delay(ms) {
    return new Promise(r => setTimeout(() => r("done"), ms));
}
(async function() {
    const res = await delay(100);
    console.log(res);
})();

// Output
done
// await pauses until the Promise resolves, then prints "done".


// Q26
const f = function fact(n) {
    return n <= 1 ? 1 : n * fact(n - 1);
};
console.log(f(4));

// Output
24
// Named function expression fact supports recursion, so factorial of 4 = 24.


// Q27
function* seq() {
    yield 'A';
    yield 'B';
}
for (const val of seq()) {
    console.log(val);
}

// Output
A 
B
// Generator yields 'A' then 'B', loop consumes them.


// Q28
const make = () => ({ a: 1 });
console.log(make());

// Output
{ a: 1 }
// arrow function wrapped in () returns an object literal.


// Q29
function* g1() { yield 1; yield 2; }
function* g2() { yield* g1(); yield 3; }
console.log([...g2()]);

// Output
[ 1, 2, 3 ]
// yield* delegates to g1, then continues with its own yield.


// Q30
setTimeout(function() {
    console.log(this === global);
}, 0);

setTimeout(() => {
    console.log(this === global);
}, 0);

// Output
false
false
// in Node modules the regular setTimeout callback’s this is the timer object (not global), 
  // and the arrow callback captures the surrounding this (the module’s this, i.e. module.exports), so neither equals global.


// Q31
async function* ag() {
    yield 1;
    yield 2;
}
(async () => {
    for await (const x of ag()) {
        console.log(x);
    }
})();

// Output
1
2
// Async generator yields values consumed by for await...of.




// strings

// Q32
console.log("5" + 3 + 2);

// Output
532
// String concatenation happens left-to-right, so "5" + 3 = "53", then "53" + 2 = "532".


// Q33
let str = "  NodeJS  ";
console.log(str.trim().length);

// Output
6
// .trim() removes spaces, leaving "NodeJS" of length 6.


// Q34
let text = "JavaScript";
console.log(text.slice(4, 10), text.substring(4, 10));

// Output
Script Script
// Both slice(4,10) and substring(4,10) extract "Script".


// Q35
console.log("Line1\nLine2".length);

// Output
11
// "Line1" (5) + newline \n (1) + "Line2" (5) = 11.


// Q36
let s = "foo foo";
console.log(s.replace("foo", "bar"), s.replace(/foo/g, "bar"));

// Output
bar foo bar bar
// .replace() changes only the first match; regex /g replaces all.


// Q37
let str = "a,b,c";
console.log(str.split(",").join("-"));

// Output
a-b-c
// split into array ["a","b","c"], then joined with "-".


// Q38
console.log(+"42" === Number("42"));

// Output
true
// unary + and Number() both convert "42" to number 42.


// Q39
let str = "Hello";
console.log(str[str.length - 1]);

// Output
o
// indexing last character with length - 1.


// Q40
let str = "Hello";
console.log(str.slice(-1));

// Output
o
// Negative index in slice extracts from the end.


// Q41
console.log("\u004E\u006F\u0064\u0065");

// Output
Node
// Unicode escapes spell “Node”.



// arrays

// Q42
const arr = [5, 10, 15, 20];
console.log(arr.filter(x => x > 10));

// Output
[ 15, 20 ]
// .filter keeps elements greater than 10.


// Q43
const arr = [1, 2, 3, 4];
const total = arr.reduce((acc, cur) => acc + cur, 0);
console.log(total);

// Output
10
// sum of array = 10.


// Q44
const arr = [1, 2, 3];
const res = arr.reduce((acc, cur) => acc + cur, 10);
console.log(res);

// Output
16
// initial value 10 + sum of elements (6) = 16. 


// Q45
const nums = [1,2,3];
const a = nums.map(x => x * 2);
const b = nums.forEach(x => x * 2);
console.log(a, b);

// Output
[ 2, 4, 6 ] undefined
// .map returns new array; .forEach returns undefined.


// Q46
const arr = [7, 14, 21];
console.log(arr.find(x => x % 7 === 0), arr.filter(x => x % 7 === 0));

// Output
7 [ 7, 14, 21 ]
// .find gives first match; .filter returns all matches.


// Q47
const arr = [2, 4, 6];
console.log(arr.some(x => x % 2 === 1), arr.every(x => x % 2 === 0));

// Output
false true
// none are odd (some → false); all are even (every → true).


// Q48
const arr = [1, 2, 3];
console.log(arr.flatMap(x => [x, x*2]));

// Output
[ 1, 2, 2, 4, 3, 6 ]
// each element mapped to two values, then flattened.


// Q49
const arr = [1, 2, 3, 4, 5];
const res = arr.map(x => x*2).filter(x => x > 5);
console.log(res);

// Output
[ 6, 8, 10 ]
// After doubling = [2,4,6,8,10], filter keeps >5.


// Q50
const arr = ['a','b','a','c','b'];
const count = arr.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
}, {});
console.log(count);

// Output
{ a: 2, b: 2, c: 1 }
// .reduce counts frequency of elements.




// Types

// Q51
console.log(Number("10px"))
console.log(parseInt("10px"))

// Output
NaN
10
// Number requires full numeric string; parseInt parses prefix digits.


// Q52
console.log(isNaN("foo"), Number.isNaN("foo"));

// Output
true false
// isNaN("foo") coerces to number (NaN) → true; Number.isNaN("foo") checks type strictly → false.


// Q53
const a = 2, b = "3";
console.log(`${a + b}`);

// Output
23
// number + string concatenates into "23". 




// Loops

// Q54
const a = [10];
a.foo = 99;
for (const k in a)  console.log("in:", k);
for (const v of a)  console.log("of:", v);

// Output
in: 0
in: foo
of: 10
// for...in iterates keys (indices + properties); for...of iterates values.


// Conditions

// Q55
const obj = { a: { b: 0 } };
const x = obj.a?.b ?? 7;

// Output
nothing is logged in this snippet, but x is 0.
// ?. is the optional chaining operator. It safely tries to access obj.a.b.
  // Since obj.a exists, it proceeds. obj.a.b is 0.
// Nullish coalescing ?? → This operator only falls back to the right-hand value if the left side is null or undefined.


// Q56
console.log("A" && "" || "C")

// Output
C
// "A" && "" gives "" (falsy), so "" || "C" returns "C".
