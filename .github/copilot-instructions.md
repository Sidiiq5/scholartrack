# ScholarTrack Copilot Instructions

## Project
ScholarTrack is a scholarship discovery and preparation platform. The approved V1 experience is:
**Discover → Understand → Save → Prepare → Apply externally**

The official scholarship provider remains the source of truth.

## Source of truth
Before changing code, inspect:
1. `README.md`
2. `AGENTS.md`
3. `docs/TECHNICAL_SPECIFICATION_V1.md`
4. Relevant existing code and configuration

Approved decisions override assumptions and existing implementation.

## Architecture
V1 is a **stateless modular Django monolith + PostgreSQL**:
- Next.js + TypeScript + Tailwind
- Django + DRF + Django ORM + Django Admin
- PostgreSQL
- Pytest + Playwright
- OpenAPI
- GitHub Actions
- Sentry

The frontend never connects directly to PostgreSQL.

## Scope discipline
Do not add unapproved product or infrastructure features. In particular, do not introduce microservices, Redis/Celery, Kubernetes, another database, a dedicated search engine, document storage, automatic scraping/publishing, AI scholarship matching, application-status tracking, AI CV/essay generation, payments, social/community/chat, mobile apps, organization accounts, or complex analytics.

If a task requires a new product, architecture, security, API, or database decision:
**Stop → Explain → Propose → Request approval.**

## Implementation rules
- Inspect before editing.
- Make the smallest correct change.
- Reuse existing patterns.
- Do not perform unrelated refactors.
- Backend owns authentication, authorization, validation, business logic, and database access.
- Never trust frontend-only validation.
- Never expose another user's private data.
- Use Django migrations for schema changes.
- Add appropriate automated tests.
- Never claim a test ran unless it actually ran.
- Keep `main` deployable.

## Workflow
Use:
**Discuss → Design → Lock → Implement → Test → AI Review → Human Review → Merge**

AI agents are executors/reviewers, not autonomous product owners. They must not silently change scope, architecture, or requirements, and they must not approve or merge their own work.

## Reporting
Every implementation/review should report:
- What changed
- Files changed
- Tests added
- Tests actually executed and results
- Migrations
- Dependencies
- Known limitations
- Issues requiring attention
- Scope verification

Keep responses concise and evidence-based.
