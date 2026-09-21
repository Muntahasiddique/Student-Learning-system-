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
## N2 — Admin Lock, JWT Roles & Micro-Frontend Routing

* **Built:** Created `verifyAdmin` middleware to restrict POST `/api/grades/report` strictly to teachers, chaining it with `verifyToken`. Updated the Login controller to inject `role: User.role` into the JWT payload. Implemented cross-port micro-frontend routing on the frontend, using a hard `window.location.href` to boot teachers out of the student client (`localhost:5173`) and into the Admin Vite app (`localhost:5174`), while fixing the Admin app's base `<Route path="/"/>` to catch them. Verified Mongoose `.populate()` successfully fetched nested course titles on the GET route.
* **Confused me:** Attempted to use React Router (`navigate('/admin')`) and imported admin components to jump between two completely separate Vite applications. React Router has no idea the admin folder exists because it runs on a separate local server; navigating between micro-frontends requires a hard browser redirect. Also crashed the database by testing with a fake ID containing letters g, h, i, j, k, triggering a Mongoose `CastError`.
* **Would forget in 2 weeks:** A JWT is a sealed envelope; if you don't explicitly pack the `role` inside it during the Login generation step, your middleware will read `undefined` and lock everyone out. Furthermore, role validation must be case-insensitive: `req.user.role === 'teacher'` will fail if the DB saved `"Teacher"`, so always chain `.toLowerCase()` before evaluating. Finally, MongoDB `_id` fields are strictly hexadecimal—they only accept numbers `0-9` and letters `a-f`. Fake data outside that range will fatally crash the server.

## N3 — GradeReport.jsx (Student Grades UI)
* **Built:** Created `GradeReport.jsx` to fetch and render the student's academic record. Used `useEffect` and `axios.get` to hit `/api/grades/getreport`, passing the JWT in the `Authorization` header. Mapped the `UserGrades` array to dynamically render UI cards displaying the populated `course.title`, `assessmentName`, `score`, and `letterGrade`.
* **Confused me:** Accidentally imported `express` into a Vite React client, which causes a fatal module resolution crash. Then, I trapped the `.map()` loop inside the header of a single hardcoded card and opened the arrow function with `{}` but forgot the `return` keyword—resulting in a silent `undefined` return and a blank screen. Finally, I left a hardcoded static HTML card sitting outside the loop, which made it look like fake data was bleeding into the database response.
* **Would forget in 2 weeks:** If your `grades.map()` loop is written perfectly but the screen is empty without throwing a console error, your data array is empty `[]`. This almost always means you are logged into the frontend with the wrong account (e.g., the teacher instead of the student), so the database returns zero matching records. Also, an arrow function in a `.map()` needs parentheses `()` for an implicit return, or curly braces `{}` with an explicit `return` keyword.

## N4 — Degree Progress Backend Logic
* **Built:** Created `getDegreeProgress` controller to aggregate a student's academic history. Implemented a professional dictionary lookup (`gradeScale`) to convert letter grades into numeric points. Used `forEach` to calculate cumulative GPA and total credits. Wired it to `GET /api/degree/progress` and protected it with `verifyToken`.
* **Confused me:** Created a new `degree.routes.js` file but forgot to import `express` at the top and export the router at the bottom, which fatally crashed the server. Later, the API successfully returned `200 OK` but all values were `0` because I tested it using a token for an account that had no grades in the database.
* **Would forget in 2 weeks:** React brainwashed me into trying to use `.map()` for everything. `.map()` returns a new array, but when you need to calculate a single total (like a GPA), you must use `.forEach()` or `.reduce()`. Also, if you need data from a different collection (like course `credits`), you must chain `.populate('course')` to your Mongoose query, or that data is literally invisible to your controller.

## N5 — Degree Progress Frontend (React State & Auth Protection)
* **Built:** Created `Degree.jsx` to consume the `/api/degree/progress` endpoint. Implemented `useEffect` to fetch dynamic GPA and credit data on mount. Added conditional rendering to block unauthenticated users from seeing the dashboard and display an error state instead of broken cards. Separated inline styles into a dedicated `degree.css` file.
* **Confused me:** Tried to pass an Axios request directly into `useEffect` without wrapping it in an `async` function, and forgot to actually call the function after defining it. Also forgot that a missing token will cause a `ReferenceError` if you try to attach it to the Axios headers before checking if it exists.
* **Would forget in 2 weeks:** Static HTML is useless in React. You cannot just write text inside a `<p>` tag; you must inject the state variables using curly braces (e.g., `{gpa}`) so the UI updates dynamically. Also, massive inline styles are a trap—always map them to CSS classes in a separate stylesheet.

