---
title: "Tools & Tech Stack: What Powers FORGE"
---

**TL;DR** — FORGE uses industry-standard tools combined with custom agents. You don't need to know all this to use FORGE, but it helps understand what's happening under the hood.

---

## 30-Second Summary

Backend is Claude + custom orchestration. Frontend uses React. Code generation uses AST parsing and template systems. Security uses OWASP standards. All modular and replaceable.

---

## Core Components

### AI Models

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Code Generation** | Claude 3.5 Sonnet | Generates production code |
| **Test Generation** | Claude 3.5 Sonnet | Writes comprehensive tests |
| **Design System** | Claude 3.5 Sonnet + Vision | Generates accessible UI |
| **Compliance Analysis** | Claude 3.5 Sonnet | Audits security, fairness, performance |
| **Learning System** | Fine-tuned embeddings | Captures team feedback as skills |

### Infrastructure

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Orchestration** | Python + custom agents | Coordinates agent handoffs |
| **Code Analysis** | AST parsing + tree-sitter | Understands existing code patterns |
| **Caching** | Redis | Speeds up repeated operations |
| **Database** | PostgreSQL | Stores builds, feedback, skills, audit trails |
| **Message Queue** | Celery + RabbitMQ | Handles long-running builds |
| **File Storage** | S3-compatible | Stores generated code, artifacts |

### Frontend

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Dashboard** | React + TypeScript | User interface |
| **UI Library** | Shadcn/ui | Accessible components |
| **State Management** | TanStack Query | Real-time updates |
| **Code Editor** | Monaco | View generated code |
| **Version Control** | GitHub API | Pull request integration |

---

## Code Generation Pipeline

### Input Processing

```
Feature Request (text)
  ↓
Parse natural language
  ↓
Extract requirements
  ├─ Must-haves (business logic)
  ├─ Should-haves (nice features)
  └─ Constraints (limits, requirements)
  ↓
Analyze existing codebase
  ├─ Extract patterns
  ├─ Learn naming conventions
  ├─ Understand architecture
  └─ Find similar examples
```

### Generation Phase

```
Context-aware generation
  ├─ Code Agent creates backend
  │  ├─ Analyzes database schema
  │  ├─ Generates REST endpoints
  │  ├─ Creates validation logic
  │  └─ Handles error cases
  │
  ├─ Design Agent creates UI
  │  ├─ Matches design tokens
  │  ├─ Ensures accessibility
  │  ├─ Generates responsive layouts
  │  └─ Creates Storybook stories
  │
  └─ Test Agent creates tests
     ├─ Unit tests for functions
     ├─ Integration tests for workflows
     ├─ E2E tests for user journeys
     └─ Edge case coverage
```

### Quality Gates

```
Static Analysis
  ├─ Syntax checking (eslint, pylint)
  ├─ Type checking (TypeScript)
  ├─ Linting (code style)
  └─ Code duplication detection

Security Analysis
  ├─ Dependency vulnerability scanning
  ├─ Secret detection
  ├─ OWASP vulnerability patterns
  └─ Input validation verification

Accessibility Analysis
  ├─ WCAG compliance checking
  ├─ Color contrast verification
  ├─ Keyboard navigation testing
  └─ Screen reader compatibility

Performance Analysis
  ├─ Bundle size calculation
  ├─ Runtime complexity estimation
  ├─ Database query optimization
  └─ Memory usage profiling
```

---

## Security Stack

### Compliance Scanning

| Standard | Tool | Coverage |
|----------|------|----------|
| **OWASP Top 10** | Custom rules + bandit | Injection, broken auth, XSS, etc |
| **GDPR** | Custom audit rules | Data handling, consent, deletion |
| **CCPA** | Custom audit rules | Privacy, opt-out, disclosure |
| **AI Act** | Custom audit rules | Explainability, human oversight |
| **CWE Top 25** | Semgrep | Common weakness enumeration |

### Scanning Tools

