---
title: "Reviewing Compliance Reports: GDPR, AI Act, Fairness"
---

**TL;DR** — Every build includes compliance reports. This guide explains what each means for real-world regulations and when to escalate to legal. Usually: all green = ship freely.

---

## 30-Second Summary

FORGE generates compliance reports for GDPR, CCPA, AI Act, and fairness. This guide translates regulatory language into "should you approve this?" decisions.

---

## GDPR Compliance (Personal Data)

### What GDPR Cares About

**Simple version:**
- Users own their data
- Users have rights (access, delete, port)
- You must ask permission
- You must protect it
- You must tell them what you do with it

### GDPR Report: Green Flag ✅

```
GDPR Compliance: ✅ CLEAR

Personal Data:
├─ Collected: Email address only
├─ Purpose: Authentication & communication
├─ Consent: Obtained at signup
└─ Storage: Encrypted at rest ✅

User Rights:
├─ Access: Users can view their data
├─ Delete: Users can request account deletion
├─ Port: Users can export their data
└─ Correction: Users can update info ✅

Retention:
├─ How long stored: Until account deleted
├─ Deletion process: Automatic after 30 days (per user request)
├─ Backups: Destroyed with primary data ✅
└─ Policy: Documented in Privacy Policy ✅

Processing:
├─ Data processors: Listed (legal agreements in place)
├─ International transfers: None (stored in EU)
├─ Sub-processors: None ✅
└─ Audit trail: Available ✅

Status: ✅ CLEAR TO DEPLOY
```

**Question:** "Does this comply with GDPR?" → **Yes, deploy freely**

### GDPR Report: Red Flag 🚨

```
GDPR Compliance: ⚠️ CONCERNS

Personal Data Issue #1:
  ❌ Email & phone number collected
     Current status: No consent recorded
     Issue: Users didn't opt-in
     Fix: Add privacy consent checkbox at signup

Personal Data Issue #2:
  ❌ Data stored for 2 years by default
     Issue: GDPR wants "no longer than necessary"
     Question: Why 2 years?
     Fix: Reduce to 1 year or justify need

Retention Policy Issue:
  ❌ "Backups kept indefinitely"
     Issue: Can't delete user data if backups exist
     Fix: Auto-delete backups after 30 days

Recommended Action:
  ├─ Add consent flow
  ├─ Reduce retention to 1 year
  ├─ Document deletion timeline
  └─ Get legal approval before deploying
```

**Question:** "Does this comply with GDPR?" → **No, needs fixes first**

### Action Steps

| Status | What to Do |
|--------|-----------|
| ✅ Green | Deploy freely |
| 🟡 Yellow | Fix before launch (usually quick) |
| 🔴 Red | Legal team review required |

---

## CCPA Compliance (US Privacy)

### What CCPA Cares About

**Simple version:**
- Californians can opt-out of data sales
- Californians can delete their data
- You must disclose what you collect
- You must disclose who you share with

### CCPA Report: Green Flag ✅

```
CCPA Compliance: ✅ CLEAR

California Users:
├─ Identified: Yes (IP geolocation)
├─ Opt-out available: Yes ✅
└─ Can delete data: Yes ✅

Data Sales:
├─ Do you sell data? No ✅
├─ Do you share with partners? No ✅
├─ Disclosure: "We don't sell your data" ✅
└─ Opt-out: Not applicable ✅

Rights Implementation:
├─ Delete request process: Available ✅
├─ Access request process: Available ✅
├─ Response time: Within 45 days ✅
└─ Verification: Identity verified ✅

Disclosure:
├─ Privacy policy: Complete ✅
├─ Categories disclosed: All listed ✅
├─ Accessible to users: Yes ✅
└─ Updated: Current (Jan 2026) ✅

Status: ✅ CLEAR TO DEPLOY
```

**Question:** "Does this comply with CCPA?" → **Yes**

### CCPA Report: Red Flag 🚨

