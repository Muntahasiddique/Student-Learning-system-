# Build Log

## N1 — App setup + Mongo connect
- Built: app.js with mongoose connection (proper .then/.catch), /api/health route
- Confused me: passing app.listen(...) directly into .then() runs it immediately instead of waiting — needed to wrap in () => {}
- Would forget in 2 weeks: mongoose.connect() returns a promise, app.listen must go inside .then()

## N2 — User model + bcrypt hook
- Built: User schema (name, email, password, role, timestamps) + pre('save') bcrypt hash hook
- Confused me: forgot to assign the hashed value back to this.password — hash was computed and thrown away
- Would forget in 2 weeks: isModified('password') needs the field name as a string argument, not just isModified alone