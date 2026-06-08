---
title: "Security Monitoring: 24/7 SOC & Threat Response"
---

**TL;DR** — FORGE has a dedicated security team (humans + AI) watching your deployments 24/7. They spot anomalies, respond to threats, and log everything. You sleep while they guard your code.

---

## 30-Second Summary

After deployment, FORGE's Security Operations Center (SOC) monitors every request, every database query, every API call. If something looks suspicious (unusual traffic, failed logins, permission abuse), the SOC investigates within minutes and either approves it or rolls back. Full audit trail for compliance.

---

## The Security Monitoring Stack

```
Your Production Environment
  ↓
[Intrusion Detection System (IDS)]
  ├─ Monitors network traffic
  ├─ Watches for known attack patterns
  └─ Flags suspicious connections
  ↓
[Application Monitoring]
  ├─ API call anomalies
  ├─ Database query patterns
  ├─ Failed authentication attempts
  └─ Permission boundary violations
  ↓
[User Behavior Analytics (UBA)]
  ├─ Unusual login locations
  ├─ Privilege escalation attempts
  ├─ Data access patterns
  └─ Account takeover indicators
  ↓
[AI Analysis + SOC Team]
  ├─ AI flags anomalies
  ├─ SOC investigates within 5 min
  ├─ Decision: Approve / Investigate / Rollback
  └─ Logs everything
  ↓
[Incident Response]
  └─ If threat confirmed: Contain → Investigate → Remediate → Log
```

---

## What Gets Monitored

### Real-Time Alerts

**Network Level:**
- DDoS attempts (thousands of requests from single IP)
- Port scanning (probing for vulnerabilities)
- Unencrypted traffic (should use HTTPS only)
- Unusual data volumes (exfiltration attempts)

**Application Level:**
- Failed login spikes (brute force attacks)
- Rapid permission changes (privilege escalation)
- Unusual API endpoints accessed (reconnaissance)
- Large batch data exports (data theft)
- Admin actions at odd hours (compromised account)

**Database Level:**
- Unusual query patterns (data mining)
- Dropped tables (data destruction)
- Permission changes (backdoor creation)
- Backup deletion (covering tracks)
- SQL injection attempts (hacking techniques)

**Code Level:**
- Unsigned deployments (code tampering)
- Changes to security configurations
- New admin user creation
- SSL certificate changes
- Secrets rotated unexpectedly

### Example Alerts

```
Alert 1: Login Brute Force
├─ Triggered at: 2026-06-06 03:45 UTC
├─ Severity: HIGH
├─ Pattern: 50+ failed logins in 5 minutes
│   From IP: 192.0.2.1 (China)
│   To account: admin@company.com
├─ Action: Account locked temporarily
├─ SOC status: INVESTIGATING
└─ Next: Wait for SOC decision (approve unlock or continue block)

Alert 2: Unusual Data Access
├─ Triggered at: 2026-06-06 04:12 UTC
├─ Severity: MEDIUM
├─ Pattern: User accessed 10K customer records (normally accesses 10)
│   User: john@company.com (works 9-5 EST)
│   Time: 03:30 UTC (middle of night for him)
│   Query: SELECT * FROM customers WHERE created_at > ...
├─ Action: API call rate-limited
├─ SOC status: INVESTIGATING
│   Question: Did you just run a data migration?
└─ You respond: "Yes, running export job. Approve this access."

Alert 3: Deployment Signature Verification Failed
├─ Triggered at: 2026-06-06 04:30 UTC
├─ Severity: CRITICAL
├─ Pattern: Code deployed without proper signature
│   Deployment ID: deploy-xyz
│   Signature: INVALID
├─ Action: Deployment BLOCKED immediately
├─ SOC status: INVESTIGATING
│   Question: Did you just push code?
└─ Investigation: Found attacker attempted to push malicious code
```

---

## SOC Workflow

### Tier 1: Automated Response (Immediate)

