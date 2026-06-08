---
title: "Setting Up Pre-Commit Security Hooks"
---

**TL;DR** — Add automatic security checks to your Git commits. Catch secrets, vulnerabilities, and compliance issues before they reach FORGE. 2-3 minute setup.

---

## 30-Second Summary

Pre-commit hooks run before code is committed. They scan for hardcoded secrets (API keys, passwords), vulnerable dependencies, and compliance issues. Setup takes one command.

---

## Why This Matters

**Without hooks:**
```
You commit code
  → Code has hardcoded API key
    → FORGE catches it
      → Build fails
        → You have to fix + recommit
        → Wasted time
```

**With hooks:**
```
You commit code with API key
  → Pre-commit hook catches it
    → Blocks commit
    → You fix immediately
    → Commit succeeds
    → No wasted time
```

---

## Installation (All Platforms)

### Step 1: Install pre-commit (one-time)

**macOS / Linux:**
```bash
brew install pre-commit
# or
pip install pre-commit
```

**Windows:**
```bash
pip install pre-commit
```

**Verify:**
```bash
pre-commit --version
# Should output: pre-commit X.Y.Z
```

### Step 2: Create `.pre-commit-config.yaml` in your repo

Go to your FORGE project root and create:

```bash
cd /path/to/your/forge/project
touch .pre-commit-config.yaml
```

### Step 3: Add FORGE Security Configuration

Copy this into `.pre-commit-config.yaml`:

```yaml
# FORGE Pre-Commit Security Hooks
# Runs automatically before each commit

repos:
  # Scan for secrets (API keys, passwords, tokens)
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets
        name: "Scan for hardcoded secrets"
        entry: detect-secrets scan
        language: python
        stages: [commit]
        args: ['--baseline', '.secrets.baseline']

  # Check for vulnerable dependencies
  - repo: https://github.com/gitpython-developers/GitPython
    rev: 3.1.29
    hooks:
      - id: check-dependencies
        name: "Check for vulnerable npm packages"
        entry: npm audit
        language: node
        stages: [commit]
        files: package.json

  # Lint and security checks
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: check-added-large-files
        name: "Check for large files"
        args: ['--maxkb=1000']
      - id: check-case-conflict
        name: "Check for case conflicts"
      - id: check-merge-conflict
        name: "Check for merge conflicts"
      - id: detect-private-key
        name: "Detect private keys"
      - id: end-of-file-fixer
        name: "Fix end of file"
      - id: trailing-whitespace
        name: "Fix trailing whitespace"

  # Code quality
  - repo: https://github.com/psf/black
    rev: 23.3.0
    hooks:
      - id: black
        name: "Format Python with Black"
        language_version: python3

  # Type checking (if using TypeScript)
  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v8.40.0
    hooks:
      - id: eslint
        name: "Lint JavaScript/TypeScript"
        files: \.(js|jsx|ts|tsx)$
        types: [file]
        args: ['--fix']
```

### Step 4: Initialize Pre-Commit

```bash
pre-commit install

# Output should be:
# pre-commit installed at .git/hooks/pre-commit
```

### Step 5: (Optional) Run Against All Files

```bash
# Check your existing code
pre-commit run --all-files

# This will show any issues in current code
# Fix them, then commit
```

---

## How It Works

### Normal Git Workflow (with hooks)

```bash
# Make changes
nano src/auth.ts
# (add code)

# Stage changes
git add src/auth.ts

# Try to commit
git commit -m "Add OAuth integration"

# Hooks run automatically ✅
# [1/5] Scan for hardcoded secrets... ✅ OK
# [2/5] Check for vulnerable dependencies... ✅ OK
# [3/5] Check file size... ✅ OK
# [4/5] Format with Black... ✅ OK
# [5/5] Lint with ESLint... ✅ OK

# Commit succeeds
# [main abc1234] Add OAuth integration
```

### If a Hook Catches an Issue

```bash
git commit -m "Add new feature"

# Hooks run...
# [1/5] Scan for secrets... ❌ FAILED

# Error output:
# Potential secret detected: Line 45 in config.ts
# Found: API_KEY = "sk_live_xyz123..."
# 
# This looks like a real secret. Commit blocked.
# 
# Fix:
# 1. Move secret to .env file
# 2. Add .env to .gitignore
# 3. Try commit again

# You fix it
nano config.ts  # Remove hardcoded key
nano .env       # Add key to env file
git add src/config.ts .env
git commit -m "Add OAuth integration (secrets in .env)"

# Hooks run again and pass ✅
```

---

## What Each Hook Does

### 1. Secret Scanner
**Purpose:** Finds hardcoded secrets (API keys, passwords, tokens)

