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

## N3 — Course detail, update, delete backend
- Built: GET /api/courses/:id (getCourseById), PUT /api/courses/:id (updateCourse), DELETE /api/courses/:id (deleteCourse) — all using req.params to get the id, all with 404-if-not-found handling.
- Confused me: `req.params` vs `req.body` — GET and DELETE requests have no body, so an identifier like a course id can't travel there. It has to live in the URL itself (`/courses/:id`), which Express captures into `req.params.id`. Took a while and a real multi-day gap to click, but tracing a real request step-by-step (client sends full URL → Express matches route pattern → params extracted) is what made it land.
- Would forget in 2 weeks: `findByIdAndUpdate(id, updates, {new: true})` — without `{new: true}` (or its modern equivalent `{returnDocument: 'after'}`), Mongoose returns the document as it looked *before* the update, not after — meaning a client could get back stale/old data even though the update succeeded in the DB. Also: REST convention puts the action in the HTTP method (GET/POST/PUT/DELETE), not the URL — briefly tried renaming routes like `/getAll`, `/Update/:id` and it broke consistency/predictability for no functional gain; reverted to `/courses`, `/courses/:id` with different methods instead.

## N4 CourseCatalog.jsx (fetch all + map + loading/error states).

- Built: Courses.jsx fetches real data via axios + useEffect, replaced hardcoded fake cards with .map() over real courses
Confused me: forgetting return inside a curly-brace arrow function passed to .map() — silently returns undefined for every item, no error thrown, just nothing renders
Would forget in 2 weeks: setloading(false) needs to run in both the success AND catch branches, or a failed fetch leaves the UI stuck in loading state forever

## N5 — Search/filter via query params

- Built: getAllCourses reads req.query (search, difficulty, category, degree, price), builds a filter object conditionally. Case-insensitive matching via $regex + $options: 'i' for both partial text search (title/description via or)andexact−matchdropdownfilters(difficulty/category/degree,anchoredwith...or) and exact-match dropdown filters (difficulty/category/degree, anchored with ^... or)andexact−matchdropdownfilters(difficulty/category/degree,anchoredwith...). Price required special handling — frontend sends "Free"/"Premium" as strings, translated to real Mongo conditions ({price: 0} vs {price: {$gt: 0}}) instead of casting directly to a number.

Confused me: req.query vs req.body vs req.params — took real effort to separate these (query = ?key=value in the URL, body = POST data, params = URL path segment via :id). Also wrapped a variable in an extra unnecessary object ({filter} instead of filter) when passing it to .find(), which silently created the wrong query shape.

Would forget in 2 weeks: query params are always strings — a Number field in the schema needs explicit conversion/logic (not just !isNaN checks) before comparing, since "0" and 0 aren't automatically treated the same everywhere. Also: exact-match filters only need case-insensitivity if the frontend might send inconsistent casing — dropdown-driven filters usually don't need it, since the value always matches what's stored. 


