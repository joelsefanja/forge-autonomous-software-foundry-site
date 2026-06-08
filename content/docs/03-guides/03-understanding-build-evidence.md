---
title: "Understanding Your Build Evidence"
---

**TL;DR** — FORGE generates 7 compliance reports. Learn what each number means and when to worry. Usually: all green = ready to ship.

---

## 30-Second Summary

After a build completes, you get a compliance report with 7 sections. This guide translates what each means, what's good, what's concerning, and when to dig deeper.

---

## The Build Evidence Dashboard

When you review a build, you see:

```
Build Completed: build-20260606-001

Compliance Gates: ALL PASS ✅ (7/7)

├─ Security: ✅ PASS
├─ Coverage: ✅ PASS
├─ Accessibility: ✅ PASS
├─ Performance: ✅ PASS
├─ Fairness: ✅ PASS
├─ Design System: ✅ PASS
└─ Legal Hold: 🟢 CLEAR

[View Details] [Approve] [Request Changes]
```

---

## Gate 1: Security Report

### What It Shows

```
Security Gate: ✅ PASS

Vulnerability Scan:
├─ High-risk: 0 issues
├─ Medium-risk: 0 issues
└─ Low-risk: 0 issues

Secrets Check:
├─ Hardcoded API keys: 0 found
├─ Database passwords: 0 found
└─ Private keys: 0 found

Input Validation:
├─ User inputs: Sanitized ✅
├─ Database queries: Parameterized ✅
└─ HTML output: Escaped ✅

Authentication:
├─ Passwords: Hashed (bcrypt) ✅
├─ Tokens: Secure headers ✅
└─ Session: Expires after 1 hour ✅
```

### What's Good ✅
- 0 high-risk issues (always good)
- 0 medium-risk issues (mostly good)
- Low-risk issues might be acceptable

### What to Worry About 🚨
```
Security Gate: ⚠️ WARNING

High-Risk Issues Found:
  ❌ lodash@4.17.15 has ReDOS vulnerability (CVE-2021-23337)
  ❌ Hardcoded JWT secret found in code
  ❌ User input not sanitized (SQL injection risk)
```

**Action:** Request FORGE to fix these. Don't approve until fixed.

### Questions to Ask
1. "Are there any high-risk issues?" → Should be 0
2. "Any secrets found?" → Should be 0
3. "Are database queries parameterized?" → Should say ✅

---

## Gate 2: Test Coverage Report

### What It Shows

```
Coverage Gate: ✅ PASS

Overall Coverage: 87%
├─ Statements: 89% covered
├─ Branches: 82% covered
├─ Functions: 91% covered
└─ Lines: 86% covered

Code Quality:
├─ Test count: 18 unit + 4 integration
├─ All tests passing: ✅ 22/22
├─ Execution time: 2.3 seconds
└─ Flaky tests: None detected ✅

Coverage by Feature:
├─ New LoginForm component: 92% covered
├─ Auth service: 88% covered
├─ Database layer: 85% covered
└─ Utilities: 79% covered
```

### What's Good ✅
- **Overall: >80%** (FORGE standard)
- **Critical paths: 100%** (core features tested)
- **All tests passing** (no failures)
- **No flaky tests** (consistent results)

### What to Worry About 🚨
```
Coverage Gate: ⚠️ WARNING

Coverage: 71% (below 80% threshold)

Untested Code Paths:
  ❌ ErrorBoundary component: 0% coverage
     ├─ What if API fails?
     └─ What if timeout happens?
  
  ❌ Login service: 45% coverage
     ├─ What if LDAP unavailable?
     └─ What if user is locked?

Suggestion: Add tests for error paths
```

**Action:** Request FORGE to add missing tests or ask why they're not critical.

### Questions to Ask
1. "Is coverage >80%?" → Should be yes
2. "Are critical paths 100% covered?" → Should be yes
3. "Do all tests pass?" → Should be yes
4. "Are there flaky tests?" → Should be none

---

## Gate 3: Accessibility Report

### What It Shows

