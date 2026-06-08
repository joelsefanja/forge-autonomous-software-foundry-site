---
title: "FAQ: Common Questions"
---

**TL;DR** — Quick answers to the most common questions. If your question isn't here, ask in #forge-support Slack.

---

## General

### Q: "Is FORGE replacing our team?"
**A:** No. FORGE automates *routine* work (boilerplate, testing, compliance). Your team handles *decisions* (strategy, trade-offs, edge cases). You'll be less busy with grunt work, more focused on problems worth solving.

### Q: "How much faster is FORGE?"
**A:** Typically 5-10x faster from idea to production:
- Traditional: 4-6 weeks
- FORGE: 2-3 days

Big features stay complex, but small-to-medium features launch faster.

### Q: "Can FORGE build anything?"
**A:** Not yet. FORGE is great at:
- ✅ Standard CRUD features
- ✅ Forms, dashboards, reports
- ✅ API integration
- ✅ Authentication flows

FORGE struggles with:
- ❌ Complex machine learning
- ❌ Real-time systems (WebSockets)
- ❌ Performance-critical algorithms
- ❌ Highly novel problems

For these, use FORGE to scaffold, then engineer manually.

### Q: "What if we don't like FORGE?"
**A:** All FORGE output is human-readable code. You can:
- Edit it like normal code
- Delete it and start over
- Use parts, ignore others
- No lock-in

---

## Using FORGE

### Q: "How do I request a feature?"
**A:** Go to FORGE dashboard → "New Build" → describe what you want in clear language.

**Good request:** "Add dark mode toggle to dashboard header"  
**Bad request:** "Make it better"

See [Running Your First Build](../03-guides/01-running-your-first-build.md).

### Q: "Why did my build take 3 hours?"
**A:** FORGE is thinking deeply:
- Analyzing your codebase
- Generating tests
- Running compliance gates
- Optimizing code

Most builds: 1-2 hours. Complex features: 3-4 hours.

### Q: "Can I run multiple builds in parallel?"
**A:** Yes. FORGE queues builds and processes them. You can request 10 builds and they'll process one-by-one or in parallel (depends on server capacity).

### Q: "What if FORGE generates bad code?"
**A:** This rarely happens, but when it does:
1. Request changes (FORGE learns)
2. Or reject and start over
3. Or edit the code yourself
4. Report it so FORGE improves

### Q: "How long should I wait before requesting changes?"
**A:** FORGE usually updates in 20-30 minutes. If >45 min, check status or ask for help.

---

## Compliance & Security

### Q: "What does 'PASS' mean in compliance gates?"
**A:** The feature meets all standards:
- Security: No vulnerabilities
- Coverage: Tests cover >80%
- Accessibility: WCAG AA compliant
- Performance: Within budget
- Fairness: No bias
- Design: Matches system
- Legal: No concerns

If any gate fails, FORGE shows exactly why and suggests fixes.

### Q: "Can I ignore a compliance gate?"
**A:** You *can* (with written justification), but you shouldn't.

Gates catch real issues:
- Security gate: Actual vulnerabilities
- Accessibility gate: Real barriers for disabled users
- Performance gate: Real bundle bloat

Exceptions are logged and reviewed.

### Q: "Who has access to my code?"
**A:** Only your team. FORGE runs on your infrastructure (or private cloud). Code never leaves your organization.

### Q: "Is my code secure?"
**A:** Yes. FORGE:
- ✅ Scans for secrets (blocks if found)
- ✅ Checks dependencies (flags vulnerabilities)
- ✅ Validates input (prevents injection)
- ✅ Encrypts at rest
- ✅ Has audit trails
- ✅ Has 24/7 SOC monitoring (after deploy)

### Q: "What if someone accuses us of AI-generated bias?"
**A:** FORGE explicitly tests for bias:
- Demographic parity analysis
- Performance across groups
- Accessibility for disabilities
- Explainability (if ML involved)

Full audit trail shows what was checked. You can answer with evidence.

---

## Learning & Improvement

### Q: "How does FORGE learn from feedback?"
**A:** When you correct FORGE:
1. Your feedback is captured
2. Pattern is extracted ("use const, not let")
3. Pattern is stored as a skill
4. Next build applies pattern automatically
5. After 5-10 corrections on similar patterns, FORGE anticipates

See [Self-Improving Agents](../02-concepts/02-self-improving-agents.md).

### Q: "Does FORGE get better over time?"
**A:** Yes. First builds need more feedback. By month 3, FORGE needs minimal corrections. By month 6, very few adjustments needed.

This requires team feedback. If you just approve everything, FORGE can't improve.

### Q: "Can we reset FORGE's learning?"
**A:** Yes, but don't. Your learned patterns are valuable. If you want to:
- Clear all skills: Contact admin
- Disable a specific skill: Override it (FORGE learns the new approach)
- Reset to defaults: Possible but not recommended

### Q: "Can I see what FORGE has learned?"
**A:** Yes. Dashboard → Skills → View learned patterns

Shows:
- What pattern
- How many times applied
- Success rate

---

## Technical

### Q: "What language is the generated code in?"
**A:** Depends on your project. FORGE detects your codebase language and uses it:
- JavaScript/TypeScript
- Python
- Go
- Rust
- etc.

You can specify in build request: "Write in Python"

### Q: "Can FORGE generate for my framework?"
**A:** FORGE supports major frameworks:
- **Frontend:** React, Vue, Angular, Svelte
- **Backend:** FastAPI, Express, Django, Spring
- **Database:** PostgreSQL, MySQL, MongoDB

