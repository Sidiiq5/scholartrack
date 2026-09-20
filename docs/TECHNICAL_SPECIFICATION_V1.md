# ScholarTrack Technical Specification V1

## 1. Purpose

This document defines the approved V1 technical specification for ScholarTrack. It describes the product scope, system boundaries, architecture, technical responsibilities, data model, and engineering rules for implementation.

This specification is intentionally aligned to the approved V1 product definition in `README.md` and the project governance rules. It is not a general platform roadmap or a feature expansion document.

## 2. Product Scope Summary

ScholarTrack is a scholarship discovery and preparation platform for students seeking funded opportunities. V1 focuses on:

- Scholarship discovery and filtering
- Structured scholarship information
- Saving scholarships to a personal shortlist
- Preparation tracking for saved scholarships
- Deadline awareness and reminders for saved scholarships
- Reporting incorrect scholarship data
- Administrative management of scholarship entries
- Official-source verification and publication workflow

V1 does not include direct application processing, AI-generated content, document vaults, payments, community features, or other out-of-scope features defined in the product foundation.

## 3. Core User Journeys

### 3.1 Discover scholarships

A student can:

- Browse scholarships
- Search by keyword or relevant criteria
- Filter results by degree level, field of study, country, funding type, deadline, and language requirements
- View paginated scholarship cards
- Review scholarship details

### 3.2 Understand a scholarship

A student can view structured scholarship information, including:

- Scholarship name
- Provider
- Country
- Degree level
- Fields of study
- Funding type
- Tuition details
- Stipend details
- Other funding information
- Eligibility
- Academic requirements
- Language requirements
- Relevant requirements
- Opening date
- Deadline
- Remaining time
- Official application link
- Official source
- Last verified date

### 3.3 Save scholarships

An authenticated student can:

- Save a scholarship
- Remove a saved scholarship
- View saved scholarships

### 3.4 Prepare

For each saved scholarship, a student can track preparation status:

- Ready
- In Progress
- Need

A student may also add a short personal note.

ScholarTrack does not store application documents in V1.

### 3.5 Apply externally

ScholarTrack provides official application linking and source metadata, but the student must complete the formal application on the official external website.

### 3.6 Report issues

Students can report issues such as:

- deadline changed
- broken application link
- incorrect eligibility information
- scholarship closed
- other

Admin review is required before resolution.

## 4. System Overview

### 4.1 Architectural Style

The approved V1 architecture is:

- Next.js
- TypeScript
- Tailwind CSS
- Django
- Django REST Framework
- PostgreSQL
- Django ORM
- Django Admin
- Pytest
- Playwright
- OpenAPI
- GitHub

The architecture is a stateless modular monolith backed by PostgreSQL.

### 4.2 Architectural Boundaries

The frontend must never connect directly to PostgreSQL.

The backend is the system owner for:

- business logic
- authentication
- authorization
- validation
- database access
- API behavior

The frontend is responsible for presentation and user interaction only.

## 5. Technical Principles

The system must obey the following principles:

1. Simplicity over optional complexity
2. Official provider data remains the source of truth
3. Students should not need to manage high cognitive load while comparing scholarships
4. The platform must support structured scholarship understanding and preparation
5. The system must remain maintainable and reviewable
6. No unnecessary infrastructure, services, or dependencies without explicit approval

## 6. High-Level Architecture

### 6.1 Frontend

The frontend is a Next.js application using TypeScript and Tailwind CSS.

Responsibilities:

- page rendering for browsing, detail, auth, account, and admin views
- client-side state for authenticated user interactions
- form handling for preparation tracking and reporting
- presentation of structured scholarship data
- links to official applications

Constraints:

- no direct database access
- no bypass of backend validation
- no business logic that duplicates server-side rules

### 6.2 Backend

The backend is a Django application using Django REST Framework.

Responsibilities:

- API layer
- authentication and authorization
- validation and business rules
- ORM-based access to PostgreSQL
- admin workflows for scholarship lifecycle management
- reporting review flows
- notification logic for saved scholarships