```
Accessibility Gate: ✅ PASS

WCAG Compliance: AA (meets standard)

Color Contrast:
├─ Text on background: 6.5:1 (exceeds 4.5:1 requirement)
├─ Button on page: 7:1 (exceeds requirement)
└─ All ratios acceptable ✅

Keyboard Navigation:
├─ Tab key works: ✅
├─ Focus order logical: ✅
├─ Escape key supported: ✅
└─ All controls reachable ✅

Screen Reader:
├─ Image alt text: Present ✅
├─ ARIA labels: Correct ✅
├─ Semantic HTML: Proper ✅
└─ Forms: Labeled correctly ✅

Responsive Design:
├─ Mobile (375px): ✅ Works
├─ Tablet (768px): ✅ Works
├─ Desktop (1920px): ✅ Works
└─ All breakpoints tested ✅
```

### What's Good ✅
- **WCAG AA** (standard) or **WCAG AAA** (premium)
- **Color contrast >4.5:1** (readable)
- **Keyboard navigable** (no mouse required)
- **Screen reader friendly** (ARIA labels present)
- **Works on all devices** (responsive)

### What to Worry About 🚨
```
Accessibility Gate: ⚠️ WARNING

WCAG AA Violations Found:

Color Contrast:
  ❌ Dark gray on dark blue: 2.1:1 ratio
     Requirement: 4.5:1
     Fix: Use lighter text color

Keyboard Navigation:
  ❌ Modal dialog: Can't Tab inside
     Issue: Focus trap not implemented
     Fix: Use proper modal component

Screen Reader:
  ❌ Icon button missing aria-label
     Current: <button><Icon /></button>
     Fix: <button aria-label="Delete"><Icon /></button>
```

**Action:** Request FORGE to fix these. Accessibility is non-negotiable.

### Questions to Ask
1. "Does it meet WCAG AA?" → Should be yes
2. "Are color contrasts adequate?" → Should say >4.5:1
3. "Can keyboard users navigate?" → Should be yes
4. "Does it work on mobile?" → Should be yes

---

## Gate 4: Performance Report

### What It Shows

```
Performance Gate: ✅ PASS

Bundle Size:
├─ JavaScript: 125KB (gzipped)
├─ CSS: 32KB (gzipped)
├─ Total: 157KB
└─ Budget: 200KB ✅ (within limits)

Load Metrics:
├─ First Contentful Paint (FCP): 0.9 seconds
├─ Largest Contentful Paint (LCP): 1.2 seconds
├─ Cumulative Layout Shift (CLS): 0.05 (low)
└─ Time to Interactive (TTI): 1.5 seconds

Runtime Performance:
├─ Component render time: <50ms ✅
├─ Animation framerate: 60fps ✅
├─ Memory usage: Stable ✅
└─ No memory leaks detected ✅

Database Performance:
├─ Queries per request: 1 (efficient) ✅
├─ Slow queries: None ✅
├─ N+1 pattern: Not detected ✅
└─ Indexes: Properly used ✅
```

### What's Good ✅
- **Bundle size:** Within budget
- **Load time:** <2 seconds
- **60fps:** Smooth animations
- **No memory leaks:** Stable over time
- **Efficient queries:** 1-2 per request

### What to Worry About 🚨
```
Performance Gate: ⚠️ WARNING

Bundle Size: 320KB (exceeds 200KB budget by 60%)

Issues:
  ⚠️ moment.js: 68KB (28% of bundle!)
     → This library is bloated
     → Replace with date-fns (12KB)

Load Time: 4.2 seconds (target: <2 seconds)
  ⚠️ JavaScript not deferred
     → Scripts blocking page render
     → Fix: Add defer attribute

Memory Usage: Growing steadily (leak suspected)
  ⚠️ Event listeners not cleaned up
     → Fix: Remove listeners on component unmount

Database: 15 queries per request (should be <3)
  ⚠️ N+1 query pattern detected
     → For each user, querying all their posts
     → Fix: Use JOIN in single query
```

**Action:** Request FORGE to optimize. Performance affects UX and costs.

