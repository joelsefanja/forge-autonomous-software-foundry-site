---
title: "Publishing to npm: Phase 1 Packages"
---

**TL;DR** — FORGE can generate npm packages (design tokens, components, utilities). This guide shows you how to publish them and make them available to other projects.

---

## 30-Second Summary

After FORGE builds reusable components or design tokens, you can package them as npm modules and publish to your team's registry. Sharing code across projects, starting today.

---

## What Can Be Published

### 1. Design Tokens
```json
{
  "colors": {
    "primary": "#0066FF",
    "secondary": "#6B7280"
  },
  "spacing": [4, 8, 12, 16, 24, 32],
  "typography": {
    "heading1": { "size": "32px", "weight": 700 }
  }
}
```

### 2. Component Libraries
```
├── Button.tsx
├── Modal.tsx
├── Form.tsx
├── Card.tsx
└── (15+ more components)
```

### 3. Utilities
```
├── formatDate()
├── parseQuery()
├── useLocalStorage()
└── (common helpers)
```

All can be shared across projects via npm.

---

## Prerequisites

- Team npm registry set up (or npmjs.com account)
- Permission to publish (ask team lead)
- Build completed and approved
- Version number decided (semantic versioning)

---

## Step 1: Prepare for Publishing

### Check What FORGE Generated

```bash
cd your-forge-project

# List files to be published
ls -la src/

# Should see:
dist/
├── index.js          (CommonJS)
├── index.esm.js      (ES modules)
├── types.d.ts        (TypeScript types)
└── package.json      (metadata)
```

### Review package.json

```bash
cat package.json

# Should have:
{
  "name": "@yourteam/components",
  "version": "1.0.0",
  "description": "Reusable FORGE components",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/types.d.ts",
  "files": ["dist"],
  "repository": { "url": "..." },
  "license": "MIT"
}
```

---

## Step 2: Update Version Number

**Semantic versioning:** Major.Minor.Patch

```
Current: 1.0.0
├─ Major (1): Breaking changes
├─ Minor (0): New features (backward compatible)
└─ Patch (0): Bug fixes

Examples:
├─ Adding new component → 1.1.0
├─ Breaking API change → 2.0.0
├─ Bug fix → 1.0.1
```

### Update Version

**Option A: Manual**
```bash
# Edit package.json
nano package.json

# Change version from "1.0.0" to "1.1.0"
git add package.json
git commit -m "Bump version to 1.1.0"
```

**Option B: Using npm**
```bash
npm version minor        # 1.0.0 → 1.1.0
npm version major        # 1.0.0 → 2.0.0
npm version patch        # 1.0.0 → 1.0.1

# Auto-commits and tags
```

---

## Step 3: Configure Team Registry

If using private team registry:

```bash
# Create .npmrc file in your project
nano .npmrc

# Add:
@yourteam:registry=https://npm.yourteam.com/
//npm.yourteam.com/:_authToken=${NPM_TOKEN}
```

Or use npmjs.com (public):

```bash
# No special config needed
# Just make sure npm is logged in
npm login
# (enter username, password, 2FA code)
```

---

## Step 4: Build & Test Locally

```bash
# Build the package
npm run build

# Run tests to ensure nothing broke
npm test

# Verify dist files exist
ls -la dist/

# Test locally by linking
npm link

# In another project:
cd ../another-project
npm link @yourteam/components

# Use it:
import { Button } from '@yourteam/components';
```

---

## Step 5: Publish to Registry

### First Time Publishing

```bash
npm publish

# Output should be:
# npm notice Publishing to registry
# npm notice
# > @yourteam/components@1.1.0
# npm notice Packfile: dist/index.js
# npm notice
# npm notice 📦  @yourteam/components@1.1.0
# npm notice
# npm notice Done
```

### Subsequent Publishes

```bash
# Update version first
npm version minor

# Publish
npm publish

# Output shows the new version
```

---

## Step 6: Verify It's Published

### Check on Registry

**If using npmjs.com:**
```
https://www.npmjs.com/package/@yourteam/components
```

**If using private registry:**
```
https://npm.yourteam.com/@yourteam/components
```

