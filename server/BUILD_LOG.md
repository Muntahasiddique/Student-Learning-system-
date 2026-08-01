# Build Log

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