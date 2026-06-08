---
title: "Self-Improving Agents: Feedback Loops & Skill Learning"
---

**TL;DR** — Every time you correct FORGE or approve a design, it learns. After 10-15 iterations on a pattern, FORGE anticipates your needs. Your AI teammate gets smarter each sprint without retraining.

---

## 30-Second Summary

FORGE captures your feedback as *skills*—reusable patterns your team uses. Over time, the baseline FORGE improves. New engineers see better code examples. New designers see consistent components. It's like your team's institutional knowledge, but accessible to everyone.

---

## How Learning Works

### Iteration 1: First Feature
```
You: "Add login with email + password validation"

FORGE: [Generates feature]

You review and provide feedback:
  - "Add 'show/hide password' toggle"
  - "Show inline validation messages"
  - "Use our brand color for inputs"

FORGE: [Makes changes, learns the pattern]
```

### Iteration 2: Similar Feature
```
You: "Add password reset"

FORGE: [Generates feature]
- Automatically includes show/hide toggle
- Automatically adds inline validation
- Automatically uses brand colors
- Automatically uses same error message pattern

You: [Need minimal corrections]
You: "Just make the success message green instead of blue"

FORGE: [Updates, learns]
```

### Iteration 3: Unrelated Feature
```
You: "Add profile settings"

FORGE: [Generates feature]
- Uses same input styling
- Uses same validation patterns
- Uses same colors
- Uses same success/error messaging

You: [Minimal corrections needed]
Result: Team-wide consistency, without a style guide document.
```

---

## The Feedback Loop

```
┌─────────────────────────────────────────┐
│ FORGE Generates Code                    │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│ You Review + Provide Feedback           │
│ (Design, performance, naming, UX)       │
└──────────────┬──────────────────────────┘
               │
               ↓ (Feedback = Skill)
┌─────────────────────────────────────────┐
│ FORGE Learns Pattern                    │
│ (Stores as reusable skill)              │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│ Next Build Uses Learned Skill           │
│ (Fewer corrections needed)              │
└─────────────────────────────────────────┘
```

Repeat: Compound learning effect emerges.

---

## Types of Skills FORGE Learns

### 1. **Code Style Skills**
```
Feedback 1: "Use const instead of let"
Feedback 2: "Use async/await instead of .then()"
Feedback 3: "Use camelCase for variables, snake_case for DB columns"

After 3-5 corrections: FORGE applies all consistently
```

### 2. **Component Pattern Skills**
```
Feedback 1: "Add loading state spinner"
Feedback 2: "Add error boundary"
Feedback 3: "Add accessibility labels"

After 3-5 corrections: All new components include these patterns
```

### 3. **UX Pattern Skills**
```
Feedback 1: "Show 'Saving...' state during API call"
Feedback 2: "Disable submit button while saving"
Feedback 3: "Show success toast notification"

After 3-5 corrections: FORGE includes entire pattern in new forms
```

### 4. **Design System Skills**
```
Feedback 1: "Use primary-500 for buttons, not primary-600"
Feedback 2: "Spacing is always multiples of 8px"
Feedback 3: "Typography: use Heading L for page titles"

After 3-5 corrections: All generated designs match system perfectly
```

### 5. **Performance Skills**
```
Feedback 1: "Lazy-load images below the fold"
Feedback 2: "Cache API responses for 5 minutes"
Feedback 3: "Split code into smaller chunks"

After 3-5 corrections: New code is optimized from the start
```

---

## Skill Capture Process

When you provide feedback:

```
Your Feedback          FORGE Captures              Learned Skill
────────────────────────────────────────────────────────────────
"Add error handling"   Context: API call           "Always wrap API calls
                       Your pattern: try/catch     with error handling"
                       Your message: "Failed to load data"

"Use our API client"   Context: HTTP requests      "Use team API client
                       Your pattern: custom lib    instead of fetch/axios"
                       Your benefit: logging, retry logic

"Truncate long text    Context: Text display      "Text fields >100 chars
with ellipsis"         Your pattern: CSS text     should truncate with
                       Your UX: "... (read more)" ellipsis"
```

FORGE stores these with context, so it applies them appropriately.

---

## Baseline Improvement

As skills accumulate, the FORGE baseline improves for *your entire team*:

**Month 1:**
- FORGE generates basic feature
- You provide 10 pieces of feedback
- FORGE learns 10 skills

**Month 2:**
- New feature request
- FORGE applies Month 1 skills
- You provide 3 pieces of feedback
- FORGE learns 3 new skills
- Velocity: 3x faster

**Month 3:**
- New feature request
- FORGE applies Month 1+2 skills
- You provide 1 piece of feedback
- FORGE learns 1 new skill
- Velocity: 10x faster

---

## Real Scenario: Button Component

### Day 1
```
You: "Create a reusable button component"

FORGE generates:
export const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
)

Your feedback:
  1. "Add disabled state styling"
  2. "Add loading spinner"
  3. "Add tooltip prop"
  4. "Add aria-label for accessibility"
  5. "Make size prop (small, medium, large)"

FORGE updates (5 corrections)
```

