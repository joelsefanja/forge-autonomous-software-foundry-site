---
title: "Responding to Security Findings"
---

**TL;DR** — FORGE or the SOC team finds a security issue. This guide shows you how to respond: understand the issue, fix it, verify the fix, and prevent similar issues.

---

## 30-Second Summary

Security findings happen. FORGE will alert you. You triage (is it real?), fix (how?), verify (did it work?), and improve (how to prevent?). Process takes 15 min to a few hours depending on severity.

---

## Types of Security Findings

### 1. Pre-Deployment (FORGE Compliance Gates)

**Caught:** Before human review

```
Build #123: Security Gate FAILED

Vulnerability Found: lodash@4.17.15 has CVE-2021-23337
Severity: HIGH
Description: Regular expression denial of service (ReDoS)
Impact: Attacker could crash your app
Fix: Upgrade lodash to >=4.17.21
```

### 2. Post-Deployment (SOC Monitoring)

**Caught:** After feature is live

```
ALERT: Unusual API Activity

Time: 2026-06-06 03:45 UTC
Pattern: 1000+ requests from single IP in 10 minutes
Status: Rate-limited automatically
Impact: Likely attack, but contained
Investigation: SOC team looking into it
Your action: Confirm if legitimate
```

---

## Severity Levels

| Level | Response Time | Action |
|-------|---------------|--------|
| 🔴 **Critical** | Immediate (minutes) | Stop everything, fix now |
| 🟠 **High** | ASAP (hours) | Fix before next release |
| 🟡 **Medium** | Soon (days) | Include in current sprint |
| 🟢 **Low** | When possible (weeks) | Backlog for later |

---

## Critical Finding: Immediate Response

### Scenario: Hardcoded API Key Found

```
ALERT: Secrets Detected

Severity: 🔴 CRITICAL
Description: GitHub personal access token hardcoded in config.ts
Location: Line 45
Impact: Anyone with repo access can use your token
Status: Already in production!

Timeline:
├─ 15:30 - Finding reported
├─ 15:32 - You're notified
└─ 15:35 - (This is now)
```

### Step 1: Understand the Issue

**Questions to ask:**
- How was this found? (Scan? User report?)
- Where is it? (Specific file?)
- How long has it been exposed? (Days? Months?)
- Who has access? (Public repo? Private?)

**In this case:**
- Found by: Automatic secret scanner
- Location: `src/config.ts` line 45
- Exposed: 3 days (deployed on Tuesday)
- Access: Private repo (only team + GitHub staff)
- Impact: Medium (private repo, but still exposed)

### Step 2: Immediate Containment

**Do this first (takes 2 minutes):**

```bash
# 1. Revoke the exposed token immediately
# Go to GitHub → Settings → Developer settings → Personal access tokens
# Delete the exposed token

# 2. Create a new token with same permissions
# Use GitHub UI to generate new token

# 3. Test new token works
# Try: curl -H "Authorization: token NEW_TOKEN" https://api.github.com/user
# Should see your user info

# 4. Rotate in production
# Update the running service with new token
# Method depends on your setup (environment variables, secrets manager, etc.)
```

### Step 3: Fix in Code

```bash
# Remove the hardcoded token from code
# src/config.ts BEFORE:
const GITHUB_TOKEN = "ghp_abcdefghijklmnopqrstuvwxyz123456";

# src/config.ts AFTER:
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
```

### Step 4: Verify the Fix

```bash
# 1. Add to .gitignore (if not already)
echo ".env" >> .gitignore
git add .gitignore

# 2. Commit the fix
git add src/config.ts
git commit -m "Security: Remove hardcoded API key, use env var"

# 3. Verify old token doesn't show in git history
git log --all -S "ghp_abcdefghijklmnopqrstuvwxyz123456"
# Should be empty

# 4. If it shows in history, rewrite git history
# (This is complex, ask security team)

# 5. Push the fix
git push origin main

# 6. Redeploy with new environment variable
```

### Step 5: Post-Incident

