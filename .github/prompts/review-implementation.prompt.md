---
description: Perform an independent ScholarTrack implementation review against the locked specification
---

Review the implementation without redesigning it.

Read:
- `README.md`
- `AGENTS.md`
- `docs/TECHNICAL_SPECIFICATION_V1.md`
- The task/acceptance criteria
- The changed files and relevant tests

Check:
- Specification and scope compliance
- Architecture compliance
- Authentication/authorization/ownership
- Validation and error handling
- Database integrity, migrations, indexes, and query behavior
- API contract correctness
- Frontend/backend boundary
- Edge cases and regressions
- Test quality and missing coverage
- Unnecessary complexity

Classify findings as:
- BLOCKING
- IMPORTANT
- NON-BLOCKING

Do not introduce new requirements. Do not merge.

Finish with:
1. Review outcome
2. Blocking findings
3. Important findings
4. Non-blocking findings
5. Tests reviewed/executed
6. Scope verification
