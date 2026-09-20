# ScholarTrack CI/CD

## Purpose

ScholarTrack uses a controlled delivery process:

Development → CI → Review → Merge → Staging → Verification → Production

The purpose of CI is to detect errors before changes reach the main branch or deployment environments.

## GitHub Actions

The initial CI workflow is:

`.github/workflows/ci.yml`

It runs on:

- Pull requests targeting `main`
- Pushes to `main`

The workflow currently detects whether the backend or frontend exists before running application-specific checks.

This allows the repository to establish CI before the applications are implemented.

## Backend Checks

When the Django backend exists, CI supports:

- Python setup
- Dependency installation
- Django system checks
- Migration consistency checks
- Configured lint checks
- Pytest

CI must use the project's actual dependency and test configuration.

It must not invent application commands or dependencies.

## Frontend Checks

When the Next.js frontend exists, CI supports:

- Node.js setup
- Dependency installation
- ESLint
- TypeScript checking
- Production build

A committed `package-lock.json` is required for reproducible frontend CI.

## End-to-End Testing

Playwright E2E testing will be introduced after the frontend and backend applications exist.

Package 3 does not install Playwright or create E2E tests.

The E2E pipeline will be added when the application and Playwright configuration are available.

## Dependency Security

Pull requests use GitHub's dependency review action to identify dependency-related changes that require attention.

No application security tool or infrastructure is introduced before it is needed by the actual application.

## Environments

ScholarTrack uses three environments:

### Development

Used for local development.

Development must not use production data.

### Staging

A separate environment used for:

- Integration testing
- E2E testing
- Database migration verification
- Deployment verification
- Human acceptance testing

### Production

The production environment is isolated from development and staging.

Production deployment requires controlled approval.

## Deployment Targets

The approved future deployment targets are:

- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL
- Source control: GitHub
- Monitoring: Sentry

Package 3 does not configure deployment workflows because the applications do not exist yet.

## Production Delivery Flow

The intended delivery process is:

Pull Request
→ CI
→ AI Review
→ Human Review
→ Merge
→ Staging
→ Verification
→ Production Approval
→ Production Deployment

Production deployment must not bypass the approval process.

## Branching

The approved branching model is:

- `main`
- `feature/*`
- `fix/*`
- `chore/*`
- `docs/*`

`main` should remain deployable.

GitFlow is not used.

## Secrets

Secrets must never be committed to the repository.

Future secrets should be stored using the appropriate platform:

- GitHub Actions Secrets/Variables
- Vercel environment variables
- Render environment variables

Examples include:

- Django `SECRET_KEY`
- Database credentials
- API keys
- Deployment credentials
- Sentry credentials

## Package 3 Scope

Package 3 establishes the CI/CD foundation only.

It deliberately does not implement:

- Django application code
- Next.js application code
- API endpoints
- Database models
- Authentication
- Vercel deployment
- Render deployment
- Docker
- Kubernetes
- Redis
- Celery
- Microservices
- Additional databases
- Playwright tests
- Production deployment automation

These concerns will only be introduced when required by later approved packages.
