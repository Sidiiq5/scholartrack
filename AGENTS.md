# ScholarTrack AI Engineering Rules

## Project Role

ScholarTrack is a scholarship discovery and preparation platform.

AI agents are engineering assistants, not autonomous architects.

## Source of Truth

Before making changes, inspect:

1. `README.md`
2. `AGENTS.md`
3. Relevant project documentation
4. Existing code and configuration

The source-of-truth documents are:

* `README.md` → high-level product identity and V1 scope
* `docs/TECHNICAL_SPECIFICATION_V1.md` → canonical technical Source of Truth
* `AGENTS.md` → AI engineering rules

Approved specifications take precedence over assumptions and existing implementation.

## Scope Control

Do not:

* Add features that are not approved
* Remove approved functionality
* Redesign the architecture
* Introduce microservices
* Introduce Redis
* Introduce a dedicated search engine
* Introduce Kubernetes
* Introduce additional databases
* Introduce document storage
* Introduce application-status tracking
* Introduce AI scholarship matching
* Introduce AI-generated scholarship publishing
* Add unnecessary dependencies

If a task appears to require an architectural or product decision that is not already approved:

**Stop → Explain → Propose → Request approval**

Do not make the decision autonomously.

## Architecture

The approved V1 architecture is:

* Next.js
* TypeScript
* Tailwind CSS
* Django
* Django REST Framework
* PostgreSQL
* Django ORM
* Django Admin
* Pytest
* Playwright
* OpenAPI
* GitHub

Architecture style:

**Stateless Modular Monolith + PostgreSQL**

The frontend must never connect directly to PostgreSQL.

The backend owns:

* Business logic
* Authentication
* Authorization
* Validation
* Database access
* API behavior

## Engineering Rules

Before modifying code:

1. Inspect the existing implementation.
2. Understand relevant dependencies and relationships.
3. Make the smallest appropriate change.
4. Do not rewrite unrelated code.
5. Do not create duplicate functionality.

Every implementation must remain consistent with the approved architecture and product scope.

## Testing

Every feature and bug fix must have appropriate automated tests.

Use:

* Pytest for backend/API/business logic
* Playwright for appropriate end-to-end flows

Bug fixes should include regression tests where appropriate.

Never claim that tests were executed unless they were actually executed.

Distinguish clearly between:

* Implemented
* Tested
* Implemented and verified

## Security

Security-sensitive behavior must be handled by the backend.

Never:

* Commit secrets
* Expose credentials
* Bypass authorization
* Trust frontend-only validation
* Allow users to access another user's private data
* Disable security controls merely to make development easier

## Database

Database changes must use Django migrations.

Do not manually modify production database schemas outside the approved migration process.

Review:

* Foreign keys
* Constraints
* Unique relationships
* Indexes
* Query behavior

before completing database-related work.

## Git

Keep changes focused and reviewable.

Do not modify unrelated files.

Do not commit generated secrets, `.env` files, or credentials.

`main` must remain deployable.

Significant functional, architectural, database, or security changes require review before merging.

## AI Agent Behavior

An AI agent must:

* Inspect before editing
* Follow the approved specification
* Make small changes
* Explain what changed
* List files changed
* Report tests added
* Report tests actually executed
* Report migrations
* Report dependencies added
* Report known limitations
* Identify issues requiring human attention

An AI agent must not:

* Claim work was completed when it was not
* Claim tests passed when they were not run
* Silently change architecture
* Silently expand scope
* Approve or merge its own work

Detailed agent definitions for the implementation workflow live in `.github/agents/`. Use those definitions as the authoritative guide for responsibilities, boundaries, and handoffs.

## Human Approval

The human project owner has final authority over:

* Product scope
* Architecture
* Major technical decisions
* Security decisions
* Significant dependencies
* Database design changes
* Production deployment
* Pull-request approval

AI review does not replace human review.

## Definition of Done

A change is complete only when it:

* Meets the approved specification
* Follows the architecture
* Handles relevant edge cases
* Has appropriate tests
* Passes existing tests
* Has no unauthorized scope changes
* Preserves security and authorization
* Has acceptable code quality
* Has required documentation updates
* Has been reviewed appropriately

When uncertain, stop and ask rather than inventing a requirement.