### Day 8 (week later)
```
You: "Create a card component"

FORGE generates:
export const Card = ({ title, content }) => (
  <div className="card">
    <h2>{title}</h2>
    <div>{content}</div>
  </div>
)

Your feedback:
  1. "Add onClick handler (make clickable cards)"
  2. "Add hover state"
  3. "Add size options"

FORGE updates (3 corrections)
FORGE already includes:
  ✓ Accessibility labels (learned from button)
  ✓ Disabled state (learned from button)
  ✓ Loading state (learned from button)
  ✓ Tooltip support (learned from button)
```

### Day 15 (second week)
```
You: "Create a form input component"

FORGE generates:
export const Input = ({ label, placeholder, onChange }) => (
  <input placeholder={placeholder} onChange={onChange} />
  <label>{label}</label>
)

Your feedback:
  1. "Add error state with message"

FORGE updates (1 correction)
FORGE already includes:
  ✓ All accessibility patterns (from button + card)
  ✓ All size options (from button + card)
  ✓ All state handling (from button + card)
  ✓ All styling patterns (from button + card)
```

By week 3, FORGE generates components that need almost no feedback.

---

## How This Compounds

### Team Growth Example

**Scenario:** You hire 3 new engineers.

**Without FORGE:**
- New engineers learn team patterns over 2-3 months
- Onboarding: code style guide, component patterns, naming conventions
- Senior engineer spends hours code reviewing

**With FORGE:**
- New engineers run FORGE on Day 1
- FORGE has all learned skills built in
- New engineers see best practices in generated code
- Senior engineer spends 15 minutes confirming patterns match

FORGE becomes your team's distributed expertise.

---

## Skill Management

### View Learned Skills
```
forge skills list

Learned Skills (Month: June 2026)
├── Code Style
│   ├── Use const not let (10 applications)
│   ├── Use async/await (15 applications)
│   └── camelCase variables (20 applications)
├── Component Patterns
│   ├── Include loading state (8 applications)
│   ├── Include error boundary (6 applications)
│   └── WCAG accessible (12 applications)
├── UX Patterns
│   ├── Show "Saving..." state (7 applications)
│   └── Success notifications (5 applications)
└── Performance
    ├── Lazy-load images (4 applications)
    └── Cache API responses (3 applications)
```

### Export Skills
```
forge skills export > team-skills.json
```

Share with other teams or new projects. Skills are portable.

### Override Skills
```
forge build feature-x --ignore-skill="use-const"
```

Sometimes you need exceptions. FORGE respects this and learns the context.

---

## Learning From Failures

FORGE also learns from what *doesn't work*:

```
You: "We tried lazy-loading images on mobile—actually hurt performance
      because network requests were slower than inline images. 
      Don't do this anymore."

FORGE: [Learns condition]
"Lazy-load images only on desktop connections. On mobile, inline."

Next build on mobile: FORGE doesn't lazy-load
Next build on desktop: FORGE lazy-loads
```

Feedback isn't just corrections. It's domain knowledge transfer.

---

## Collaboration Across Teams

### Scenario: Two Teams Use FORGE

**Team A (Web):**
- Learns 20 component patterns
- Learns mobile optimization skills
- Exports skills to shared library

**Team B (Mobile):**
- Imports Team A's skills
- Starts with baseline knowledge
- Adds 5 new patterns specific to iOS

Result: Team B moves 3x faster on Day 1 because they inherit Team A's learning.

---

## The Improvement Curve

```
Quality ↑
        │     ╱─── With Self-Learning
        │    ╱
        │   ╱
        │  ╱─── Manual (Plateaus quickly)
        │ ╱
        │ ╱─── Without Learning
        │╱__________________→ Time
        └─ Week 1, Month 1, Month 3, etc.
```

Manual teams plateau after a few months (ran out of improvements to make).  
Self-improving teams keep accelerating (learning from every decision).

---

## What Gets Learned

✅ **Code patterns** (style, error handling, optimization)  
✅ **Component patterns** (accessibility, states, sizing)  
✅ **UX patterns** (feedback, loading, success/error)  
✅ **Performance patterns** (caching, lazy-loading, optimization)  
✅ **Design patterns** (colors, spacing, typography)  
✅ **Naming conventions** (variables, functions, files)  
✅ **Testing patterns** (what to test, how to mock, assertions)  

❌ **NOT learned:**
- Requirements (humans define goals)
- Trade-off decisions (humans prioritize)
- Business logic (humans specify rules)

---

## Next Steps

1. **Read:** [Compliance Gates](./03-compliance-gates.md) — Quality standards FORGE enforces
2. **Read:** [Governed Autonomy](./01-governed-autonomy.md) — How learning fits into the system
3. **Try:** [Running Your First Build](../03-guides/01-running-your-first-build.md) — See learning in action

**Questions?** Check [FAQ](../04-reference/03-faq.md).