## N6 — Landing Page & React Animations (Home.jsx)
* **Built:** Migrated the static EJS home page into a functional React SPA component. Replaced all legacy `<a>` tags with React Router `<Link>` components to prevent hard server refreshes. Built a synchronized `useEffect` timer loop to simultaneously cycle the hero image and bounce the active CSS state across the three feature cards.
* **Confused me:** Tried to use vanilla JS DOM manipulation (`getElementById`) and static HTML classes from the old EJS project. Learned that React requires `useState` to track the active index, and ternary operators inside template literals (`className={\`...\`}`) to dynamically apply CSS classes. 
* **Would forget in 2 weeks:** If you write a `setInterval` in a `useEffect` hook, you MUST return a `clearInterval` cleanup function, or React will spawn infinite background timers and crash the browser. Also, SVGs without explicit CSS width/height constraints will explode out of their containers in React.

## Week 5 — Community Forum Database & API (N1 & N2)
* **Built (Database):** Scrapped the single-file embedded approach and deleted `forum.model.js`. Architected a normalized relational database using `thread.model.js` and `reply.model.js`. Linked child comments to parent posts using `threadId` to ensure popular posts don't eventually crash the application by hitting MongoDB's 16MB document size limit.
* **Built (API):** Separated routing logic from database logic. Wrote `forum.controller.js` containing `createThread`, `getAllThreads`, `getThreadById`, and `addReply`, and mapped them in `forum.routes.js`. 
* **Security & Auth:** Removed `author` and `upvotes` from client `req.body` to prevent spoofing and manipulation. Applied `verifyToken` to all `POST` routes, ensuring `req.user.id` is securely extracted from the login token. Intentionally avoided `verifyAdmin` on write routes so both students and teachers can actively post and reply.
* **Would forget in 2 weeks:** To render a full discussion page on the frontend, `getThreadById` must execute two separate database queries—one for the parent Thread, and one for all Replies matching that `threadId`—and package them into a single JSON response.
## Week 5 — Forum Frontend Integration (N4)
* **Built (React State):** Wired up `Forum.jsx` to the Express backend. Replaced hardcoded HTML mockups with dynamic `.map()` rendering tied to a `threads` state array.
* **Built (Data Fetching):** Implemented an on-mount `useEffect` to fetch the main feed (GET) and a `handleCreateThreads` function to post new discussions (POST) and instantly trigger a silent re-fetch to update the UI.
* **Security & Auth:** Extracted the JWT from `localStorage` and correctly passed it in the `Authorization: Bearer <token>` header to bypass the backend `verifyToken` middleware.
* **What I'd forget in 2 weeks:** 
    1. Local storage keys are strictly case-sensitive (`authtoken` vs `AuthToken`). 
    2. React state remembers errors. If you call `setError("Failed")`, you must explicitly call `setError(null)` on the next button click, or the ghost error stays on the screen forever even if the API call succeeds.
    3. Never send an Axios request to port 3000 (React frontend) when the Express server lives on port 5000.

## Week 5 — Thread Detail & Replies (N5)
* **Built (React Router):** Implemented `useParams` to capture the dynamic `:id` from the `/forum/:id` URL. 
* **Built (Data Fetching):** Sent a GET request to the backend to simultaneously retrieve the parent thread object and the array of child replies. 
* **Built (UI Integration):** Mapped the replies array to the UI and wired up a controlled form to submit new comments via a protected POST request. Instantly triggered a silent re-fetch to render new comments without page reloads.
* **What I'd forget in 2 weeks:** Axios requests require backticks (\`) for string interpolation (`${id}`), not single quotes. If you send a request to port `3000` instead of `5000`, the frontend will silently fail because the Express server isn't listening there.

## Week 5 — Forum Polish & Pagination (N6)
* **Built (Backend Pagination):** Updated the `getAllThreads` controller to extract `page` and `limit` from `req.query`. Calculated the exact `skip` value `((page - 1) * limit)` to slice the database results, and chained `.skip()` and `.limit()` to the Mongoose query to prevent browser crashes. Used `countDocuments()` to send the `totalpages` count back to the client.
* **Built (Frontend UI):** Added `page` and `totalPages` state to `Forum.jsx`. Replaced static HTML pagination with dynamic React `<button>` elements. Implemented logic to lock the "Next" button (`disabled={page >= totalPages}`) and grey it out dynamically. Added a conditional empty state (`threads.length === 0`) for when the database is empty.
* **Confused me:** Case sensitivity and HTML limitations. I spelled it `totalpages` on the backend but tried to read `totalPages` on the frontend, resulting in an `undefined` state. I also tried to apply the `disabled` attribute to a `<div>`, which caused the pagination lock to fail completely. 
* **What I'd forget in 2 weeks:** The `disabled` attribute only works on actual interactive HTML elements like `<button>` or `<input>`, never on a `<div>`. Also, URL query parameters (`?page=2`) do not need to be explicitly defined in your Express route setup; Express automatically parses anything after the `?` and drops it into the `req.query` object for you.