export const DIFFICULTIES = ['Easy', 'Moderate', 'Hard']

export const topics = [
  {
    id: 'html',
    name: 'HTML',
    icon: 'html',
    tagline: 'Structure, semantics & accessibility',
    accent: '#f97316',
    questions: [
      {
        id: 'html-1',
        difficulty: 'Easy',
        question: 'What is semantic HTML and why does it matter?',
        answer: `Semantic HTML means using tags that describe the **meaning** of the content instead of generic containers: [[<header>]], [[<nav>]], [[<main>]], [[<article>]], [[<section>]], [[<footer>]], [[<button>]].

Why it matters:
- **Accessibility** — screen readers build a better outline of the page.
- **SEO** — search engines understand which content is primary.
- **Maintainability** — the markup reads like documentation.
- **Native behaviour** — [[<button>]] is keyboard focusable and works with Enter/Space for free; a [[<div onclick>]] is not.

Rule of thumb: if a native element already does the job, use it before reaching for ARIA.`,
      },
      {
        id: 'html-2',
        difficulty: 'Easy',
        question: 'What is the difference between <div> and <span>?',
        answer: `Both are generic, non-semantic containers — the difference is their default display behaviour.

- [[<div>]] is a **block-level** element. It starts on a new line and takes the full available width. Use it to group larger sections.
- [[<span>]] is **inline**. It flows with the text and only takes as much width as its content. Use it to style a piece of text.

~~~html
<p>This is <span class="highlight">important</span> text.</p>
<div class="card">A whole section</div>
~~~`,
      },
      {
        id: 'html-3',
        difficulty: 'Easy',
        question: 'What are data-* attributes used for?',
        answer: `They let you attach **custom data** to an element without inventing invalid attributes.

~~~html
<button data-user-id="42" data-action="delete">Delete</button>
~~~

Read them in JS via the [[dataset]] API:

~~~js
const btn = document.querySelector('button')
console.log(btn.dataset.userId) // "42"
~~~

Common uses: passing IDs to event handlers, storing configuration for a widget, and CSS hooks like [[[data-state="open"]]]. Do **not** store secrets or large objects in them.`,
      },
      {
        id: 'html-4',
        difficulty: 'Moderate',
        question: 'What is the difference between the script, defer and async attributes?',
        answer: `All three control when an external script is fetched and executed.

- **No attribute** — parsing pauses, script is fetched and run immediately. Blocks rendering.
- [[defer]] — fetched in parallel, executed **after HTML parsing**, in document order. Best for scripts that need the DOM.
- [[async]] — fetched in parallel, executed **as soon as it downloads**. Order is not guaranteed.

~~~html
<script src="app.js" defer></script>
<script src="analytics.js" async></script>
~~~

Use [[defer]] for application code and [[async]] for independent third-party widgets.`,
      },
      {
        id: 'html-5',
        difficulty: 'Moderate',
        question: 'What is accessibility (a11y) and how do you implement it in practice?',
        answer: `Accessibility means your UI works for people using screen readers, keyboards, zoom, or reduced motion. Practical checklist:

- Use semantic elements and a logical heading order (only one [[<h1>]]).
- Every image needs meaningful [[alt]] text; decorative images use [[alt=""]]
- Every form input needs a [[<label for="...">]]
- Keep a visible focus ring — never [[outline: none]] without a replacement.
- Ensure **4.5:1** colour contrast for normal text.
- Make custom widgets keyboard operable and use [[aria-expanded]], [[aria-controls]], [[role]] where needed.
- Respect [[prefers-reduced-motion]].

Test by tabbing through the page with the mouse unplugged.`,
      },
      {
        id: 'html-6',
        difficulty: 'Easy',
        question: 'What is the DOM?',
        answer: `The **Document Object Model** is the browser's in-memory, tree-shaped representation of the HTML document. Each tag becomes a node, and JS can read or mutate it.

~~~js
document.querySelector('h1').textContent = 'Hello'
~~~

Key points:
- The DOM is **not** your HTML source — it is a live model that changes as JS runs.
- Updating it can trigger style recalculation, layout and paint.
- React and other frameworks keep their own virtual tree and batch the real DOM updates.`,
      },
      {
        id: 'html-7',
        difficulty: 'Moderate',
        question: 'Difference between GET and POST form submissions?',
        answer: `- **GET** appends data to the URL as a query string ([[?name=Aman]]). It is bookmarkable, cacheable, and should only be used for *reading* data. Never send passwords with GET.
- **POST** sends data in the request body. It is not visible in the URL, has no practical size limit, and is used for creating or modifying data.

Typical flow: the browser collects inputs, URL-encodes them, sends the request, and navigates to the response. To avoid a full page reload you call [[event.preventDefault()]] and submit with [[fetch]].`,
      },
      {
        id: 'html-8',
        difficulty: 'Hard',
        question: 'What are Web Components and the Shadow DOM?',
        answer: `Web Components are a browser-native way to build reusable, encapsulated elements. They combine three specs:

1. **Custom Elements** — define your own tag: [[customElements.define('user-card', UserCard)]]
2. **Shadow DOM** — [[this.attachShadow({ mode: 'open' })]] creates a private subtree whose styles do not leak in or out.
3. **HTML Templates** — [[<template>]] holds inert markup you clone on demand.

~~~js
class UserCard extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = '<style>p{color:teal}</style><p>Hi</p>'
  }
}
~~~

Styles are isolated, so you get true encapsulation — but theming requires CSS custom properties or [[::part()]].`,
      },
    ],
  },
  {
    id: 'css',
    name: 'CSS',
    icon: 'css',
    tagline: 'Layout, cascade & responsive design',
    accent: '#3b82f6',
    questions: [
      {
        id: 'css-1',
        difficulty: 'Easy',
        question: 'Explain the CSS box model.',
        answer: `Every element is a box made of four layers, from inside out:

- **content** — the text or image
- **padding** — space inside the border
- **border** — the visible edge
- **margin** — space outside the border

By default [[box-sizing: content-box]] means [[width]] covers only the content, so padding and border make the element bigger. Most projects set:

~~~css
*, *::before, *::after { box-sizing: border-box; }
~~~

Now [[width]] includes padding and border, which makes layouts predictable.`,
      },
      {
        id: 'css-2',
        difficulty: 'Easy',
        question: 'How does CSS specificity work?',
        answer: `When rules conflict, the browser picks the one with the highest specificity (then falls back to source order).

From highest to lowest:
1. Inline styles — 1000
2. IDs — 100
3. Classes, attributes, pseudo-classes — 10
4. Elements and pseudo-elements — 1

~~~css
p.intro { color: blue; }        /* 0,1,1 */
#hero p { color: red; }         /* 1,0,1  -> wins */
~~~

[[!important]] overrides normal declarations and should be a last resort. Best practice: keep specificity low and flat, favour classes over IDs.`,
      },
      {
        id: 'css-3',
        difficulty: 'Moderate',
        question: 'When should you use Flexbox vs CSS Grid?',
        answer: `**Flexbox is one-dimensional** — it distributes items along a single row *or* column. Great for navbars, button groups, centring, and toolbars.

**Grid is two-dimensional** — it controls rows *and* columns at the same time. Great for page layouts, dashboards, card galleries.

~~~css
.nav { display: flex; align-items: center; gap: 1rem; }
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}
~~~

They compose well: a grid for the page shell, flex inside each card.`,
      },
      {
        id: 'css-4',
        difficulty: 'Moderate',
        question: 'What is the difference between display: none and visibility: hidden?',
        answer: `- [[display: none]] removes the element from layout entirely. It takes no space, is not rendered, and is ignored by screen readers. Toggling it triggers layout.
- [[visibility: hidden]] keeps the element's space in the layout but makes it invisible. It still occupies its box, and it is not announced by assistive tech.
- [[opacity: 0]] keeps the element visible to layout *and* to assistive tech; it can still receive clicks unless [[pointer-events: none]].

Use [[display: none]] to remove content, [[visibility]] when you need to reserve space.`,
      },
      {
        id: 'css-5',
        difficulty: 'Easy',
        question: 'What is the difference between px, em, rem, vh and vw?',
        answer: `- **px** — absolute CSS pixels. Predictable, but ignores user font scaling.
- **em** — relative to the *parent's* font size (or the element's own for properties other than font-size). Compounds when nested.
- **rem** — relative to the **root** font size. Best for consistent spacing and typography.
- **%** — relative to the parent's corresponding dimension.
- **vh / vw** — 1% of the viewport height / width. Handy for full-screen sections; beware mobile browser chrome.

~~~css
html { font-size: 16px; }
.card { padding: 1.5rem; font-size: 1.125rem; }
.hero { min-height: 100vh; }
~~~`,
      },
      {
        id: 'css-6',
        difficulty: 'Moderate',
        question: 'Explain the position property values.',
        answer: `- [[static]] — default; elements follow normal flow, offsets are ignored.
- [[relative]] — stays in flow, but can be nudged with top/left; also becomes a positioning context for children.
- [[absolute]] — removed from flow and positioned against the nearest **positioned ancestor** (or the page).
- [[fixed]] — positioned against the viewport; stays put while scrolling.
- [[sticky]] — behaves relative until a scroll threshold, then sticks. Requires a [[top]] value and a scrollable ancestor.

~~~css
.toolbar { position: sticky; top: 0; z-index: 10; }
.badge { position: absolute; top: 8px; right: 8px; }
~~~`,
      },
      {
        id: 'css-7',
        difficulty: 'Moderate',
        question: 'How do z-index and stacking contexts work?',
        answer: `[[z-index]] only applies to positioned elements (or flex/grid items) and only compares siblings **inside the same stacking context**.

A new stacking context is created by things like:
- [[position: relative/absolute]] with a z-index
- [[opacity]] less than 1
- [[transform]], [[filter]], [[will-change]]
- [[isolation: isolate]]

The trap: a child with [[z-index: 9999]] cannot escape its parent's stacking context, so it may still appear under a sibling of the parent. Fix the context rather than raising numbers.

Keep a small z-index scale (e.g. 10 / 20 / 30 for dropdown, modal, toast) defined as CSS variables.`,
      },
      {
        id: 'css-8',
        difficulty: 'Easy',
        question: 'What are pseudo-classes and pseudo-elements?',
        answer: `**Pseudo-classes** select an element in a particular *state* or position: [[:hover]], [[:focus-visible]], [[:first-child]], [[:nth-child(2n)]], [[:has()]].

**Pseudo-elements** style a *part* of an element or inject generated content: [[::before]], [[::after]], [[::placeholder]], [[::selection]].

~~~css
button:hover { background: #eef2ff; }
li:nth-child(odd) { background: #f8fafc; }
.label::after { content: ' *'; color: crimson; }
~~~

Pseudo-elements use a double colon; pseudo-classes use a single colon.`,
      },
      {
        id: 'css-9',
        difficulty: 'Hard',
        question: 'What is the difference between reflow and repaint?',
        answer: `- **Reflow (layout)** recalculates geometry: changing width, font-size, adding/removing elements. It is expensive because it can cascade to ancestors and siblings.
- **Repaint** only redraws pixels: changing colour or background. Cheaper, but still costs GPU/CPU time.

Reads that force synchronous layout ([[offsetHeight]], [[getBoundingClientRect()]]) inside a loop cause **layout thrashing**.

~~~js
// Bad: read, write, read, write...
for (const el of items) el.style.width = el.offsetWidth + 10 + 'px'

// Better: batch reads, then writes
const widths = items.map((el) => el.offsetWidth)
items.forEach((el, i) => (el.style.width = widths[i] + 10 + 'px'))
~~~

Prefer animating [[transform]] and [[opacity]] — they can be composited without layout.`,
      },
      {
        id: 'css-10',
        difficulty: 'Moderate',
        question: 'How do CSS custom properties (variables) work?',
        answer: `They are live values stored in the cascade and inherited by descendants.

~~~css
:root {
  --brand: #4f46e5;
  --radius: 12px;
}
.card {
  background: var(--brand);
  border-radius: var(--radius, 8px); /* fallback */
}
~~~

Because they are dynamic, you can override them per component, per media query, or from JS:

~~~js
document.documentElement.style.setProperty('--brand', '#0ea5e9')
~~~

This is exactly how dark mode and Tailwind theme tokens are implemented. Unlike Sass variables, they exist at runtime and cascade.`,
      },
      {
        id: 'css-11',
        difficulty: 'Hard',
        question: 'What are container queries and when are they useful?',
        answer: `Media queries respond to the **viewport**; container queries respond to the **size of a parent element**. That makes truly reusable components: the same card can render compact in a sidebar and rich in the main column.

~~~css
.card-wrap { container-type: inline-size; }

@container (min-width: 480px) {
  .card { display: flex; gap: 1rem; }
}
~~~

You can also query style values with [[@container style(--theme: dark)]]. Baseline support is now broad, so they are a practical replacement for many JS resize observers.`,
      },
    ],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'js',
    tagline: 'Core language, async & the event loop',
    accent: '#eab308',
    questions: [
      {
        id: 'js-1',
        difficulty: 'Easy',
        question: 'Difference between var, let and const?',
        answer: `- [[var]] is **function-scoped**, hoisted and initialised to [[undefined]]. It can be redeclared.
- [[let]] is **block-scoped** (inside [[{ }]]), hoisted but in the *temporal dead zone* until initialised. Reassignable.
- [[const]] is block-scoped and cannot be reassigned — but objects and arrays it points to are still mutable.

~~~js
const user = { name: 'Aman' }
user.name = 'Riya'   // allowed
user = {}            // TypeError

if (true) {
  let x = 1
}
console.log(x)       // ReferenceError
~~~

Prefer [[const]] by default, [[let]] when reassignment is needed, and avoid [[var]].`,
      },
      {
        id: 'js-2',
        difficulty: 'Easy',
        question: 'What is the difference between == and ===?',
        answer: `[[===]] compares value **and** type (strict equality). [[==]] performs type coercion before comparing.

~~~js
1 == '1'        // true
1 === '1'       // false
null == undefined  // true
null === undefined // false
NaN === NaN     // false
~~~

Always use [[===]] unless you deliberately want [[value == null]] to catch both [[null]] and [[undefined]]. Odd fact: [[Object.is(NaN, NaN)]] is true and [[Object.is(-0, 0)]] is false.`,
      },
      {
        id: 'js-3',
        difficulty: 'Moderate',
        question: 'What is hoisting?',
        answer: `Before code runs, the engine moves declarations to the top of their scope.

- **Function declarations** are hoisted with their body — you can call them before they appear.
- [[var]] declarations are hoisted and initialised to [[undefined]].
- [[let]] and [[const]] are hoisted but stay uninitialised in the **temporal dead zone**; accessing them early throws.

~~~js
sayHi()            // works
function sayHi() { console.log('hi') }

console.log(a)     // undefined
var a = 1

console.log(b)     // ReferenceError
let b = 1
~~~

Function expressions and arrow functions assigned to variables follow the variable's rules, not function hoisting.`,
      },
      {
        id: 'js-4',
        difficulty: 'Moderate',
        question: 'What is a closure? Give a practical use case.',
        answer: `A closure is a function that keeps access to its lexical scope even after the outer function has returned.

~~~js
function counter() {
  let count = 0
  return () => ++count
}
const next = counter()
next() // 1
next() // 2
~~~

The variable [[count]] stays alive in memory because the inner function references it. It is private — nobody else can touch it.

Real uses: module patterns, memoisation, event handlers that remember state, debounce timers, and React hooks (where each render's values are captured).`,
      },
      {
        id: 'js-5',
        difficulty: 'Moderate',
        question: 'How does "this" work, and how do arrow functions differ?',
        answer: `[[this]] depends on **how a function is called**, not where it is written:

- [[obj.method()]] → [[this]] is [[obj]]
- plain [[fn()]] → [[this]] is [[undefined]] in strict mode ([[window]] in sloppy mode)
- [[new Fn()]] → a fresh object
- [[fn.call(x)]], [[fn.apply(x)]], [[fn.bind(x)]] → explicitly bound

Arrow functions have **no own this** — they capture it lexically from the surrounding scope, and cannot be used with [[new]] or [[arguments]].

~~~js
const team = {
  name: 'Web',
  greet() { return 'Hi ' + this.name },      // works
  broken: () => 'Hi ' + this.name,           // undefined
}
~~~

This is why arrow functions are perfect inside [[setTimeout]] or array methods inside methods.`,
      },
      {
        id: 'js-6',
        difficulty: 'Hard',
        question: 'Explain the event loop, microtasks and macrotasks.',
        answer: `JavaScript runs on a single call stack. Async work is queued and drained by the event loop.

- **Call stack** — executes synchronous code.
- **Microtask queue** — Promises, [[queueMicrotask]], MutationObserver. Drained **completely** after each task, before rendering.
- **Macrotask (task) queue** — [[setTimeout]], [[setInterval]], I/O, UI events. One per loop iteration.

~~~js
console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('4')

// 1 4 3 2
~~~

A never-ending chain of promise callbacks can starve rendering, because microtasks keep being processed before the browser paints.`,
      },
      {
        id: 'js-7',
        difficulty: 'Moderate',
        question: 'Promises vs async/await — and how do you handle errors?',
        answer: `They are the same mechanism; [[async/await]] is syntax sugar over promises that makes sequential code readable.

~~~js
// Promise chain
fetch('/api/user')
  .then((r) => r.json())
  .then((u) => console.log(u))
  .catch((e) => console.error(e))

// async/await
async function load() {
  try {
    const res = await fetch('/api/user')
    if (!res.ok) throw new Error('HTTP ' + res.status)
    console.log(await res.json())
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}
~~~

Important: [[await]] pauses only that async function, not the whole thread. Independent calls should run in parallel with [[Promise.all]] instead of sequential awaits.`,
      },
      {
        id: 'js-8',
        difficulty: 'Easy',
        question: 'Difference between map, filter and reduce?',
        answer: `- [[map]] transforms every item, returns a new array of the same length.
- [[filter]] keeps items that pass a predicate.
- [[reduce]] folds the array into a single value (number, object, string…).

~~~js
const nums = [1, 2, 3, 4]
nums.map((n) => n * 2)          // [2, 4, 6, 8]
nums.filter((n) => n % 2 === 0) // [2, 4]
nums.reduce((sum, n) => sum + n, 0) // 10
~~~

None of them mutate the original. Chain them for readable data pipelines, but avoid over-chaining on very large arrays when a single loop is clearer and faster.`,
      },
      {
        id: 'js-9',
        difficulty: 'Moderate',
        question: 'What is event bubbling, capturing, and delegation?',
        answer: `An event travels in three phases: **capture** (window → target), **target**, then **bubble** (target → window).

~~~js
el.addEventListener('click', handler)          // bubble phase (default)
el.addEventListener('click', handler, true)    // capture phase
~~~

[[event.stopPropagation()]] halts the journey; [[event.preventDefault()]] cancels the browser's default action (very different).

**Delegation** uses bubbling: attach one listener to a container and inspect [[event.target.closest('button')]]. Fewer listeners, and dynamically added children work automatically.

~~~js
list.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-id]')
  if (btn) remove(btn.dataset.id)
})
~~~`,
      },
      {
        id: 'js-10',
        difficulty: 'Moderate',
        question: 'Shallow copy vs deep copy — how do you do each?',
        answer: `- **Shallow copy** copies only the top level. Nested objects are still shared.
  [[({ ...obj })]], [[[...arr]]], [[Object.assign({}, obj)]]
- **Deep copy** recursively clones every level.

~~~js
const original = { user: { name: 'Aman' } }
const shallow = { ...original }
shallow.user.name = 'Riya'
console.log(original.user.name) // 'Riya' — shared!
~~~

Modern deep copy: [[structuredClone(original)]]. It handles Dates, Maps, Sets and cycles, but not functions or DOM nodes. The old hack [[JSON.parse(JSON.stringify(x))]] loses Dates, undefined and prototypes.`,
      },
      {
        id: 'js-11',
        difficulty: 'Hard',
        question: 'Implement debounce and explain throttle.',
        answer: `**Debounce** waits until the user stops firing events. **Throttle** runs at most once per interval.

~~~js
function debounce(fn, delay = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

function throttle(fn, limit = 300) {
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now - last >= limit) {
      last = now
      fn.apply(this, args)
    }
  }
}
~~~

Use debounce for search inputs and resize-end logic; throttle for scroll position, drag and mousemove. In React, wrap these in [[useRef]]/[[useMemo]] so the timer survives re-renders.`,
      },
      {
        id: 'js-12',
        difficulty: 'Easy',
        question: 'localStorage vs sessionStorage vs cookies?',
        answer: `- **localStorage** — ~5 MB, persists until cleared, not sent to the server, synchronous. Good for theme and non-sensitive preferences.
- **sessionStorage** — same API, cleared when the tab closes. Good for multi-step form drafts.
- **cookies** — ~4 KB, sent automatically with every same-origin request, support expiry and [[HttpOnly]] / [[Secure]] / [[SameSite]] flags. Required for server-side sessions and auth tokens you want hidden from JS.

Security note: anything in localStorage is readable by any script, so it is vulnerable to XSS. Prefer HttpOnly cookies for auth.`,
      },
      {
        id: 'js-13',
        difficulty: 'Moderate',
        question: 'What is prototypal inheritance?',
        answer: `Every object has an internal link to a **prototype**. Property lookups walk that chain until they find the key or hit [[null]].

~~~js
const animal = { speak() { return 'sound' } }
const dog = Object.create(animal)
dog.speak() // 'sound' — found on the prototype
~~~

Classes are sugar over the same model: methods live on [[Class.prototype]], and [[extends]] links prototypes.

Do not confuse [[__proto__]] (the prototype link) with [[prototype]] (a property that exists on functions and is used when constructing with [[new]]). Avoid mutating built-in prototypes.`,
      },
      {
        id: 'js-14',
        difficulty: 'Hard',
        question: 'What is currying? Write a curry helper.',
        answer: `Currying turns a function of N arguments into a chain of functions that each take one argument, enabling partial application.

~~~js
const curry = (fn) =>
  function curried(...args) {
    return args.length >= fn.length
      ? fn(...args)
      : (...next) => curried(...args, ...next)
  }

const add = curry((a, b, c) => a + b + c)
add(1)(2)(3)  // 6
add(1, 2)(3)  // 6
add(1)(2, 3)  // 6
~~~

Uses: reusable configured functions ([[const log = curry(fn)(prefix)]]), function composition in FP-style codebases, and cleaner dependency injection in tests.`,
      },
    ],
  },
  {
    id: 'react',
    name: 'React',
    icon: 'react',
    tagline: 'Components, hooks & rendering',
    accent: '#22d3ee',
    questions: [
      {
        id: 'react-1',
        difficulty: 'Easy',
        question: 'What is React and why use it?',
        answer: `React is a JavaScript library for building UIs from **composable components**. You describe what the UI should look like for a given state, and React updates the DOM efficiently.

Core ideas:
- **Declarative** — you change state, not individual DOM nodes.
- **Component model** — small, reusable, testable units.
- **Virtual DOM + reconciliation** — React diffs a lightweight tree and applies minimal real DOM changes.
- **One-way data flow** — data goes down via props, events go up via callbacks.

It is a library, not a full framework: routing, data fetching and styling are separate choices.`,
      },
      {
        id: 'react-2',
        difficulty: 'Easy',
        question: 'What is JSX?',
        answer: `JSX is syntax sugar that compiles to [[React.createElement]] calls (or the modern JSX runtime).

~~~jsx
const el = <h1 className="title">Hello {name}</h1>
~~~

Rules worth knowing:
- Use [[className]] and [[htmlFor]] instead of [[class]] and [[for]].
- Expressions go in [[{ }]]; statements do not.
- Components must start with a capital letter, otherwise JSX treats them as HTML tags.
- Adjacent elements need a single parent or a fragment [[<></>]].
- You can render arrays with [[.map()]], but each item needs a stable [[key]].`,
      },
      {
        id: 'react-3',
        difficulty: 'Easy',
        question: 'Difference between props and state?',
        answer: `- **Props** are passed *into* a component from its parent. They are read-only — a child must never mutate them.
- **State** is data a component owns and can change, using [[useState]] or [[useReducer]]. Changing it triggers a re-render.

~~~jsx
function Counter({ step }) {      // prop
  const [count, setCount] = useState(0) // state
  return <button onClick={() => setCount(count + step)}>{count}</button>
}
~~~

Rule: if the parent needs to know or control the value, keep it in state higher up and pass it down as props.`,
      },
      {
        id: 'react-4',
        difficulty: 'Moderate',
        question: 'How does useEffect work, including the dependency array?',
        answer: `[[useEffect]] runs side effects **after** the render is committed to the DOM.

- No array → runs after every render.
- [[[]]] → runs once after mount (and cleanup on unmount).
- [[[a, b]]] → runs when [[a]] or [[b]] changed (compared with [[Object.is]]).

~~~jsx
useEffect(() => {
  const id = setInterval(tick, 1000)
  return () => clearInterval(id)   // cleanup
}, [])
~~~

The cleanup prevents leaks and stale subscriptions. Do not use an effect to derive values that can be computed during render — that causes extra renders. `,
      },
      {
        id: 'react-5',
        difficulty: 'Moderate',
        question: 'Controlled vs uncontrolled components?',
        answer: `- **Controlled** — React state is the single source of truth. Every keystroke updates state and re-renders.
  ~~~jsx
  <input value={name} onChange={(e) => setName(e.target.value)} />
  ~~~
  Enables validation, formatting, conditional buttons, and easy reset.

- **Uncontrolled** — the DOM keeps the value and you read it with a ref or on submit.
  ~~~jsx
  const ref = useRef(null)
  <input ref={ref} defaultValue="Aman" />
  ~~~
  Less code and fewer renders — good for simple forms or integrating non-React libraries.

[[<input type="file">]] must be uncontrolled because its value cannot be set.`,
      },
      {
        id: 'react-6',
        difficulty: 'Moderate',
        question: 'Why are keys important in lists?',
        answer: `Keys let React match elements between renders so it can reuse, move, or remove the right DOM nodes.

~~~jsx
{users.map((u) => <UserRow key={u.id} user={u} />)}
~~~

- Using array **index** as key breaks when items are reordered, inserted, or deleted — state and focus can attach to the wrong row.
- Keys must be **stable, unique among siblings**, and not random per render.

A changed key intentionally remounts a component — a useful trick for resetting state.`,
      },
      {
        id: 'react-7',
        difficulty: 'Moderate',
        question: 'What problem do useMemo and useCallback solve?',
        answer: `On every render, functions and computed objects are recreated. That can break referential equality, causing child re-renders or effect re-runs.

- [[useMemo]] caches a **computed value**.
- [[useCallback]] caches a **function identity** (it is [[useMemo]] for functions).

~~~jsx
const sorted = useMemo(() => [...items].sort(byName), [items])
const onSelect = useCallback((id) => setSelected(id), [])
~~~

Do **not** wrap everything: memoisation has its own cost and memory. Use it for expensive calculations, or when passing stable references to memoised children or effect dependencies. React Compiler will automate much of this.`,
      },
      {
        id: 'react-8',
        difficulty: 'Moderate',
        question: 'What is prop drilling and how does Context fix it?',
        answer: `**Prop drilling** is passing data through many intermediate components that do not use it, just to reach a deep child.

**Context** lets a provider publish a value to any descendant.

~~~jsx
const ThemeContext = createContext('light')

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  )
}

function Button() {
  const theme = useContext(ThemeContext)
  return <button data-theme={theme}>Save</button>
}
~~~

Use it for genuinely global concerns: theme, auth user, locale. Avoid using one giant context for all state — every consumer re-renders when any part changes. Split contexts or combine with a reducer.`,
      },
      {
        id: 'react-9',
        difficulty: 'Moderate',
        question: 'When would you use useRef?',
        answer: `A ref is a mutable box that **does not trigger a re-render** when changed. It persists across renders.

Common uses:
~~~jsx
const inputRef = useRef(null)
const timerRef = useRef(null)

useEffect(() => {
  inputRef.current.focus()
}, [])

useEffect(() => {
  timerRef.current = setInterval(tick, 1000)
  return () => clearInterval(timerRef.current)
}, [])
~~~

- Accessing DOM nodes (focus, measuring, scroll, video controls)
- Storing timers or previous values
- Keeping a mutable value (like a WebSocket) that render output does not depend on

If the value should appear in the UI, use state instead.`,
      },
      {
        id: 'react-10',
        difficulty: 'Easy',
        question: 'How do you render lists and conditionals in React?',
        answer: `Use JavaScript expressions inside JSX.

~~~jsx
{isLoggedIn ? <Dashboard /> : <Login />}
{error && <p className="error">{error}</p>}
{items.length > 0 && <List items={items} />}
{items.map((item) => <Card key={item.id} item={item} />)}
~~~

Gotchas:
- [[0 && <X />]] renders the number **0** — use [[items.length > 0 && ...]].
- You cannot use [[if]] statements directly inside JSX; use a ternary, [[&&]], or extract a variable/function.
- Always give mapped elements a stable key.`,
      },
      {
        id: 'react-11',
        difficulty: 'Hard',
        question: 'What are custom hooks and what rules must they follow?',
        answer: `A custom hook is a function starting with [[use]] that extracts reusable stateful logic. It is not a component and shares no state by itself — each call gets its own state.

~~~jsx
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : initial
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
~~~

Rules of hooks: only call hooks at the **top level** of a component or another hook — never in loops, conditions, or nested functions. This is because React matches hooks by call order.`,
      },
      {
        id: 'react-12',
        difficulty: 'Hard',
        question: 'Why does StrictMode render components twice in development?',
        answer: `In development, [[<StrictMode>]] intentionally mounts, unmounts, and remounts components, and runs effects twice. It is **not** a bug and does not happen in production builds.

The goal is to surface:
- impure render logic (e.g. mutating props, random values in render)
- missing effect cleanup (subscriptions, timers, listeners)
- unsafe legacy patterns

If double mounting breaks your component, that usually reveals a real bug. Write effects so they can run twice safely and always return a cleanup.

Also note React 18+ batches state updates and StrictMode helps verify your state updaters are pure.`,
      },
      {
        id: 'react-13',
        difficulty: 'Hard',
        question: 'What causes stale closures in React effects and how do you fix them?',
        answer: `An effect or callback captures the values from the render in which it was created. If a timer or subscription keeps using those old values, you get a **stale closure**.

~~~jsx
// Bug: count is always 0 inside the interval
useEffect(() => {
  const id = setInterval(() => setCount(count + 1), 1000)
  return () => clearInterval(id)
}, [])
~~~

Fixes:
1. Add the missing dependency ([[[count]]]) so the effect re-subscribes.
2. Use the functional updater: [[setCount((c) => c + 1)]].
3. Keep a ref in sync for values you do not want to trigger effects.
4. Extract logic into a custom hook with correct deps.

The [[eslint-plugin-react-hooks]] exhaustive-deps rule is your friend.`,
      },
      {
        id: 'react-14',
        difficulty: 'Moderate',
        question: 'What is React.memo and when should you use it?',
        answer: `[[React.memo]] shallow-compares props and skips re-rendering when they are unchanged. It only helps when the parent re-renders often and the child is expensive.

~~~jsx
const Row = React.memo(function Row({ item, onSelect }) {
  return <li onClick={() => onSelect(item.id)}>{item.name}</li>
})
~~~

Caveats:
- The [[onSelect]] prop must be stable ([[useCallback]]) or the comparison fails.
- It does not stop the component's *own* state updates.
- It adds a comparison cost on every render.

Measure before optimising. Keep components small and state close to where it is used first.`,
      },
    ],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: 'tailwind',
    tagline: 'Utility-first styling at speed',
    accent: '#06b6d4',
    questions: [
      {
        id: 'tw-1',
        difficulty: 'Easy',
        question: 'What is Tailwind CSS and why use a utility-first approach?',
        answer: `Tailwind is a utility-first CSS framework: instead of writing custom classes, you compose small single-purpose utilities directly in markup.

~~~html
<button class="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
  Save
</button>
~~~

Benefits:
- No naming overhead or unused CSS growth
- Design constraints built in (spacing scale, colours)
- Changes stay local to the markup
- Responsive and state variants are first class ([[md:]], [[hover:]], [[dark:]])

Trade-off: verbose markup, so extract components once a pattern repeats.`,
      },
      {
        id: 'tw-2',
        difficulty: 'Easy',
        question: 'How do responsive prefixes and state variants work?',
        answer: `Prefixes apply a utility only at a breakpoint or in a state. They are **mobile-first**: [[md:flex]] means "flex from the md breakpoint upward".

~~~html
<div class="flex flex-col gap-4 md:flex-row lg:gap-8">
  <button class="bg-slate-900 hover:bg-slate-700 focus-visible:ring-2 dark:bg-white">
    Click
  </button>
</div>
~~~

Common variants: [[sm md lg xl 2xl]], [[hover]], [[focus]], [[focus-visible]], [[active]], [[disabled]], [[group-hover]], [[peer-checked]], [[dark]], [[motion-reduce]].

Stack them left to right; later utilities win when specificity ties.`,
      },
      {
        id: 'tw-3',
        difficulty: 'Moderate',
        question: 'How do you customise the Tailwind theme?',
        answer: `In Tailwind v4, theme tokens live in CSS with [[@theme]]:

~~~css
@import "tailwindcss";

@theme {
  --color-brand-500: oklch(0.58 0.2 275);
  --font-display: "Sora", sans-serif;
  --radius-card: 1rem;
}
~~~

That generates [[bg-brand-500]], [[font-display]] and [[rounded-card]] utilities.

In v3 you extend [[tailwind.config.js]]:

~~~js
export default {
  theme: {
    extend: {
      colors: { brand: { 500: '#4f46e5' } },
      spacing: { 18: '4.5rem' },
    },
  },
}
~~~

Prefer extending over replacing the default scale so you keep sensible constraints.`,
      },
      {
        id: 'tw-4',
        difficulty: 'Moderate',
        question: 'How should you reuse styles in Tailwind: @apply, components, or something else?',
        answer: `Preferred order:

1. **Component extraction** — put the markup in a React component ([[<Button variant="primary">]]). This is the most maintainable.
2. **Composition helpers** — a [[cn()]] utility (clsx + tailwind-merge) to combine conditional classes safely.
3. **[[@apply]]** — pull utilities into a CSS class for third-party HTML or truly global patterns. Use sparingly; it hides the styles from the markup and can bloat CSS.
4. **CSS variables / theme tokens** for values shared across components.

~~~jsx
<button className={cn('rounded-lg px-4 py-2', isActive && 'bg-indigo-600 text-white')} />
~~~

Avoid building a parallel design system of semantic classes that duplicates Tailwind.`,
      },
      {
        id: 'tw-5',
        difficulty: 'Moderate',
        question: 'How does Tailwind remove unused CSS?',
        answer: `Tailwind scans your source files for class names and generates only the utilities it finds. In v4 this is automatic — it auto-detects template files, and you can add sources explicitly:

~~~css
@import "tailwindcss";
@source "../src/**/*.{js,jsx,ts,tsx}";
~~~

In v3, [[content]] in the config lists the files to scan.

Important: classes must appear as **complete static strings**. Dynamically building them breaks detection:

~~~jsx
// Won't be generated
<div className={'text-' + color + '-500'} />

// Use complete class names instead
<div className={color === 'red' ? 'text-red-500' : 'text-blue-500'} />
~~~

Safelist only when you truly need runtime-generated classes.`,
      },
      {
        id: 'tw-6',
        difficulty: 'Hard',
        question: 'How do arbitrary values and custom variants work in Tailwind?',
        answer: `**Arbitrary values** use square brackets when the design needs a one-off:

~~~html
<div class="w-[327px] bg-[#0f172a] grid-cols-[1fr_2fr]">
  <p class="text-[clamp(1rem,2vw,1.5rem)]">Fluid text</p>
</div>
~~~

**Custom variants** use [[@custom-variant]] in v4:

~~~css
@custom-variant hocus (&:hover, &:focus);

@custom-variant supports-grid (@supports (display: grid));
~~~

~~~html
<button class="hocus:bg-indigo-600 supports-grid:grid">Save</button>
~~~

Keep arbitrary values rare — if a value repeats, promote it to a theme token.`,
      },
      {
        id: 'tw-7',
        difficulty: 'Easy',
        question: 'How does dark mode work in Tailwind?',
        answer: `The default [[dark:]] variant follows the OS setting ([[prefers-color-scheme]]). To toggle manually, configure it to use a class or data attribute:

~~~css
/* Tailwind v4 */
@custom-variant dark (&:where(.dark, .dark *));
~~~

~~~jsx
document.documentElement.classList.toggle('dark')
~~~

~~~html
<div class="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
  Card
</div>
~~~

Better: define semantic tokens with CSS variables so components use [[bg-surface]] instead of repeating pairs of colours. Prevent a flash of the wrong theme by setting the class in an inline script before hydration.`,
      },
      {
        id: 'tw-8',
        difficulty: 'Moderate',
        question: 'Tailwind vs CSS Modules vs styled-components — how do you choose?',
        answer: `- **Tailwind** — fastest iteration, no naming debates, tiny production CSS, excellent for component-based apps. Markup gets long; requires component extraction.
- **CSS Modules** — scoped class names, familiar CSS syntax, great for complex selectors and animations. More files, more naming, and dead code is harder to spot.
- **styled-components / emotion** — styles live in JS, dynamic props are easy; but runtime cost, extra bundle size, and SSR hydration complexity. Momentum has shifted away from runtime CSS-in-JS.

A pragmatic setup: Tailwind for layout and design tokens, plain CSS (or CSS Modules) for complex keyframes and third-party overrides.`,
      },
    ],
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    icon: 'git',
    tagline: 'Version control & team workflow',
    accent: '#f43f5e',
    questions: [
      {
        id: 'git-1',
        difficulty: 'Easy',
        question: 'What is the difference between Git and GitHub?',
        answer: `**Git** is a distributed version-control system that runs on your machine. It snapshots your project history locally — commits, branches, merges.

**GitHub** is a cloud platform for hosting Git repositories, adding collaboration features: pull requests, issues, code review, Actions (CI/CD), and permissions.

You can use Git without GitHub, but GitHub needs Git (or its API) under the hood. GitLab and Bitbucket are similar alternatives.`,
      },
      {
        id: 'git-2',
        difficulty: 'Easy',
        question: 'Walk through a basic Git workflow.',
        answer: `~~~bash
git init                     # start a repo
git clone <url>              # or copy an existing one
git checkout -b feature/nav  # create + switch branch
# ...edit files...
git status                   # see what changed
git add .                    # stage changes
git commit -m "Add navbar"   # snapshot
git pull origin main --rebase # stay up to date
git push -u origin feature/nav
~~~

Then open a pull request on GitHub. The three areas to remember: **working directory → staging area ([[git add]]) → repository ([[git commit]])**.`,
      },
      {
        id: 'git-3',
        difficulty: 'Moderate',
        question: 'What is branching and why is it useful?',
        answer: `A branch is just a movable pointer to a commit. Creating one is cheap and instant, so you can isolate work without copying files.

Typical team model:
- [[main]] stays deployable.
- Each feature or fix gets its own branch ([[feature/auth]], [[fix/cart-total]]).
- Work is merged back through a pull request after review.

~~~bash
git branch                # list local branches
git switch -c feature/x   # create + switch
git switch main
git merge feature/x
git branch -d feature/x   # delete after merge
~~~

Branching enables parallel work, code review, and easy rollback.`,
      },
      {
        id: 'git-4',
        difficulty: 'Hard',
        question: 'Merge vs rebase — what is the difference and when do you use each?',
        answer: `**Merge** combines histories and creates a merge commit. It preserves the true history and is safe on shared branches.

**Rebase** replays your commits on top of another base, rewriting them to look linear. It produces a cleaner history but **changes commit hashes**.

~~~bash
git switch feature
git rebase main        # put feature on top of latest main
# resolve conflicts, then:
git rebase --continue
~~~

Golden rule: never rebase a branch that others are working on. Use rebase to tidy your own local feature branch, merge for integrating into [[main]]. If a rebase goes wrong, [[git reflog]] can rescue you.`,
      },
      {
        id: 'git-5',
        difficulty: 'Easy',
        question: 'What is a pull request?',
        answer: `A pull request (PR) asks to merge one branch into another. It is a GitHub/GitLab concept, not a Git command.

A good PR includes:
- a focused change (one concern)
- a clear title and description, with screenshots for UI work
- linked issues
- tests passing in CI
- a self-review before requesting reviewers

Reviewers comment on lines, request changes, and finally approve. Teams often protect [[main]] so merges require an approved PR and green checks.`,
      },
      {
        id: 'git-6',
        difficulty: 'Moderate',
        question: 'How do you resolve a merge conflict?',
        answer: `A conflict happens when the same lines were changed on both branches. Git marks them:

~~~text
<<<<<<< HEAD
const price = 100
=======
const price = 120
>>>>>>> feature/pricing
~~~

Steps:
1. [[git status]] lists conflicted files.
2. Open each file, choose or combine the correct code, and delete the markers.
3. [[git add <file>]] to mark resolved.
4. [[git commit]] to finish the merge (or [[git rebase --continue]]).

Prevention: small, frequent commits; pull often; avoid reformatting untouched code; agree on a formatter.`,
      },
      {
        id: 'git-7',
        difficulty: 'Moderate',
        question: 'git reset vs git revert — and what about git restore?',
        answer: `- [[git reset]] **moves the branch pointer** and can unstage or discard commits. It rewrites history, so avoid it on pushed shared branches.
  - [[--soft]] keeps changes staged
  - [[--mixed]] (default) keeps changes unstaged
  - [[--hard]] deletes them permanently
- [[git revert]] creates a **new commit** that undoes a previous one. Safe for shared history.
- [[git restore]] only touches files in the working tree or staging area (the modern replacement for [[checkout -- <file>]]).

~~~bash
git reset --soft HEAD~1     # undo last commit, keep changes
git revert a1b2c3d          # safe undo on main
git restore src/App.jsx     # discard local edits
~~~`,
      },
      {
        id: 'git-8',
        difficulty: 'Easy',
        question: 'What is .gitignore and what should it contain?',
        answer: `A [[.gitignore]] file tells Git which untracked files to ignore. Committed files stay tracked — you must [[git rm --cached]] them first.

Typical entries:

~~~text
node_modules/
dist/
.env
.env.local
*.log
.DS_Store
coverage/
~~~

Commit it so the whole team shares the rules. Never commit secrets, build output, or editor-specific folders. Use [[.env.example]] to document required variables without exposing values.

Note: ignore rules do not apply to files already tracked, and they are not a security boundary — rotate any secret that was pushed.`,
      },
      {
        id: 'git-9',
        difficulty: 'Moderate',
        question: 'What is git stash and when is it useful?',
        answer: `[[git stash]] temporarily shelves uncommitted changes so you can switch context without committing half-finished work.

~~~bash
git stash push -m "wip: navbar"
git switch main
git pull
git switch feature/nav
git stash pop          # reapply and remove from stash
git stash list
git stash apply stash@{1}  # reapply but keep the entry
~~~

Useful when you need to pull, fix an urgent bug, or test another branch. Prefer a real WIP commit for long-lived work, since stashes are easy to forget.`,
      },
      {
        id: 'git-10',
        difficulty: 'Hard',
        question: 'What do cherry-pick, tags and forks do?',
        answer: `- **[[git cherry-pick <sha>]]** copies a single commit onto your current branch. Great for hotfixes; beware duplicate commits when merging later.
- **Tags** are permanent labels, usually for releases:
  ~~~bash
  git tag -a v1.2.0 -m "Release 1.2.0"
  git push origin v1.2.0
  ~~~
- **Fork** is a server-side copy of someone else's repository under your account. You push to your fork and open a PR to the original — the standard open-source contribution flow.
  ~~~bash
  git remote add upstream https://github.com/original/repo.git
  git fetch upstream
  ~~~`,
      },
    ],
  },
  {
    id: 'backend',
    name: 'Node.js & Express',
    icon: 'node',
    tagline: 'APIs, middleware & server-side JS',
    accent: '#22c55e',
    questions: [
      {
        id: 'node-1',
        difficulty: 'Easy',
        question: 'What is Node.js and how is it different from browser JavaScript?',
        answer: `Node.js is a JavaScript **runtime** built on Chrome's V8 engine. It runs JS outside the browser, on the server.

Differences from the browser:
- No DOM or [[window]] — but you get [[fs]], [[path]], [[http]], [[process]], and [[Buffer]].
- One language across frontend and backend.
- Non-blocking, event-driven I/O makes it good for APIs, real-time apps, and streaming.
- Not ideal for heavy CPU work (image processing, complex maths) unless you offload to worker threads.

Node is single-threaded for JS execution, but libuv handles I/O in a thread pool.`,
      },
      {
        id: 'node-2',
        difficulty: 'Moderate',
        question: 'Explain the non-blocking, event-driven model of Node.js.',
        answer: `Node runs your JS on one thread, but delegates I/O (file system, network, DNS) to the OS or libuv's thread pool. When an operation finishes, its callback is queued and run by the event loop.

~~~js
import fs from 'node:fs'

// Blocking: stops everything else
const data = fs.readFileSync('big.txt')

// Non-blocking: free to serve other requests
fs.readFile('big.txt', (err, data) => {
  if (err) throw err
  console.log(data.length)
})
~~~

Benefits: thousands of concurrent connections with low memory. Cost: CPU-heavy synchronous code blocks *every* request — use streams, worker threads, or a queue.`,
      },
      {
        id: 'node-3',
        difficulty: 'Easy',
        question: 'What are npm, npx and package.json?',
        answer: `- **npm** is the package manager bundled with Node — installs dependencies and runs scripts.
- **npx** runs a package binary without a global install ([[npx create-vite@latest]]).
- **package.json** describes the project: name, scripts, dependencies, and entry points.

~~~json
{
  "scripts": { "dev": "vite", "start": "node server.js" },
  "dependencies": { "express": "^4.19.0" },
  "devDependencies": { "nodemon": "^3.1.0" }
}
~~~

[[package-lock.json]] pins the exact dependency tree — commit it for reproducible installs. Use [[npm ci]] in CI, not [[npm install]].`,
      },
      {
        id: 'node-4',
        difficulty: 'Moderate',
        question: 'What is middleware in Express?',
        answer: `Middleware are functions that run in order between the request and the response. Each receives [[(req, res, next)]] and either ends the response or calls [[next()]].

~~~js
app.use(express.json())                 // parse JSON bodies
app.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})

function auth(req, res, next) {
  const token = req.headers.authorization
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  req.user = verify(token)
  next()
}

app.get('/api/profile', auth, (req, res) => res.json(req.user))
~~~

Uses: logging, auth, validation, CORS, rate limiting, error handling. Order matters — Express runs them top to bottom.`,
      },
      {
        id: 'node-5',
        difficulty: 'Easy',
        question: 'Route parameters vs query parameters?',
        answer: `- **Route params** are part of the path and identify a resource:
  [[/users/:id]] → [[req.params.id]]
- **Query params** come after [[?]] and usually filter, sort, or paginate:
  [[/users?role=admin&page=2]] → [[req.query.role]]

~~~js
app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params
  const { comments } = req.query // 'true'
  res.json({ id, includeComments: comments === 'true' })
})
~~~

Everything in params/query is a **string** — validate and coerce it. Use body ([[req.body]]) for create/update payloads.`,
      },
      {
        id: 'node-6',
        difficulty: 'Moderate',
        question: 'What makes an API RESTful?',
        answer: `REST is an architectural style, not a protocol. Key ideas:

- **Resources** are nouns with URLs: [[/api/users]], [[/api/users/42]]
- **HTTP verbs** express intent: GET (read), POST (create), PUT/PATCH (update), DELETE (remove)
- **Stateless** — each request carries everything needed (e.g. a token). No server-side session affinity.
- **Representations** — return JSON/XML, not the internal DB shape.
- **Status codes** communicate outcome.

~~~text
GET    /api/products       -> 200 + list
POST   /api/products       -> 201 + created
PATCH  /api/products/42    -> 200 + updated
DELETE /api/products/42    -> 204
~~~

Use plural nouns, nested routes sparingly ([[/users/42/orders]]), and version your API ([[/api/v1]]).`,
      },
      {
        id: 'node-7',
        difficulty: 'Moderate',
        question: 'How do you handle errors in Express?',
        answer: `Use a central error-handling middleware with **four** arguments, registered after all routes:

~~~js
app.use((err, req, res, next) => {
  console.error(err)
  const status = err.status || 500
  res.status(status).json({
    error: err.message || 'Internal Server Error',
  })
})
~~~

Pass errors to it with [[next(err)]] (or throw inside an async wrapper):

~~~js
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

app.get('/api/user/:id', wrap(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ error: 'Not found' })
  res.json(user)
}))
~~~

Never leak stack traces or DB details to clients in production. Express 5 handles rejected async handlers automatically.`,
      },
      {
        id: 'node-8',
        difficulty: 'Easy',
        question: 'Why use environment variables and how do you manage them?',
        answer: `They keep configuration and secrets out of source code, so the same build works in development, staging, and production.

~~~js
import 'dotenv/config' // dev only

const PORT = process.env.PORT || 3000
const DB_URL = process.env.DATABASE_URL
~~~

Rules:
- Commit [[.env.example]] with placeholder keys; never commit [[.env]].
- Validate required variables at boot (Zod or a simple check) and fail fast.
- In production, set them in the hosting dashboard or secret manager.
- Anything in a frontend bundle ([[VITE_*]], [[NEXT_PUBLIC_*]]) is **public** — never put secrets there.`,
      },
      {
        id: 'node-9',
        difficulty: 'Hard',
        question: 'JWT vs sessions — how does authentication work?',
        answer: `**Session-based**: after login the server stores a session and sends a random session ID in an [[HttpOnly]] cookie. Every request looks up the session. Easy to revoke; needs shared storage (Redis) when scaled.

**JWT**: the server signs a token containing claims ([[userId]], [[role]], [[exp]]). The client sends it on each request and the server verifies the signature — no DB lookup.

~~~js
const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '15m' })
~~~

Key points:
- Never store secrets or sensitive data in the payload — it is signed, not encrypted.
- JWTs cannot be easily revoked; use short-lived access tokens plus a refresh token.
- Store tokens in [[HttpOnly; Secure; SameSite]] cookies to reduce XSS risk, and add CSRF protection.
- Always hash passwords with bcrypt/argon2 — never encrypt or store plain text.`,
      },
      {
        id: 'node-10',
        difficulty: 'Moderate',
        question: 'What is CORS and how do you fix a CORS error?',
        answer: `**Cross-Origin Resource Sharing** is a browser security policy. A request from [[https://app.com]] to [[https://api.com]] is cross-origin, and the server must opt in with response headers.

~~~js
import cors from 'cors'
app.use(cors({
  origin: ['https://app.com'],
  credentials: true,
}))
~~~

For non-simple requests the browser first sends an [[OPTIONS]] **preflight**; the server must allow the method and headers.

Common gotchas:
- [[Access-Control-Allow-Origin: *]] cannot be combined with credentials.
- CORS is enforced **by the browser**, not the server — Postman will still work.
- If you control both, proxy through the same origin in development (Vite [[server.proxy]]).`,
      },
      {
        id: 'node-11',
        difficulty: 'Hard',
        question: 'What are streams and buffers in Node.js?',
        answer: `A **Buffer** is a fixed-size chunk of raw binary data. A **stream** processes data piece by piece instead of loading it all into memory.

~~~js
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { createGzip } from 'node:zlib'

await pipeline(
  createReadStream('big.log'),
  createGzip(),
  createWriteStream('big.log.gz')
)
~~~

Stream types: Readable, Writable, Duplex, Transform. Benefits: constant memory for large files, faster time-to-first-byte, and natural backpressure.

[[pipeline]] handles errors and cleanup — prefer it over manual [[.pipe()]] chains.`,
      },
      {
        id: 'node-12',
        difficulty: 'Hard',
        question: 'How do you scale a Node.js application?',
        answer: `A single Node process uses one CPU core. Options:

- **Cluster module / PM2** — fork one process per core sharing the same port.
  ~~~js
  import cluster from 'node:cluster'
  import os from 'node:os'
  if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) cluster.fork()
  } else {
    startServer()
  }
  ~~~
- **Container orchestration** — run multiple replicas behind a load balancer (Docker + Kubernetes/ECS).
- **Worker threads** — offload CPU-heavy jobs (compression, image processing) without blocking the event loop.
- **Caching & queues** — Redis for hot data, BullMQ/RabbitMQ for background jobs.
- **Statelessness** — keep sessions and uploads in shared stores so any replica can serve a request.

Measure first: the bottleneck is often the database, not Node itself.`,
      },
    ],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: 'next',
    tagline: 'SSR, routing & full-stack React',
    accent: '#a855f7',
    questions: [
      {
        id: 'next-1',
        difficulty: 'Easy',
        question: 'What is Next.js and why use it over plain React?',
        answer: `Next.js is a React framework by Vercel that adds the pieces React leaves out:

- **File-based routing** with layouts and dynamic segments
- **Server-side rendering**, static generation, and incremental regeneration
- **API route handlers** for backend logic
- Built-in **image**, **font** and **script** optimisation
- Code splitting, prefetching and streaming out of the box

The main win is better initial load and SEO: users and crawlers receive fully rendered HTML instead of an empty [[<div id="root">]] waiting for JS.`,
      },
      {
        id: 'next-2',
        difficulty: 'Moderate',
        question: 'Explain SSR, SSG, ISR and CSR.',
        answer: `- **CSR** (client-side rendering) — the browser downloads JS and renders. Slow first paint, weak SEO. Plain React/Vite.
- **SSR** (server-side rendering) — HTML is generated on every request. Fresh and SEO-friendly, but costs server time.
- **SSG** (static site generation) — HTML is built once at build time. Fastest and cacheable via CDN; data can be stale.
- **ISR** (incremental static regeneration) — static pages that revalidate in the background after a set interval or on demand.

~~~jsx
// App Router
export const revalidate = 60          // ISR: refresh at most every 60s
export const dynamic = 'force-dynamic' // SSR per request
~~~

Choose SSG for blogs and marketing, ISR for catalogues, SSR for personalised dashboards, CSR for highly interactive widgets.`,
      },
      {
        id: 'next-3',
        difficulty: 'Moderate',
        question: 'What is the difference between Server and Client Components?',
        answer: `In the App Router, components are **Server Components by default**. They render on the server, can access databases and secrets, and send no JS to the browser.

Add [['use client']] at the top of a file to make it a **Client Component**, needed for state, effects, event handlers, and browser APIs.

~~~jsx
// app/page.jsx  (Server Component)
import Counter from './Counter'
export default async function Page() {
  const posts = await db.post.findMany()
  return <><Counter /><ul>{posts.map((p) => <li key={p.id}>{p.title}</li>)}</ul></>
}
~~~

~~~jsx
'use client'
import { useState } from 'react'
export default function Counter() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}
~~~

Keep [['use client']] at the leaves to minimise the client bundle. Server Components can render Client Components, not vice versa (except via [[children]] props).`,
      },
      {
        id: 'next-4',
        difficulty: 'Easy',
        question: 'How does file-based routing work in the App Router?',
        answer: `Folders define URL segments and special files define behaviour:

~~~text
app/
  layout.jsx          -> shared shell (required root layout)
  page.jsx            -> "/"
  about/page.jsx      -> "/about"
  blog/[slug]/page.jsx-> "/blog/hello"
  dashboard/
    layout.jsx        -> nested layout
    settings/page.jsx -> "/dashboard/settings"
  api/users/route.js  -> API endpoint
~~~

- [[[slug]]] is dynamic; [[[...slug]]] is a catch-all; [[(group)]] groups routes without changing the URL.
- [[layout.jsx]] persists across navigation, [[page.jsx]] is the unique content.
- [[loading.jsx]], [[error.jsx]], [[not-found.jsx]] provide built-in UI states.
- [[<Link href="/about">]] enables client-side prefetching.`,
      },
      {
        id: 'next-5',
        difficulty: 'Moderate',
        question: 'How do you fetch data in the App Router?',
        answer: `Prefer fetching in **Server Components** with native [[fetch]] — it is async and can be awaited directly.

~~~jsx
export default async function Page() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 },   // ISR
  })
  if (!res.ok) throw new Error('Failed to load')
  const posts = await res.json()
  return <PostList posts={posts} />
}
~~~

- [[cache: 'no-store']] or [[revalidate: 0]] for fresh data.
- [[next: { tags: ['posts'] }]] plus [[revalidateTag('posts')]] for on-demand updates.
- React's [[cache()]] deduplicates identical requests in one render pass.
- For client-side interactivity use SWR/React Query or Server Actions for mutations.

Fetch on the server when possible: fewer waterfalls, no exposed keys, less client JS.`,
      },
      {
        id: 'next-6',
        difficulty: 'Moderate',
        question: 'What are Route Handlers and Server Actions?',
        answer: `**Route Handlers** replace API routes. They live in [[route.js]] and export HTTP methods:

~~~js
// app/api/users/route.js
export async function GET() {
  const users = await db.user.findMany()
  return Response.json(users)
}

export async function POST(request) {
  const body = await request.json()
  const user = await db.user.create({ data: body })
  return Response.json(user, { status: 201 })
}
~~~

**Server Actions** are async functions marked [['use server']] that the client can call directly — ideal for form mutations, with progressive enhancement and no manual fetch layer:

~~~js
'use server'
export async function createTodo(formData) {
  await db.todo.create({ data: { title: formData.get('title') } })
  revalidatePath('/todos')
}
~~~

~~~jsx
<form action={createTodo}>
  <input name="title" required />
  <button>Add</button>
</form>
~~~

Use Server Actions for internal mutations; Route Handlers for public APIs, webhooks and non-React clients.`,
      },
      {
        id: 'next-7',
        difficulty: 'Easy',
        question: 'How does Next.js optimise images and fonts?',
        answer: `**Images** — [[next/image]] adds lazy loading, responsive sizes, modern formats (AVIF/WebP), and prevents layout shift:

~~~jsx
import Image from 'next/image'
<Image src="/hero.jpg" alt="Team" width={1200} height={630} priority />
~~~

Use [[priority]] for the hero image, [[sizes]] for responsive layouts, and [[fill]] for unknown dimensions. Remote domains must be allowed in [[next.config.js]].

**Fonts** — [[next/font]] self-hosts Google fonts at build time, removing network requests to Google and eliminating layout shift:

~~~jsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], display: 'swap' })
<html className={inter.className}>
~~~`,
      },
      {
        id: 'next-8',
        difficulty: 'Hard',
        question: 'How do middleware and caching work in Next.js?',
        answer: `**Middleware** runs before a request is completed. It lives at the project root as [[middleware.js]] and is perfect for auth redirects, locale detection, and A/B tests:

~~~js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('session')
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }
~~~

It runs on the Edge runtime — no Node APIs or heavy DB calls.

**Caching layers:** the fetch cache, the full route cache (static output), the router cache (client-side), and the data cache with tags. In Next 15, fetch and route handlers are **uncached by default**; opt in with [[revalidate]] or [[cache: 'force-cache']]. Use [[revalidatePath]] / [[revalidateTag]] after mutations.`,
      },
    ],
  },
  {
    id: 'database',
    name: 'Databases',
    icon: 'db',
    tagline: 'MongoDB, SQL & data modelling',
    accent: '#14b8a6',
    questions: [
      {
        id: 'db-1',
        difficulty: 'Easy',
        question: 'SQL vs NoSQL — what is the difference?',
        answer: `**SQL (relational)** — tables with fixed schemas, rows and columns, joined with foreign keys. Strong ACID guarantees and a powerful query language. Examples: PostgreSQL, MySQL.

**NoSQL** — flexible schemas and non-tabular models:
- Document: MongoDB
- Key-value: Redis
- Wide-column: Cassandra
- Graph: Neo4j

Choose SQL when relationships and consistency matter (payments, inventory). Choose NoSQL for flexible/nested documents, huge write volumes, or rapidly changing shapes.

The line is blurry: Postgres supports JSONB, and MongoDB has transactions and schemas via Mongoose.`,
      },
      {
        id: 'db-2',
        difficulty: 'Easy',
        question: 'How does MongoDB structure data?',
        answer: `MongoDB is a document database:

- **Database** → **Collection** → **Document**
- Documents are BSON objects (binary JSON) with a unique [[_id]].
- Fields can be nested objects and arrays; schemas are flexible by default.

~~~js
// users collection
{
  _id: ObjectId('...'),
  name: 'Aman',
  email: 'aman@example.com',
  skills: ['React', 'Node'],
  address: { city: 'Delhi', pin: '110001' }
}
~~~

Related data can be **embedded** (one-to-few, read together) or **referenced** by [[_id]] (one-to-many, large or shared data). Model around query patterns rather than normalisation.`,
      },
      {
        id: 'db-3',
        difficulty: 'Moderate',
        question: 'What is normalisation and when would you denormalise?',
        answer: `**Normalisation** organises data to remove redundancy and update anomalies:

- **1NF** — atomic values, no repeating groups
- **2NF** — no partial dependency on part of a composite key
- **3NF** — no transitive dependency (non-key fields depend only on the key)

~~~text
orders(id, user_id, total)
order_items(id, order_id, product_id, qty, price)
users(id, name, email)
~~~

**Denormalisation** intentionally duplicates data (e.g. storing [[user_name]] on an order) to avoid expensive joins on frequent reads. You trade storage and update complexity for speed.

Rule: normalise until it hurts, denormalise until it works. Keep a clear strategy for keeping copies in sync.`,
      },
      {
        id: 'db-4',
        difficulty: 'Moderate',
        question: 'What is a database index and how does it work?',
        answer: `An index is a sorted data structure (usually a B-tree) that lets the engine find rows without scanning the whole table — like the index of a book.

~~~sql
CREATE INDEX idx_users_email ON users(email);
~~~

In MongoDB:

~~~js
db.users.createIndex({ email: 1 }, { unique: true })
~~~

Benefits: dramatically faster reads, and [[unique]] indexes enforce constraints.

Costs: extra storage and slower writes, because every insert/update must maintain the index. Index the columns you actually filter, join, and sort on.

Watch out for leading-column rules in composite indexes and avoid wrapping indexed columns in functions ([[WHERE LOWER(email) = ...]] needs a functional index). Use [[EXPLAIN]] / [[explain('executionStats')]] to verify.`,
      },
      {
        id: 'db-5',
        difficulty: 'Moderate',
        question: 'Explain SQL joins.',
        answer: `Joins combine rows from two tables based on a condition.

~~~sql
-- INNER: only matching rows
SELECT u.name, o.total
FROM users u
JOIN orders o ON o.user_id = u.id;

-- LEFT: all users, plus their orders (NULL if none)
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;
~~~

- **INNER** — intersection
- **LEFT / RIGHT** — all rows from one side, matches from the other
- **FULL OUTER** — all rows from both, matched where possible
- **CROSS** — cartesian product (rarely intended)

Always join on indexed keys, filter early, and select only needed columns to keep queries fast.`,
      },
      {
        id: 'db-6',
        difficulty: 'Hard',
        question: 'What is ACID?',
        answer: `ACID describes transactional guarantees:

- **Atomicity** — all statements in a transaction succeed or none do. A failed transfer must not debit without crediting.
- **Consistency** — data moves from one valid state to another; constraints are never violated.
- **Isolation** — concurrent transactions do not corrupt each other. Levels: Read Uncommitted, Read Committed, Repeatable Read, Serializable — higher levels trade concurrency for safety.
- **Durability** — committed data survives a crash (write-ahead logs, fsync).

~~~sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
~~~

MongoDB also supports multi-document transactions, but they are best kept short because they lock resources.`,
      },
      {
        id: 'db-7',
        difficulty: 'Hard',
        question: 'Explain the MongoDB aggregation pipeline.',
        answer: `Aggregation is a series of stages that transform documents — MongoDB's equivalent of SQL GROUP BY and joins.

~~~js
db.orders.aggregate([
  { $match: { status: 'paid' } },                    // filter early
  { $lookup: { from: 'users', localField: 'userId',
               foreignField: '_id', as: 'user' } },  // join
  { $unwind: '$user' },
  { $group: { _id: '$user.city', revenue: { $sum: '$total' } } },
  { $sort: { revenue: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, city: '$_id', revenue: 1 } },
])
~~~

Order matters: [[$match]] and [[$sort]] early can use indexes; [[$limit]] early reduces work. Use [[$facet]] for multiple result sets in one pass.

In Mongoose, call [[Model.aggregate([...])]] (skips schema casting).`,
      },
      {
        id: 'db-8',
        difficulty: 'Moderate',
        question: 'What is Mongoose and why use it with MongoDB?',
        answer: `Mongoose is an ODM (Object Data Modelling) library that adds schemas, validation, casting, middleware and helpers on top of the native driver.

~~~js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number, min: 13 },
}, { timestamps: true })

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12)
})

export const User = mongoose.model('User', userSchema)
~~~

MongoDB itself is schema-flexible; Mongoose enforces structure at the application layer. Benefits: validation, population ([[ref]] joins), hooks, and typed models. Downside: overhead and an extra abstraction — the native driver is leaner for simple cases.`,
      },
      {
        id: 'db-9',
        difficulty: 'Hard',
        question: 'What is the N+1 query problem and how do you fix it?',
        answer: `You fetch N parents, then run one query per parent for its children — 1 + N queries instead of 2.

~~~js
// N+1: one query for posts, one per post for the author
const posts = await Post.find().limit(20)
for (const post of posts) {
  post.author = await User.findById(post.authorId)
}
~~~

Fixes:
- **SQL**: use a join or eager loading ([[include]] in Sequelize, [[select_related]] / [[prefetch_related]] in Django).
- **Mongoose**: [[.populate('authorId')]] (still multiple queries internally) or a single aggregation with [[$lookup]].
- **DataLoader** to batch and cache requests per tick.

Detect it by logging queries per request or profiling with [[EXPLAIN]] and APM tools.`,
      },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced & Deployment',
    icon: 'rocket',
    tagline: 'Web internals, security & shipping',
    accent: '#ec4899',
    questions: [
      {
        id: 'adv-1',
        difficulty: 'Moderate',
        question: 'What happens when you type a URL and press Enter?',
        answer: `1. **DNS lookup** — the browser resolves [[example.com]] to an IP (cache → resolver → root/TLD/authoritative servers). HTTPS adds a TLS handshake.
2. **TCP connection** — usually HTTP/2 or HTTP/3 (QUIC).
3. **HTTP request** — method, path, headers, cookies.
4. **Server processing** — load balancer → app → database → HTML response.
5. **Response** — status, headers, body; the browser may cache it.
6. **Parsing** — HTML is turned into the DOM; CSS into CSSOM; the render tree is built.
7. **Rendering** — layout, paint, composite. Scripts can block parsing unless deferred.
8. **Sub-resources** — CSS, JS, images load; hydration makes the page interactive.

This question tests breadth: networking, HTTP, rendering, and performance.`,
      },
      {
        id: 'adv-2',
        difficulty: 'Easy',
        question: 'HTTP vs HTTPS and what TLS does.',
        answer: `HTTP sends data in plain text — anyone on the path can read or modify it. HTTPS is HTTP over **TLS**, which provides:

- **Encryption** — data cannot be read in transit
- **Integrity** — tampering is detected
- **Authentication** — the certificate proves you are talking to the real server

The TLS handshake negotiates keys using asymmetric crypto, then uses fast symmetric encryption for the session. Certificates are issued by trusted CAs (Let's Encrypt is free) and must be renewed.

Always use HTTPS in production; it is also required for many browser APIs (geolocation, service workers, clipboard).`,
      },
      {
        id: 'adv-3',
        difficulty: 'Easy',
        question: 'Explain HTTP status code classes.',
        answer: `- **1xx** informational — 101 Switching Protocols
- **2xx** success — 200 OK, 201 Created, 204 No Content
- **3xx** redirect — 301 Moved Permanently, 302 Found, 304 Not Modified
- **4xx** client error — 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Validation Error, 429 Too Many Requests
- **5xx** server error — 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout

Nuance: **401** means "not authenticated", **403** means "authenticated but not allowed". API responses should use accurate codes, not 200 with an error body.`,
      },
      {
        id: 'adv-4',
        difficulty: 'Moderate',
        question: 'REST vs GraphQL — when would you choose each?',
        answer: `**REST** exposes multiple endpoints per resource. It is simple, cacheable at the HTTP layer, and well understood. Downsides: over-fetching, under-fetching, and multiple round trips for related data.

**GraphQL** exposes one endpoint with a typed schema. Clients request exactly the fields they need.

~~~graphql
query {
  user(id: "42") {
    name
    posts(first: 5) { title }
  }
}
~~~

Trade-offs: GraphQL solves over-fetching and mobile payload size, but adds complexity — schema design, resolvers, N+1 batching (DataLoader), and non-trivial HTTP caching.

Choose REST for straightforward CRUD and public APIs; GraphQL for complex, varied client data needs or many front-end consumers.`,
      },
      {
        id: 'adv-5',
        difficulty: 'Moderate',
        question: 'WebSockets vs polling vs SSE?',
        answer: `- **Short polling** — the client asks every N seconds. Simple but wasteful and adds latency.
- **Long polling** — the server holds the request open until data is available. Better latency, still overhead per message.
- **Server-Sent Events (SSE)** — a one-way stream from server to client over plain HTTP. Great for notifications, feeds, progress updates. Auto-reconnects.
- **WebSockets** — a full-duplex, persistent connection after an HTTP upgrade. Ideal for chat, multiplayer games, collaborative editing.

~~~js
const ws = new WebSocket('wss://api.example.com/chat')
ws.onmessage = (e) => console.log(JSON.parse(e.data))
~~~

WebSockets need reconnect logic, heartbeats, and horizontal scaling (sticky sessions or a pub/sub layer like Redis). Use SSE when you only need server → client.`,
      },
      {
        id: 'adv-6',
        difficulty: 'Moderate',
        question: 'What is CI/CD?',
        answer: `**Continuous Integration** — every push is automatically built and tested, catching integration bugs early.

**Continuous Delivery/Deployment** — tested code is automatically prepared for release, or deployed straight to production.

A typical pipeline:
1. Lint and type-check
2. Run unit and integration tests
3. Build the app
4. Build and push a Docker image
5. Deploy to staging, run smoke tests
6. Promote to production (manually or automatically)
7. Monitor and roll back on failure

GitHub Actions example:

~~~yaml
on: [push]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm test -- --run
      - run: npm run build
~~~

Benefits: smaller risk per release, faster feedback, reproducible deployments.`,
      },
      {
        id: 'adv-7',
        difficulty: 'Moderate',
        question: 'What is Docker and why is it useful?',
        answer: `Docker packages an application with its dependencies into an **image**; a running instance is a **container**. Containers share the host kernel, so they are lighter than virtual machines.

~~~dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
~~~

~~~bash
docker build -t my-api .
docker run -p 3000:3000 --env-file .env my-api
~~~

Benefits: "works on my machine" consistency, fast onboarding, and identical artefacts across dev/staging/prod. Use multi-stage builds for smaller images and [[.dockerignore]] to keep context clean.

Docker Compose runs multiple services (app + database + redis) together for local development.`,
      },
      {
        id: 'adv-8',
        difficulty: 'Easy',
        question: 'What should you check before deploying a web app?',
        answer: `A practical pre-flight checklist:

- **Environment** — production env vars set, secrets not committed, correct API URLs.
- **Build** — production build passes locally ([[npm run build]]) with no type or lint errors.
- **Database** — migrations applied, backups enabled, indexes in place.
- **Security** — HTTPS, CORS restricted, rate limiting, auth tested, dependencies audited.
- **Performance** — compressed assets, images optimised, caching headers, lazy loading.
- **Observability** — error tracking, logs, uptime monitoring, analytics.
- **SEO/meta** — title, description, favicon, OG image, sitemap.
- **Rollback plan** — previous version deployable in minutes.

Deploy to a staging environment first whenever possible.`,
      },
      {
        id: 'adv-9',
        difficulty: 'Hard',
        question: 'What are XSS, CSRF and SQL injection, and how do you prevent them?',
        answer: `**XSS (Cross-Site Scripting)** — attacker injects script that runs in your page. Prevent by escaping output, using framework interpolation (React escapes by default), sanitising rich HTML (DOMPurify), and a strict CSP. Never use [[dangerouslySetInnerHTML]] with user data.

**CSRF (Cross-Site Request Forgery)** — another site triggers authenticated requests using the victim's cookies. Prevent with [[SameSite=Lax/Strict]] cookies, CSRF tokens, and checking [[Origin]].

**SQL/NoSQL injection** — user input alters a query.
~~~js
// Vulnerable
db.query('SELECT * FROM users WHERE email = ' + email)
// Safe: parameterised
db.query('SELECT * FROM users WHERE email = $1', [email])
~~~
For MongoDB, reject objects in fields that should be strings ([[req.body.email]] could be [[{ $ne: null }]]).

Also: hash passwords, validate input on the server, apply least privilege, keep dependencies patched.`,
      },
      {
        id: 'adv-10',
        difficulty: 'Hard',
        question: 'How do you improve frontend performance?',
        answer: `Measure first — Lighthouse, Chrome DevTools Performance, and real-user metrics.

**Loading**
- Code-split routes and heavy components; lazy-load below-the-fold content.
- Optimise images (modern formats, correct sizes, [[loading="lazy"]]).
- Self-host and preload fonts; use [[font-display: swap]].
- Compress and cache assets; serve via CDN with long-lived hashed filenames.
- Reduce third-party scripts.

**Rendering**
- Avoid layout thrashing; animate [[transform]] and [[opacity]].
- Virtualise long lists.
- Keep bundles small; remove unused dependencies.
- Use [[content-visibility]] and skeletons for perceived speed.

**Core Web Vitals targets**
- **LCP** < 2.5s — largest contentful paint
- **INP** < 200ms — interaction responsiveness
- **CLS** < 0.1 — visual stability (set dimensions on media)

Optimise the metric users feel, not just the score.`,
      },
      {
        id: 'adv-11',
        difficulty: 'Moderate',
        question: 'What is caching and where can it happen?',
        answer: `Caching stores a copy of expensive work closer to the consumer. Layers:

- **Browser cache** — [[Cache-Control]], [[ETag]], [[Last-Modified]]
- **CDN / edge** — static assets and cached HTML near users
- **Application / in-memory** — short-lived computed results
- **Redis / Memcached** — shared cache for sessions, API responses, counters
- **Database** — query cache, materialised views, indexes

~~~js
const cached = await redis.get(key)
if (cached) return JSON.parse(cached)
const data = await db.query(...)
await redis.set(key, JSON.stringify(data), 'EX', 60)
~~~

Patterns: cache-aside (most common), write-through, write-behind. Challenges: **invalidation**, stale data, stampedes on expiry. Use TTLs, versioned keys, and explicit invalidation after mutations.

Note: [[Cache-Control: no-store]] for private data; [[immutable]] for hashed assets.`,
      },
    ],
  },
]

export const allQuestions = topics.flatMap((topic) =>
  topic.questions.map((q) => ({ ...q, topicId: topic.id, topicName: topic.name })),
)
