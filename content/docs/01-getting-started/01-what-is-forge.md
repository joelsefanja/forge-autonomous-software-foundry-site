---
title: "What is FORGE?"
---

**TL;DR** — FORGE is an autonomous software delivery platform that builds, governs, and releases code with human oversight at every gate. Think of it as a super-intelligent team member who proposes changes but never deploys without approval.

---

## 30-Second Elevator Pitch

FORGE combines AI agents, security compliance, and evidence trails to turn your ideas into production code faster—without sacrificing safety, traceability, or control. It's built for teams that want speed *and* governance.

---

## 5 Core Capabilities

### 1. **Autonomous Builds**
FORGE takes a task (e.g., "Add 2FA to login") and generates a complete pull request: code, tests, documentation, design tokens. No prompts needed after the initial request.

**Real example:** Product manager requests a feature → FORGE outputs a PR with unit tests, Storybook stories, and compliance pre-checks—ready for review.

### 2. **Governed Autonomy**
Your builds don't auto-merge. Every release passes 7 compliance gates: security scanning, unit test coverage, accessibility checks, design consistency, performance benchmarks, fairness audits, and legal holds. Failures block; passes are transparent.

**Real example:** A build fails the accessibility gate → FORGE flags the WCAG violation, suggests a fix, you approve or adjust.

### 3. **Self-Improving Agents**
FORGE learns from your feedback. When you reject a design decision or request a code change, it captures that as a skill and applies it to future builds—creating a team that improves every sprint.

**Real example:** After you correct naming conventions 3 times, FORGE learns your style guide and applies it automatically to all new code.

### 4. **24/7 Security Monitoring**
A dedicated security team (human + AI hybrid) watches deployments 24/7. They spot anomalies, respond to threats, and audit trails capture every decision—helping you meet GDPR, ISO 27001, and AI Act compliance.

**Real example:** Unusual API call pattern detected → SOC team investigates within minutes, either approves or rolls back, all logged.

### 5. **Evidence-Backed Decisions**
Every build comes with a trace: who requested it, why, what gates it passed, who approved it, when it deployed. Perfect for audits, incidents, and team retrospectives.

**Real example:** Production issue occurs → you replay the evidence trail to see exactly who approved what, why it passed compliance, and what changed.

---

## Why FORGE Exists

**The Problem:**  
Teams want to move fast, but governance slows things down. Reviews take days. Compliance checks feel manual. Audits are nightmares. Security is reactive.

**The FORGE Answer:**  
Automate the *routine* work (code generation, testing, compliance checks). Keep humans in the *decision* gates (approval, trade-offs, exceptions). Result: faster *and* safer.

---

## Who Uses FORGE?

- **Product Managers** — Launch features in days, not weeks. See real evidence before shipping.
- **Engineers** — Less boilerplate, more creative work. Learn from an AI teammate.
- **Designers** — Approve designs backed by accessibility and usability data, not just vibes.
- **QA/Testers** — Reduced manual testing. Focus on edge cases FORGE can't predict.
- **Compliance/Legal** — Audit trails, compliance gates, and incident response all automated.
- **Security Teams** — 24/7 monitoring, threat detection, and forensics built-in.

---

## How It Works (30,000-Foot View)

```
Your Idea
   ↓
[FORGE Agent] — Builds code, tests, docs
   ↓
[7 Compliance Gates] — Security, coverage, accessibility, etc.
   ↓
[Human Review] — PM, engineer, designer, QA approve
   ↓
[Release Decision] — Green light or iterate
   ↓
[Deployment + Monitoring] — Shipped with full audit trail
```

---

## What's Next?

Pick your role to see how *you* use FORGE:

- **[For Product Managers](../01-getting-started/02-for-product-managers.md)** — Evaluate ideas faster
- **[For Engineers](../01-getting-started/03-for-engineers.md)** — Contribute to builds
- **[For Designers](../01-getting-started/04-for-designers.md)** — Approve designs with evidence
- **[For QA/Testers](../01-getting-started/05-for-qa-testers.md)** — Validate before release

**Or jump to:** [Core Concepts](../02-concepts/README.md) to understand the bigger picture.