```
Threat Detected
  ↓
[AI Analysis]
├─ Is this definitely bad? (High confidence)
│  └─ YES → Tier 2 (Alert humans immediately)
├─ Is this suspicious? (Medium confidence)
│  └─ YES → Tier 2 (Alert humans, rate-limit)
└─ Is this probably fine? (Low confidence)
   └─ Wait for human review
```

### Tier 2: SOC Triage (5-15 minutes)

```
Human SOC analyst reviews alert
├─ Is this a false positive? (e.g., you running batch job)
│  └─ Approve: Add to allowlist, no impact
├─ Is this expected but needs investigation? (e.g., new employee)
│  └─ Investigate: Check context, talk to team
└─ Is this a real threat? (e.g., unauthorized access)
   └─ Escalate: Tier 3
```

### Tier 3: Incident Response (Ongoing)

```
Confirmed Threat
├─ CONTAIN: Block attacker, lock compromised account
├─ INVESTIGATE: Analyze logs, determine scope
├─ REMEDIATE: Fix vulnerability, reset passwords, deploy patch
├─ LOG: Document everything for compliance
└─ NOTIFY: Tell affected users if required by law
```

---

## Real Scenarios

### Scenario 1: Brute Force Attack (Simple)
```
03:45 - Alert: 100 failed logins to admin account in 10 minutes
03:46 - AI Analysis: Definitely an attack
03:47 - SOC Action: Lock account, rate-limit IP, log event
03:48 - Your notification: "Admin account locked due to suspicious activity"
03:50 - Your action: Unlock account via SMS verification
Result: Attack stopped in 5 minutes. Zero damage.
```

### Scenario 2: Data Exfiltration (Complex)
```
14:32 - Alert: User accessed 50K customer records (unusual)
14:33 - AI Analysis: Potentially serious
14:34 - SOC checks: User is engineer, but this is late-night access
14:35 - SOC calls engineer: "Did you access customer data?"
       Engineer: "No, I was asleep"
14:36 - SOC action: CRITICAL - Account compromised
        ├─ Force password reset
        ├─ Revoke all tokens
        ├─ Check what data was accessed
        ├─ Block data export for 24 hours
        └─ Investigate attacker's path
14:40 - SOC findings: Attacker used stolen Slack token to get SSH key
        ├─ Patch: Enforce 2FA on SSH
        ├─ Patch: Rotate all compromised keys
        └─ Notify: Legal team (potential GDPR breach)
14:50 - You take action: 2FA enforcement, audit who has access
Result: Breach contained. Data access log available for auditors.
```

### Scenario 3: Code Deployment Tampering (Critical)
```
22:15 - Alert: Unsigned code deployment attempted
22:16 - AI Analysis: Deployment signature invalid (CRITICAL)
22:17 - SOC action: BLOCK immediately
        ├─ Deployment rejected
        ├─ Attacker IP logged
        ├─ Firewall rule added to block IP
        └─ Alert escalated
22:18 - Your notification: "Critical: Unauthorized deployment blocked"
22:19 - SOC investigation: Attacker used GitHub token stolen from CI
22:20 - Your action: 
        ├─ Rotate all CI tokens
        ├─ Review recent deployments (all were signed)
        ├─ Update GitHub security rules
        └─ Audit logs sent to security team
Result: No malicious code deployed. Attacker contained.
```

---

## Audit Trail

Every security event is logged:

```
Security Event Log (June 6, 2026)

[03:45] Failed Login Attempts
  User: admin@company.com
  Count: 100+ failed attempts
  Source: 192.0.2.1 (Shanghai, China)
  Action Taken: Account locked
  Decision: SOC approved lock
  Decision Maker: Sarah (SOC)
  Timestamp: 2026-06-06 03:47:22 UTC

[14:32] Unusual Data Access
  User: john@company.com
  Query: SELECT * FROM customers WHERE created_at > '2025-01-01'
  Records Accessed: 50,348
  Source: Internal VPN
  Time: 14:32 UTC (user typically offline)
  Action Taken: Rate-limited, investigated
  Investigation: Account compromised via stolen Slack token
  Decision: Force password reset, 2FA enabled
  Decision Maker: Mike (SOC)
  Timestamp: 2026-06-06 14:35:08 UTC

[22:15] Deployment Signature Verification Failed
  Deployment ID: deploy-abc123
  Signature: INVALID (unsigned deployment)
  Source: GitHub Actions (CI compromised)
  Action Taken: Deployment blocked
  Investigation: Attacker obtained GitHub token from CI logs
  Decision: Rollback CI logs, rotate tokens
  Decision Maker: Alex (SOC)
  Timestamp: 2026-06-06 22:17:44 UTC

... (all events, all decisions, all approvals)
```