```bash
# ✅ Good (secret in .env):
API_KEY = process.env.OAUTH_KEY

# ❌ Bad (secret hardcoded):
API_KEY = "sk_live_XXXXXXXXXXXX"
# Hook blocks this!
```

### 2. Dependency Vulnerability Scanner
**Purpose:** Checks npm/pip packages for known vulnerabilities

```bash
# If a package has a CVE:
npm install outdated-package@1.0.0
git add package.json
git commit -m "Add package"

# Hook runs: npm audit
# ❌ Outdated-package 1.0.0 has CVE-2024-1234
# Commit blocked!

# Solution:
npm install outdated-package@latest
git add package.json
git commit -m "Add package (fixed version)"
# ✅ Pass
```

### 3. Large File Check
**Purpose:** Prevents committing files >1MB

```bash
# If you accidentally try to commit a large file:
cp /large/video.mp4 ./videos/  # 500MB file
git add videos/video.mp4
git commit -m "Add video"

# ❌ File too large (500MB > 1MB limit)
# Commit blocked!

# Solution: Use Git LFS instead
git lfs install
git lfs track "*.mp4"
git add .gitattributes videos/video.mp4
git commit -m "Add video (via LFS)"
# ✅ Pass
```

### 4. Code Formatting (Black)
**Purpose:** Auto-formats Python code consistently

```bash
# Your Python code:
def add(a,b):
  return a+b

# You commit
git add auth.py
git commit -m "Add function"

# Hook runs: Black formatter
# Auto-fixes to:
def add(a, b):
    return a + b

# Commit succeeds ✅
```

### 5. Linting (ESLint)
**Purpose:** Catches JavaScript/TypeScript issues

```bash
# Your TypeScript code:
let x = 5;  // Should use const
console.log(x)

# You commit
git commit -m "Add variable"

# Hook runs: ESLint
# ❌ Use const instead of let
# ❌ 'x' defined but never reassigned
# Commit blocked!

# You fix:
const x = 5;
git add app.ts
git commit -m "Add variable"
# ✅ Pass
```

---

## Troubleshooting

### "Hook blocked my commit. How do I bypass it?"

You *can* bypass hooks, but you shouldn't need to:

```bash
# Force commit (not recommended)
git commit -m "message" --no-verify

# Instead, fix the issue and commit normally
# This teaches FORGE about your code too!
```

### "I keep getting false positives on the secret scanner"

Create `.secrets.baseline`:

```bash
# Tell detect-secrets to ignore certain patterns
detect-secrets scan > .secrets.baseline

# Edit .secrets.baseline to remove false positives
# Then hooks will ignore them in future
```

### "A dependency failed the vulnerability check but we need it"

Document the exception:

```yaml
# In .pre-commit-config.yaml
- id: check-dependencies
  name: "Check npm packages"
  args: ['--audit-level=high']  # Allow medium vulns
```

Then ticket it: "We know about this vuln. Plan to upgrade next sprint."

### "Hooks are running too slowly"

Disable slow hooks for now:

```yaml
# Comment out slow checks
# - repo: https://github.com/psf/black
#   hooks:
#     - id: black
#       exclude: tests/
```

Optimize later when you have time.

---

## Best Practices

1. **Use the same hooks for your whole team**
   - Commit `.pre-commit-config.yaml` to git
   - Everyone runs same checks
   - Consistency!

2. **Update hooks regularly**
   ```bash
   pre-commit autoupdate
   git add .pre-commit-config.yaml
   git commit -m "Update pre-commit hooks"
   ```

3. **Document why rules exist**
   ```yaml
   # Detect-secrets: Catches hardcoded API keys
   # These should be in .env file, not code
   ```

4. **Make exceptions intentional**
   ```bash
   # If you MUST bypass (rare), document why
   git commit -m "Skip hooks: XYZ reason" --no-verify
   ```

5. **Evolve hooks as team learns**
   - After incident: "Add check for this"
   - After pattern: "Automate this check"
   - Hooks improve over time

---

## Recommended Setup

For most teams, use this minimal setup:

```yaml
repos:
  # Secrets (must-have)
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.4.0
    hooks:
      - id: detect-secrets

  # Vulnerable dependencies (must-have)
  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v8.40.0
    hooks:
      - id: eslint

  # Formatting (nice-to-have)
  - repo: https://github.com/psf/black
    rev: 23.3.0
    hooks:
      - id: black
```

This covers:
- ✅ Security (secrets + vulns)
- ✅ Code quality (formatting)
- ⏱️ Fast (runs in <10 seconds)

---

## Next Steps

1. **Install pre-commit hooks now** (2 min setup)
2. **Commit to your team's repo** (so everyone uses them)
3. **See [Responding to Security Findings](./05-responding-to-security-findings.md)** — What to do if issues are found

**Questions?** Check [FAQ](../04-reference/03-faq.md) or run `pre-commit --help`.