### Questions to Ask
1. "Is bundle size within budget?" → Should be yes
2. "Does it load in <2 seconds?" → Should be yes
3. "Are animations smooth (60fps)?" → Should be yes
4. "Any memory leaks?" → Should be no
5. "Is database efficient?" → Should be 1-2 queries max

---

## Gate 5: Fairness Report

### What It Shows

```
Fairness Gate: ✅ PASS

Demographic Parity:
├─ Feature accessible to all user groups: ✅
├─ No age-based exclusions: ✅
├─ No location-based discrimination: ✅
└─ Works for all accessibility levels: ✅

Performance Consistency:
├─ Fast users (high bandwidth): Works ✅
├─ Slow users (slow network): Works ✅
├─ Desktop users: Works ✅
├─ Mobile users: Works ✅
└─ All groups experience feature equally: ✅

Language & Localization:
├─ Supports multiple languages: ✅
├─ Right-to-left text: Supported ✅
└─ Cultural considerations: Addressed ✅

Accessibility Inclusivity:
├─ Deaf/hard of hearing: Captions ✅
├─ Blind/low vision: Screen reader friendly ✅
├─ Motor impairments: Keyboard navigable ✅
└─ Cognitive disabilities: Clear UI ✅
```

### What's Good ✅
- **No demographic bias** detected
- **Works for all users** equally
- **Accessible to disabilities** included
- **Multiple languages** supported
- **Inclusive design** principles followed

### What to Worry About 🚨
```
Fairness Gate: ⚠️ WARNING

Demographic Disparity Detected:

Feature Availability:
  ❌ Feature only available to users aged 18+
     Issue: Age-based exclusion
     Question: Is this legally required?
     Action: Document justification or remove restriction

Performance Disparity:
  ❌ Feature faster for English speakers (1.2s)
     vs. non-English speakers (3.5s)
     Issue: Single-byte character optimization bias
     Fix: Support all character encodings equally

Accessibility Gap:
  ❌ Blind users can't use feature (no alt text)
     Issue: Intentional exclusion
     Fix: Add screen reader support

Recommendation: Ensure all users can access equally
```

**Action:** Request FORGE to remove discrimination or document why exclusion is necessary.

### Questions to Ask
1. "Does everyone get the same feature?" → Should be yes
2. "Does it work equally across groups?" → Should be yes
3. "Is it accessible to people with disabilities?" → Should be yes
4. "Are there any unexplained exclusions?" → Should be no

---

## Gate 6: Design System Report

### What It Shows

```
Design System Gate: ✅ PASS

Color Palette Compliance:
├─ Primary color: primary-500 ✅
├─ Secondary color: secondary-400 ✅
├─ Accent color: accent-600 ✅
├─ All colors: From approved palette ✅
└─ No custom colors: ✅

Typography System:
├─ Heading: Heading XL (32px, Poppins) ✅
├─ Body text: Body M (16px, Inter) ✅
├─ Button text: Label S (14px, Poppins) ✅
├─ All type: Matches system ✅
└─ No custom fonts: ✅

Spacing & Layout:
├─ Padding: 16px (2×8px grid) ✅
├─ Margin: 24px (3×8px grid) ✅
├─ Gap: 8px (1×8px grid) ✅
├─ All spacing: Multiples of 8px ✅
└─ Grid compliance: 100% ✅

Component Patterns:
├─ Button: Standard style ✅
├─ Input: Standard style ✅
├─ Card: Standard style ✅
├─ Modal: Standard style ✅
└─ All patterns: Approved ✅
```

### What's Good ✅
- **Colors from palette** only
- **Typography from system** only
- **Spacing on grid** (multiples of 8px)
- **Component patterns** consistent
- **Matches design tokens** exactly

### What to Worry About 🚨
```
Design System Gate: ⚠️ WARNING

Design System Violations Found:

Color:
  ❌ Button background: #E85D75 (custom)
     Should be: primary-500 (from palette)
     Fix: Use design token instead

Typography:
  ⚠️ Heading uses Helvetica (non-standard)
     Should use: Poppins (from system)
     Fix: Update font-family

Spacing:
  ❌ Padding: 14px (not multiple of 8px)
     Should be: 16px (2×8px grid)
     Fix: Adjust to grid

Component:
  ❌ Custom button style (hover animation doesn't match system)
     Should use: Standard button with system animation
     Fix: Use approved button component
```

