---
title: "Running Your First FORGE Build"
---

**TL;DR** — Request a feature in 1 sentence. FORGE builds it in 2 hours. Review the results. Approve or iterate. Takes 10 minutes to get started, 5-10 min walkthrough.

---

## 30-Second Summary

This guide walks you through your first FORGE build from start to finish. You'll request a feature, see FORGE work, review the results, and either approve or provide feedback.

---

## Prerequisites

- Access to FORGE dashboard (your team should have provided login)
- Slack or email (for notifications)
- 15 minutes

---

## Step 1: Access FORGE Dashboard

Go to: `https://your-team.forge.dev/dashboard`

You should see:
```
FORGE Dashboard

┌─ New Build
├─ Recent Builds
├─ Team Settings
└─ Documentation
```

Click **"New Build"**

---

## Step 2: Write Your Feature Request

You'll see a form:

```
Feature Request Form

Title: [What are you building?]
Example: "Add dark mode toggle to dashboard"

Description: [Why and any constraints]
Example: "Users requested dark mode. Should work on mobile
         and desktop. Keep under 15KB bundle size."

Acceptance Criteria: [How will we know it's done? Optional]
Example: "- Toggle button visible in header
         - Theme persists across sessions
         - All components have dark variants"

Timeline: [When do you need it?]
Example: "ASAP, needed for next release"

Requested by: [Auto-filled]
Approved by: [Usually PM]
```

**Real example:**
```
Title: "Add email verification on signup"

Description: "New compliance requirement: Users must verify
             email before accessing the app. Should take <2 min
             to verify. Send email, click link, done."

Acceptance Criteria:
- Signup flow includes email verification step
- Verification email sent immediately after signup
- Link expires after 24 hours
- User can request new verification email

Timeline: Needed by end of week

Approved by: Sarah (PM)
```

Click **"Submit Request"** when ready.

---

## Step 3: Watch FORGE Build

FORGE will start building. The dashboard shows real-time progress:

```
Build Status: IN PROGRESS

Build ID: build-20260606-001
Started: 2026-06-06 09:30 UTC
Elapsed: 12 minutes

Current Phase:
├─ [✅ Complete] Analyze requirements
├─ [⏳ In Progress] Generate backend code
│   └── 47% complete (Backend API endpoints)
├─ [ ] Generate frontend code
├─ [ ] Generate tests
├─ [ ] Generate documentation
└─ [ ] Run compliance gates

Estimated time remaining: 1 hour 48 minutes
```

**Real-time log view:**
```
[09:30] Starting build for "email verification"
[09:31] Parsed requirements: 3 key features, 2 constraints
[09:35] Generated backend API: POST /verify, GET /status
[09:42] Generated database migration (users_verified_at field)
[09:48] Generating frontend: VerificationForm component
[09:55] Generating tests (15 unit tests, 3 integration tests)
[10:02] Generating documentation
[10:10] Running compliance gates...
```

This typically takes 1-2 hours depending on feature complexity.

---

## Step 4: Review the Build Results

When FORGE finishes, you'll see:

```
Build Complete ✅

Build ID: build-20260606-001
Completed: 2026-06-06 11:22 UTC
Total time: 1h 52m

Result: Ready for Review

Generated Artifacts:
├── Backend Code: 312 lines
├── Frontend Code: 248 lines
├── Tests: 18 unit + 4 integration
├── Documentation: 3 files
├── Compliance Report: (See below)
└── PR Link: #1847 (ready to view)
```

### Tab 1: Code Overview

```
Files Changed: 8 files

Frontend:
  ├── src/components/VerificationForm.tsx (new) - 89 lines
  ├── src/components/VerificationForm.test.tsx (new) - 156 lines
  └── src/pages/Verify.tsx (new) - 63 lines

Backend:
  ├── src/routes/verify.ts (new) - 124 lines
  ├── src/routes/verify.test.ts (new) - 203 lines
  └── migrations/001-add-email-verified.sql (new) - 5 lines

Docs:
  ├── EMAIL_VERIFICATION.md (new)
  └── API.md (updated)

Stats:
  ├── Total lines added: 640
  ├── Total lines removed: 0
  ├── Files created: 7
  ├── Files modified: 1
  └── Test coverage: 87% (up from 80%)
```

