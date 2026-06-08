---
title: "For QA/Testers: Validate Before Release"
---

**TL;DR** — FORGE generates comprehensive test suites automatically. Your job: test the *edge cases* FORGE can't predict, validate real-world scenarios, and catch usability issues before users do.

---

## 30-Second Summary

FORGE creates unit tests, integration tests, and compliance checks. You run exploratory testing, security testing, and user acceptance testing (UAT). Less time on "does the button work?" More time on "will users understand how to use it?"

---

## Your Workflow

### Step 1: Review the Test Suite
FORGE provides:
- **Unit tests** (individual functions/components)
- **Integration tests** (features working together)
- **E2E tests** (full user flows)
- **Accessibility tests** (WCAG compliance, automation can do this)
- **Performance tests** (load time, memory usage)
- **Security tests** (dependency scans, input validation)

**Example:**
```
Test Coverage Report
├── Unit Tests: 87% coverage
│   ├── Happy path: ✅
│   ├── Error cases: ✅
│   └── Edge cases: ⚠️ (partial)
├── Integration Tests: ✅ All systems connected
├── E2E Tests: ✅ Full user workflows
├── Accessibility Tests: ✅ WCAG AA pass
├── Performance: ✅ <100ms response time
└── Security:
    ├── Dependency scan: ✅ No vulnerabilities
    ├── Input validation: ✅
    └── SQL injection: ✅ Parameterized queries
```

### Step 2: Run the Tests Yourself
```bash
npm run test              # Unit tests
npm run test:e2e         # End-to-end
npm run test:accessibility  # Accessibility audit
npm run test:performance    # Load testing
```

**What to look for:**
- Do all tests pass locally? (Test environment fidelity)
- Are there flaky tests? (Tests that pass/fail randomly)
- Is coverage real? (Not just lines covered, but logic paths?)
- Do E2E tests match actual user behavior?

### Step 3: Exploratory Testing
FORGE can't predict everything. You test:
- **User workflows** — Does the feature make sense to real users?
- **Unusual inputs** — What if someone enters 999 items? Unicode? Really long text?
- **Cross-browser** — Works on Firefox? Safari? Edge?
- **Mobile/tablet** — Touch interactions work correctly?
- **Performance at scale** — What if there are 1M records?
- **Error recovery** — If something fails, can users recover?

