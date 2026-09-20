# ScholarTrack

> **Find scholarships. Understand them. Save them. Prepare for them.**

ScholarTrack is a scholarship discovery and preparation platform designed to reduce the time and mental effort students spend searching for, understanding, organizing, and preparing for scholarship opportunities.

It brings important scholarship information into a structured, easier-to-understand experience while keeping the **official scholarship provider as the source of truth**.

---

## Product Vision

ScholarTrack helps students move through a simple journey:

**Discover → Understand → Save → Prepare → Apply externally**

The goal is not to manage the student's entire application process.

The goal is to help students find relevant opportunities, understand them clearly, organize the ones they care about, prepare for their requirements, and then continue to the official application website.

---

## Who ScholarTrack Is For

ScholarTrack is primarily designed for:

* University students
* Final-year students
* Recent graduates
* Students looking for funded Bachelor's, Master's, or PhD opportunities

The primary V1 persona is a **final-year Bachelor's student preparing for funded Master's opportunities**.

---

## V1 Product Scope

### 1. Discover

Students can:

* Browse scholarships
* Search scholarships
* Filter scholarships
* View scholarship cards
* Navigate through paginated results

Available filters include:

* Degree level
* Field of study
* Country
* Funding type
* Deadline
* Language requirements

---

### 2. Understand

Each scholarship provides structured information such as:

* Scholarship name
* Provider
* Country
* Degree level
* Fields of study
* Funding type
* Tuition information
* Stipend information
* Other funding information
* Eligibility
* Academic requirements
* Language requirements
* Relevant requirements
* Opening date
* Deadline
* Days remaining
* Official application link
* Official source
* Last verified date

Where a scholarship has relevant academic programmes, ScholarTrack may present those programmes or provide the official programme catalogue.

---

### 3. Save

Authenticated students can:

* Save scholarships
* Remove saved scholarships
* View their saved scholarships

Saved scholarships form the student's personal shortlist.

---

### 4. Prepare

Students can maintain simple preparation information for saved scholarships.

Examples:

* GPA requirement — Ready
* IELTS — Need
* Transcript — Ready
* CV — In Progress
* Motivation letter — Need

Preparation statuses:

* **Ready**
* **In Progress**
* **Need**

Students may also add a short personal note.

ScholarTrack does **not** store application documents in V1.

---

### 5. Apply Externally

ScholarTrack does not process scholarship applications.

The application flow is:

**ScholarTrack → Official Application Website → Student applies**

The official provider remains responsible for the actual application process.

---

### 6. Deadline Tracking

ScholarTrack provides:

* Opening dates
* Deadlines
* Remaining time
* Deadline Radar
* In-app notifications

For saved scholarships, V1 provides meaningful deadline reminders:

* **14 days before the deadline**
* **3 days before the deadline**

There are no daily reminders or notification spam.

---

### 7. Reporting

Students can report issues such as:

* Deadline changed
* Broken application link
* Incorrect eligibility information
* Scholarship closed
* Other

Admins review reports and verify information against the official source before resolving them.

---

### 8. Administration

Scholarships are managed manually through the administrative system.

The V1 workflow is:

**Create → Enter structured information → Validate → Verify official source → Publish**

Scholarship lifecycle:

**DRAFT → VERIFIED → PUBLISHED → CLOSED**

Verification and publication are separate steps.

---

## Trust Principle

> **ScholarTrack organizes and simplifies scholarship information; the official scholarship provider remains the source of truth.**

Every published scholarship should provide:

* Official source
* Official application link
* Last verified date

ScholarTrack should never present unverified information as authoritative.

---

## What ScholarTrack Does Not Do in V1

The following are intentionally outside the V1 product scope:

* AI scholarship matching
* AI-generated scholarship information
* Automatic scholarship scraping
* Automatic publishing
* AI CV builder
* AI essay generator
* Application-status tracking
* Acceptance-rate tracking
* Applying directly inside ScholarTrack
* Student document uploads
* Document Vault
* Payments
* Social/community features
* Chat
* Mobile application
* Organization accounts
* Complex analytics
* Multi-language support
* Dedicated search infrastructure
* Microservices
* Kubernetes
* Other infrastructure introduced without a measured need

These are not accidental omissions. They are deliberate scope boundaries intended to keep V1 focused and maintainable.

---

## Product Principles

1. **Simplicity** — keep the experience easy to understand.
2. **Reduce information overload** — show what students actually need.
3. **Reduce mental load** — organize scholarship information in one place.
4. **Official source first** — provider information remains authoritative.
5. **Structured information** — make opportunities easy to compare and understand.
6. **No unnecessary complexity** — add capabilities only when they solve a real problem.
7. **Preparation, not application management** — help students prepare without turning ScholarTrack into an application-management system.

---

## Project Status

**Current phase: Product foundation**

The product definition and V1 scope have been established before implementation.

The project follows:

> **Discuss → Agree → Lock → Save → Build → Review**

Implementation should not begin by improvising requirements during coding.

---

## Scope Discipline

Any proposed feature or architectural change must be evaluated against the approved V1 product definition.

A new idea should not enter the product simply because it is technically interesting or easy to build.

When a proposal changes product scope, architecture, security, or core user experience, it must be explicitly reviewed before implementation.

---

## Source of Truth

ScholarTrack is being developed from an approved product and technical specification.

This README provides the project's high-level identity, purpose, scope, and principles.

Detailed technical decisions, architecture, API contracts, database design, security rules, testing requirements, deployment rules, and AI-agent engineering rules belong in the project's technical specification and engineering documentation.

---

## Repository

**GitHub:** https://github.com/Sidiiq5/scholartrack

ScholarTrack is being built as a serious software product with deliberate planning, controlled scope, automated testing, code review, and human approval of important changes.
