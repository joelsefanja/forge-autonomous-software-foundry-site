---
title: "For Product Managers: Evaluate Ideas with Evidence"
---

**TL;DR** — FORGE turns your feature ideas into fully-built prototypes with test results, compliance reports, and user feedback in hours. No "it might work"—just "here's what works and why."

---

## 30-Second Summary

Instead of asking engineers "can we build this?" and waiting 2 weeks, you request a FORGE build and get a working prototype with evidence (performance, accessibility, fairness, security) in a few hours. Then you make informed decisions: ship, iterate, or kill the idea.

---

## The PM Workflow

### Step 1: Write a Clear Request
```
"Add single-sign-on (SSO) to our dashboard login.
Requirements: Support OAuth 2.0, show a 'loading' spinner,
audit all login attempts."
```

FORGE doesn't need a spec document. Just describe the user goal and constraints.

### Step 2: Review the Build Proposal
FORGE outputs:
- **Code** — All backend endpoints, frontend UI, database migrations
- **Tests** — Unit tests (80%+ coverage), integration tests
- **Docs** — README, setup instructions, API docs
- **Accessibility Report** — WCAG 2.1 AA compliance
- **Performance Metrics** — Load time, bundle size, database queries
- **Security Report** — Dependency vulnerabilities, input validation checks
- **Design Quality** — Consistency with your design system

### Step 3: Make the Call
**Option A:** Approve → FORGE packages it as a PR, engineers review + merge  
**Option B:** Iterate → Give feedback ("Make the spinner blue", "Add logout timeout"), FORGE rebuilds  
**Option C:** Kill it → Archive the proposal, move on

**Real example:**  
*PM:* "Add dark mode."  
*FORGE:* [Builds in 2 hours] "Dark mode complete. Performance impact: +12KB bundle, accessibility: passes WCAG AA."  
*PM:* "Love it. Engineers, this is ready to review."

---

## 5 Benefits for PMs

### 1. **Test Ideas Risk-Free**
Worried an idea won't work? Run it through FORGE. See actual code, real tests, real performance numbers. No engineering effort wasted on concepts that won't fly.

### 2. **Speed Up Prioritization**
Instead of arguing about feasibility in meetings, use evidence. "Feature A: 2KB, 5min load. Feature B: 45KB, 60sec load."  
Clear winner.

### 3. **Catch Issues Before Engineering**
The compliance gates catch accessibility gaps, security holes, and performance problems *before* engineers spend time reviewing. They just confirm the fix is good.

### 4. **Learn What Your Team Builds Well**
FORGE shows you patterns: your team is fast at APIs, slower with UI forms. Use that insight to prioritize the right features.

### 5. **Justify Trade-Offs**
"We ship this feature but add 10MB to the bundle" is a visible trade-off. Now you decide: worth it?

---

## Common Scenarios

### Scenario 1: "Is This Even Possible?"
**Old way:** Ask engineer, wait for opinion  
**FORGE way:** Request a build, get actual code + tests in 2 hours  
**Result:** You know for certain, not guessing

### Scenario 2: "What's the Performance Cost?"
**Old way:** Estimate, build, test, measure  
**FORGE way:** Get performance metrics *before* review  
**Result:** Data-driven trade-off decision

### Scenario 3: "Will This Break Accessibility?"
**Old way:** Ship, find out in user feedback  
**FORGE way:** Compliance gate blocks if WCAG fails  
**Result:** Catch issues immediately

---

## Tips for Success

1. **Be specific about goals**, not implementation. ("Reduce login friction" vs. "Use fingerprint API")
2. **State constraints early**. ("Must work on iOS 12+", "Keep bundle under 100KB")
3. **Use evidence to prioritize** — don't just go with gut feel.
4. **Archive rejected ideas** — FORGE learns from them for future iterations.
5. **Check the audit trail** — Before shipping, see who approved what and why.

---

## What You'll See in FORGE

| Phase | What Happens | Time |
|-------|-------------|------|
| **Build** | FORGE generates code, tests, docs | 1-2 hours |
| **Compliance Gates** | Security, accessibility, performance checks | 10-15 min |
| **Your Review** | You see evidence, decide to ship/iterate/kill | Your call |
| **Engineering Review** | Engineers confirm code quality | 1-2 days |
| **Release** | Deploy with full audit trail | Your decision |

---

## Real Impact

**Before FORGE:**
- Feature request → 2-week design + spec → 1-week dev → 1-week QA → 1-week review = 5 weeks

**With FORGE:**
- Feature request → 2-hour build + evidence → review + approve = 1 day (if you greenlight it)

---

## Next Steps

1. **Read:** [Compliance Gates](../02-concepts/03-compliance-gates.md) — Understand what "passes" means
2. **Read:** [Evidence-Backed Decisions](../02-concepts/05-evidence-backed-decisions.md) — See what data you get
3. **Try:** [Running Your First Build](../03-guides/01-running-your-first-build.md) — Request a feature today

**Questions?** Check [FAQ](../04-reference/03-faq.md) or ask your team lead.