# SCHOLARTRACK — TECHNICAL SPECIFICATION V1.0

**Status:** APPROVED AND LOCKED  
**Role:** Canonical Technical Source of Truth  
**Architecture:** Stateless Modular Monolith + PostgreSQL

## 1. Product Boundary

ScholarTrack is a scholarship discovery and preparation platform.

Core experience:

**Discover → Understand → Save → Prepare → Apply externally**

ScholarTrack helps students:

* Discover scholarships
* Understand scholarship information
* Save opportunities
* Prepare for requirements
* Track deadlines
* Receive meaningful deadline notifications
* Access official application websites

ScholarTrack does not process scholarship applications.

Application flow:

**ScholarTrack → Official Provider Website → Student Applies**

The official scholarship provider remains the source of truth.

## 2. Architecture

Architecture style:

**Stateless Modular Monolith + PostgreSQL**

```text
User
 ↓
Next.js
 ↓
Django REST API
 ↓
PostgreSQL
```

The frontend never connects directly to PostgreSQL.

The backend owns:

* Authentication
* Authorization
* Validation
* Business logic
* Database access
* API behavior

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

### Backend

* Python
* Django
* Django REST Framework
* Django ORM
* Django Admin

### Database

* PostgreSQL

### Testing

* Pytest
* Playwright

### API documentation

* OpenAPI

### Source control

* Git
* GitHub

### CI/CD

* GitHub Actions

### Monitoring

* Sentry

## 3. Backend Modules

The Django backend uses a modular monolith:

```text
users/
scholarships/
saved/
preparation/
notifications/
reports/
core/
```

Do not create separate modules for every small domain concept such as:

* deadlines
* providers
* funding
* requirements
* fields
* search

Those concepts belong within their appropriate domain modules.

There is no separate admin backend module.

Django Admin operates across the application modules.

## 4. Authentication & Authorization

Roles:

* STUDENT
* ADMIN

V1 uses:

**Django authentication + secure sessions**

Public scholarship discovery does not require authentication.

Authentication is required for:

* Saved scholarships
* Preparation
* Notifications
* Reports
* Personal settings

Students may manage only their own private data.

Students cannot access administrative functions.

Admins manage:

* Scholarships
* Verification
* Publication
* Users
* Reports
* Appropriate system content

The backend determines identity, permissions, and ownership.

### MFA

MFA is not part of V1.

Potential V2 security features include:

* Admin MFA
* Email verification codes
* Authenticator-app MFA
* Additional admin security controls

## 5. Data Flow

```text
User
 ↓
Next.js
 ↓
Django REST API
 ↓
Authentication / Authorization
 ↓
Validation
 ↓
Business Logic
 ↓
PostgreSQL
 ↓
Django
 ↓
Next.js
 ↓
User
```

External application flow:

```text
ScholarTrack
 ↓
Official Scholarship Website
 ↓
Student
```

## 6. Database Design

Core entities:

* User
* Provider
* Country
* Scholarship
* Field
* Requirement
* Program
* SavedScholarship
* PreparationItem
* Notification
* Report

### User

Uses Django authentication.

Conceptual information:

* ID
* Name
* Email
* Password hash
* Role
* Status
* Timestamps

No document storage.

### Provider

* ID
* Name
* Country
* Website URL
* Timestamps

### Country

* ID
* Name
* ISO 3166-1 alpha-2 code

Examples:

* Hungary → HU
* Germany → DE
* Finland → FI
* Ireland → IE
* Canada → CA
* United States → US
* Somalia → SO

The UI displays country names.

API filtering uses country codes.

### Field

* ID
* Name
* Slug

Scholarship ↔ Field is many-to-many.

### Scholarship

* ID
* Provider
* Name
* Description
* Degree levels
* Funding type
* Tuition information
* Stipend information
* Other funding information
* Eligibility
* Academic requirements
* Language requirements
* Opening date
* Deadline
* Official application URL
* Official source URL
* Optional programme catalogue URL
* Last verified timestamp
* Status
* Created timestamp
* Updated timestamp

Scholarships can support multiple degree levels.

No acceptance-rate field.

No application-status field.

No uploaded-document fields.

### Requirement

* ID
* Scholarship
* Type
* Title
* Description
* Required flag

Requirement types:

