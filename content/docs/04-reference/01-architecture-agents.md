---
title: "Architecture & Agents: High-Level Overview"
---

**TL;DR** — FORGE is powered by specialized AI agents. Each agent handles one domain (code, tests, design, compliance). They work together, learn from your feedback, and get smarter over time.

---

## 30-Second Summary

FORGE isn't one AI. It's a team of specialized agents: code generation, testing, design, security, compliance. Each one is an expert. They collaborate, handoff work, and learn from your decisions.

---

## The Agent Architecture

```
Your Feature Request
  ↓
┌─────────────────────────────────────┐
│ FORGE Orchestrator                  │
│ (Coordinates all agents)            │
└──────────────┬──────────────────────┘
               ↓
       ┌───────┴───────┬──────────────┬──────────┐
       ↓               ↓              ↓          ↓
    ┌──────┐    ┌──────────┐   ┌─────────┐  ┌────────┐
    │ Code │    │  Test    │   │ Design  │  │ Comply │
    │Agent │    │  Agent   │   │ Agent   │  │ Agent  │
    └──────┘    └──────────┘   └─────────┘  └────────┘
       │              │             │           │
       ├──────────────┴─────────────┴───────────┤
       ↓
    [Integration & Quality Checks]
       ↓
    [Compliance Gates]
       ↓
    [Learning Feedback Loop]
       ↓
    [Output: Complete Build]
```

---

## The Agents

### 1. Code Generation Agent

**Job:** Write production-ready code

**Input:** Feature description + existing codebase patterns

**Output:** 
- Backend API endpoints
- Frontend components
- Database migrations
- TypeScript types

**Example:**
```
Input: "Add password reset via email"

Output:
├── Backend: POST /auth/password-reset
├── Backend: POST /auth/password-reset/confirm
├── Frontend: ResetForm component
├── Database: password_reset_tokens table
└── Types: ResetRequest, ResetConfirm interfaces
```

**How it learns:**
- You correct code style → learns your conventions
- You request error handling → includes it next time
- You suggest optimization → remembers pattern

---

### 2. Test Generation Agent

**Job:** Write comprehensive tests covering edge cases

**Input:** Code from Code Agent + test patterns from team

**Output:**
- Unit tests (individual functions)
- Integration tests (parts working together)
- End-to-end tests (full workflows)
- Edge case coverage

**Example:**
```
Input: [Login form code]

Output:
├── Unit Tests
│   ├── validateEmail() with valid/invalid inputs
│   ├── hashPassword() with various lengths
│   └── (15 more unit tests)
├── Integration Tests
│   ├── Signup + Login workflow
│   ├── Email verification + access grant
│   └── (5 more integration tests)
└── E2E Tests
    ├── User flow: Signup → Verify → Login → Dashboard
    └── (3 more E2E tests)

Coverage: 87%
```

**How it learns:**
- You request test for specific scenario → adds to library
- You suggest test structure → uses next time
- You mark test as redundant → removes similar tests

---

### 3. Design Agent

**Job:** Generate UI components matching design system

**Input:** Feature description + design tokens + component library

**Output:**
- React/Vue/Angular components
- Storybook stories (interactive documentation)
- Responsive designs (mobile, tablet, desktop)
- Accessibility built-in

**Example:**
```
Input: "Modal for deleting account"

Output:
├── Modal.tsx (component code)
├── Modal.stories.tsx (Storybook - 8 variants)
├── Modal.test.tsx (component tests)
├── Accessibility audit
│   ├── Keyboard navigable ✅
│   ├── Screen reader friendly ✅
│   └── Color contrast adequate ✅
└── Responsive tests
    ├── Mobile (375px) ✅
    ├── Tablet (768px) ✅
    └── Desktop (1920px) ✅
```

**How it learns:**
- You approve design → patterns saved
- You correct colors → learns new palette subset
- You request animation → includes in future modals

---

### 4. Compliance Agent

**Job:** Verify security, fairness, performance, accessibility

**Input:** Generated code + security rules + compliance standards

**Output:**
- Security scan results (vulnerabilities, secrets)
- Test coverage report
- Accessibility audit (WCAG)
- Performance metrics
- Fairness analysis
- Legal compliance tags

**Example:**
```
Input: [Complete generated code]

Output - 7 Gates:
├─ Security: ✅ PASS (no vulns, no secrets)
├─ Coverage: ✅ PASS (87% >80%)
├─ Accessibility: ✅ PASS (WCAG AA)
├─ Performance: ✅ PASS (bundle +12KB)
├─ Fairness: ✅ PASS (no bias)
├─ Design: ✅ PASS (tokens used)
└─ Legal: 🟢 CLEAR (GDPR compliant)
```

**How it learns:**
- You approve exception → understands context
- You request higher standard → raises threshold
- You explain trade-off → learns reasoning

---

### 5. Documentation Agent

**Job:** Generate API docs, setup guides, README

**Input:** Code + naming conventions + doc templates

**Output:**
- API endpoint documentation
- Setup/installation guide
- Troubleshooting guide
- Configuration options
- Examples

**Example:**
```
Input: [OAuth integration code]

Output:
├── API.md (endpoint docs)
├── SETUP.md (installation steps)
├── CONFIG.md (environment variables)
├── EXAMPLES.md (code snippets)
└── TROUBLESHOOTING.md (common issues)
```

---

## Agent Collaboration

### Handoff Pattern

