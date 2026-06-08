---
title: "Compliance Gates: 7-Point Check & What Gets Blocked"
---

**TL;DR** — Before any code reaches human review, FORGE runs 7 automated compliance gates: security, test coverage, accessibility, performance, fairness, design consistency, and legal holds. Gates are non-negotiable unless you override with written justification.

---

## 30-Second Summary

Every FORGE build passes 7 checkpoints automatically. Each gate checks for specific risks. A gate failure doesn't stop development—it surfaces the issue and suggests fixes. You decide: fix it, approve an exception, or reject the build.

---

## The 7 Gates

### Gate 1: Security Scanning

**What it checks:**
- Dependency vulnerabilities (does any library have known exploits?)
- Secrets scanning (is any API key hardcoded?)
- Input validation (are user inputs sanitized?)
- SQL injection prevention (are queries parameterized?)
- XSS prevention (is HTML escaped?)

**Failures look like:**
```
Security Gate: ⚠️ FAILED

Critical Issues:
  ❌ lodash@4.17.15 has ReDOS vulnerability (CVE-2021-23337)
  ❌ API key found in env.js (should be in .env)
  ❌ User input not sanitized in search query

High Issues:
  ⚠️ Missing CORS headers on API endpoints
  ⚠️ Password stored in plain text (should be hashed)

Suggestions:
  1. Upgrade lodash to >=4.17.21
  2. Move API key to .env file
  3. Add input sanitization: const safe = sanitizeHTML(userInput)
  4. Add CORS headers: res.setHeader('Access-Control-Allow-Origin', '*')
```

**What passes:**
- No high/critical vulnerabilities
- No hardcoded secrets
- Input is validated and sanitized
- Database queries use parameterized statements
- Authentication/encryption used properly

---

### Gate 2: Test Coverage

**What it checks:**
- Unit test coverage >80% (or your standard)
- All critical code paths tested
- Edge cases covered
- Error paths tested
- Integration between modules

**Failures look like:**
```
Coverage Gate: ⚠️ FAILED

Coverage Report:
  ├── Overall: 71% (below 80% threshold)
  ├── src/auth/oauth.ts: 45% (low! needs tests)
  ├── src/utils/validation.ts: 92% (good)
  └── src/api/users.ts: 88% (good)

Untested Code Paths:
  ❌ oauth.ts: Line 23-45 (error handling)
       - "What if OAuth provider returns 500?"
       - "What if token expires mid-request?"
  ❌ oauth.ts: Line 67 (edge case)
       - "What if email is already registered?"

Suggestions:
  1. Add test for OAuth provider timeout
  2. Add test for expired token
  3. Add test for duplicate email registration
```

**What passes:**
- Coverage >80% overall (or team standard)
- All critical paths have tests
- Error cases are tested
- Integration tests exist
- Tests actually pass (not just written)

---

### Gate 3: Accessibility (WCAG)

**What it checks:**
- Color contrast ratios (WCAG AA: 4.5:1 minimum for text)
- Keyboard navigation (all interactive elements reachable by Tab)
- Screen reader compatibility (proper ARIA labels, semantic HTML)
- Focus management (visible focus indicator, logical tab order)
- Text alternatives (images have alt text, videos have captions)

**Failures look like:**
```
Accessibility Gate: ⚠️ FAILED

WCAG AA Violations Found:

Color Contrast Issues:
  ❌ Button text (white on light blue): 3.2:1 ratio
     Needs: 4.5:1 ratio
     Fix: Use darker blue (teal-700 instead of teal-500)

Keyboard Navigation:
  ❌ Modal dialog: Tab key doesn't work inside modal
     Issue: Focus trap not implemented
     Fix: Use aria-modal and focus management

Screen Reader:
  ❌ Icon-only button missing aria-label
     Current: <button><Icon /></button>
     Fix: <button aria-label="Delete item"><Icon /></button>

Text Alternatives:
  ❌ Chart image missing alt text
     Fix: Add alt="Monthly revenue trend: $10K → $50K"

Suggestions:
  1. Adjust button color
  2. Add focus trap to modal
  3. Add aria-labels to icon buttons
  4. Add alt text to images/charts
```

**What passes:**
- WCAG AA compliance (minimum standard)
- WCAG AAA (stretch goal)
- Keyboard navigable (no mouse required)
- Screen reader friendly (proper ARIA)
- Color contrast >4.5:1 for text
- Interactive elements have visible focus state

---

### Gate 4: Performance

**What it checks:**
- Bundle size (code is reasonably sized)
- Load time (page/feature loads in acceptable time)
- Runtime performance (no jank, smooth animations)
- Memory usage (no leaks, reasonable footprint)
- Database queries (no N+1 queries, indexes used)

