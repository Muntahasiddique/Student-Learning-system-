# Build Log
## Week 1
## N1 — App setup + Mongo connect
- Built: app.js with mongoose connection (proper .then/.catch), /api/health route
- Confused me: passing app.listen(...) directly into .then() runs it immediately instead of waiting — needed to wrap in () => {}
- Would forget in 2 weeks: mongoose.connect() returns a promise, app.listen must go inside .then()

## N2 — User model + bcrypt hook
- Built: User schema (name, email, password, role, timestamps) + pre('save') bcrypt hash hook
- Confused me: forgot to assign the hashed value back to this.password — hash was computed and thrown away
- Would forget in 2 weeks: isModified('password') needs the field name as a string argument, not just isModified alone

## N3 — Signup route
- Built: POST /api/auth/signup — validates existing user by email, creates user (password auto-hashed via model hook), locked role server-side to "student" instead of trusting client input
- Confused me: async pre-save hooks don't take a `next` parameter — calling next() threw "next is not a function" because Mongoose doesn't pass a real callback to async hooks, it just waits on the returned promise
- Would forget in 2 weeks: letting client send `role` in signup body is a privilege escalation hole (anyone could self-assign "admin") — always decide sensitive fields server-side, never trust req.body for them
- note: worth logging the regex quoting mistake (string vs actual regex literal) — that's a pattern you'll hit again with any regex work.

## N4 — Login route + JWT issuance
- Built: POST /api/auth/login — implemented fail-fast guard clauses, bcrypt password verification, and issued session tokens using `jsonwebtoken`.
- Confused me: The execution flow of the `return` statement. I put my token generation after the `res.status(200)` return, making it unreachable dead code. I also generated the token but forgot to actually pack it into the JSON response envelope. 
- Would forget in 2 weeks: `Jwt.sign()` takes three distinct arguments separated by commas (payload, secret, options) — they cannot be wrapped in one single object. Also, `require('dotenv').config()` must go on line 1 of the main `app.js` file, not inside individual controllers, to globally load the vault.

## N5 — Signup.jsx (controlled form + axios integration)
- Built: Controlled signup form (name, email, password, confirmPassword, role dropdown) wired to POST /api/auth/signup via axios, with success/error state handling and a password visibility toggle.
- Confused me: Assumed `error.response` always exists in a catch block — a genuine `ERR_CONNECTION_REFUSED` (server down) has no `.response` at all, so `error.response.data.message` crashed with "Cannot read properties of undefined." Had to add an `if (error.response) {...} else {...}` guard.
- Would forget in 2 weeks: Regex patterns need `/slashes/`, not `'quotes'` — a quoted pattern is just a string and `.test()` won't behave as a real matcher. Also: browser autofill silently overrides input background-color CSS; fixed with a `-webkit-autofill` inset box-shadow trick, not a normal CSS rule.

## N6 — Login.jsx + token storage + protected Dashboard route
- Built: Login form storing the returned JWT in localStorage on success, plus a Dashboard page that checks for that token on load and redirects to /login if missing.
- Confused me: Why the redirect needed `useEffect` at all instead of a plain `if` in the component body — turns out calling `navigate()` mid-render is a side effect React disallows during render; `useEffect(() => {...}, [])` defers it until after mount. Also mixed up token *presence* with token *validity* — localStorage holds the token string indefinitely regardless of its baked-in `expiresIn`, since nothing reads or checks that expiry client-side. Only backend `jwt.verify()` (not built yet) actually enforces it.
- Would forget in 2 weeks: Login's success check and Dashboard's token check aren't redundant — they run at different times (one at the moment of login, one on every visit to a protected page, regardless of how the user got there). Also: hooks can only be called inside the component function, never at file top-level, and `return` must sit as a sibling statement outside `useEffect`, never nested inside it.

## Week 2
## N1 Course model.
- Built: Course schema with title, description, duration, enrolledCount/rating (defaulted, not required), degree/difficulty/category, price, unique coursecode, instructor/createdBy as plain strings for now.
Confused me: required: true + default on the same field are contradictory — required blocks the document before the default could ever apply.
- Would forget in 2 weeks: createdBy/instructor should become real ObjectId + ref: 'User' references in Week 3 once populate() is actually taught — don't forget to circle back and upgrade these fields then.

## N2 Built: POST /api/courses (create) and GET /api/courses (list all)
- Confused me: !price treats 0 as falsy/missing, even though 0 is a valid price (free course) — had to check price === undefined instead of just !price
- Would forget in 2 weeks: !variable catches more than "missing" — it also catches 0, "", false. Only safe for fields where an empty/zero value is never legitimate.