```
CCPA Compliance: ⚠️ CONCERNS

Issue #1: Data Sharing
  ❌ You share user email with analytics vendor
     Requirement: Privacy Policy must disclose this
     Current status: Not disclosed
     Fix: Update privacy policy

Issue #2: No Deletion Path
  ❌ "Delete my data" button missing
     Requirement: Users must be able to delete
     Current status: No way to delete account
     Fix: Add account deletion feature

Issue #3: Unknown Retention
  ❌ Privacy policy doesn't say how long data kept
     Requirement: Must disclose retention period
     Current status: "Data kept as long as needed" (too vague)
     Fix: Specify exact duration (e.g., "1 year")

Recommended Action:
  ├─ Update privacy policy
  ├─ Add data deletion feature
  ├─ Clarify retention timeline
  └─ Get legal review
```

**Question:** "Does this comply with CCPA?" → **No, needs fixes**

---

## AI Act Compliance (EU AI Regulation)

### What AI Act Cares About

**Simple version:**
- If you use AI to make decisions about people, you must be transparent
- Humans must be able to override
- High-risk AI needs extra oversight
- Users must know they're being evaluated by AI

### AI Act Report: Green Flag ✅

```
AI Act Compliance: ✅ CLEAR (No AI-Based Decisions)

Note: This feature doesn't use AI for decisions, so AI Act
doesn't apply. No additional requirements.

If AI were used, we would ensure:
├─ Human review of automated decisions ✅
├─ Explainability (users understand why)
├─ Audit trail (all decisions logged)
└─ Opt-out available (users can opt out)
```

**Question:** "Is this compliant?" → **Yes, no AI decisions here**

### AI Act Report: Red Flag 🚨

```
AI Act Compliance: ⚠️ AI DECISION DETECTED

Issue: ML model makes eligibility decisions

Current Status:
  ❌ Model predictions not explained to users
     Requirement: Users must understand why they were rejected
     Current: "Sorry, you don't qualify" (no explanation)

  ❌ No human override available
     Requirement: Humans can review disputed decisions
     Current: Decision is final

  ❌ No audit trail
     Requirement: Decisions logged for investigation
     Current: No logging

  ❌ No fairness testing
     Requirement: Model performance equal across groups
     Current: Not tested

Recommended Action:
  ├─ Add explanation for rejections
  ├─ Add human appeal process
  ├─ Log all decisions
  ├─ Test model fairness
  └─ Get legal approval

Risk: High (decisions affect user eligibility)
```

**Question:** "Is this AI-compliant?" → **No, requires major changes**

---

## Fairness & Bias Detection

### What FORGE Checks

**Automatic fairness tests:**
- Does feature work equally for all demographics?
- Does ML model perform equally across groups?
- Are there unintended exclusions?

### Fairness Report: Green Flag ✅

```
Fairness Analysis: ✅ CLEAR

Demographic Parity:
├─ Feature available to all: ✅
├─ No age-based restrictions: ✅
├─ No gender-based restrictions: ✅
├─ No ethnicity-based restrictions: ✅
└─ Works for all user groups equally: ✅

Performance Consistency:
├─ Fast network: Feature works ✅
├─ Slow network: Feature works ✅
├─ Desktop: Same functionality ✅
├─ Mobile: Same functionality ✅
└─ All groups experience equally: ✅

Accessibility:
├─ Deaf/hard of hearing: Supported ✅
├─ Blind/low vision: Supported ✅
├─ Motor impairments: Supported ✅
├─ Cognitive disabilities: Supported ✅
└─ All disabilities supported: ✅

If ML Model:
├─ Accuracy for group A: 94%
├─ Accuracy for group B: 93%
├─ Accuracy for group C: 92%
├─ Variance: 2% (acceptable)
└─ No significant bias detected ✅

Status: ✅ CLEAR
```

**Question:** "Is this fair?" → **Yes**

### Fairness Report: Red Flag 🚨

