---
title: "Evidence-Backed Decisions: Traceability & Audit Trails"
---

**TL;DR** — Every change has a complete story: who requested it, why, what code changed, who approved it, when it deployed, what happened after. Perfect for audits, incidents, and asking "how did this get here?"

---

## 30-Second Summary

FORGE records everything. Not just code changes, but the *decision context*: requirements, compliance checks, approvals, and post-deployment monitoring. When auditors ask "why is this in production?" you can answer with evidence, not guesses.

---

## What Gets Logged

### 1. Requirement
```
Requested by: Sarah (Product Manager)
Request: "Add single sign-on (SSO) with OAuth 2.0"
Date: 2026-06-01 09:15 UTC
Context: "Users requesting faster login. Competitive feature."
Business Impact: "Expect 20% faster onboarding"
Priority: "P1 - Do this before next release"
```

### 2. Build Process
```
FORGE Build Started
├── Build ID: build-20260601-001
├── Requested by: Sarah (sarah@company.com)
├── Started at: 2026-06-01 09:30 UTC
├── Build log: [Full execution trace]
└── Completed at: 2026-06-01 11:22 UTC (1h 52min)

Generated Artifacts:
├── Code: 847 lines (Python backend + React frontend)
├── Tests: 34 unit tests, 8 integration tests
├── Docs: API docs, setup guide, troubleshooting
└── Compliance report: (see below)
```

### 3. Compliance Gate Results
```
Security Gate: ✅ PASS
├── Vulnerability scan: 0 high-risk issues found
├── Secrets check: No hardcoded credentials
└── Dependencies: All up-to-date

Test Coverage Gate: ✅ PASS
├── Overall coverage: 87% (target: >80%)
├── Critical paths: 100% covered
└── Edge cases: 92% covered

Accessibility Gate: ✅ PASS
├── WCAG AA: Compliant
├── Color contrast: 7:1 (exceeds 4.5:1)
└── Keyboard nav: Fully functional

Performance Gate: ✅ PASS
├── Bundle size: +12KB (within budget)
├── Load time: +85ms (acceptable)
└── Database queries: Optimized

Fairness Gate: ✅ PASS
├── Demographic analysis: No bias detected
└── Accessibility: Works for all users

Design System Gate: ✅ PASS
├── Colors: From approved palette
├── Typography: Matches system
└── Spacing: Multiples of 8px grid

Legal Hold Gate: 🟢 CLEAR
├── GDPR: Compliant (OAuth doesn't store personal data on server)
├── Licensing: MIT OAuth library (permissive)
└── Regulatory: No concerns flagged
```

### 4. Code Review
```
PR opened by: FORGE (on behalf of Sarah)
PR title: "Add OAuth 2.0 SSO integration"
PR number: #1847

Reviewers & Approvals:
├── John (Engineer) - ✅ Approved
│   └── Comment: "Clean code. Good error handling."
├── Lisa (Designer) - ✅ Approved
│   └── Comment: "UI matches our button system. Love it."
├── Mike (QA) - ✅ Approved
│   └── Comment: "Tested on Chrome, Firefox, Safari. Works."
└── Sarah (PM) - ✅ Approved
    └── Comment: "This is exactly what we wanted."

Code Quality:
├── Lines changed: +847 additions, -12 deletions
├── Test coverage increase: 80% → 87%
├── Linting: 0 issues
└── Performance impact: +12KB bundle (acceptable)

Time to Approval: 18 hours
├── Submitted: 2026-06-01 11:30 UTC
└── Final approval: 2026-06-02 05:15 UTC
```

### 5. Deployment
```
Deploy ID: deploy-20260602-001
Deployed by: Sarah (sarah@company.com)
Deployment method: Automated via GitHub Actions
Deployed at: 2026-06-02 06:00 UTC

Target: Production
├── Environment: us-east-1 (primary)
├── Instances: 5 servers
├── Rollout strategy: Canary (10% → 50% → 100%)
└── Rollback: Available

Pre-deployment Checks:
├── Code signature: ✅ Valid (signed by trusted CI)
├── Tests: ✅ All pass
├── Dependencies: ✅ No conflicts
└── Monitoring: ✅ Ready

Rollout Timeline:
├── 06:00 - 10% deployment (1 server)
├── 06:05 - Monitoring... (no errors)
├── 06:10 - 50% deployment (3 servers)
├── 06:15 - Monitoring... (no errors)
└── 06:20 - 100% deployment (5 servers)

Status: ✅ Successfully deployed
```