Use this for:
- Compliance audits (GDPR, ISO 27001, SOC 2)
- Incident investigations ("What happened?")
- Forensics ("Who did this?")
- Pattern analysis ("Are we vulnerable to X?")

---

## Your Interaction with SOC

### You're Notified When

- 🔴 **Critical threat** detected (immediate notification)
- 🟡 **Suspicious activity** needs your input (within 5 min)
- 🟢 **Threat mitigated** automatically (logged for your review)
- 📋 **Compliance report** ready (weekly/monthly)

### Response Options

```
SOC: "Admin login from Shanghai at 3 AM (unusual)."
You can:
  A) "I'm traveling in Shanghai, approve this" → Approved, logged
  B) "That's not me. Investigate." → SOC continues investigation
  C) "Block this login" → Account locked immediately
```

### Escalation Path

```
Automated Response (immediate)
  ↓ (if needed)
SOC Triage (5-15 minutes)
  ↓ (if needed)
Incident Response Team (ongoing)
  ↓ (if needed)
Legal/Compliance (breach notification)
```

---

## Compliance & Audit Ready

SOC monitoring helps you meet standards:

**GDPR**
- ✅ Personal data access logged
- ✅ Unauthorized access detected + blocked
- ✅ Breach notification process automated
- ✅ Full audit trail for investigations

**ISO 27001**
- ✅ Intrusion detection system in place
- ✅ Incident response procedures documented
- ✅ Security monitoring 24/7
- ✅ Audit logs retained for compliance

**SOC 2**
- ✅ Access controls verified
- ✅ Monitoring and alerting working
- ✅ Incident response tested
- ✅ Security incidents documented

**AI Act (EU)**
- ✅ AI system decisions logged
- ✅ Model transparency available
- ✅ Human oversight documented
- ✅ Audit trail complete

---

## Dashboard Example

```
FORGE Security Dashboard

Status: All Clear ✅

Active Threats: 0
Blocked Attempts: 3 (last 24h)
Investigation Queue: 0

Last 24 Hours:
  ├── Total Events: 1,247
  ├── Flagged Anomalies: 12
  ├── False Positives: 9
  ├── Real Threats: 3 (all blocked)
  └── Response Time (avg): 6 minutes

Threat Levels:
  🔴 Critical: 0
  🟡 High: 0
  🟢 Medium: 3 (mitigated)
  ⚪ Low: 9 (monitored)

Recent Actions:
  ├── 2026-06-06 22:15 - Deployment blocked (unsigned)
  ├── 2026-06-06 14:32 - Data access rate-limited (verified job)
  ├── 2026-06-06 03:47 - Admin account locked (brute force)
  └── 2026-06-05 18:22 - Failed login blocked
```

---

## What You Do

**Day to Day:**
- Use FORGE normally
- Receive notifications if something suspicious happens
- Respond to SOC alerts when asked (usually <1 min)

**Incident Investigation:**
- SOC handles detection and initial response
- You provide context ("Is this expected?")
- SOC handles containment and remediation
- You implement fixes suggested by SOC

**Compliance Reviews:**
- SOC prepares audit logs
- You review with auditors
- Evidence trail shows governance worked

---

## Next Steps

1. **Read:** [Compliance Gates](./03-compliance-gates.md) — Security checks before deployment
2. **Read:** [Evidence-Backed Decisions](./05-evidence-backed-decisions.md) — What gets logged
3. **Read:** [Responding to Security Findings](../03-guides/05-responding-to-security-findings.md) — How to act on alerts

**Questions?** Check [FAQ](../04-reference/03-faq.md) or contact security team.