```
Fairness Analysis: ⚠️ BIAS DETECTED

Issue #1: Demographic Disparity
  ❌ Feature only available to users 18+
     Question: Is this legally required?
     Check: Age discrimination possible?
     Action: Document justification or remove restriction

Issue #2: Performance Disparity
  ❌ Feature faster for English speakers (1.2s)
     vs. non-English speakers (3.5s)
     Cause: Single-byte character optimization
     Fix: Support all character sets equally

Issue #3: ML Model Bias
  ❌ Model accuracy varies by protected class:
     Male: 92% accuracy
     Female: 78% accuracy
     ├─ Variance: 14% (VERY HIGH)
     ├─ Cause: Training data imbalance
     └─ Fix: Retrain with balanced data

Issue #4: Accessibility Gap
  ❌ Feature requires mouse (inaccessible to motor-impaired users)
     Fix: Add keyboard navigation

Recommended Action:
  ├─ Review justification for 18+ restriction
  ├─ Optimize performance for all languages
  ├─ Retrain model with balanced data
  ├─ Add keyboard navigation
  └─ Test again before deploying
```

**Question:** "Is this fair?" → **No, bias detected**

---

## Compliance Decision Tree

```
Does the build have...

Personal data? (email, phone, location)
├─ YES → Check GDPR/CCPA
└─ NO → Skip to next

Decision by AI/ML?
├─ YES → Check AI Act
└─ NO → Skip to next

Any exclusions? (age, location, ability)
├─ YES → Check Fairness
└─ NO → Done

Results:
├─ All green → APPROVE
├─ Some yellow → FIX FIRST, then approve
└─ Any red → LEGAL REVIEW before approval
```

---

## Real Scenario: Feature with All Three Concerns

```
Feature: "Credit approval algorithm for loans"

Compliance Findings:

GDPR Issue:
  ❌ Stores credit score (sensitive data)
     Fix: Get explicit consent, allow deletion

CCPA Issue:
  ❌ Shares credit score with credit agencies
     Fix: Disclose in privacy policy, allow opt-out

AI Act Issue:
  ❌ AI model makes final approval/rejection
     Fix: Add explanation, human appeal, audit trail

Fairness Issue:
  ❌ Model accuracy: Men 89%, Women 73%
     Fix: Retrain with balanced data

Action:
  1. Legal team review (required)
  2. Fix fairness issue (retrain model)
  3. Add explanation layer (why rejected)
  4. Add human appeal process
  5. Update privacy policy
  6. Test compliance again

Timeline: 2 weeks to fix

Decision: ⛔ BLOCK until fixed
```

---

## Compliance Checklist Before Shipping

```
Before deploying ANY feature:

GDPR (if any personal data):
  [ ] Consent obtained from users
  [ ] Data deletion available
  [ ] Retention policy clear
  [ ] Privacy policy updated
  [ ] Compliant status: ✅

CCPA (if any US users):
  [ ] Opt-out available (if applicable)
  [ ] Deletion available
  [ ] Privacy policy accurate
  [ ] Sharing disclosed
  [ ] Compliant status: ✅

AI Act (if any AI decisions):
  [ ] Decisions explained to users
  [ ] Human appeal available
  [ ] Audit trail complete
  [ ] Fairness tested
  [ ] Compliant status: ✅

Fairness (all features):
  [ ] No demographic bias
  [ ] Works for all groups
  [ ] Accessible to disabilities
  [ ] Performance equal across groups
  [ ] Compliant status: ✅

If any ✗: Request changes before approval
```

---

## Common Questions

**Q: "We're not in EU. Do we need GDPR?"**  
A: If you have ANY EU users, yes. GDPR applies globally.

**Q: "We don't sell data. Do we need CCPA?"**  
A: Even if you don't sell, CCPA requires you to disclose that you don't sell and provide deletion rights.

**Q: "Our AI is just recommendation, not decision. Do we need AI Act?"**  
A: It depends. If the recommendation significantly affects users, you might need it. Legal team should decide.

**Q: "This seems like a lot of compliance..."**  
A: It is. That's why FORGE automates most of it. You only handle exceptions.

---

## Next Steps

1. **Read:** [Compliance Gates](../02-concepts/03-compliance-gates.md) — Technical details
2. **Read:** [Evidence-Backed Decisions](../02-concepts/05-evidence-backed-decisions.md) — Audit trails
3. **Run a build** and review compliance reports using this guide

**Questions?** Check [FAQ](../04-reference/03-faq.md) or contact legal team.