* ACADEMIC
* LANGUAGE
* DOCUMENT
* ELIGIBILITY
* FINANCIAL
* OTHER

Requirements support student preparation.

### Program

* ID
* Scholarship
* Name
* Description
* University
* Country
* Official URL

Programs are not a separate marketplace.

If maintaining individual programmes would create unnecessary maintenance or stale information, ScholarTrack may provide the official programme catalogue instead.

### SavedScholarship

* User
* Scholarship
* Created timestamp

Database constraint:

```text
UNIQUE(user_id, scholarship_id)
```

### PreparationItem

* User
* Scholarship
* Requirement, nullable
* Title
* Status
* Note
* Timestamps

Statuses:

* READY
* IN_PROGRESS
* NEED

Preparation is not application tracking.

### Notification

* User
* Type
* Title
* Message
* Is read
* Created timestamp

Types:

* DEADLINE_14_DAYS
* DEADLINE_3_DAYS

### Report

* User
* Scholarship
* Reason
* Description
* Status
* Admin note
* Created timestamp
* Resolved timestamp
* Resolved by

Reasons:

* DEADLINE_CHANGED
* BROKEN_LINK
* INCORRECT_ELIGIBILITY
* SCHOLARSHIP_CLOSED
* OTHER

Statuses:

* OPEN
* RESOLVED

## 7. Controlled Values

### DegreeLevel

* BACHELORS
* MASTERS
* PHD

### FundingType

* FULLY_FUNDED
* PARTIALLY_FUNDED
* TUITION_ONLY
* STIPEND

### ScholarshipStatus

* DRAFT
* VERIFIED
* PUBLISHED
* CLOSED

### PreparationStatus

* READY
* IN_PROGRESS
* NEED

### ReportReason

* DEADLINE_CHANGED
* BROKEN_LINK
* INCORRECT_ELIGIBILITY
* SCHOLARSHIP_CLOSED
* OTHER

### ReportStatus

* OPEN
* RESOLVED

### NotificationType

* DEADLINE_14_DAYS
* DEADLINE_3_DAYS

### RequirementType

* ACADEMIC
* LANGUAGE
* DOCUMENT
* ELIGIBILITY
* FINANCIAL
* OTHER

### UserRole

* STUDENT
* ADMIN

### UserStatus

* ACTIVE
* SUSPENDED

Naturally variable information such as scholarship names, providers, descriptions, financial information, programme names, universities, notes, and admin notes must not be converted into unnecessary enums.

## 8. Scholarship Lifecycle

```text
DRAFT
 ↓
VERIFIED
 ↓
PUBLISHED
 ↓
CLOSED
```

**DRAFT:** Internal creation/editing. Not public.

**VERIFIED:** Checked against official source. Not necessarily public.

**PUBLISHED:** Publicly available.

**CLOSED:** Opportunity is no longer open.

Verification and publication are separate.

Closed scholarships may remain accessible for historical/reference purposes.

## 9. Deadline Rules

The deadline is stored as an actual date.

Remaining days are calculated dynamically.

```text
days_remaining = deadline - current server date
```

For closed scholarships:

```text
days_remaining = null
```

A scholarship must not be presented as active after its deadline.

A scheduled mechanism persists the CLOSED state.

Manual early closure is allowed when the official source confirms that the opportunity closed early.

## 10. API Conventions

Base path:

```text
/api/
```

No `/v1/` prefix.

REST + JSON.

JSON naming:

```text
snake_case
```

Dates/timestamps:

```text
ISO 8601
```

IDs:

```text
Integer IDs
```

Methods:

* GET
* POST
* PATCH
* DELETE

Authentication:

* Django session authentication

Authorization:

* Backend enforced

Documentation:

* OpenAPI

The API exposes business capabilities rather than blindly exposing database tables.

