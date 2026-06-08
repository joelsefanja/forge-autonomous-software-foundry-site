---
title: "FORGE User Documentation"
---

Welcome to FORGE—the autonomous software delivery platform that builds, governs, and releases code with human oversight.

This documentation is organized by **who you are** and **what you need to do**—not technical topics.

---

## Quick Navigation

### New Here?

Start with **[What is FORGE?](./01-getting-started/01-what-is-forge.md)** (5 min read)  
Then pick your role:

- **[For Product Managers](./01-getting-started/02-for-product-managers.md)** — Evaluate ideas with evidence
- **[For Engineers](./01-getting-started/03-for-engineers.md)** — Contribute to builds
- **[For Designers](./01-getting-started/04-for-designers.md)** — Approve designs with evidence
- **[For QA/Testers](./01-getting-started/05-for-qa-testers.md)** — Validate before release

### Your Next Step

- **First build?** → [Running Your First FORGE Build](./03-guides/01-running-your-first-build.md)
- **Setting up team?** → [Team Onboarding Checklist](./03-guides/08-team-onboarding-checklist.md)
- **Need help?** → [FAQ](./04-reference/03-faq.md)

---

## Documentation Sections

### 1. Getting Started (5 docs)

Introduction to FORGE for different roles. Start here if you're new.

- [What is FORGE?](./01-getting-started/01-what-is-forge.md) — 5 core capabilities, elevator pitch
- [For Product Managers](./01-getting-started/02-for-product-managers.md) — How to evaluate features
- [For Engineers](./01-getting-started/03-for-engineers.md) — How to review builds
- [For Designers](./01-getting-started/04-for-designers.md) — How to approve designs
- [For QA/Testers](./01-getting-started/05-for-qa-testers.md) — How to validate builds

### 2. Core Concepts (5 docs)

Deep dive into how FORGE works. Read to understand the "why."

- [Governed Autonomy](./02-concepts/01-governed-autonomy.md) — AI proposes, humans decide
- [Self-Improving Agents](./02-concepts/02-self-improving-agents.md) — FORGE learns from feedback
- [Compliance Gates](./02-concepts/03-compliance-gates.md) — 7 automatic safety checks
- [Security Monitoring](./02-concepts/04-security-monitoring.md) — 24/7 SOC watching
- [Evidence-Backed Decisions](./02-concepts/05-evidence-backed-decisions.md) — Full audit trails

### 3. Guides (8 docs)

Step-by-step instructions for common tasks.

- [Running Your First Build](./03-guides/01-running-your-first-build.md) — 5-10 min walkthrough
- [Setting Up Security Hooks](./03-guides/02-setting-up-security-hooks.md) — Catch issues pre-commit
- [Understanding Build Evidence](./03-guides/03-understanding-build-evidence.md) — What reports mean
- [Reviewing Compliance Reports](./03-guides/04-reviewing-compliance-reports.md) — GDPR, AI Act, fairness
- [Responding to Security Findings](./03-guides/05-responding-to-security-findings.md) — How to handle alerts
- [Publishing to npm](./03-guides/06-publishing-to-npm.md) — Share components with team
- [Integrating Design Tokens](./03-guides/07-integrating-design-tokens.md) — Centralized design system
- [Team Onboarding](./03-guides/08-team-onboarding-checklist.md) — Checklist for new members

### 4. Reference (3 docs)

Technical reference and FAQs.

- [Architecture & Agents](./04-reference/01-architecture-agents.md) — How FORGE works under the hood
- [Tools & Tech Stack](./04-reference/02-tools-tech-stack.md) — What powers FORGE
- [FAQ](./04-reference/03-faq.md) — Common questions

---

## Common Workflows

### Workflow 1: Launch a New Feature

```
You write request
  ↓ (10 min)
FORGE builds
  ↓ (2 hours)
You review + approve
  ↓ (30 min)
Engineers merge
  ↓ (automated)
QA validates
  ↓ (1 day)
Live in production
  ↓ (TOTAL: 2-3 days)
```

See: [Running Your First Build](./03-guides/01-running-your-first-build.md)

### Workflow 2: Improve Code Quality

