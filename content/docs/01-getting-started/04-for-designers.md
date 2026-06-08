---
title: "For Designers: Approve Designs with Evidence"
---

**TL;DR** — FORGE doesn't just code features—it generates user interfaces with accessibility, performance, and design system compliance baked in. You review not just pixels, but data: Is it accessible? Does it perform? Does it match our brand?

---

## 30-Second Summary

FORGE generates UI components that follow your design tokens and system. Instead of approving based on feel, you approve based on evidence: accessibility score, performance impact, design consistency, and user testing data.

---

## Your Workflow

### Step 1: Review the Design Proposal
FORGE generates:
- **Visual mockup** (component screenshot or interactive preview)
- **Accessibility audit** (WCAG compliance, color contrast, keyboard navigation)
- **Performance metrics** (bundle size impact, render time)
- **Design system compliance** (spacing, typography, color usage)
- **Responsive breakpoints** (mobile, tablet, desktop previews)
- **Component code** (React/Vue/Angular with Storybook)

**Example output:**
```
Feature: "New Checkout Flow"
├── Visual Design
│   ├── Desktop (1920px): [preview]
│   ├── Tablet (768px): [preview]
│   └── Mobile (375px): [preview]
├── Accessibility Report
│   ├── Color contrast: ✅ WCAG AAA (7:1)
│   ├── Keyboard nav: ✅ Full support
│   ├── Screen readers: ✅ Proper ARIA labels
│   └── Font size: ✅ Readable at 200% zoom
├── Performance
│   ├── Component size: 8.2KB (gzipped)
│   ├── Render time: 12ms (React)
│   └── Animation smoothness: 60fps
├── Design System
│   ├── Typography: ✅ Matches spec
│   ├── Spacing: ✅ Uses grid (8px)
│   ├── Colors: ✅ From palette
│   └── Interactions: ✅ Consistent with patterns
└── Storybook Link: [Interactive preview]
```

### Step 2: Review for Design Quality
Ask yourself:
- **Consistency** — Does this match our design system?
- **Usability** — Can users complete their task?
- **Accessibility** — Will everyone use this, including people with disabilities?
- **Performance** — Does it add bloat?
- **Responsiveness** — Does it work on all devices?

### Step 3: Approve or Iterate
**Option A: Approve**  
"Looks good. Approved for engineering review."  
→ Engineers see your sign-off

**Option B: Request Changes**  
"The button color should be primary-500, not primary-600."  
→ FORGE updates and re-audits

**Option C: Reject + Explain**  
"This violates our 'mobile-first' principle."  
→ FORGE learns the principle and applies it to future designs

---

## 5 Benefits for Designers

### 1. **Data-Driven Approval**
Instead of "I like it," you approve based on evidence: accessibility score, performance, consistency. Defends your decision in a meeting.

### 2. **Catch Accessibility Issues Early**
FORGE's accessibility audit flags WCAG violations before QA does. You fix design problems at design time, not test time.

### 3. **Consistent Design System Usage**
FORGE verifies typography, spacing, colors, and interaction patterns match your system. No more "why did they use that color?" conversations.

### 4. **Performance is Transparent**
See exactly how many kilobytes this component adds. Make informed trade-offs: "Beautiful but heavy" vs. "Simple but fast."

### 5. **Your Design Skills Multiply**
As you approve designs and provide feedback, FORGE learns your style guide. Future designs need less iteration.

---

## Common Scenarios

### Scenario 1: Color Contrast Fails
**FORGE output:**
```
Color Contrast Report
├── Button text (white on teal): 4.2:1 ratio
│   └── ⚠️ WCAG AA requires 4.5:1 for small text
└── Suggestion: Use teal-700 instead of teal-500
```

**Your choice:**
- **Approve suggestion** → FORGE updates, re-audits, resubmits
- **Override** → You mark it as approved exception (for audit trail)
- **Reject** → Request alternate color approach

### Scenario 2: Mobile Layout Breaks
**FORGE shows:** Mobile preview looks cramped.  
**You request:** "Increase vertical spacing on mobile by 50%."  
**FORGE does:** Updates component, checks it still passes performance budget, resubmits.