### Step 4: Security Testing
- Test for common vulnerabilities (OWASP Top 10)
- Verify rate limiting works
- Check if sensitive data is logged (shouldn't be)
- Test permission boundaries (can a regular user access admin features?)

### Step 5: Approval
- **All tests pass + exploratory findings are minor?** → Approve for release
- **Issues found?** → Log them (FORGE learns and fixes)
- **Critical issues?** → Block release until fixed

---

## 5 Benefits for QA/Testers

### 1. **Shift Testing Left**
Testing starts at generation time, not release time. Compliance gates catch ~70% of issues automatically. You focus on the remaining 30%.

### 2. **Better Test Quality**
FORGE generates well-structured tests you can learn from. New testers can understand test patterns quickly.

### 3. **Less Manual Testing**
Unit and integration tests are automated. You skip "happy path" testing, jump to edge cases and real-world scenarios.

### 4. **Faster Release Cycle**
If compliance gates pass and your exploratory testing doesn't find critical issues, you're done. No waiting for "test rounds."

### 5. **Evidence Trail for Incidents**
If a bug slips through, you have the full test history: what passed, what was skipped, why. Helps prevent similar bugs later.

---

## Common Scenarios

### Scenario 1: A Test Fails Locally But Passed in CI
**Your job:** Investigate why.
- Is it a flaky test? (Intermittent failure)
- Is it an environment difference? (Your computer vs. CI server)
- Is it a race condition? (Tests pass individually, fail when run together)

**You report:** FORGE learns and makes tests more robust.

### Scenario 2: Edge Case Not Covered
**Test case:** What if a user enters a 10,000-character description?  
**Current tests:** Only test normal lengths (100-500 characters)  
**You find:** UI breaks at 10K characters  
**You report:** FORGE adds test for this, fixes the code

### Scenario 3: Permission Boundary Bypassed
**You test:** Can regular user access /admin endpoints?  
**Current tests:** Might not check this  
**You find:** A regular user *can* access endpoints (security hole)  
**You report:** FORGE adds permission test, fixes the bug

---

## What FORGE Tests (So You Don't Have To)

✅ **Unit tests** — Individual functions work  
✅ **Integration tests** — Parts work together  
✅ **Accessibility** — WCAG compliance, keyboard nav, screen readers  
✅ **Performance** — Response time, bundle size, memory  
✅ **Security** — Dependency vulnerabilities, input validation  
✅ **Linting & formatting** — Code style consistency  

**You test:**
✅ **User scenarios** — Real workflows  
✅ **Edge cases** — Unusual but valid inputs  
✅ **Cross-browser** — Firefox, Safari, Chrome, Edge  
✅ **Mobile/touch** — Responsive, swipe interactions  
✅ **At scale** — Performance with lots of data  
✅ **Error recovery** — What happens when things break  
✅ **Usability** — Is it intuitive?  

---

## Test Review Checklist

Before you approve a build for release:

- [ ] All automated tests pass
- [ ] Test coverage is >80% (or your standard)
- [ ] No flaky tests (run 3x in a row without issues)
- [ ] Performance tests pass (meets SLA)
- [ ] Accessibility tests pass (WCAG AA minimum)
- [ ] Security tests pass (no new vulnerabilities)
- [ ] E2E tests cover main user workflows
- [ ] You ran exploratory tests and found no critical issues
- [ ] Edge cases you tested work correctly
- [ ] Mobile/responsive works on target devices
- [ ] Error messages are clear and helpful
- [ ] Loading states are visible (no silent failures)
- [ ] Audit trail is complete (who approved what, when)

If all boxes pass → Release ready.

---

## Common Testing Patterns

### Pattern 1: Test the Happy Path First
```
User starts at login
  ✅ Logs in successfully
  ✅ Redirected to dashboard
  ✅ Can navigate main features
```

Then test edge cases:
```
  ✅ Login fails with wrong password
  ✅ Login fails with invalid email
  ✅ Session expires after 1 hour
  ✅ Can log back in
```

### Pattern 2: Test Boundaries
```
Feature: "Upload max 50 files"
  ✅ Upload 1 file → works
  ✅ Upload 50 files → works
  ✅ Upload 51 files → rejected with message
  ✅ Upload 0 files → shows empty state
```

### Pattern 3: Test Error Recovery
```
Feature: "Checkout"
  ✅ Normal flow: works
  ⚠️ Payment API down: user gets clear message + can retry
  ⚠️ Network timeout: user can resume
  ⚠️ Browser closes mid-checkout: can recover cart
```

---

## Reporting Issues to FORGE

When you find a bug:

```
Issue: [Descriptive title]
Severity: [Critical/High/Medium/Low]
Steps to Reproduce:
  1. Log in with test account
  2. Go to checkout
  3. Enter 10,000-character description
Expected: Text is truncated with ellipsis
Actual: UI breaks, page freezes
Environment: Chrome 120, macOS 14.2
```

**FORGE learns:** Add test case for long text, truncate in UI layer.

---

## Collaboration Example

**Build 1: User Registration**
```
FORGE: [Generates tests + code]
Report: "Test coverage: 82%, all pass"

You: [Run tests locally]
You: [Explore edge cases]
Finding: "Password strength indicator is confusing—shows 
         checkmarks but user can't see which rules are met"

You: Report as usability issue

FORGE: Updates code + tests to show clear rule feedback
Next build: More intuitive password strength UX
```

**Build 2: Payment Integration**
```
FORGE: [Generates tests + code]
Report: "Test coverage: 85%, all pass, security: ✅"

You: [Test exploratory scenarios]
Finding: "If payment fails, user sees technical error
         'ERR_PAYMENT_GATEWAY_TIMEOUT', not helpful"

You: Report as UX issue

FORGE: Adds user-friendly error messages + retry logic
Next build: Users get "Payment couldn't process. Try again."
```

---

## Performance Testing Quick Guide

When you see performance metrics:

**Good:**
- Page load: <2 seconds
- API response: <200ms
- Component render: <50ms
- Bundle size: <100KB (JavaScript)

**Warning signs:**
- Page load: >5 seconds
- API response: >500ms
- Component render: >100ms
- Bundle size: >500KB

If you see warning signs, check:
- Are there N+1 database queries? (Requesting same data multiple times)
- Is a large dependency included unnecessarily?
- Are images optimized?
- Is code split and lazy-loaded?

---

## Next Steps

1. **Read:** [Understanding Your Build Evidence](../03-guides/03-understanding-build-evidence.md) — What test metrics mean
2. **Read:** [Compliance Gates](../02-concepts/03-compliance-gates.md) — What automated gates check
3. **Try:** [Running Your First Build](../03-guides/01-running-your-first-build.md) — See test reports in action

**Questions?** Check [FAQ](../04-reference/03-faq.md) or ask your QA lead.