### 6.3 Database

The database is PostgreSQL using Django ORM.

Database access is controlled through approved Django models, migrations, and queries. Database changes must follow the migration process defined in the engineering governance rules.

## 7. Functional Modules

### 7.1 Scholarship Discovery Module

Purpose:

Provide a searchable, filterable list of published scholarships.

Requirements:

- list scholarships in paginated results
- support search and filtering by approved criteria
- present scholarship cards with summary metadata
- handle no-result and empty-state states
- ensure the published scholarship is the active source of truth

Approved discovery filters:

- degree level
- field of study
- country
- funding type
- deadline
- language requirement

### 7.2 Scholarship Detail Module

Purpose:

Present structured, human-readable scholarship details.

Requirements:

- show approved core metadata fields
- display official application link
- display official source
- show last verified date
- distinguish verified and published content from unverified or draft data
- surface relevant academic programme information when available

### 7.3 Saved Scholarship Module

Purpose:

Support personal scholarship shortlisting.

Requirements:

- authenticated users can save and remove scholarships
- saved scholarships are stored with user-specific ownership
- user can view a saved list
- saved list remains separate from public publication catalog

### 7.4 Preparation Tracking Module

Purpose:

Allow students to track required preparation activities for saved scholarships.

Requirements:

- each saved scholarship may carry preparation status entries
- supported status values are: Ready, In Progress, Need
- a student may add a short note
- preparation data is personal and not part of the official scholarship record
- no document upload or document vault functionality in V1

Example fields:

- GPA requirement
- IELTS
- Transcript
- CV
- Motivation letter

### 7.5 Deadline Tracking Module

Purpose:

Help students avoid missing scholarship deadlines.

Requirements:

- show opening dates
- show deadlines
- show remaining time
- display deadline radar information where relevant
- send in-app reminders for saved scholarships
- V1 reminder thresholds: 14 days before deadline and 3 days before deadline
- no daily spam or repeated reminder loops

### 7.6 Reporting Module

Purpose:

Allow students to flag inaccurate scholarship information.

Requirements:

- support issue reporting categories such as broken link, changed deadline, incorrect eligibility, closed scholarship, or other
- store report metadata for administrative review
- validate against official scholarship source before closure
- maintain admin review and resolution process

### 7.7 Administration Module

Purpose:

Provide a manual administrative workflow for scholarship lifecycle management.

Approved workflow:

- Create
- Enter structured information
- Validate
- Verify official source
- Publish

Approved lifecycle states:

- DRAFT
- VERIFIED
- PUBLISHED
- CLOSED

Requirements:

- verification and publication are separate steps
- only verified and published records are generally available to students
- admin system uses Django Admin in the approved architecture

## 8. Data Model Overview

The V1 data model is centered on scholarships and user interactions relevant to the approved product scope.

### 8.1 Scholarship Model

A scholarship record contains:

- scholarship name
- provider
- country
- degree level
- fields of study
- funding type
- tuition information
- stipend information
- other funding information
- eligibility
- academic requirements
- language requirements
- relevant requirements
- opening date
- deadline
- days remaining or derived deadline state
- official application link
- official source
- last verified date
- publication and lifecycle metadata

### 8.2 Scholarship Lifecycle Fields

A scholarship must support lifecycle status tracking:

- DRAFT
- VERIFIED
- PUBLISHED
- CLOSED

It must also support verification timestamps and publication timestamps as needed.

### 8.3 User Model

Applications must support a standard Django user model with authenticated student access and administrative access.

### 8.4 Saved Scholarship Model

A saved scholarship relation should include:

- user
- scholarship
- created timestamp
- optional removal timestamp

### 8.5 Preparation Tracking Model

A preparation record should include:

- user
- scholarship
- item name or preparation category
- status value: Ready, In Progress, Need
- note
- updated timestamp

### 8.6 Reporting Model

A report record should include:

- user
- scholarship
- report category
- report details
- created timestamp
- reviewed status
- reviewer metadata
- resolution state

## 9. API Design Principles