```
Document the incident:
├─ What: Hardcoded API key
├─ When: Found at 15:30 UTC, fixed by 16:00 UTC
├─ Why: Oversight during development
├─ Impact: 30 minutes of exposure, contained
├─ Fix: Rotated token, updated code, redeployed
└─ Prevention: Added pre-commit secret scanner

Prevention:
├─ Installed: detect-secrets hook
├─ Prevents: Committing secrets in future
└─ Team: Run `pre-commit install`

Timeline:
├─ Detection: <1 min (automated)
├─ Response: 5 min (you saw alert)
├─ Fix: 20 min (update code, redeploy)
├─ Total: 25 minutes
└─ Good response time!
```

---

## High Finding: Fix Within Hours

### Scenario: SQL Injection Risk

```
ALERT: SQL Injection Vulnerability

Severity: 🟠 HIGH
Location: src/routes/users.ts line 67
Description: User input not sanitized in query
Current code:
  const query = `SELECT * FROM users WHERE id = ${userId}`;
Risk: Attacker could inject SQL
Impact: Potential data breach
Status: In production (but not exploited yet)
```

### Response Process

**Step 1: Understand**
```
Question: "Is this definitely exploitable?"
Investigation:
├─ Look at line 67
├─ Check userId source (URL param? user input?)
├─ Test: Can I pass `1 OR 1=1`?
Result: Yes, SQL injection is real
Severity: Confirmed HIGH
```

**Step 2: Fix**
```typescript
// BEFORE (vulnerable):
const query = `SELECT * FROM users WHERE id = ${userId}`;
const user = await db.query(query);

// AFTER (fixed):
const user = await db.query(
  'SELECT * FROM users WHERE id = $1',
  [userId]  // Parameterized, sanitized automatically
);
```

**Step 3: Test**
```bash
# Add test case for this
npm test -- users.test.ts

# Test should pass with injection attempt
const result = await getUserById("1 OR 1=1");
// Should NOT return all users
// Should return 404 or null
```

**Step 4: Deploy**
```bash
git add src/routes/users.ts
git commit -m "Security: Fix SQL injection in getUserById"
git push origin main

# Trigger deployment
# Monitor for errors
# Check application logs for issues

# Verify in production:
curl https://api.company.com/users/1
# Should work normally

curl https://api.company.com/users/"1 OR 1=1"
# Should return 400 Bad Request or null
```

**Step 5: Notify Users?**
```
Question: "Do we tell users about this?"
Answer: Only if data was actually breached
Status: No data access detected (pre-emptive fix)
Action: Don't notify (it would cause panic for nothing)

But do:
├─ Log the fix in security audit
├─ Add to incident report
└─ Include in next security meeting
```

---

## Medium Finding: Include in Sprint

### Scenario: Unencrypted API Communication

```
FINDING: Unencrypted API Endpoint

Severity: 🟡 MEDIUM
Location: /api/debug endpoint
Description: Debug endpoint sends data over plain HTTP
Risk: Man-in-the-middle attacker could intercept debug data
Impact: Low (debug endpoint only, not production data)
Timeline: Can fix in next sprint
Recommendation: Remove endpoint or add HTTPS-only + authentication
```

### Response Process

**Step 1: Triage**
```
Is this urgent? → No (debug endpoint, not prod data)
Can we live with this for a week? → Yes
Should we schedule a fix? → Yes, add to sprint
```

**Step 2: Create Ticket**
```
Title: "Security: Remove unencrypted /api/debug endpoint"

Description:
  The /api/debug endpoint returns data over HTTP (unencrypted).
  While this is low-risk (not production data), it should be
  removed or secured.

Priority: Medium
Sprint: Next sprint
Estimate: 2 hours

Steps to Fix:
  1. Review what /api/debug does
  2. Move functionality to authenticated endpoint
  3. Add HTTPS requirement
  4. Remove plain HTTP endpoint
  5. Test that debug still works for authorized users
```

**Step 3: Fix in Sprint**
```
(Fix happens in regular sprint, not emergency)

Commit:
git commit -m "Security: Remove unencrypted debug endpoint"

Test:
npm test -- api.test.ts

Deploy:
(Deploys with next regular release)
```