### 6. Post-Deployment Monitoring
```
Monitoring Period: 1 hour after deployment

Metrics:
├── Error rate: 0.02% (normal baseline)
├── Login success rate: 99.8% (normal)
├── OAuth failures: 0.15% (expected - new feature)
├── Response time: +2ms (acceptable)
└── Database load: Normal

User Feedback:
├── Total logins via OAuth: 234
├── OAuth completion rate: 98%
├── Support tickets: 0
└── User satisfaction: 4.8/5 (survey)

Security Monitoring:
├── Failed auth attempts: 3 (normal)
├── Unusual API calls: None
└── Permission anomalies: None

Status: ✅ Healthy - No issues detected
```

---

## The Complete Audit Trail

When you query the build history:

```
forge history build-20260601-001

Timeline:
┌─ 2026-06-01 09:15 UTC
│  Request created by Sarah (PM)
│  "Add SSO with OAuth 2.0"
│
├─ 2026-06-01 09:30 UTC
│  FORGE build started
│  Build ID: build-20260601-001
│
├─ 2026-06-01 11:22 UTC
│  Build complete
│  Code: 847 lines | Tests: 42 | Docs: 5 files
│
├─ 2026-06-01 11:30 UTC
│  All 7 compliance gates passed ✅
│  Security: ✅ | Coverage: ✅ | Accessibility: ✅
│  Performance: ✅ | Fairness: ✅ | Design: ✅ | Legal: ✅
│
├─ 2026-06-01 12:00 UTC
│  PR #1847 opened by FORGE
│  Reviews requested from: John, Lisa, Mike, Sarah
│
├─ 2026-06-02 05:15 UTC
│  Final approval from Sarah
│  All 4 reviewers: ✅ Approved
│
├─ 2026-06-02 06:00 UTC
│  Deployment started by Sarah
│  Deploy ID: deploy-20260602-001
│  Rollout: Canary 10% → 50% → 100%
│
├─ 2026-06-02 06:20 UTC
│  100% deployed ✅
│  All 5 servers running
│
└─ 2026-06-02 07:20 UTC
   1-hour monitoring complete
   Status: Healthy ✅
   Error rate: 0.02% (normal)
   User feedback: 4.8/5 ⭐
```

---

## Use Cases

### Use Case 1: Audit Compliance
```
Auditor: "Who approved the OAuth change?"
You: [Shows audit trail]
  Sarah (PM) requested it
  John (Eng), Lisa (Designer), Mike (QA), Sarah (PM) approved it
  All 7 compliance gates passed
  Deployed by Sarah on 2026-06-02
Result: ✅ Fully documented, fully compliant
```

### Use Case 2: Incident Investigation
```
Alert: Login failures spiked at 2026-06-02 12:30 UTC
You ask: "What changed recently?"
FORGE shows: OAuth SSO deployed at 06:20 UTC
Query: "Did OAuth cause this?"
Evidence: 
  ├─ OAuth error rate: 0.15% at 12:30 UTC (normal for new feature)
  ├─ Login errors came from legacy system, not OAuth
  └─ Conclusion: Not OAuth-related
Next action: Investigate legacy system instead
```

### Use Case 3: Performance Regression
```
Alert: Page load time increased from 1.2s to 1.4s
You ask: "What changed?"
FORGE shows: 5 deployments in past week
Compare bundles: OAuth added +12KB (main change)
Evidence:
  ├─ +12KB = +85ms expected (confirmed)
  ├─ Actual +200ms observed (more than expected)
  └─ Investigate: Are there other changes?
Discovery: Unrelated CSS change caused +115ms
Action: Revert CSS change, keep OAuth
```

### Use Case 4: Rollback Decision
```
Issue: New feature has critical bug
Question: "Can we rollback?"
Evidence trail shows:
  ├─ OAuth deployed 2026-06-02 06:20 UTC
  ├─ Only change in last 4 hours
  ├─ Previous version working fine
  └─ Safe to rollback
Action: Rollback to pre-OAuth version
Result: Service restored in 3 minutes
Followup: Fix bug in OAuth, redeploy tomorrow
```

### Use Case 5: Compliance Audit
```
Compliance officer: "Show me all changes to payment handling"
You query: "forge history --component=payments --period=6months"
Results: 
  ├─ 12 changes to payment code
  ├─ Each with: who requested, why, approvals, compliance results
  ├─ Full compliance report for each deployment
  └─ 0 compliance violations in 6 months
Auditor: "Excellent. We're approved."
```