**Failures look like:**
```
Performance Gate: ⚠️ FAILED

Bundle Size:
  ⚠️ JavaScript: 250KB (exceeds 200KB budget by 25%)
     Issue: Heavy dependency included (moment.js = 68KB)
     Fix: Replace with date-fns (12KB)

Load Time:
  ⚠️ Initial page load: 4.2 seconds (target: <2 seconds)
     Issue: Missing code splitting
     Fix: Lazy-load non-critical chunks

Runtime Performance:
  ⚠️ Component re-renders 15 times on single click
     Issue: Missing memoization
     Fix: Wrap component with React.memo()

Database Queries:
  ❌ N+1 Query Pattern Detected:
     Loop: for each user, query their posts (1 query each)
     Better: Single query with JOIN
     Fix: Use batch query instead of loop

Memory Usage:
  ⚠️ Growing steadily during test (memory leak suspected)
     Issue: Event listeners not cleaned up
     Fix: Add cleanup in useEffect return
```

**What passes:**
- Bundle size within budget (e.g., <200KB)
- Load time <2 seconds (customizable)
- 60fps animations (no jank)
- Memory stable (no leaks)
- Database queries optimized (no N+1)

---

### Gate 5: Fairness & Bias Detection

**What it checks:**
- Demographic parity (feature works equally across groups)
- Algorithmic bias (ML models don't discriminate)
- Accessibility for all (inclusive design)
- No unintended exclusions
- User segmentation is fair

**Failures look like:**
```
Fairness Gate: ⚠️ FAILED

Demographic Parity Analysis:

User Segmentation:
  ⚠️ Feature only available to users >21
     Issue: Age-based exclusion without clear justification
     Fix: Clarify legal requirement or remove restriction

Performance Disparity:
  ⚠️ Search feature slower for non-English users
     Issue: Single-byte character optimization bias
     Fix: Support multi-byte encodings equally

Accessibility Disparity:
  ⚠️ Mobile users experience feature differently
     Issue: Desktop-first design, mobile afterthought
     Fix: Ensure identical functionality on all devices

Bias Detection (if ML model):
  ❌ Recommendation model: 60% accuracy for group A, 40% for group B
     Issue: Training data imbalance
     Fix: Retrain with balanced dataset

Suggestions:
  1. Remove unnecessary age restriction or justify it
  2. Test search performance across languages
  3. Test feature on actual mobile devices
  4. Review training data for bias
```

**What passes:**
- Feature works equally across user groups
- No demographic bias
- Accessibility for all (not just majority)
- ML models perform equally across populations
- No unintended discrimination

---

### Gate 6: Design System Compliance

**What it checks:**
- Colors from approved palette
- Typography follows type scale
- Spacing uses design grid (8px, 16px, etc.)
- Interactive patterns match system
- Component variants use established options

**Failures look like:**
```
Design System Gate: ⚠️ FAILED

Color Usage:
  ❌ Button background: #E85D75 (custom color)
     Should use: primary-500 or secondary-500
     Fix: Use token @primary-500

Typography:
  ⚠️ Heading uses "Helvetica 16px" (inconsistent)
     Should use: Heading M token (Poppins 18px)
     Fix: Use heading-m class

Spacing:
  ❌ Padding: 14px (not multiple of 8px)
     Should use: 16px (2 × 8px grid)
     Fix: Change padding from 14px to 16px

Component Patterns:
  ❌ Button has custom hover state
     Should use: System button with standard states
     Fix: Use Button component from design library

Suggestions:
  1. Replace custom color with design token
  2. Use typography tokens from system
  3. Adjust spacing to grid multiples
  4. Use approved interactive patterns
```

**What passes:**
- All colors from approved palette
- All typography from type scale
- All spacing multiples of grid unit (e.g., 8px)
- All interactive patterns from system
- Components use design tokens

---

### Gate 7: Legal & Compliance Hold

**What it checks:**
- GDPR compliance (is personal data handled correctly?)
- CCPA compliance (user privacy rights)
- AI Act requirements (if AI/ML involved)
- Licensing (open source licenses compatible?)
- Regulatory tags (has legal team cleared it?)

**Failures look like:**
```
Legal Hold Gate: 🔒 BLOCKED (Requires Manual Review)

GDPR Concerns:
  ❌ Personal data (email) stored without consent
     Issue: No privacy notice shown to users
     Fix: Add privacy consent flow
     Owner: Legal team

CCPA Concerns:
  ❌ "Delete account" feature missing
     Issue: CCPA requires user deletion rights
     Fix: Implement account deletion endpoint
     Owner: Legal + Product

AI/ML Compliance:
  ❌ Model predictions affecting user eligibility
     Issue: AI Act requires explainability
     Fix: Add model explanation/transparency
     Owner: Legal + Data Science

Licensing:
  ⚠️ Dependency "agpl-library" uses AGPL license
     Concern: Requires code disclosure
     Fix: Either remove or get legal approval
     Owner: Legal

Status: Awaiting legal team review
Next: Legal will approve or request changes
```

**What passes:**
- GDPR/CCPA compliance verified
- Privacy notices in place
- User deletion/opt-out available
- AI/ML models have explanations
- All licenses compatible
- Legal team has approved

---

## How Gates Work Together

```
Your Idea
  ↓
FORGE Build (2 hours)
  ↓
Gate 1: Security Scan
  ├─ Fail? → Suggest fixes
  ├─ Pass? → Continue
  └─ (Repeat for each gate)
  ↓
Gate 2: Test Coverage → Pass/Fail
Gate 3: Accessibility → Pass/Fail
Gate 4: Performance → Pass/Fail
Gate 5: Fairness → Pass/Fail
Gate 6: Design System → Pass/Fail
Gate 7: Legal Hold → Approved/Blocked
  ↓
All Gates Pass?
  ├─ YES → Ready for human review
  ├─ NO → FORGE suggests fixes or you override
  │       (Override logged in audit trail)
  └─ BLOCKED → Legal team must approve
```

---

## What Happens on Failure

### Option 1: Auto-Fix
```
You: "Run build for login feature"
FORGE: "Gate 4 (Performance) failed. Bundle 25% over budget."
FORGE: "I can optimize by removing moment.js and replacing with date-fns.
        Should I proceed?"
You: "Yes"
FORGE: [Auto-optimizes, re-runs gate]
Result: Gate passes, continues to human review
```

### Option 2: Manual Fix
```
FORGE: "Gate 3 (Accessibility) failed. Button color contrast too low."
You: "I want to keep this color. Approving exception."
You: [Justification: "Brand requirement - will provide dark mode alternative"]
FORGE: [Logs exception in audit trail, continues]
Result: Build proceeds with documented override
```

### Option 3: Reject & Iterate
```
FORGE: "Gate 5 (Fairness) failed. Feature excludes mobile users."
You: "Let's redesign for mobile. Reject this build."
FORGE: [Archives build, ready for new iteration]
You: [Provides mobile-first guidance]
FORGE: [Builds again with mobile design]
Result: Mobile version passes all gates
```

### Option 4: Escalate
```
FORGE: "Gate 7 (Legal) blocked. GDPR concerns need review."
FORGE: [Notifies legal team, tickets created]
Legal: [Reviews, approves or requests changes]
FORGE: [Continues once legal clears it]
```

---

## Common Override Scenarios

### "We Want to Ship Fast"
Gate fails, you have two choices:
1. **Let FORGE fix it** (usually takes 15 min)
2. **Override with justification** (you own the risk)

Most teams: Let FORGE optimize (faster and safer).

### "We Have a Reason to Deviate"
```
Gate says: "Use standard button colors"
You say: "We're A/B testing custom color for 1 week"
Action: Override with experiment ticket
Result: Tracked, approved, monitored
```

### "This is an Exception"
```
Gate says: "Performance budget exceeded"
You say: "This feature needs extra library. Worth the tradeoff."
Action: Override + document trade-off
Result: Logged for future decisions
```

---

## Monitoring Gates

```
forge gates status

Gate Performance (Last 30 days)
├── Security: 98% pass rate (2 failures)
├── Coverage: 95% pass rate (1 failure)
├── Accessibility: 100% pass rate
├── Performance: 92% pass rate (4 failures)
├── Fairness: 99% pass rate (0 failures)
├── Design System: 97% pass rate (1 failure)
└── Legal Hold: 100% pass rate

Most Common Failures:
  1. Performance (bundle size) - 40%
  2. Coverage (edge case testing) - 35%
  3. Security (dependency updates) - 15%
  4. Design System (color/spacing) - 10%
```

Use this data to improve team practices.

---

## Next Steps

1. **Read:** [Governed Autonomy](./01-governed-autonomy.md) — How gates fit into decision-making
2. **Read:** [Reviewing Compliance Reports](../03-guides/04-reviewing-compliance-reports.md) — How to interpret reports
3. **Try:** [Running Your First Build](../03-guides/01-running-your-first-build.md) — See gates in action

**Questions?** Check [FAQ](../04-reference/03-faq.md).