```
Language-specific scanners
├─ Python: bandit, semgrep
├─ JavaScript/TypeScript: ESLint, semgrep
├─ SQL: sqlchecker, parameterization audit
└─ Infrastructure: tfsec (Terraform), kube-bench (Kubernetes)

Dependency scanning
├─ npm audit (JavaScript)
├─ pip audit (Python)
├─ cargo audit (Rust)
└─ Maven Dependency Check (Java)

Secret scanning
├─ detect-secrets
├─ git-secrets
└─ TruffleHog
```

### SOC Tools

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **IDS/IPS** | Suricata + custom rules | Network intrusion detection |
| **SIEM** | ELK stack (Elasticsearch) | Security event logging |
| **UBA** | Custom anomaly detection | User behavior analysis |
| **Incident Response** | PagerDuty integration | On-call alerting |

---

## Testing Stack

### Unit Testing

```
JavaScript/TypeScript
├─ Jest (framework)
├─ React Testing Library (React components)
└─ Supertest (API endpoints)

Python
├─ pytest (framework)
├─ unittest (standard library)
└─ moto (AWS mocking)
```

### Integration Testing

```
├─ Database: Testcontainers
├─ APIs: Prism (mock servers)
├─ Message queues: LocalStack
└─ Caching: Redis test container
```

### E2E Testing

```
├─ Selenium (cross-browser)
├─ Cypress (fast, developer-friendly)
└─ Playwright (multi-browser)
```

### Coverage Tools

```
├─ Coverage.py (Python)
├─ Istanbul/nyc (JavaScript)
└─ Custom tracers (other languages)
```

---

## Design System Integration

### Token Management

```
Design tokens (JSON/YAML)
  ├─ Colors, typography, spacing
  ├─ Shadows, border-radius, zIndex
  └─ Animations, transitions

Token generation targets
├─ CSS variables
├─ Tailwind config
├─ Styled-components
├─ MUI theme
└─ Figma tokens (sync)
```

### Component Generation

```
Template-based generation
├─ React: .tsx templates + styled-components
├─ Vue: .vue templates + CSS modules
├─ Angular: .ts + .html + .css
└─ Web components: .ts + slots

Storybook auto-generation
├─ Story variants (sizes, states)
├─ Controls (knobs for testing)
├─ Accessibility panel
└─ Visual regression baseline
```

---

## Deployment & Monitoring

### CI/CD Integration

| Tool | Purpose |
|------|---------|
| **GitHub Actions** | Run tests, build, deploy |
| **GitLab CI** | Alternative CI/CD |
| **Jenkins** | Enterprise CI/CD |
| **ArgoCD** | Continuous deployment (Kubernetes) |

### Monitoring

```
Application Monitoring
├─ DataDog / New Relic
├─ Prometheus (metrics)
├─ Grafana (dashboards)
└─ Jaeger (distributed tracing)

Error Tracking
├─ Sentry (error aggregation)
├─ Rollbar (error management)
└─ Custom error handlers

Logging
├─ ELK stack (Elasticsearch, Logstash, Kibana)
├─ CloudWatch (AWS)
├─ Datadog logs
└─ Structured logging (JSON)
```

---

## Learning System

### Skill Capture

```
Feedback → Embedding Creation → Vector Store

You: "Use const instead of let"
  ↓
Extract: Pattern (const vs let)
        Context (variable declaration)
        Frequency (how often seen)
  ↓
Create embedding: Vector representation
  ↓
Store in: Pinecone / Weaviate (vector DB)
  ↓
Retrieve in: Similar future scenarios
```

### Pattern Recognition

```
Input: New code generation request

Query skill store:
├─ Similar past features (vector similarity)
├─ Team conventions (extracted patterns)
├─ Recent feedback (latest skills)
└─ User preferences (stored settings)

Retrieve:
├─ 10 most similar past examples
├─ Associated team feedback
└─ Applied improvements

Generate:
├─ Use past successful patterns
├─ Apply team conventions
└─ Incorporate feedback automatically
```

---

## Data Persistence

### Build Artifacts

```
PostgreSQL
├─ Build metadata (ID, timestamp, status)
├─ Compliance results (gate pass/fail)
├─ Approval history (who approved when)
├─ User feedback (iterations)
└─ Audit trail (who did what)

S3 / Blob Storage
├─ Generated code files
├─ Test results
├─ Compliance reports (JSON)
├─ Diff snapshots
└─ Build logs
```