---

## The Evidence Checklist

For any production change, you can verify:

- [ ] **Who requested it?** (Change owner)
- [ ] **Why was it needed?** (Business context)
- [ ] **Who reviewed it?** (Accountability)
- [ ] **Did it pass security?** (Gate evidence)
- [ ] **Did it pass testing?** (Gate evidence)
- [ ] **Did it pass accessibility?** (Gate evidence)
- [ ] **Did it meet performance budget?** (Gate evidence)
- [ ] **What changed exactly?** (Diff available)
- [ ] **Who approved deployment?** (Accountable person)
- [ ] **When was it deployed?** (Exact timestamp)
- [ ] **How did it perform?** (Monitoring data)
- [ ] **Any issues?** (Incident reports)
- [ ] **Can we rollback?** (Previous version available)

✅ All items logged = high confidence in governance

---

## Traceability for Different Roles

### For Product Managers
```
"Show me what shipped this sprint"
forge history --since=2026-05-27 --until=2026-06-02

Results:
├── Feature A (OAuth) - Deployed 2026-06-02 ✅
├── Feature B (2FA) - Deployed 2026-06-01 ✅
├── Bugfix C (Login UI) - Deployed 2026-05-31 ✅
└── Perf improvement D (Caching) - Deployed 2026-05-29 ✅

Business impact:
├── OAuth: +20% onboarding speed (measured)
├── 2FA: +15% account security (measured)
├── UI fix: +0.3s faster login (measured)
└── Caching: +40% fewer DB queries (measured)
```

### For Engineers
```
"Show me all code changes by John this month"
forge history --author=john --period=1month

Results:
├── Commit 1: OAuth backend (2026-06-01)
│   └── Tests: +8, Coverage: 87%
├── Commit 2: OAuth error handling (2026-06-01)
│   └── Tests: +5, Coverage: 91%
└── Commit 3: Rate limiting (2026-05-28)
    └── Tests: +12, Coverage: 89%

Quality metrics:
├── Avg PR review time: 12 hours
├── Avg test coverage: 89%
└── Avg approvals per PR: 3.2 people
```

### For QA/Testers
```
"Show me what tests were added with each feature"
forge history --type=tests --period=1month

Results:
├── OAuth tests: 34 new (unit), 8 new (integration)
│   ├── Coverage: 87% of OAuth code
│   ├── Pass rate: 100%
│   └── Execution time: 1.2 seconds
├── 2FA tests: 28 new (unit), 6 new (integration)
│   ├── Coverage: 85% of 2FA code
│   ├── Pass rate: 100%
│   └── Execution time: 0.9 seconds
└── Bug fix tests: 5 new (regression)
    ├── Pass rate: 100%
    └── Execution time: 0.3 seconds
```

### For Security/Compliance
```
"Show me all deployments with security findings"
forge history --filter=security --severity=high --period=1quarter

Results:
├── Deployment 1 (2026-05-10): 2 vulnerabilities found
│   ├── Issue 1: Outdated dependency (FIXED)
│   ├── Issue 2: SQL injection risk (FIXED)
│   └── Status: Re-deployed successfully ✅
├── Deployment 2 (2026-05-25): 0 vulnerabilities
│   └── Status: Clean ✅
└── Deployment 3 (2026-06-02): 0 vulnerabilities
    └── Status: Clean ✅

Compliance status: 100% of deployments passed security gates
```

---

## Privacy & Data Handling

What's logged:
- ✅ Code changes
- ✅ Decisions (approvals, rejections)
- ✅ Compliance results
- ✅ Deployment metadata
- ✅ Performance metrics

What's NOT logged:
- ❌ User personal data
- ❌ Secrets (API keys, passwords)
- ❌ Private business details
- ❌ Sensitive customer data

Logs are:
- 🔒 Encrypted at rest
- 🔒 Access-controlled (only team can view)
- 📋 Retained per compliance requirements (typically 7 years)
- 📤 Exportable for audits

---

## Next Steps

1. **Read:** [Compliance Gates](./03-compliance-gates.md) — What evidence gates collect
2. **Read:** [Security Monitoring](./04-security-monitoring.md) — What security logs capture
3. **Read:** [Reviewing Compliance Reports](../03-guides/04-reviewing-compliance-reports.md) — How to interpret reports

**Questions?** Check [FAQ](../04-reference/03-faq.md).