---

## Low Finding: Backlog for Later

### Scenario: Old Dependency with Minor Vulnerability

```
FINDING: Lodash 4.17.15 has minor DoS vulnerability

Severity: 🟢 LOW
Status: Outdated (newer version available)
Impact: Very low (would need complex input)
Action: Upgrade when convenient
```

### Response Process

**Step 1: Decide**
```
Is this critical? → No
Does it affect users? → Unlikely
Can it wait? → Yes

Action: Add to backlog (not urgent)
```

**Step 2: Future Upgrade**
```
When you're already updating dependencies:

npm install lodash@latest
npm test (verify nothing breaks)
git commit -m "Dependency: Upgrade lodash to latest"
git push
(Deploys with next release)
```

---

## Post-Deployment Incident: SOC Alert

### Scenario: Unusual Traffic Pattern

```
ALERT: Unusual Login Attempts

Severity: 🟠 HIGH
Time: 2026-06-06 03:45 UTC
Pattern: 50 failed logins to admin account
Source: 192.0.2.100 (Asia)
Status: Attempts are throttled (account locked)
Your action needed: Confirm if legitimate
```

### Step 1: Investigate

**Questions:**
- Did you or team members log in from Asia recently? → No
- Is this a known IP? → No
- Could it be an automated tool? → Probably (brute force)
- Has data been accessed? → No (attempts failed)

**Conclusion:** This is an attack attempt, but it was blocked.

### Step 2: Respond

```
You respond to SOC:
"This is not legitimate. Block this IP and lock the admin account."

SOC takes action:
├─ IP 192.0.2.100 added to firewall block list
├─ Admin account locked (user gets alert)
├─ Events logged for forensics
└─ Monitoring enabled for similar patterns
```

### Step 3: Follow Up

```
Admin user receives:
"Your account was locked due to suspicious activity.
Please reset your password to unlock."

User resets password → Account unlocked → They can log in

You document:
├─ What happened (brute force attack)
├─ When (03:45 UTC)
├─ How it was detected (login throttling)
├─ How it was contained (account locked)
├─ Action taken (user notified)
└─ Follow-up (monitoring enabled)
```

---

## Common Responses Playbook

| Finding | Level | Response Time | Action |
|---------|-------|----------------|--------|
| Hardcoded secret | 🔴 Critical | Now (5 min) | Rotate token, remove from code |
| SQL injection | 🟠 High | Hours | Parameterize queries, test, deploy |
| Unencrypted data | 🟠 High | Hours | Add encryption, test, deploy |
| Outdated library (no CVE) | 🟡 Medium | Days | Schedule upgrade in sprint |
| Minor DoS risk | 🟢 Low | Weeks | Backlog for future |
| Brute force attack | 🟠 High | Immediate | Rate-limit, lock account |

---

## Prevention: Security Learnings

After each finding, improve:

```
Finding: Hardcoded API key
Prevention: ✅ Added detect-secrets pre-commit hook

Finding: SQL injection
Prevention: ✅ Code review checklist includes "parameterized queries"

Finding: Brute force attack
Prevention: ✅ Rate limiting + account lockout already implemented

Pattern: Keep tracking and improving
```

---

## When to Escalate to Security Team

**Escalate if:**
- 🔴 Confirmed data breach (users affected)
- 🔴 Active exploitation (not just attempt)
- 🔴 Compliance violation (GDPR, etc.)
- 🟠 Multiple attacks in short time
- 🟠 Vulnerability in critical system
- 🟡 Unsure how to fix

**Don't escalate if:**
- Prevented by existing defenses
- Already fixed and deployed
- Low risk and isolated

---

## Next Steps

1. **Read:** [Pre-Commit Security Hooks](./02-setting-up-security-hooks.md) — Prevent issues before they start
2. **Read:** [Security Monitoring](../02-concepts/04-security-monitoring.md) — Understand 24/7 monitoring
3. **Practice:** Request a test incident to learn response process

**Questions?** Contact security team or check [FAQ](../04-reference/03-faq.md).