If using a less common framework, FORGE does best-effort but might not be perfect.

### Q: "What if I use a monorepo?"
**A:** FORGE handles monorepos well. It understands package structure and generates code accordingly.

Tell FORGE which package: "Add feature to the web app package"

### Q: "Can FORGE generate infrastructure code?"
**A:** Not yet, but planned. Currently FORGE generates application code only.

For infrastructure, see: [Tools & Tech Stack](./02-tools-tech-stack.md)

### Q: "Does FORGE support TypeScript?"
**A:** Yes. FORGE generates fully typed TypeScript with no `any` types (unless unavoidable).

### Q: "Can I contribute fixes back to FORGE?"
**A:** Good question! FORGE is evolving. If you find a pattern that works well:
- Document it
- Suggest to team lead
- It might become a new skill for whole team

---

## Troubleshooting

### Q: "Build is stuck at 50% for 1 hour"
**A:** This shouldn't happen. Usually means:
1. Server is busy (check queue)
2. Network issue (check connection)
3. Bug in FORGE (rare)

**Action:** Check dashboard status, or ask in #forge-support Slack.

### Q: "Build failed with 'authentication error'"
**A:** FORGE needs permission to:
- Access your GitHub repo (token expiration?)
- Access your design tokens
- Access your team standards

**Action:** 
- Go to settings
- Refresh credentials
- Try again

### Q: "Compliance gate failed but I don't understand why"
**A:** Click "Details" on the failed gate to see:
- What rule failed
- Why it failed
- How to fix it
- Examples of the issue

If still confused, ask in Slack.

### Q: "FORGE keeps generating the same mistake"
**A:** This means the pattern isn't being learned correctly.

**Action:**
1. Give clearer feedback ("reason: input validation required for security")
2. FORGE learns the connection
3. Next build should include it

If not, report it—might be bug.

### Q: "I don't like the design FORGE generated"
**A:** That's OK! Options:
1. Request changes ("Make buttons larger")
2. Reject and restart ("Let's try a different layout")
3. Edit the code yourself

FORGE learns from your preferences over time.

---

## Roles Specific

### For Product Managers

**Q: "Can I set a deadline for a build?"**  
**A:** Not directly, but FORGE is fast. Request a feature and expect it in 2-6 hours. If urgent, request "small scope version" for today, then "enhance" later.

**Q: "How do I present FORGE builds to executives?"**  
**A:** Show:
- Timeline (we went from idea to working feature in 2 days)
- Compliance (all gates passed, security verified)
- Quality (87% test coverage, WCAG AA accessible)
- Velocity (5x faster than before)

See: [Evidence-Backed Decisions](../02-concepts/05-evidence-backed-decisions.md)

### For Engineers

**Q: "Will FORGE replace me?"**  
**A:** No. You'll do higher-level work:
- Code review (is it well-structured?)
- Optimization (can we make it faster?)
- Integration (how does this fit our system?)
- Innovation (what should we build next?)

Less time on: boilerplate, standard patterns, repetitive tasks.

**Q: "Can I customize the generated code?"**  
**A:** Yes, absolutely. Edit anything after generation. FORGE provides foundation, you refine. But if you correct something, FORGE learns and does it next time (no need to correct again).

**Q: "Does FORGE use modern patterns?"**  
**A:** Yes. FORGE learns from your codebase and uses patterns you use. It incorporates industry best practices (async/await, hooks, composition, etc).

### For Designers

**Q: "Will FORGE replace design?"**  
**A:** No. FORGE generates UI that *implements* your design system. You:
- Define the system (colors, typography, components)
- Approve designs (do they match the system?)
- Iterate on UX (is this intuitive?)

FORGE handles: buttons, forms, layouts that follow your system.

**Q: "How do I ensure FORGE uses my design tokens?"**  
**A:** Follow: [Integrating Design Tokens](../03-guides/07-integrating-design-tokens.md)

Once configured, FORGE automatically uses your tokens in all future builds.

### For QA

**Q: "Will FORGE replace testing?"**  
**A:** No. FORGE automates testing of happy paths and edge cases. You:
- Do exploratory testing (weird scenarios FORGE doesn't think of)
- Test at scale (does this work with 1M records?)
- Test usability (do users understand this?)
- Test performance (is it actually fast?)

FORGE handles: unit tests, integration tests, standard edge cases.

**Q: "Why does FORGE test things we don't care about?"**  
**A:** FORGE tests defensive. It assumes every edge case could be exploited or cause issues. That's good. You can ignore tests if they're truly not relevant (but rarely should).

---

## When to Escalate

**Ask in #forge-support Slack if:**
- Build is stuck (>2 hours with no progress)
- You're getting repeated errors
- You don't understand compliance feedback
- You suspect FORGE is generating insecure code
- You want to customize FORGE behavior

**Email security@company if:**
- You found an actual security vulnerability
- You think data was exposed
- You see unauthorized access

**Contact admin if:**
- You need access/permissions
- You want to reset or change settings
- You need infrastructure changes

---

## More Resources

- **Getting started:** [Running Your First Build](../03-guides/01-running-your-first-build.md)
- **Deep concepts:** [Core Concepts](../02-concepts/)
- **How-to guides:** [Guides](../03-guides/)
- **Technical details:** [Architecture](./01-architecture-agents.md)

---

## Still Have Questions?

1. **Check relevant guide** (search by role or task)
2. **Search FAQ** (ctrl+F on this page)
3. **Ask on Slack** (#forge-support)
4. **Email team lead** if you need urgent help

We're here to help! FORGE succeeds when your team thrives. 🚀