## N6 — Course Detail Page (Dynamic Routing)
- Built: Connected the catalog preview button to a dedicated `CourseDetail.jsx` page using React Router's `<Link>`. Fetched single course data via `axios` hitting `GET /api/courses/:id` and rendered the real database content.
- Confused me: React Router parameter mismatches. The main route was looking for `/content/:subjectId`, but the component used `useParams()` to look for `id`, and the button linked to `/courses/ID`. It completely broke the routing. Also got stuck trying to inject variables into Axios URLs because I used single quotes instead of template literal backticks (`` ` ``). 
- Would forget in 2 weeks: `useParams()` must exactly match the placeholder defined in the `App.jsx` route (e.g., `path="/courses/:id"` means you extract `id`). Also: you *must* add an `if (!course)` guard clause before the `return` statement so React doesn't crash trying to read properties of `null` before the database responds.

## Auth Middleware — verifyToken (built between Week 2 and Week 3, before Enrollment)
- Built: server/middleware/auth.middleware.js — verifyToken reads the token from req.headers.authorization, rejects with 401 if missing, splits the "Bearer <token>" string to extract just the token, verifies it with jwt.verify(token, process.env.JWT_SECRET), attaches the decoded payload to req.user, and calls next() so the real controller runs. Catches invalid/expired tokens with a 403.
- Confused me: the whole reason this exists at all — every request arrives at the backend as a total stranger, with no memory of who logged in. The frontend has to re-prove identity on every single request by re-sending the token (stored in localStorage) in the Authorization header. Also: why split on " " — the header arrives as one string, "Bearer <token>", and .split(" ") turns it into ["Bearer", "<token>"], so [1] grabs just the actual token, discarding the label.
- Would forget in 2 weeks: req.user = decoded doesn't hand you the full user profile — only whatever was originally packed into the token at Login (just {id: user._id}). Any controller that needs more than the id (name, email, etc.) still has to look the user up in the database using that id. Also: middleware functions go as an extra argument in the route definition, before the controller — e.g. router.post('/enroll', verifyToken, enrollCourse) — and the order matters, since verifyToken has to run and call next() before the controller ever executes. 

## Week 3
## N1- Enrollment model (refs to user + course).
Built: dedicated Enrollment model (user + course ObjectId refs, both required, timestamps)
Confused me: required: true protects that one record's data integrity (can't save an incomplete enrollment), not a rule forcing user behavior — easy to mix these up
Would forget in 2 weeks: ref must exactly match the registered model name (case-sensitive) — ref: 'User' only works if that model was registered as mongoose.model('User', ...), not 'user'

### Week 3 
## N2 — COMPLETE (Enroll/unenroll endpoints)
*   **Built:** `unenrollCourse` controller logic using `findOneAndDelete` and `$inc: {enrolledCount: -1}`.
*   **Wired:** Created `server/routes/enrollment.routes.js`, imported the `verifyToken` middleware correctly using destructuring, and set up `POST /enroll/:courseId` and `DELETE /unenroll/:courseId`.
*   **Mounted:** Added `app.use('/api', enrollmentRoutes)` in `app.js`.
*   **Tested:** Successfully generated a JWT via the login route, passed it as a Bearer token in Thunder Client, and verified that both enrolling (201), the duplicate guard clause (400), and unenrolling (200) work flawlessly.
*   **Next Up (Whenever ready):** N3 — Wire the enroll button on `CourseDetail.jsx` on the React frontend.

## N3 — Wire enroll button on CourseDetail.jsx
- Built: handleEnroll — gets token from localStorage, guards if missing, sends axios.post to /api/enroll/:courseId with empty body and Bearer token in headers, alerts on success/failure.
- Confused me: why the second axios.post argument is an empty {} — it's a placeholder to keep the headers config in the correct third argument position, since this request has no actual data to send (backend already knows who/which course from the token + URL).
- Would forget in 2 weeks: full request flow — token retrieved client-side → sent in Authorization header → verifyToken middleware runs first on the backend route, validates it, attaches req.user.id → only then does the actual controller (enrollCourse) run. Confirmed working end-to-end: real 400 "Already enrolled" on a duplicate attempt.

###  N4 — COMPLETE (My Enrolled Courses Page)
*   **Built:** Created `client/src/pages/MyCourses.jsx` to fetch and display the user's enrolled courses.
*   **State Management:** Implemented `useEffect` to fetch data on mount using `axios.get` with the JWT Bearer token in the headers.
*   **Unenroll Logic:** Wrote `handleUnenroll` using `axios.delete`. Implemented immediate UI updates by utilizing `.filter()` on the `enrolledcourses` state to remove the deleted course instantly without a page reload.
*   **Pending/UX Note:** The page is currently orphaned. Needs a navigation link added to `Header.jsx` or the Dashboard.
*   **UX Polish:** Updated `Header.jsx` with conditional rendering (`{token && ...}`). The "My Courses" link and the "Log Out" button now only appear for authenticated users, while appropriately hiding the "Log In/Sign Up" buttons. Applied identical logic to the mobile navigation menu.
## N5 *   **Dashboard Polish & Debugging:** 
    *   Extracted all inline React styles into a dedicated `dashboard.css` file for clean separation of concerns.
    *   Resolved a nested object rendering crash by mapping the correct Mongoose `.populate()` path (`enrollment.course.title`).
    *   Implemented `array.slice(0, 3)` to professionally restrict the recent courses UI and prevent infinite scrolling on the dashboard.

### Week 4 
**N1 - Grade Model (Complete)**
*   Created `grade.model.js` from scratch.
*   Successfully structured relational data linking `User` (student) and `Course`.
*   Added numerical `score`, string `letterGrade`, and `assessmentName` to track specific assignments.