### Learning Data

```
Vector Database (Pinecone / Weaviate)
├─ Skill embeddings
├─ Pattern representations
├─ Context vectors
└─ Similarity indices

PostgreSQL
├─ Feedback log (what changed)
├─ Correction patterns (how to improve)
├─ User preferences (settings)
└─ Team conventions (learned norms)
```

---

## Scalability

### Horizontal Scaling

```
Load Balancer
  ├─ API servers (multiple replicas)
  ├─ Worker queue (Celery with multiple workers)
  └─ Database (PostgreSQL with replication)

Caching layers
├─ Redis (session, code patterns)
├─ CDN (static assets, documentation)
└─ Browser cache (frontend assets)

Async processing
├─ Build requests queued
├─ Processed by available workers
├─ Results cached for reuse
└─ Long operations don't block
```

### Performance Targets

```
Dashboard: <500ms load time
Build initiation: <1s response
Code viewing: <2s view in browser
Search skills: <100ms (via Redis)
Full build: 1-2 hours (depends on complexity)
```

---

## Integration Points

### GitHub

```
Authentication
├─ OAuth for user login
├─ Personal access token for CI/CD

Operations
├─ Create PRs (forge-bot account)
├─ Post comments (review feedback)
├─ Merge PRs (when approved)
├─ Push tags (version releases)
└─ Trigger workflows (CI/CD)
```

### Slack

```
Notifications
├─ Build started
├─ Build completed
├─ Compliance gate failed
├─ Waiting for approval
├─ Deployed to production

Commands (optional)
├─ /forge build feature-name
├─ /forge approve
├─ /forge status
└─ /forge help
```

### Figma (Optional)

```
Design Tokens
├─ Export tokens from Figma
├─ Generate code from tokens
├─ Sync back to Figma
└─ One source of truth
```

---

## Tech Stack Summary

```
Frontend
├─ React + TypeScript
├─ Shadcn/ui components
├─ TanStack Query (data fetching)
└─ Monaco editor (code viewing)

Backend
├─ Python/FastAPI (API)
├─ Claude 3.5 Sonnet (AI)
├─ PostgreSQL (primary DB)
├─ Redis (caching, job queue)
└─ S3 (file storage)

AI/ML
├─ Claude (generation + analysis)
├─ Pinecone/Weaviate (vector store)
├─ OpenAI embeddings (skill encoding)
└─ Tree-sitter (code parsing)

Security
├─ Suricata (IDS)
├─ ELK stack (SIEM)
├─ Custom fraud detection
└─ HashiCorp Vault (secrets)

Deployment
├─ Kubernetes (orchestration)
├─ GitHub Actions (CI/CD)
├─ ArgoCD (GitOps)
└─ Terraform (infrastructure)

Monitoring
├─ Prometheus (metrics)
├─ Grafana (dashboards)
├─ Datadog (logs + monitoring)
└─ Sentry (error tracking)
```

---

## What You Need to Know

**For Product Managers:**
- FORGE uses AI to generate code + compliance checks
- Uses standard dev tools (GitHub, npm, etc.)
- Integrates with your workflow

**For Engineers:**
- Generated code uses best practices
- Passes security + performance gates
- Can be customized via feedback

**For Designers:**
- Design tokens are centralized
- Auto-generates accessible components
- Integrates with design system

**For QA:**
- Automated tests are comprehensive
- Security scans catch vulns pre-deployment
- Can run exploratory tests on builds

---

## Advanced Customization

If you need to customize FORGE:

- **Custom code templates:** Provide examples
- **Custom security rules:** Define in YAML
- **Custom design tokens:** Import from Figma/JSON
- **Custom tests:** Write test generators
- **Custom gates:** Add new compliance rules

(All require technical expertise—ask team lead)

---

## Next Steps

1. **Read:** [Architecture & Agents](./01-architecture-agents.md) — How pieces fit together
2. **Read:** [FAQ](./03-faq.md) — Common technical questions
3. **Experiment:** Run a build and see these systems in action

**Questions?** Check [FAQ](./03-faq.md) or ask technical lead.