```
FORGE security scan finds issue
  ↓
You review finding
  ↓
FORGE or you fix it
  ↓
Tests verify fix
  ↓
Ship with confidence
```

See: [Responding to Security Findings](./03-guides/05-responding-to-security-findings.md)

### Workflow 3: Onboard New Engineer

```
Welcome meeting (15 min)
  ↓
Read documentation (1 hour)
  ↓
First build with buddy (2 hours)
  ↓
Independent builds (day 2)
  ↓
Contributing to team (day 3)
```

See: [Team Onboarding Checklist](./03-guides/08-team-onboarding-checklist.md)

---

## Key Concepts

### Governed Autonomy
FORGE automates routine work (code generation, testing, compliance). Humans make decisions (approval, trade-offs, exceptions). Result: speed without recklessness.

### Self-Improving Agents
Every correction teaches FORGE. After 5-10 iterations on a pattern, FORGE anticipates. Your team's collective knowledge becomes FORGE's baseline.

### Compliance Gates
7 automatic checks before human review: Security, Coverage, Accessibility, Performance, Fairness, Design System, Legal Hold. All gates must pass (or you approve exception with justification).

### Evidence-Backed Decisions
Every build traces: who requested, why, what code changed, who approved, when deployed, what happened. Perfect for audits, incidents, and team retrospectives.

---

## At a Glance

| Question | Where to Find |
|----------|---------------|
| What is FORGE? | [What is FORGE?](./01-getting-started/01-what-is-forge.md) |
| How do I request a build? | [Running Your First Build](./03-guides/01-running-your-first-build.md) |
| What's my role? | [Getting Started](./01-getting-started/) for your role |
| How does FORGE learn? | [Self-Improving Agents](./02-concepts/02-self-improving-agents.md) |
| What's the security model? | [Security Monitoring](./02-concepts/04-security-monitoring.md) |
| I don't understand a report | [Understanding Build Evidence](./03-guides/03-understanding-build-evidence.md) |
| How do I set up hooks? | [Setting Up Security Hooks](./03-guides/02-setting-up-security-hooks.md) |
| I'm new to team | [Team Onboarding Checklist](./03-guides/08-team-onboarding-checklist.md) |
| I have a question | [FAQ](./04-reference/03-faq.md) |

---

## Documentation Principles

This documentation follows these principles:

1. **Written for your role** — Not everyone reads everything. Find your section.
2. **Explain the "why"** — Not just what to do, but why it matters.
3. **Show real examples** — Screenshots (ASCII), real scenarios, before/after.
4. **Start simple, go deep** — 30-second summaries, then detailed sections.
5. **Link, don't repeat** — Related docs link together. No wall of text.
6. **Practical first** — Guides before concepts. Learn by doing.

---

## Getting Help

### In Documentation
- Use **Ctrl+F** to search this site
- Check [FAQ](./04-reference/03-faq.md) for common questions
- Pick your role in [Getting Started](./01-getting-started/)

### On Your Team
- Ask in **#forge-support** Slack channel
- Find your **onboarding buddy**
- Contact your **team lead**

### For Security Issues
- Email **security@company.com**
- Report via dashboard (if urgent)

---

## What's Next?

**First time?**
1. Read [What is FORGE?](./01-getting-started/01-what-is-forge.md) (5 min)
2. Read your role page (15 min)
3. Follow [Running Your First Build](./03-guides/01-running-your-first-build.md) (30 min)
4. Run your first build! (2 hours)

**Experienced FORGE user?**
- Explore [Core Concepts](./02-concepts/) for deeper understanding
- Check [Guides](./03-guides/) for specific tasks
- Reference [FAQ](./04-reference/03-faq.md) for quick answers

**Setting up a team?**
- Follow [Team Onboarding Checklist](./03-guides/08-team-onboarding-checklist.md)
- Make sure everyone reads their role page
- Have people do first build together

---

## Feedback

Found a mistake? Want to improve docs?

1. Check [#forge-feedback](https://company-slack.com) on Slack
2. Or file an issue on GitHub
3. We read every suggestion

Your docs should be helpful. If they're not, tell us how to fix them.

---

## Version

**FORGE Documentation**  
Last updated: June 2026  
Version: 1.0.0

---

Made with ❤️ for teams that want to build faster, safer, smarter.