```
Request: "Add 2FA"

Step 1: Code Agent
  ├─ Writes backend endpoints
  ├─ Writes database migrations
  └─ Hands off to Test Agent

Step 2: Test Agent
  ├─ Writes tests for code
  ├─ Achieves 85% coverage
  └─ Hands off to Design Agent

Step 3: Design Agent
  ├─ Writes UI component
  ├─ Writes Storybook stories
  └─ Hands off to Compliance Agent

Step 4: Compliance Agent
  ├─ Scans for vulnerabilities
  ├─ Audits accessibility
  ├─ Checks performance
  └─ Approves or blocks (7 gates)

Step 5: Documentation Agent
  ├─ Writes API docs
  ├─ Writes setup guide
  └─ Completes build

Result: Ready for human review
```

### Communication

Agents communicate through:
- **Intermediate representations** (AST, type definitions)
- **Shared context** (team conventions, patterns)
- **Quality gates** (handoff only if standards met)

If Code Agent violates type safety, Test Agent catches it. If Test Agent has gaps, Compliance Agent flags it.

---

## Learning System

### Feedback Loops

```
Your Feedback
  ↓
Agent learns pattern
  ↓
Next build applies pattern
  ↓
Less feedback needed
  ↓
Pattern refined over time
```

### Example: Learning to Use Your API Client

**Iteration 1:**
```
You: "Use ApiClient instead of fetch"
Agent learns: "In this codebase, use ApiClient for HTTP"
```

**Iteration 2:**
```
Code Agent generates:
import { ApiClient } from '../utils/api';
const response = await ApiClient.post('/users', data);
// Already using ApiClient! No feedback needed
```

**Iteration 3:**
```
Next feature request:
FORGE generates everything with ApiClient
Zero feedback needed
Team efficiency: 10x faster
```

---

## Skill Capture

When you provide feedback, agents capture skills:

```
Your Feedback               Agent Learns
─────────────────────────────────────────────────────
"Always handle errors"  →  Try/catch pattern for async
"Use our colors"        →  Primary-500 from design tokens
"Test edge cases"       →  Generate tests for boundary conditions
"Add loading states"    →  Include UI feedback for async operations
"Document params"       →  Add JSDoc for function arguments
```

Skills are stored as:
- **Code patterns** (import/usage examples)
- **Decision rules** (if situation X, do Y)
- **Quality standards** (what passes review)

---

## High-Level Data Flow

```
┌─ Codebase Analysis
│  ├─ Understand existing patterns
│  ├─ Extract conventions
│  └─ Learn team standards
│
├─ Feature Request (Your input)
│
├─ Generation Phase
│  ├─ Code Agent (writes code)
│  ├─ Test Agent (writes tests)
│  ├─ Design Agent (writes UI)
│  └─ Docs Agent (writes documentation)
│
├─ Compliance Phase
│  ├─ Security scan
│  ├─ Performance check
│  ├─ Accessibility audit
│  ├─ Fairness analysis
│  └─ Legal review
│
├─ Integration Phase
│  ├─ Merge all components
│  ├─ Verify no conflicts
│  └─ Package for review
│
├─ Human Review
│  ├─ Product → Does it solve problem?
│  ├─ Engineer → Is code well-structured?
│  ├─ Designer → Does it match system?
│  └─ QA → Are tests comprehensive?
│
├─ Feedback Capture
│  ├─ Store corrections as skills
│  ├─ Update learning models
│  └─ Improve baseline
│
└─ Output
   ├─ Pull request ready for merge
   ├─ All compliance gates passed
   ├─ Full audit trail
   └─ Skills learned for next build
```

---

## Not in Scope

What FORGE agents don't do:

- ❌ Decide **what** to build (humans do)
- ❌ Make **trade-off** decisions (humans do)
- ❌ Override **compliance** (humans can, but with approval)
- ❌ Access **production** directly (all changes go through review)
- ❌ Deploy without **human decision** (gated deployment)

---

## Performance Characteristics

### Build Speed

```
Small feature (form + tests + docs): 1-2 hours
Medium feature (API + UI + tests + docs): 2-4 hours
Large feature (complex domain logic): 4-6 hours

Parallel execution:
├─ Code Agent: 30 min
├─ Test Agent: 20 min (while Code Agent works)
├─ Design Agent: 25 min (while Code Agent works)
├─ Docs Agent: 15 min (while others work)
├─ Compliance: 10 min (final pass)
└─ Total: ~1-2 hours (parallel, not sequential)
```

### Quality Output

```
Code quality: Production-ready
├─ No syntax errors (verified by linter)
├─ Full type safety (TypeScript)
├─ Follows conventions (team patterns)
└─ Tested thoroughly (85%+ coverage)

Test coverage: 85-95%
├─ Happy path: 100%
├─ Error cases: 90%
├─ Edge cases: 70%
└─ Complexity cases: 60%
```

---

## Customization Points

FORGE agents can be customized:

| Agent | Customizable Aspects |
|-------|----------------------|
| **Code** | Language, framework, style, error handling |
| **Test** | Framework, coverage threshold, test approach |
| **Design** | Framework (React/Vue/Angular), design system tokens |
| **Compliance** | Gate thresholds, security rules, standards (GDPR/AI Act/etc) |
| **Docs** | Format (Markdown/HTML), detail level, examples |

---

## Next Steps

1. **Read:** [Governed Autonomy](../02-concepts/01-governed-autonomy.md) — How agents fit into the system
2. **Read:** [Self-Improving Agents](../02-concepts/02-self-improving-agents.md) — How agents learn
3. **Try:** [Running Your First Build](../03-guides/01-running-your-first-build.md) — See agents in action

**Questions?** Check [FAQ](./03-faq.md) or ask technical lead.