**Action:** Request FORGE to align with design system. Consistency matters.

### Questions to Ask
1. "Are all colors from the palette?" → Should be yes
2. "Is all typography from the system?" → Should be yes
3. "Is spacing on the grid (multiples of 8px)?" → Should be yes
4. "Do components match the system?" → Should be yes

---

## Gate 7: Legal Hold Status

### What It Shows

```
Legal Hold Gate: 🟢 CLEAR

Status: Approved for Release

GDPR Compliance:
├─ Personal data handling: ✅ Compliant
├─ User consent: ✅ Obtained
├─ Data retention: ✅ Policy documented
├─ User rights: ✅ Deletion available
└─ Privacy notice: ✅ Shown to users

CCPA Compliance (if US):
├─ User rights: ✅ Opt-out available
├─ Data sale: ✅ Not applicable
├─ Transparency: ✅ Disclosed
└─ Deletion: ✅ Supported

AI Act Compliance (if EU):
├─ Model transparency: ✅ Documented
├─ Human oversight: ✅ In place
├─ Monitoring: ✅ Enabled
└─ Audit trail: ✅ Complete

Licensing:
├─ All dependencies: ✅ Compatible
├─ No GPL conflicts: ✅ Clear
├─ Open source licenses: ✅ Documented
└─ Commercial use: ✅ Allowed

Decision: ✅ LEGAL CLEARED
```

### What's Good ✅
- **GDPR compliant** (GDPR requirements met)
- **CCPA compliant** (US privacy law)
- **AI Act compliant** (EU AI regulation)
- **Licensing clear** (no conflicts)
- **Legal team approved** (no blockers)

### What to Worry About 🚨
```
Legal Hold Gate: 🔒 BLOCKED (Requires Manual Review)

Status: Escalated to Legal Team

GDPR Concerns:
  ❌ Personal data stored without consent
     Issue: Email collected but user hasn't opted in
     Action: Add privacy consent flow
     Urgency: MUST FIX before release

Licensing Issue:
  ❌ Dependency uses AGPL license
     Issue: Requires source code disclosure
     Options:
       1. Remove dependency
       2. Get legal approval
       3. Use alternative (compatible) library
     Urgency: MUST RESOLVE

Next Step: Legal team will review and respond within 24 hours
```

**Action:** Wait for legal team decision. Don't ship until cleared.

### Questions to Ask
1. "Is legal status CLEAR or BLOCKED?" → Should be CLEAR
2. "Are there any GDPR concerns?" → Should be none
3. "Are all licenses compatible?" → Should be yes
4. "Is legal team approval needed?" → Should be already done

---

## Reading Your Report: Quick Checklist

```
Before approving a build, check:

Security
  [ ] All high-risk issues: 0
  [ ] Secrets found: 0
  [ ] Passwords properly hashed

Coverage
  [ ] Overall coverage: >80%
  [ ] Critical paths: 100%
  [ ] All tests passing

Accessibility
  [ ] WCAG AA compliant
  [ ] Color contrast >4.5:1
  [ ] Keyboard navigable

Performance
  [ ] Bundle size within budget
  [ ] Load time <2 seconds
  [ ] No memory leaks

Fairness
  [ ] No demographic bias
  [ ] Works for all groups
  [ ] Accessible to disabilities

Design System
  [ ] Colors from palette
  [ ] Typography from system
  [ ] Spacing on grid

Legal
  [ ] Status: CLEAR
  [ ] No blocking concerns

If all ✓: APPROVE
If any ✗: REQUEST CHANGES
```

---

## Next Steps

1. **Review your next build** using this guide
2. **Compare** your results to what's "good"
3. **Read:** [Reviewing Compliance Reports](./04-reviewing-compliance-reports.md) — Deeper interpretation
4. **Read:** [Compliance Gates](../02-concepts/03-compliance-gates.md) — Technical details

**Questions?** Check [FAQ](../04-reference/03-faq.md).