### Error format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message.",
    "details": {}
  }
}
```

Standard HTTP statuses:

* 200
* 201
* 204
* 400
* 401
* 403
* 404
* 409
* 429
* 500

Pagination:

* Default: 20
* Maximum: server controlled

## 11. Scholarship API

```http
GET /api/scholarships/
GET /api/scholarships/{id}/
```

Search:

```text
?q=
```

Filters:

* degree_level
* field
* country
* funding_type
* deadline_after
* deadline_before
* language_requirement

Sorting supports:

* deadline soonest
* deadline latest
* recently added
* recently verified

Country filtering uses ISO alpha-2 codes.

List responses are compact.

Detail responses contain complete scholarship information.

Authenticated users may receive:

```text
saved: true/false
```

`days_remaining` is calculated dynamically.

## 12. Saved API

```http
GET /api/saved/
POST /api/scholarships/{id}/save/
DELETE /api/scholarships/{id}/save/
```

Authentication required.

Save has no body.

Unsave returns 204.

Duplicate saves are prevented by the database constraint.

## 13. Preparation API

```http
GET /api/scholarships/{id}/preparation/
POST /api/scholarships/{id}/preparation/
PATCH /api/preparation/{id}/
DELETE /api/preparation/{id}/
```

Authentication and ownership validation required.

Statuses:

* READY
* IN_PROGRESS
* NEED

No application-status workflow.

No document storage.

## 14. Notification API

```http
GET /api/notifications/
PATCH /api/notifications/{id}/read/
```

In-app only.

Saved scholarship reminders:

* 14 days before deadline
* 3 days before deadline

No daily reminders.

No notification spam.

Duplicate scheduled notifications must be prevented.

## 15. Reports API

```http
POST /api/scholarships/{id}/reports/
```

Student authentication required.

Students submit reports.

Admins review and resolve reports through Django Admin.

## 16. Authentication API

```http
POST /api/auth/register/
POST /api/auth/login/
POST /api/auth/logout/
GET /api/auth/me/
```

Registration defaults to STUDENT.

Self-registration as ADMIN is prohibited.

## 17. Settings API

```http
GET /api/settings/
PATCH /api/settings/
```

Only the authenticated user's settings are accessible.

V1 settings remain minimal.

## 18. Public Supporting APIs

```http
GET /api/countries/
GET /api/fields/
```

Read-only public reference data.

Degree levels and funding types remain controlled backend definitions.

## 19. Admin Boundary

V1 uses customized Django Admin as the primary administrative interface.

No separate Next.js admin dashboard.

Admin manages:

* Scholarships
* Providers
* Countries
* Fields
* Requirements
* Programs
* Users
* Reports
* Verification
* Publication

A dedicated Next.js admin dashboard is deferred until real usage demonstrates a need.

## 20. User Flows

### Public

```text
Visit
 ↓
Browse/Search
 ↓
Filter
 ↓
Open scholarship
 ↓
Understand requirements/funding/deadline
 ↓
View programmes if available
 ↓
Official application link
```

### Student

```text
Browse
 ↓
Open
 ↓
Save
 ↓
Prepare
 ↓
Monitor deadline
 ↓
Receive notification
 ↓
Official application website
```

### Admin

```text
Django Admin
 ↓
Create scholarship
 ↓
Enter structured information
 ↓
Validate
 ↓
Verify official source
 ↓
Publish
```

### Reporting

```text
Student
 ↓
Report
 ↓
Admin review
 ↓
Verify against official source
 ↓
Correct
 ↓
Resolve
```

## 21. Search & Filtering

V1 uses PostgreSQL.

No dedicated search engine.

Search covers:

* Scholarship name
* Provider
* Description
* Fields
* Relevant keywords

Filters:

* Degree level
* Field
* Country
* Funding type
* Deadline
* Language requirement

Pagination is required.

Default discovery prioritizes active/upcoming opportunities.

Closed opportunities remain accessible and clearly marked.

Scaling principle:

**Measure → Identify bottleneck → Optimize → Measure again → Scale when necessary.**

## 22. Preparation

Preparation is a simple checklist tied to scholarship requirements.

Students can:

* See requirements
* Create preparation items
* Track readiness
* Add short notes
* Update statuses
* Delete items

Statuses:

* READY
* IN_PROGRESS
* NEED

No document uploads.

No application-status workflow.

## 23. Trust Model

> ScholarTrack organizes and simplifies scholarship information; the official scholarship provider remains the source of truth.

Every published scholarship should provide:

* Official source
* Official application link
* Last verified date

ScholarTrack must not present unverified information as authoritative.

## 24. Scholarship Creation

V1 scholarship creation is manual and structured.

Workflow:

**Create → Enter information → Validate → Verify official source → Publish**

AI must not automatically publish scholarship information.

Future possibility:

```text
Official page
 ↓
AI extraction
 ↓
Structured data
 ↓
