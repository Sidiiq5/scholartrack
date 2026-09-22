# ScholarTrack V1 Frontend Implementation Map

**Status:** Approved implementation map for the final V1 frontend.

## Authority
- Product behavior: `docs/TECHNICAL_SPECIFICATION_V1.md`
- Visual/interaction reference: `Sidiiq5/Sidiiq5-scholartrack-ui-reference`
- Production implementation: Next.js + TypeScript + Tailwind CSS
- No new standalone HTML prototypes.

## Canonical references
- Authentication: `gemini login ad&stu.html`
- Student shell: `student shell.html`
- Student discovery: `scholartrack_discovery_app.html`
- Admin: `scholartrack_admin_dashboard_mvp.html`
- `home DIscovery.html` and `scholartrack_prototype (1).html` are secondary/historical references only.

## Production routes

### Public
- `/` — discovery
- `/scholarships/[id]` — scholarship detail
- `/login` — unified authentication

### Student
- `/student` — discovery shell
- `/student/saved` — My Trackers
- `/student/prepare/[scholarshipId]` — preparation
- `/student/notifications` — notifications
- `/student/settings` — settings

### Admin
- `/admin` — dashboard
- `/admin/scholarships` — scholarship management
- `/admin/scholarships/[id]` — editor/preview
- `/admin/verification` — verification queue
- `/admin/reports` — reports
- `/admin/users` — users
- `/admin/settings` — settings

## Shared UI
- ScholarTrack brand/logo
- Inter-style typography
- navy/blue visual language
- glass surfaces where used by the approved reference
- consistent borders, radius, spacing, buttons, inputs, status badges
- responsive desktop/mobile navigation
- accessible focus states
- loading, empty, error, disabled, and success feedback

## Student
Discovery uses compact scholarship cards with provider, title, short description, funding, degree, country, deadline, days remaining, Save, and View Details.

Detail contains overview, funding, eligibility, academic/language requirements, preparation requirements, programs where maintained, important dates, last verified, official source, official application, Save, and Report Issue.

My Trackers contains saved scholarships, notes, deadlines, and preparation access. It does not contain application-status stages.

Preparation uses scholarship-specific requirements and only Ready / In Progress / Need statuses with optional notes. It never uploads documents.

Notifications are in-app only and limited to meaningful 14-day and 3-day deadline reminders.

Settings contains profile/account, notification preferences, password change, save feedback, and sign out. No MFA/social-login UI in V1.

## Admin
Shared visual identity with denser information layout.

Dashboard stats: Total Scholarships, Published, Pending Verification, Closed, Open Reports.

Scholarships: search, filters, add, edit, view, verify, publish, close.

Editor sections: Basic Information, Academic, Funding, Requirements, Dates, Programs, Official Information, Status.

Preview: student-facing scholarship detail representation with Edit / Verify / Publish / Close actions.

Reports: reason, open/resolved state, view, resolve.

Users: user/email/status/joined/last activity, active/suspended, view/suspend/reactivate.

Settings: admin profile, email, password/change-password placeholder, notification preferences.

## Production-only corrections to prototype behavior
- Real Django authentication; no mock credentials or quick-fill.
- No social login.
- No localStorage as persistence.
- Real API data; no permanent mock scholarship dataset.
- Official external application links only.
- No application-status tracking.
- No student document uploads.
- No acceptance-rate fields.
- No simulated server-error controls.
- No prototype auth-token display.
- Backend remains authoritative for validation, authorization, and ownership.

## Retired production UI
The previous amber/white discovery page in `frontend/app/page.tsx` is retired and must not remain as an alternate design or route. The final frontend replaces it rather than evolving it.

## QA coverage
Each major screen must cover desktop/mobile, loading, empty, error, success, disabled, focus/keyboard, auth boundaries, and relevant API failure behavior.
