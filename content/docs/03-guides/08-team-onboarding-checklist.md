---
title: "Team Onboarding Checklist"
---

**TL;DR** — New team member? This checklist gets them productive with FORGE in 1 day. Access, setup, first build, done.

---

## 30-Second Summary

Day 1: Access dashboard + install tools. Day 2: First build + feedback. Day 3: Independent. This guide walks through the process.

---

## Pre-Arrival (Admin Only)

- [ ] Add team member to GitHub organization
- [ ] Create FORGE dashboard account
- [ ] Add to Slack channel (#forge-builds or similar)
- [ ] Send welcome email with dashboard link
- [ ] Assign onboarding buddy (someone on team)

---

## Day 1: Foundation (2-3 hours)

### Morning: Orientation

- [ ] Welcome meeting (15 min)
  - Overview: What is FORGE?
  - Governance model (autonomy + compliance)
  - Your first week

- [ ] Read documentation (45 min)
  - [ ] [What is FORGE](../01-getting-started/01-what-is-forge.md) (5 min)
  - [ ] [For your role](../01-getting-started/) (10 min)
    - Product manager? → For Product Managers
    - Engineer? → For Engineers
    - Designer? → For Designers
    - QA? → For QA/Testers
  - [ ] [Governed Autonomy](../02-concepts/01-governed-autonomy.md) (10 min)
  - [ ] [First Build Guide](../03-guides/01-running-your-first-build.md) (15 min)
  - [ ] Ask questions

### Late Morning: Environment Setup

- [ ] Install required tools (30 min)
  - [ ] npm/Node.js (if engineer)
  - [ ] Git (if engineer)
  - [ ] Pre-commit hooks (if engineer)
    - Follow: [Setting Up Security Hooks](../03-guides/02-setting-up-security-hooks.md)

- [ ] Access verification (15 min)
  - [ ] Can login to FORGE dashboard
  - [ ] Can access GitHub repo
  - [ ] Can run `npm install` (if engineer)
  - [ ] Have required permissions

### Afternoon: First Hands-On

- [ ] Access FORGE dashboard
  - [ ] Login: https://your-team.forge.dev/dashboard
  - [ ] Navigate: Builds → Recent Builds
  - [ ] Explore a completed build (see code, tests, compliance)

- [ ] Review existing builds (1 hour)
  - [ ] Look at 3 recent builds
  - [ ] Understand structure: code + tests + docs + compliance
  - [ ] Ask buddy: "Why did they approve this?"

- [ ] Read build evidence (30 min)
  - [ ] Follow: [Understanding Your Build Evidence](../03-guides/03-understanding-build-evidence.md)
  - [ ] Review compliance reports from recent builds
  - [ ] Ask: "What does this green checkmark mean?"

---

## Day 2: First Build (3-4 hours)

### Morning: Planning

- [ ] Choose a small feature (not critical path)
  - Examples:
    - PM: "Add a new field to existing form"
    - Engineer: "Refactor utility function"
    - Designer: "New button variant"
    - QA: "Improve test coverage for login"

- [ ] Write clear request (15 min)
  - What: Describe the feature in 1-2 sentences
  - Why: What problem does it solve?
  - Constraints: Any limits or requirements?

- [ ] Get buddy's approval (10 min)
  - "Does this look good?"
  - "Anything I'm missing?"

### Late Morning: Run Your First Build

- [ ] Submit build request (5 min)
  - Go to FORGE dashboard
  - Click "New Build"
  - Fill in your request
  - Click "Submit"

- [ ] Watch FORGE build (passive, 1.5-2 hours)
  - Grab coffee ☕
  - Read a concept doc while waiting
  - Monitor progress bar (should update every 5-10 min)

- [ ] Get notification when done
  - Email/Slack alert arrives
  - Build is ready for review

### Afternoon: Review & Iterate

- [ ] Review the generated code (30 min)
  - Look at PR files
  - Read the code
  - Does it make sense?

- [ ] Check compliance reports (20 min)
  - Follow: [Understanding Your Build Evidence](../03-guides/03-understanding-build-evidence.md)
  - Are all gates green?
  - Understand each report

- [ ] Make a decision (15 min)
  - **Option A:** Approve
    - "Looks good! Ship it."
    - Click "Approve" button
  - **Option B:** Request changes
    - "The button color should be X not Y"
    - FORGE updates and rebuilds
    - You review again
  - **Option C:** Reject
    - "Let's try a different approach"
    - Archive and start over

- [ ] If changes: Review again (30 min)
  - FORGE updates based on feedback
  - Read updated code
  - Approve or iterate again

---

## Day 3: Mastery (Independent Work)

### Consolidate Learning

- [ ] Run 1-2 more builds independently
  - No buddy needed
  - Apply what you learned
  - Build something useful

- [ ] Deep dive on your role
  - **If PM:** Read [For Product Managers](../01-getting-started/02-for-product-managers.md)
  - **If Engineer:** Read [For Engineers](../01-getting-started/03-for-engineers.md)
  - **If Designer:** Read [For Designers](../01-getting-started/04-for-designers.md)
  - **If QA:** Read [For QA/Testers](../01-getting-started/05-for-qa-testers.md)

- [ ] Understand team patterns
  - Ask: "What feedback do you usually give FORGE?"
  - Mimic patterns (naming, error handling, UX approach)
  - Learn the "team style"

- [ ] Join Slack channel
  - [ ] Introduce yourself
  - [ ] Ask any questions
  - [ ] Celebrate first build in channel

### By End of Day 3

- ✅ Can run FORGE builds independently
- ✅ Understand compliance gates
- ✅ Know how to approve/iterate
- ✅ Familiar with team patterns
- ✅ Productive on team

---

## Week 1: Depth & Contribution

### Days 4-5: Advanced Topics

- [ ] **If Engineer:**
  - [ ] Read: [Self-Improving Agents](../02-concepts/02-self-improving-agents.md)
  - [ ] Read: [Security Monitoring](../02-concepts/04-security-monitoring.md)
  - [ ] Set up pre-commit hooks
  - [ ] Make first code review of someone's FORGE build
  - [ ] Contribute feedback that FORGE learns from

- [ ] **If Designer:**
  - [ ] Read: [Design Tokens](../02-concepts/01-governed-autonomy.md)
  - [ ] Learn team's design system
  - [ ] Read: [Integrating Design Tokens](../03-guides/07-integrating-design-tokens.md)
  - [ ] Approve design compliance in a build

- [ ] **If QA:**
  - [ ] Read: [Compliance Gates](../02-concepts/03-compliance-gates.md)
  - [ ] Review test coverage in builds
  - [ ] Run exploratory tests on a completed build
  - [ ] Find 1-2 edge cases not covered

- [ ] **If PM:**
  - [ ] Run 3-5 builds
  - [ ] See how feedback loop works
  - [ ] Understand trade-offs (performance vs. features)
  - [ ] Plan feature requests for next sprint

### Days 5-7: Real Project Work

- [ ] Contribute to real feature
  - Not just learning builds
  - Request something needed for current sprint
  - See it go through full process
  - Help review and approve

- [ ] Ask questions
  - "Why did we choose X over Y?"
  - "What's the difference between these two gates?"
  - "How do you usually structure this?"

- [ ] Provide feedback
  - FORGE builds = learning opportunity
  - Your fresh eyes catch things
  - Share ideas with team

---

## Checklist for Buddy/Lead

As the person onboarding a team member:

- [ ] **Day 1 Morning**
  - [ ] Meet with new person
  - [ ] Give overview (15 min)
  - [ ] Provide dashboard login + credentials
  - [ ] Ensure they can access GitHub

- [ ] **Day 1 Late Morning**
  - [ ] Verify environment setup
  - [ ] Do pair check: "Can you run npm install?"
  - [ ] Verify pre-commit hooks installed

- [ ] **Day 1 Afternoon**
  - [ ] Show them a recent build
  - [ ] Explain what each section means
  - [ ] Walk through compliance gates
  - [ ] Answer questions

- [ ] **Day 2**
  - [ ] Help pick first feature to build
  - [ ] Review their request (looks good?)
  - [ ] Check in during build (3 hour mark)
  - [ ] Review their build together
  - [ ] Help with approval decision

- [ ] **Day 3**
  - [ ] Let them run builds independently
  - [ ] Spot-check their decisions
  - [ ] Celebrate first independent build
  - [ ] Introduce to rest of team

---

## Common Questions During Onboarding

**Q: "Why do all these compliance checks?"**  
A: They catch issues early (security, accessibility, performance). Saves time later.

**Q: "Can I skip reading docs and just learn by doing?"**  
A: Some, yes. But read the guides first—they save 10x more time than figuring it out.

**Q: "What if I don't like how FORGE does something?"**  
A: Give feedback! That's how FORGE learns. Your patterns become team patterns.

**Q: "How do I know if I'm doing it right?"**  
A: Ask your buddy. They'll review your builds for first week. Then you'll feel confident.

**Q: "What if I break something?"**  
A: FORGE safety nets catch 99% of issues before production. Very hard to actually break something.

---

## Onboarding Success Metrics

By end of week 1, new person should:

- ✅ Run 5+ FORGE builds independently
- ✅ Understand what each compliance gate checks
- ✅ Provide meaningful feedback (not just "looks good")
- ✅ Contribute to team decisions (PR reviews, approvals)
- ✅ Ask smart questions about trade-offs
- ✅ Feel comfortable asking for help
- ✅ Excited about how FORGE speeds up work

---

## Resources

### Reading by Role

**All Roles:**
- [ ] What is FORGE (5 min)
- [ ] Governed Autonomy (10 min)
- [ ] First Build Guide (15 min)

**For Engineers:**
- [ ] For Engineers guide (15 min)
- [ ] Self-Improving Agents (15 min)
- [ ] Security Monitoring (15 min)
- [ ] Pre-Commit Hooks setup (10 min)

**For Designers:**
- [ ] For Designers guide (15 min)
- [ ] Compliance Gates (20 min)
- [ ] Design Tokens integration (15 min)

**For QA:**
- [ ] For QA/Testers guide (15 min)
- [ ] Understanding Build Evidence (20 min)
- [ ] Compliance Gates (20 min)

**For Product Managers:**
- [ ] For Product Managers guide (15 min)
- [ ] Compliance Gates (20 min)
- [ ] Evidence-Backed Decisions (15 min)

### Dashboard Help

- FORGE Dashboard: https://your-team.forge.dev
- Docs: https://your-team.forge.dev/docs
- Support: #forge-support Slack channel
- Examples: Search "completed builds" for inspiration

---

## Week 2 & Beyond

### Ongoing Learning

- [ ] Review 1-2 builds per week (not just your own)
- [ ] Ask: "Why did they choose this approach?"
- [ ] Contribute ideas in team retros
- [ ] Help onboard next team member

### Level Up

- [ ] Advanced concepts ([Core Concepts](../02-concepts/))
- [ ] Specialized skills (security, performance, fairness)
- [ ] Mentor others on your team
- [ ] Propose improvements to FORGE workflows

---

## Next Steps for New Team Member

1. **Today:** Read What is FORGE + your role guide
2. **Tomorrow:** Run first build with buddy
3. **Day 3:** Run builds independently
4. **This week:** Contribute to real project work
5. **Next week:** Help onboard next person

Welcome to the team! 🚀

---

## Need Help?

- **Dashboard question?** → Ask in #forge-support
- **Build not working?** → Check [FAQ](../04-reference/03-faq.md)
- **Want to understand a concept?** → Read [Core Concepts](../02-concepts/)
- **Specific task?** → Check [Guides](../03-guides/)

You've got this!