Click into any file to read the code.

### Tab 2: Compliance Report

```
Compliance Gates: ALL PASS ✅

Gate 1: Security Scanning ✅
├─ Vulnerability scan: 0 high-risk issues
├─ Secrets check: 0 secrets found
├─ Input validation: Email validated + sanitized
└─ Status: PASS

Gate 2: Test Coverage ✅
├─ Overall: 87% (target: >80%)
├─ Critical paths: 100%
├─ Error handling: 95%
└─ Status: PASS

Gate 3: Accessibility ✅
├─ WCAG AA: Compliant
├─ Color contrast: 6.5:1
├─ Keyboard nav: Fully supported
├─ Status: PASS

Gate 4: Performance ✅
├─ Bundle size: +5KB (well under budget)
├─ Load time: +23ms (acceptable)
├─ Database: 1 simple query (efficient)
└─ Status: PASS

Gate 5: Fairness ✅
├─ No demographic bias detected
├─ Works for all user groups
└─ Status: PASS

Gate 6: Design System ✅
├─ Colors: From approved palette
├─ Typography: Matches system
├─ Spacing: Multiples of 8px
└─ Status: PASS

Gate 7: Legal Hold 🟢 CLEAR
├─ GDPR: Email verification complies
├─ Privacy: No new data retention issues
└─ Status: CLEAR

Summary: Ready for human review
Next: Code review by team
```

### Tab 3: Test Results

```
Test Execution: ALL PASS ✅

Unit Tests: 18/18 passing
├── VerificationForm.test.tsx: 8/8 passing
│   ├── ✅ Renders form correctly
│   ├── ✅ Validates email format
│   ├── ✅ Handles empty input
│   ├── ✅ Shows success message
│   ├── ✅ Shows error message
│   ├── ✅ Disables button while loading
│   ├── ✅ Handles network error
│   └── ✅ Resends verification email
├── verify.test.ts: 7/7 passing
└── routes.test.ts: 3/3 passing

Integration Tests: 4/4 passing
├── ✅ End-to-end: Signup → Verification → Access
├── ✅ Email sent immediately after signup
├── ✅ Link expires after 24 hours
└── ✅ User can request new email

Coverage Report:
├── Statements: 87% covered
├── Branches: 82% covered
├── Functions: 91% covered
├── Lines: 89% covered

Execution time: 2.3 seconds
```

### Tab 4: Live Preview

```
Interactive Component Preview
(Storybook)

Component: VerificationForm

Stories:
├── Default
├── Loading
├── Success
├── Error
├── Mobile (375px)
└── Accessibility Test

[Click to interact with live component]
```

### Tab 5: Detailed Code Review

Click on any file to see:
- Syntax highlighting
- Comments explaining decisions
- Potential issues flagged
- Related documentation

---

## Step 5: Option A – Approve the Build

If everything looks good:

1. Click **"Approve Build"** button
2. Optional: Add a comment (e.g., "Looks great!")
3. Confirm approval

Result:
```
Build Approved ✅

Status: Ready for Engineering Review

Next Steps:
1. GitHub PR #1847 is open for code review
2. Engineers will review and merge
3. Feature will deploy with next release
4. You'll be notified when live

Timeline:
├─ Code review: 1-2 days
├─ QA testing: 1-2 days
└─ Deploy to production: By end of week
```

---

## Step 5: Option B – Request Changes

If something needs adjustment:

1. Click **"Request Changes"** button
2. Describe what needs changing:

```
Feedback:

1. "The verification email template looks too technical.
    Can you use simpler language?"

2. "The 24-hour expiration feels short.
    Can we make it 48 hours?"

3. "Show a success toast notification after verification,
    not just a page message."
```

3. Click **"Submit Feedback"**

Result:
```
Changes Requested 🔄

FORGE is updating the build...

Changes being made:
├─ Simplifying email template language
├─ Extending verification link expiration to 48 hours
├─ Adding success toast notification
└─ Re-running compliance gates

Updated build will be ready in: ~30 minutes

You'll be notified when ready for re-review.
```

---

## Step 6: Review Compliance & Tests

Before approving, always check:

**Compliance Gates:**
- [ ] Security: ✅ (no vulnerabilities, no secrets)
- [ ] Coverage: ✅ (>80% test coverage)
- [ ] Accessibility: ✅ (WCAG AA compliant)
- [ ] Performance: ✅ (within budget)
- [ ] Fairness: ✅ (no bias)
- [ ] Design: ✅ (matches system)
- [ ] Legal: ✅ (no compliance issues)

**Tests:**
- [ ] All tests passing
- [ ] Coverage >80%
- [ ] Edge cases covered
- [ ] Error cases handled

**Code Quality:**
- [ ] Easy to understand
- [ ] Follows team conventions
- [ ] Has comments where needed
- [ ] No obvious bugs

---

## Step 7: Real Examples

### Example 1: Approved on First Review
```
You request: "Add 2FA using TOTP"
FORGE builds in 1.5 hours
You review:
  ├─ Security: ✅ (proper secret handling)
  ├─ Tests: ✅ (87% coverage)
  ├─ Accessibility: ✅ (WCAG AA)
  ├─ Performance: ✅ (+8KB acceptable)
  └─ Code quality: ✅ (clean, well-documented)
You approve immediately
Time from request to approval: 2 hours
```

### Example 2: One Iteration Before Approval
```
You request: "Add file upload feature"
FORGE builds in 1h 45min
You review and notice:
  ├─ Max file size not enforced (security issue)
  └─ UI uses English only (not localized)
You request changes
FORGE updates in 35 minutes
  ├─ Adds 10MB file size limit
  ├─ Adds i18n support
  └─ Re-runs all compliance gates
You approve
Time from request to approval: 3 hours
```

### Example 3: Rejected for Redesign
```
You request: "Add advanced search filters"
FORGE builds in 2 hours
You review and realize:
  ├─ UI too complex
  └─ Not aligned with "simplify" OKR
You reject: "Let's redesign this for simplicity"
You provide guidance: "Max 3 filters visible. Rest in dropdown."
FORGE rebuilds with new approach: 1.5 hours
  ├─ Simplified UI
  ├─ Better accessibility
  └─ Smaller bundle size
You approve
Time from request to approval: 5.5 hours (worth it for better design)
```

---

## Common Questions During First Build

**Q: "Why does this show accessibility concerns I didn't know about?"**  
A: FORGE checks accessibility automatically. These are real issues that would have failed QA anyway. Good to catch early!

**Q: "Can I change this code after approval?"**  
A: Yes. After the PR merges, engineers can still modify it. FORGE provides the foundation, engineers refine it.

**Q: "What if I think FORGE made a mistake?"**  
A: You can request changes. FORGE will revise. If there's a pattern of mistakes, let your team know—FORGE learns from feedback.

**Q: "Why does this take 1-2 hours? I thought AI was fast."**  
A: FORGE isn't running locally—it's thinking deeply, generating comprehensive tests, running compliance checks. Quality takes time. Still 10x faster than traditional development.

**Q: "Can I see what FORGE did differently than a human engineer?"**  
A: Yes! FORGE generates consistently, includes full test coverage, and catches compliance issues automatically. Humans do the same but slower and sometimes forget edge cases.

---

## What Happens Next

Once you approve:

```
Timeline to Production:

Day 1 (You approve)
└── PR #1847 ready for engineering review

Day 2-3 (Engineering review)
├── Engineers review code
├── Suggest minor improvements (usually none)
├── PR merged to main branch
└── Feature deployed to staging

Day 4 (QA testing)
├── QA tests feature
├── No critical issues expected (FORGE tested it)
├── QA approves for production

Day 5 (Production deployment)
├── Deploy to 10% of users (canary)
├── Monitor for 1 hour
├── Deploy to 100% of users
└── Feature live!

Feedback:
├── Monitor metrics (adoption, performance)
├── Collect user feedback
├── Learn for next iteration
```

---

## Next Steps

1. **Request your first feature** — Pick something small (1-2 day complexity)
2. **Review the results** — Spend 15 min exploring the compliance report and code
3. **Approve or iterate** — Either approve or request changes to learn the feedback loop
4. **Read:** [Understanding Your Build Evidence](./03-understanding-build-evidence.md) — Deep dive into reports

**Questions?** Reach out to your team or check [FAQ](../04-reference/03-faq.md).