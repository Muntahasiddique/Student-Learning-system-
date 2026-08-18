# Future Ideas — Real-World Functionality Backlog

**Not part of the 6-week plan.** The 6-week plan stays exactly as scheduled — this file exists so real-world ideas have somewhere to go without derailing the current night's task. Revisit only after all 6 weeks are complete.

The core gap running through all of this: **no authorization exists yet.** Every route is currently reachable by any logged-in user regardless of role — `role` is just a label on the User document right now, nothing checks it. Real role-based access control (middleware checking `req.user.role`) is the foundation everything below depends on, and isn't explicitly built anywhere in the 6-week plan even though Week 6 assumes Admin has special powers.

---

## Student

- Profile management — edit name, change password (not in the 6-week plan at all currently)
- Per-chapter video/content completion tracking (needs Course to have real chapters — see Course Content System below)

## Teacher

Currently just a label — nothing in the backend distinguishes Teacher from Student.

- Course creation/edit UI — a real form to create and manage their own courses (title, description, chapters, materials)
- Upload/manage course content (video, slides, notes)
- "My students" view — list of students enrolled in their courses
- Grade-entry UI — Week 4's `GradeReport.jsx` is student-facing (view own grades); nothing lets a teacher *enter* grades for their students
- Forum moderation scoped to their own courses (delete spam, pin posts on their course's threads)
- Per-course analytics (enrollment count, average grade, completion rate)
- Permission boundary: can only touch courses/students they own, not other teachers'

## Admin

Week 6 covers: wire AdminDashboard to courses, manage users + basic stats. Beyond that:

- Course approval/moderation step before a new course goes live
- Platform-wide analytics (total users, total courses, enrollment trends, most popular courses, forum activity) — "basic stats" from Week 6 is undefined, may need expanding
- System-level settings management — categories, degree programs, difficulty levels are currently hardcoded in `Courses.jsx`'s filter dropdowns; a real system would let Admin manage these values instead
- Global forum moderation (any thread, not just one course)
- Manually reset a user's password / ban-suspend accounts

## Foundational (blocks all of the above)

- Real role-based access control — backend middleware checking `req.user.role` before allowing create/update/delete on courses, grades, users, etc. Ties into JWT verification middleware (naturally gets built in Week 3, but the *role-checking* layer on top of it does not — that's additional work).
- Restrict course create/update/delete to Teacher/Admin only once this middleware exists (currently open to anyone with a valid token — flagged during Week 2 N2/N3 build).

## Course content system (beyond a flat Course document)
- Structured chapters (video, slides, notes, ordering) as their own schema/sub-document
- Per-user, per-chapter completion/progress tracking
- Real file storage for downloadable materials (e.g. Cloudinary)

## Ratings & reviews
- Real Review model (studentId, courseId, rating, comment) with calculated average — no rating system exists in the plan at all currently

## AI Tutor chatbot
- Currently a decorative tooltip only. A working version needs real LLM API integration, chat state management, and cost/rate-limit handling — a standalone project on its own.

## Deeper auth/security
- Rate limiting / login-attempt throttling
- Password reset via email
- Email verification on signup

## Forum enhancements beyond Week 5's scope
- Upvotes/reactions on posts
- (Pagination and empty states are already in Week 5 N6 — not listed here)

## Minor polish beyond the plan's Week 6 N5 polish pass
- Accessibility pass (aria labels, keyboard navigation)
- Custom 404 page
- Loading skeletons instead of plain loading text

## Admin/Teacher "Create Course" form UI
- Right now course creation only exists via Thunder Client/POST endpoint, no UI form anywhere. Check against Week 6 N1 (AdminDashboard) — may already be partially covered there.

---

## Reminder for future-me

The 6-week plan, fully executed, is already a complete, legitimate, defensible full-stack project. Nothing here is required to call it done. This file exists so a good idea doesn't derail the current night — write it here, keep building tonight's actual task.