The API must be built with Django REST Framework and should follow a clean, predictable contract using OpenAPI for documentation.

Requirements:

- use standard REST patterns
- provide explicit authentication and authorization boundaries
- separate public scholarship endpoints from authenticated student endpoints and admin endpoints
- validate all input server-side
- document the schema using OpenAPI

### 9.1 Public API Surface

Public or semi-public endpoints may include:

- scholarship listing
- scholarship detail retrieval
- search and filtering support
- list of approved metadata options

### 9.2 Authenticated API Surface

Authenticated student endpoints may include:

- save scholarship
- remove saved scholarship
- list saved scholarships
- update preparation tracking
- create report

### 9.3 Admin API Surface

Administrative endpoints may include:

- create scholarship draft
- update scholarship details
- verify scholarship record
- publish scholarship
- close scholarship
- review reports

## 10. Security and Authorization

The backend owns all security-sensitive behavior.

Rules:

- never trust frontend-only validation
- enforce authentication and authorization on every user-specific action
- users must not access another user's saved data or preparation information
- all sensitive operations must be server-side validated
- do not commit secrets, credentials, or environment files

## 11. Testing Strategy

### 11.1 Backend Testing

Use Pytest for backend logic and API testing.

Required testing includes:

- business validation rules
- authorization checks
- model behavior
- report handling
- deadline logic
- preparation tracking changes
- admin workflow behavior

### 11.2 End-to-End Testing

Use Playwright for key user journeys such as:

- scholarship search and filtering
- saved scholarship flow
- preparation tracking flow
- report submission flow

### 11.3 Regression Testing

Bugs must include regression tests where relevant.

## 12. Database and Migration Rules

Database schema changes must use Django migrations.

Before completing database work, review:

- foreign keys
- constraints
- unique relationships
- indexes
- query behavior

Manual schema edits outside the approved migration process are not permitted.

## 13. Git and Change Control

The repository must remain reviewable and focused.

Requirements:

- no unrelated file modifications
- no generated secret or credential files
- changes must remain targeted and reviewable
- `main` must remain deployable
- significant changes require review before merge

## 14. Non-Goals and Explicit Exclusions

The following remain explicitly out of V1 scope:

- AI scholarship matching
- AI-generated scholarship information
- automatic scholarship scraping
- automatic publishing
- AI CV builder
- AI essay generator
- application-status tracking
- acceptance-rate tracking
- applying directly inside ScholarTrack
- student document uploads
- document vault
- payments
- social/community features
- chat
- mobile application
- organization accounts
- complex analytics
- multi-language support
- dedicated search infrastructure
- microservices
- Kubernetes
- additional databases
- document storage systems
- other infrastructure introduced without a measured need

These exclusions are intentional and must be preserved unless explicitly approved.

## 15. Operational Constraints

The V1 system must remain simple and maintainable.

- use existing approved stack only
- avoid speculative infrastructure
- keep data flow clear and auditable
- preserve official-source verification standards
- keep the platform focused on scholarship discovery and preparation

## 16. Acceptance Criteria for V1

A V1 implementation is considered acceptable only when it satisfies the following:

- scholarships are discoverable and filterable
- scholarship detail pages provide structured, official-source-based information
- authenticated students can save scholarships and track preparation
- deadline reminders are meaningful and limited to V1 requirements
- reporting supports admin review against official sources
- admin workflows support manual moderation and publication
- backend owns the critical logic and security decisions
- system remains within the approved architecture and scope

## 17. Definition of Done

A change is complete only when it:

- meets the approved specification
- follows the approved architecture
- remains within V1 scope
- handles relevant edge cases
- includes appropriate automated tests
- passes existing tests
- preserves authorization and data integrity
- includes required documentation updates when needed
- has been reviewed appropriately

## 18. Source of Truth

This document defines the approved technical specification for V1. When a conflict exists between implementation choices and the approved product or technical documentation, the approved documentation governs.

When uncertainty exists, the appropriate action is to stop, explain the issue, propose a compliant option, and request approval before proceeding.
