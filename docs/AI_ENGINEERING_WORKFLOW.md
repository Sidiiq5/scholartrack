# ScholarTrack AI Engineering Workflow

**Status: APPROVED WORKFLOW**

## Goal

Use AI to reduce implementation time without giving AI authority over product decisions or architecture.

## Standard flow

1. **Discuss**
   - User and project lead clarify the problem.
2. **Design**
   - Define the smallest implementation that satisfies the approved specification.
3. **Lock**
   - Confirm scope, files/components, acceptance criteria, and tests.
4. **Implement**
   - Assign the smallest appropriate Copilot custom agent.
5. **Test**
   - Implementation agent runs relevant checks.
6. **AI Review**
   - Senior Reviewer independently checks the result against the locked scope and Source of Truth.
7. **Human Review**
   - Project owner reviews the PR and decides whether it is acceptable.
8. **Merge**
   - Only after required checks and human approval.

## Agent selection

### Architect
Use only when planning a multi-part feature, dependency chain, or genuine architectural concern.

### Database Engineer
Use when a feature changes models, relationships, constraints, indexes, or migrations.

### Backend Engineer
Use for Django/DRF business logic, API behavior, validation, auth, and ownership.

### Frontend Engineer
Use for Next.js/TypeScript UI, API integration, routing, and user-facing states.

### QA Engineer
Use for regression strategy, test coverage, E2E flows, security/ownership validation, or when implementation needs independent test verification.

### Senior Reviewer
Use as the final AI gate before human review.

## Speed rule

Do not turn one feature into many tiny AI tasks.

Prefer a vertical slice:
- database work when needed
- backend behavior
- frontend behavior
- tests
- review

Parallelize only independent work. Do not parallelize changes that depend on an evolving API or schema.

## Stop conditions

An agent must stop instead of guessing when:
- product behavior is not approved
- a new API contract is required
- database semantics are unclear
- architecture must change
- security behavior is unclear
- existing requirements conflict

Use:
**Stop → Explain → Propose → Request approval**

## Definition of Done

A change is done only when it:
- matches the locked specification
- preserves the approved architecture
- has appropriate tests
- passes required CI/checks
- has no unresolved critical issues
- has required documentation/migrations
- passes AI review
- receives human approval
- is ready for controlled merge/deployment

## Reporting

Agents must distinguish:
- Implemented
- Implemented and verified

Never report tests as passed unless they were actually executed.