Admin review
 ↓
Publish
```

This is future functionality, not V1.

## 25. Security

V1 includes:

* Django authentication
* Secure sessions/cookies
* Backend authorization
* Ownership checks
* CSRF protection
* Restrictive CORS
* Backend validation
* Database constraints
* Rate limiting for sensitive endpoints
* HTTPS in production
* Environment-managed secrets
* DEBUG=False in production
* Secure password hashing
* Database access controls
* Security-conscious logging
* Production security headers

Frontend validation is for UX only.

Backend validation is authoritative.

## 26. Performance & Reliability

V1 includes:

* PostgreSQL indexing
* Query optimization
* Pagination
* Efficient ORM usage
* Transactions
* Automated backups
* Restore testing
* Health endpoint
* Structured logging
* Basic monitoring
* Sentry
* Controlled error handling
* Appropriate retry behavior

No V1:

* Redis
* Dedicated search engine
* Kubernetes
* Microservices
* Multiple databases
* Elaborate observability infrastructure

unless measured need later justifies them.

## 27. Testing

Backend:

**Pytest**

End-to-end:

**Playwright**

Tests cover appropriate:

* Business logic
* API behavior
* Authentication
* Authorization
* Ownership
* Security-sensitive behavior
* Important user flows
* Error states
* Regression cases

Every feature and bug fix must have appropriate automated tests.

Never claim tests were executed unless they actually ran.

## 28. Environments

Three environments:

* Development
* Staging
* Production

Development uses local infrastructure and no production data.

Staging uses separate infrastructure and database.

Staging is used for:

* Integration testing
* E2E testing
* Migration testing
* Deployment testing
* Human verification

Production is isolated.

## 29. Deployment

Initial deployment stack:

* Frontend: Vercel
* Backend: Render
* Database: Render PostgreSQL
* Source: GitHub
* CI: GitHub Actions
* Monitoring: Sentry

Production:

```text
User
 ↓
Vercel / Next.js
 ↓ HTTPS
Render / Django + DRF
 ↓
Render PostgreSQL
```

Target domains:

* `www.scholartrack.com`
* `api.scholartrack.com`
* `api.scholartrack.com/admin/`

HTTPS is required.

Application code should remain reasonably provider-independent.

## 30. CI/CD

Flow:

```text
Pull Request
 ↓
CI
 ↓
AI Review
 ↓
Human Review
 ↓
Merge
 ↓
Staging Verification
 ↓
Production Approval
 ↓
Production Deployment
```

GitHub Actions should perform relevant:

* Backend tests
* Frontend checks
* Linting
* Type checking
* Build checks
* E2E tests

Production deployment is approval-controlled.

## 31. Database Migrations

All schema changes use Django migrations.

```text
Code change
 ↓
Migration
 ↓
Review
 ↓
Tests
 ↓
Staging
 ↓
Verification
 ↓
Production
```

Production database schemas must not be manually modified.

## 32. Environment & Secrets

Secrets never enter GitHub.

`.env` is ignored.

`.env.example` is committed.

Potential variables include:

* DATABASE_URL
* SECRET_KEY
* DJANGO_SETTINGS_MODULE
* ALLOWED_HOSTS
* CORS_ALLOWED_ORIGINS
* SENTRY_DSN
* NEXT_PUBLIC_API_URL

## 33. Backups

Production PostgreSQL uses automated backups.

Periodic restore testing is required.

A backup is not considered proven until restoration has been tested.

## 34. Background Work

V1 does not introduce Redis/Celery merely for deadline notifications.

A lightweight scheduled mechanism handles recurring deadline notification work.

Conceptually:

```text
Scheduled job
 ↓
Find relevant saved scholarships
 ↓
Check deadline
 ↓
Check existing notification
 ↓
