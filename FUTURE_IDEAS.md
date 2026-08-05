# Future Ideas / Backlog

Everything here is checked against the actual 6-week plan and deliberately excludes anything already scheduled. Search/filter, CourseDetail, enrollment, Dashboard real data, grades, degree logic, forum with pagination/empty states, admin dashboard + user management + basic stats, CodeEditor, and the full polish pass (validation, error states, responsive, empty states) are ALL already part of the plan — they belong in the weekly nights, not here.

This list is only for things that would turn this into a genuinely different, bigger project. Not required to call this project "done" or "good." Revisit only after all 6 weeks are actually complete.

---

## Course content system (beyond a flat Course document)
- Structured chapters (video, slides, notes, ordering) as their own schema/sub-document — the plan's CourseDetail is a single fetch-by-id page, not a multi-chapter content system.
- Per-user, per-chapter completion/progress tracking — needs a join between User, Course, and Chapter; nothing like this exists in the 6-week plan.
- Real file storage for downloadable slides/notes (e.g. Cloudinary).

## Ratings & reviews
- A real Review model (studentId, courseId, rating, comment) with a calculated average — the plan never introduces ratings at all; any rating shown is decorative unless built.

## AI Tutor chatbot
- Currently a decorative tooltip only. A working version means integrating an actual LLM API, managing chat state, and handling cost/rate limits — a standalone project on its own, not a quick add-on.

## Deeper auth/security (beyond what N1-N6 already cover)
- Backend JWT verification middleware enforcing token expiry on protected routes will naturally get built once Week 3's enroll/unenroll endpoints need to identify the logged-in user — that's plan work, not backlog. What's genuinely backlog: rate limiting / login-attempt throttling, a full password-reset-via-email flow, and email verification on signup. None of these are mentioned anywhere in the 6-week plan.
- Role-based dashboard content (different views for student vs teacher) — the plan's Dashboard just shows "my courses + quick stats," with no branching by role specified.

## Beyond-plan forum features
- Upvotes/reactions on posts.
- Moderation tools (flag/delete posts, ban users from forum).
(Pagination and empty states ARE already in the plan's Week 5 N6 — not listed here.)

## Course creation/publishing workflow
- If teachers should be able to create/submit their own courses (vs admin managing everything), that's a real workflow with an approval step — not implied anywhere in the current plan.

## Minor polish, genuinely not covered by the plan's polish pass
- Accessibility pass (aria labels beyond what's already on the filter selects, keyboard navigation).
- Custom 404 page.
- Loading skeletons instead of plain loading text (the plan's polish pass covers "error states," not skeleton loaders specifically).

---

## Reminder for future-me

The 6-week plan, fully executed, is already a complete, legitimate, defensible full-stack project. Nothing on this list is required. This file exists so a good idea during Week 3 doesn't derail Week 3 — write it here, keep building the actual night's task.