Should show:
- ✅ Package name and version
- ✅ Description
- ✅ Downloads graph
- ✅ Installation instructions

### Install from Another Project

```bash
# In a new project
npm install @yourteam/components@1.1.0

# Verify it works
npm ls

# Should show:
# └── @yourteam/components@1.1.0
```

---

## Step 7: Document for Team

### Create README or Changelog

```markdown
# FORGE Components Library

## Version 1.1.0

### New Features
- Added Modal component
- Added Card component
- Added Tabs component

### Bug Fixes
- Fixed Button hover state on mobile
- Fixed InputField accessibility

### Breaking Changes
- None

### Installation
npm install @yourteam/components@1.1.0

### Usage
import { Button, Modal, Card } from '@yourteam/components';

<Button onClick={() => alert('Clicked!')}>Click Me</Button>

### Documentation
[Full docs](https://docs.company.com/components)
```

### Tag the Release

```bash
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0

# Shows on GitHub releases page
```

---

## Real Examples

### Example 1: Publishing Design Tokens

```bash
# FORGE builds design tokens
forge build design-tokens-update

# Review compliance gates ✅
# Approve build

# Update version
npm version patch  # 1.0.0 → 1.0.1

# Publish
npm publish

# Verify
npm info @yourteam/tokens@1.0.1

# Output shows tokens are now public
# All projects can use: npm install @yourteam/tokens
```

### Example 2: Publishing Component Library

```bash
# FORGE builds new components
forge build add-data-table

# Build includes:
# ├─ DataTable.tsx (component)
# ├─ DataTable.test.tsx (100% coverage)
# ├─ DataTable.stories.tsx (Storybook)
# └─ README.md (usage)

# Team reviews → approves

# Update version
npm version minor  # 2.0.0 → 2.1.0

# Publish
npm publish

# Within minutes, all projects can:
npm install @yourteam/components@2.1.0

# And use:
import { DataTable } from '@yourteam/components';
```

---

## Troubleshooting

### "Authentication failed"
```bash
# You're not logged in
npm login

# Or your token expired
npm logout
npm login
```

### "Package already exists at version X"
```bash
# You're trying to publish the same version twice
# Update version first

npm version patch
npm publish
```

### "403 Forbidden"
```bash
# You don't have permission to publish
# Ask team lead to add you
# Or use a different package name

# Verify permissions:
npm owner ls @yourteam/components
```

### "Package too large"
```bash
# npm has size limits (exceeds 100MB)
# Remove unnecessary files

# In package.json, add:
"files": [
  "dist",
  "package.json",
  "README.md"
]

# Don't include: node_modules, .git, etc.
```

---

## Best Practices

1. **Always update version before publishing**
   ```bash
   npm version major|minor|patch
   npm publish
   ```

2. **Test locally before publishing**
   ```bash
   npm link
   # Test in another project
   npm unlink
   npm publish
   ```

3. **Document breaking changes**
   - Mention in README
   - Tag as new major version (2.0.0)
   - Announce to team

4. **Keep versions in sync**
   - Design tokens: v1.0.0
   - Components: v2.1.0 (can differ)
   - Utilities: v1.3.0 (can differ)
   - No need to match

5. **Announce new releases**
   - Post in #engineering Slack
   - Share changelog
   - Link to npm page

---

## Phase 1 vs. Future Phases

### Phase 1 (Now)
- ✅ Publish to team registry
- ✅ Semantic versioning
- ✅ Basic documentation
- ✅ Changelog

### Phase 2 (Next Quarter)
- Private npm mirror (internal only)
- Automated tests before publish
- CI/CD integration
- Version lock files

### Phase 3 (Later)
- Public npm publish (share with industry)
- Monorepo with multiple packages
- Advanced versioning (major only)
- Governance for breaking changes

---

## Next Steps

1. **Read:** [Integrating Design Tokens](./07-integrating-design-tokens.md) — Use tokens in projects
2. **Build your first package** with FORGE
3. **Publish to team registry** using this guide
4. **Share with team** via Slack announcement

**Questions?** Check [FAQ](../04-reference/03-faq.md) or ask team lead.