Create notification
```

The implementation must remain isolated so a queue/worker architecture can be introduced later if measured need exists.

## 35. Logging & Monitoring

Sentry provides dedicated application error monitoring.

Logs must not expose:

* Passwords
* Secrets
* API keys
* Session secrets
* Sensitive personal information

Health endpoints must not expose sensitive internals.

## 36. Git/GitHub Workflow

GitHub is the source-control platform.

`main` remains deployable.

Low-risk documentation or non-functional changes may be committed directly when appropriate.

Significant changes require:

**Focused branch → Pull Request → CI → AI Review → Human Review → Merge**

Significant changes include:

* Functional changes
* Security changes
* Database changes
* Architectural changes

Commits should be focused and descriptive.

## 37. AI Engineering Rules

AI agents are engineering assistants, not autonomous architects.

Each agent receives:

* Exact task
* Relevant specification
* Architecture
* Allowed technologies
* Allowed files
* Forbidden files where appropriate
* Acceptance criteria
* Required tests

Agents must inspect existing code before editing.

Agents must make small reviewable changes.

Agents cannot:

* Redesign architecture
* Expand product scope
* Remove approved requirements
* Introduce unapproved infrastructure
* Approve their own work
* Merge their own work

If an agent encounters an architectural issue:

**Stop → Explain → Propose → Request approval**

## 38. AI Agent Roles

Six repository-level roles:

1. Architect / Planner
2. Backend Engineer
3. Frontend Engineer
4. Database Engineer
5. QA / Testing
6. Senior Code Reviewer

The human project owner retains final authority.

## 39. AI Code Review Agent

The Senior Code Review Agent reviews significant implementations before human review.

Checks:

* Bugs
* Security vulnerabilities
* Authorization
* Ownership
* Architecture
* Database correctness
* API contract violations
* Edge cases
* Error handling
* Performance
* Missing tests
* Regression risks
* Unnecessary complexity
* Scope creep
* Specification compliance

AI review can reject an implementation but cannot merge it.

Human review is final.

## 40. Agent Reporting

Every agent must report:

* What changed
* Files changed
* Tests added
* Tests actually executed
* Test results
* Migrations
* Dependencies added
* Known limitations
* Issues requiring human attention

Agents must distinguish:

**Implemented**

from:

**Implemented and verified**

## 41. Definition of Done

A feature is Done only when it:

* Meets the approved specification
* Follows the architecture
* Handles relevant edge cases
* Has appropriate tests
* Passes existing tests
* Has no unauthorized scope changes
* Preserves authentication
* Preserves authorization
* Preserves ownership controls
* Validates inputs
* Protects secrets
* Has security-sensitive tests
* Has appropriate E2E tests where needed
* Passes CI
* Has completed AI review
* Has completed human review
* Has critical findings resolved
* Has required documentation updates
* Has migrations reviewed
* Has staging verification where appropriate
* Is ready for controlled deployment

## 42. V1 Explicit Exclusions

V1 does not include:

* AI scholarship matching
* AI-generated scholarship information
* Automatic scholarship scraping
* Automatic AI publishing
* AI CV builder
* AI essay generator
* Application-status tracking
* Acceptance-rate tracking
* Applying directly inside ScholarTrack
* Student document uploads
* Document Vault
* Payments
* Social/community
* Chat
* Mobile application
* Organization accounts
* Complex analytics
* Multi-language support
* Dedicated search infrastructure
* Microservices
* Kubernetes
* Additional databases
* Unnecessary infrastructure

These exclusions are deliberate scope boundaries.

## 43. V2 / Future Candidates

Potential future capabilities include:

* Admin MFA
* Email verification
* Authenticator-app MFA
* AI-assisted scholarship extraction
* AI-assisted verification
* Dedicated Next.js admin dashboard
* Redis
* Background workers/queues
* Dedicated search engine
* Additional notification channels
* Mobile application
* AI scholarship matching

These are not V1 commitments.

## 44. Scaling Philosophy

**Measure → Identify bottleneck → Optimize → Measure again → Scale when necessary.**

Infrastructure is introduced because of measured need.

Do not introduce infrastructure merely because it is technically fashionable.

## 45. Source-of-Truth Hierarchy

When resolving conflicts:

1. Explicitly approved product decisions
2. `docs/TECHNICAL_SPECIFICATION_V1.md`
3. `AGENTS.md`
4. Existing implementation
5. AI assumptions

Existing code does not override an approved specification.

AI assumptions never override approved decisions.

## 46. Final Technical Principle

> **Simple to launch, stateless to scale, modular to evolve, secure by default, measurable before optimization, and disciplined in scope.**

## 47. Approval Status

**TECHNICAL SPECIFICATION V1.0 — APPROVED AND LOCKED**

This document is now the canonical technical Source of Truth for ScholarTrack V1.

Any future change requires explicit review and approval under the project's engineering decision process.