### Scenario 3: New Interaction Pattern
**You notice:** This component uses a hover interaction (inaccessible on touch).  
**You feedback:** "Use tap + long-press pattern per our mobile guidelines."  
**FORGE learns:** Future mobile components use tap/long-press, not hover.

---

## What the Evidence Tells You

### Accessibility Report
**Good sign:**
- ✅ WCAG AA or AAA (aim for AAA)
- ✅ Keyboard navigable (Tab key works)
- ✅ Screen reader compatible (proper ARIA)
- ✅ Color contrast 4.5:1 or higher

**Red flag:**
- ❌ WCAG A (below standard)
- ❌ No keyboard navigation
- ❌ Missing ARIA labels
- ❌ Color contrast below 3:1

### Design System Compliance
**Questions to ask:**
- Does it use only colors from the approved palette?
- Are spacing values multiples of 8px (or your grid)?
- Are typefaces from the typography system?
- Do interactive elements follow interaction patterns?

### Performance Report
**Typical values:**
- Gzipped component: 5-15KB is healthy
- Render time: <20ms is good
- Animation: 60fps (no jank)

**If values are high:**
- Could indicate unnecessary dependencies
- Might need to split component or lazy-load

---

## Collaboration Example

**Week 1: Checkout Button**
```
FORGE: [Generates new button component]
Report: "Accessibility: ✅ WCAG AAA, Performance: ✅ 2.2KB"

You: "Love it. Just one thing—make the hover state more 
     obvious for keyboard users (add focus ring)."
     
FORGE: [Updates, re-audits]
New report: "Focus ring added. Accessibility: ✅ WCAG AAA"

You: ✅ Approved
```

**Week 2: Modal Dialog**
```
FORGE: [Generates new modal]
Report: "Accessibility: ⚠️ WCAG AA, Focus trap missing"

You: "Fix the focus trap per our accessibility guidelines."

FORGE: [Adds focus trap, updates ARIA]
New report: "Accessibility: ✅ WCAG AAA, Focus trap: ✅"

You: ✅ Approved
```

By week 4, FORGE generates modals that already have proper focus traps.

---

## Tips for Effective Design Review

1. **Check accessibility first** — It's measurable and non-negotiable.
2. **Verify design system compliance** — Are the tokens actually used?
3. **Test responsiveness** — Walk through mobile → tablet → desktop.
4. **Review interactive states** — Hover, focus, active, disabled, loading.
5. **Consider performance** — Does this component pull in heavy dependencies?
6. **Document your feedback** — If you override FORGE's suggestion, explain why (audit trail).

---

## Storybook + Design System Integration

FORGE generates components with Storybook stories:

```
Component: Button
├── Variants
│   ├── Primary
│   ├── Secondary
│   ├── Danger
│   └── Disabled
├── Sizes
│   ├── Small
│   ├── Medium (default)
│   └── Large
├── States
│   ├── Default
│   ├── Hover
│   ├── Focus
│   ├── Active
│   └── Loading
└── Accessibility
    ├── Keyboard nav: ✅
    ├── Screen reader: ✅
    └── Color contrast: ✅
```

You can preview *all* combinations in one place. Test real interactions, not just mockups.

---

## What FORGE Automates (So You Don't)

- ✅ Generate components from tokens
- ✅ Run accessibility audits (WCAG)
- ✅ Measure performance impact
- ✅ Verify design system compliance
- ✅ Create Storybook stories
- ✅ Generate responsive mockups
- ✅ Document component API

**You focus on:** Decisions, trade-offs, brand integrity, usability testing feedback.

---

## Next Steps

1. **Read:** [Design Tokens Quick-Start](../03-guides/07-integrating-design-tokens.md) — Set up FORGE with your system
2. **Read:** [Compliance Gates](../02-concepts/03-compliance-gates.md) — Understand the accessibility audit
3. **Try:** [Running Your First Build](../03-guides/01-running-your-first-build.md) — See a design in action

**Questions?** Check [FAQ](../04-reference/03-faq.md) or reach out to the design lead.