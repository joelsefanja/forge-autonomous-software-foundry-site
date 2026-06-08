---
title: "For Engineers: Contribute to FORGE Builds"
---

**TL;DR** — FORGE handles boilerplate and routine code. You review, refine, and deploy. Less busy-work, more creative problem-solving. And you learn from an AI teammate that remembers your feedback.

---

## 30-Second Summary

FORGE generates the foundation (tests, API scaffolding, migrations, docs). You review the PR, make targeted improvements, and merge. Over time, FORGE learns your patterns and needs less correction.

---

## Your Workflow

### Step 1: Review the PR
FORGE opens a PR with:
- Generated code (following your conventions)
- Full test suite (unit + integration)
- Type definitions (TypeScript, fully typed)
- Migration scripts (if database changes)
- Documentation
- Compliance report (what passed, what didn't)

```
PR Title: "Add SSO: OAuth 2.0 integration"
├── Backend
│   ├── src/auth/oauth.ts (new)
│   ├── src/auth/oauth.test.ts (new)
│   └── migrations/001-oauth-tokens.sql (new)
├── Frontend
│   ├── src/components/OAuthButton.tsx (new)
│   ├── src/components/OAuthButton.test.tsx (new)
│   └── src/stories/OAuthButton.stories.tsx (new)
├── Compliance Report
│   ├── Security: ✅ PASS (dependencies scanned)
│   ├── Accessibility: ✅ PASS (WCAG AA)
│   ├── Performance: ✅ PASS (bundle +8KB)
│   └── Fairness: ✅ PASS (no bias detected)
└── README.md (update) — Setup instructions
```

### Step 2: Check What Changed
Use the diff view to scan:
- **Code quality** — Does it match your standards?
- **Test coverage** — Are edge cases tested?
- **Performance** — Any suspicious queries or large allocations?
- **Security** — Input validation, SQL injection prevention?

### Step 3: Provide Feedback
Typical feedback types:

**A. Style/Convention**  
"We use `const` instead of `let` for immutability."  
→ FORGE learns this and applies it to future builds

**B. Missing Edge Case**  
"What if OAuth returns an invalid token?"  
→ FORGE adds error handling

**C. Architecture Concern**  
"This should use the event bus instead of direct calls."  
→ FORGE refactors

**D. Optimization**  
"Cache this query result—it's called on every page load."  
→ FORGE adds caching

### Step 4: Merge or Iterate
- **Good to go?** → Approve. FORGE handles CI/CD.
- **Needs tweaks?** → Request changes. FORGE revises the specific code, keeps the rest.

---

## 5 Benefits for Engineers

### 1. **Less Boilerplate**
FORGE generates tests, migrations, API scaffolding, TypeScript types. You write 30% less code for 80% of the feature.

### 2. **Learn from Feedback Loops**
Every correction you make → FORGE learns. After 10 corrections on naming conventions, FORGE applies them automatically. Your style guide evolves without documentation.

### 3. **Code Review is Faster**
Reading generated code is easier than reading hand-written code (it's consistent, well-commented, fully tested). You focus on logic, not formatting.

### 4. **Safer Refactoring**
FORGE generates with tests included. When you refactor, the tests catch regressions immediately.

### 5. **Knowledge Leverage**
New team member? They can learn from FORGE's patterns (consistent naming, error handling, test structure). It's like pair programming with a patient teacher.

---

## Common Scenarios

### Scenario 1: FORGE Generated Suboptimal Code
**Your job:** Flag it. Example:
```typescript
// FORGE generated (inefficient):
const users = await db.query("SELECT * FROM users");
const admins = users.filter(u => u.role === "admin");

// You suggest:
const admins = await db.query("SELECT * FROM users WHERE role = $1", ["admin"]);
```
FORGE learns: prefer database-level filtering over in-memory filtering.

### Scenario 2: Missing Error Handling
**Your job:** Add it or request FORGE add it.
```typescript
// FORGE generated (incomplete):
const token = oauth.getToken();
const user = await fetchUserProfile(token);

// You add (or request):
try {
  const token = oauth.getToken();
  if (!token) throw new Error("OAuth token missing");
  const user = await fetchUserProfile(token);
  // ...
} catch (error) {
  logger.error("OAuth failed", error);
  res.status(401).json({ error: "Authentication failed" });
}
```

### Scenario 3: Architectural Mismatch
**Your job:** Suggest the right pattern.
**You:** "We use dependency injection here, not singleton services."  
FORGE learns and refactors automatically.

---

## Tips for Effective Reviews

1. **Check the compliance report first** — If all gates pass, focus your review on logic, not formatting.
2. **Run the tests locally** — Make sure the test suite actually covers the feature.
3. **Ask "does this scale?"** — Will this hold up at 10x current load?
4. **Feedback is teaching** — When you correct FORGE, you're training your team's future AI teammate.
5. **Document non-obvious fixes** — If you make a change that's opinionated, explain why in the comment. FORGE learns from this too.

---

## FORGE Learning Process

Each time you review a PR:

```
Your Feedback         →  FORGE Learns          →  Next Build
─────────────────────────────────────────────────────────────
"Use async/await"     →  Avoids Promise.then() →  All new code uses async/await
"Add input validation"→  Checks user input     →  All endpoints validate
"Cache this query"    →  Uses Redis           →  Future APIs include caching
"My naming style"     →  camelCase for vars   →  All new vars match your style
```

After 5-10 corrections on similar patterns, FORGE anticipates. You review faster. Quality improves.

---

## Collaboration Example

**Day 1: First PR**
```
FORGE: [Submits PR for SSO feature]
You: "Great work! Two notes:
     1. Use async/await instead of .then()
     2. Add request timeout handling (30s max)"
FORGE: ✓ Learns both patterns
```

**Day 2: Second PR (different feature)**
```
FORGE: [Submits PR for payment integration]
You: "This is really good. Just one small fix: 
     add timeout like we do for OAuth."
FORGE: "Already included! I learned from yesterday."
```

By week 3, your reviews are mostly "looks good 👍"

---

## What Not to Worry About

- **Formatting** — FORGE uses your team's linter/prettier config
- **Type safety** — FORGE generates fully typed code
- **Test structure** — FORGE follows your testing conventions
- **Documentation** — FORGE includes JSDoc, README, setup steps

You focus on: logic, performance, architecture, edge cases.

---

## Next Steps

1. **Read:** [Understanding Your Build Evidence](../03-guides/03-understanding-build-evidence.md) — What to look for in reports
2. **Try:** [Running Your First Build](../03-guides/01-running-your-first-build.md) — See it in action
3. **Learn:** [Self-Improving Agents](../02-concepts/02-self-improving-agents.md) — How your feedback becomes learning

**Questions?** Check [FAQ](../04-reference/03-faq.md) or ask your team.