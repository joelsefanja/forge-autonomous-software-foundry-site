---
title: "Integrating Design Tokens: Quick-Start"
---

**TL;DR** — Design tokens are reusable colors, spacing, typography. Add them to your project in 5 minutes. Then FORGE auto-uses them in all future builds.

---

## 30-Second Summary

Design tokens are centralized design decisions: "primary blue is #0066FF", "body text is 16px Inter". Import them into your project, and every component FORGE builds automatically uses your tokens.

---

## Prerequisites

- Design token package published (see [Publishing to npm](./06-publishing-to-npm.md))
- Your project has React, Vue, or Angular set up
- npm installed

---

## Step 1: Install Tokens Package

```bash
# Install from your team's registry
npm install @yourteam/design-tokens@1.0.0

# Verify
npm ls @yourteam/design-tokens

# Should show:
# └── @yourteam/design-tokens@1.0.0
```

---

## Step 2: Create tokens.ts (TypeScript) or tokens.js

```typescript
// src/styles/tokens.ts

import tokens from '@yourteam/design-tokens';

export const colors = {
  primary: tokens.colors.primary,      // #0066FF
  secondary: tokens.colors.secondary,  // #6B7280
  success: tokens.colors.success,      // #10B981
  error: tokens.colors.error,          // #EF4444
  // ... more colors
};

export const spacing = tokens.spacing;
// [4, 8, 12, 16, 24, 32, 48, 64]

export const typography = {
  headingXL: tokens.typography.headingXL,      // 32px, Poppins, bold
  headingL: tokens.typography.headingL,        // 24px, Poppins, bold
  headingM: tokens.typography.headingM,        // 20px, Poppins, bold
  bodyL: tokens.typography.bodyL,              // 16px, Inter, regular
  bodyM: tokens.typography.bodyM,              // 14px, Inter, regular
  // ... more typography
};

export const shadows = tokens.shadows;
// { sm: "0 1px 2px...", md: "0 4px 6px...", lg: "0 10px 15px..." }

export const borderRadius = tokens.borderRadius;
// { sm: 2, md: 4, lg: 8, full: 9999 }
```

---

## Step 3: Set Up CSS-in-JS or CSS Files

### Option A: Using Styled Components

```typescript
// src/components/Button.tsx

import styled from 'styled-components';
import { colors, spacing, typography } from '../styles/tokens';

const StyledButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  padding: ${spacing[2]}px ${spacing[3]}px;  // 8px 12px
  font-size: ${typography.bodyM.size};
  font-family: ${typography.bodyM.family};
  border-radius: ${borderRadius.md}px;
  border: none;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const Button = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);
```

### Option B: Using CSS Modules

```css
/* src/components/Button.module.css */

.button {
  background-color: #0066FF;  /* primary */
  color: white;
  padding: 8px 12px;  /* spacing[2] + spacing[3] */
  font-size: 14px;  /* bodyM */
  font-family: Inter, sans-serif;
  border-radius: 4px;  /* borderRadius.md */
  border: none;
  cursor: pointer;
}

.button:hover {
  opacity: 0.9;
}
```

### Option C: Using Tailwind CSS

```bash
# Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

# In tailwind.config.js:
module.exports = {
  theme: {
    colors: {
      primary: '#0066FF',
      secondary: '#6B7280',
      success: '#10B981',
      error: '#EF4444',
    },
    spacing: [0, 4, 8, 12, 16, 24, 32, 48, 64],
    fontFamily: {
      heading: ['Poppins', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
  },
};
```

Then use in HTML:
```html
<button class="bg-primary text-white px-3 py-2 rounded">
  Click Me
</button>
```

---

## Step 4: Tell FORGE About Your Tokens

Create `.forge/tokens.config.json`:

```json
{
  "version": "1.0.0",
  "tokenSource": "@yourteam/design-tokens",
  "categories": {
    "colors": {
      "primary": "#0066FF",
      "secondary": "#6B7280",
      "success": "#10B981"
    },
    "spacing": [4, 8, 12, 16, 24, 32],
    "typography": {
      "headingXL": {
        "size": "32px",
        "weight": 700,
        "family": "Poppins"
      }
    }
  },
  "css": {
    "framework": "styled-components"  // or "tailwind", "css-modules"
  }
}
```

---

## Step 5: Update Your Global Styles

```typescript
// src/index.tsx or src/styles/global.ts

import { createGlobalStyle } from 'styled-components';
import { typography } from './styles/tokens';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${typography.bodyM.family};
    font-size: ${typography.bodyM.size};
    line-height: 1.5;
    color: #1F2937;
  }

  h1 { font: ${typography.headingXL}; }
  h2 { font: ${typography.headingL}; }
  h3 { font: ${typography.headingM}; }
`;

export default GlobalStyle;
```

---

## Step 6: Verify Integration

```bash
# Build your project
npm run build

# Check that styles compile
npm run dev

# Open browser and verify:
# ✅ Colors are correct
# ✅ Spacing is consistent
# ✅ Typography matches
# ✅ No console errors
```

---

## Step 7: FORGE Learns Your Tokens

Now, when FORGE generates new components:

```bash
forge build add-new-feature

# FORGE automatically:
# ├─ Uses your primary color (not random)
# ├─ Uses your typography system (not custom fonts)
# ├─ Uses your spacing grid (8px multiples)
# ├─ Matches your button styles
# └─ Matches your overall design system

# Result: Consistency from day 1
```

---

## Real Example: Before & After

### Before (Without Tokens)

```tsx
// FORGE generated without knowing your tokens
const Button = styled.button`
  background-color: #4F46E5;  // Arbitrary color
  padding: 10px 14px;          // Random spacing
  font-size: 15px;             // Inconsistent size
  font-family: 'Segoe UI';     // Wrong font
  border-radius: 6px;          // Inconsistent radius
`;
```

**Result:** Doesn't match your design system. You need to fix manually.

### After (With Tokens)

```tsx
// FORGE generated with tokens configured
const Button = styled.button`
  background-color: ${colors.primary};        // #0066FF ✅
  padding: ${spacing[2]}px ${spacing[3]}px;   // 8px 12px ✅
  font-size: ${typography.bodyM.size};        // 14px ✅
  font-family: ${typography.bodyM.family};    // Inter ✅
  border-radius: ${borderRadius.md}px;        // 4px ✅
`;
```

**Result:** Perfect match. No manual fixes needed.

---

## Design Token Update Workflow

### Scenario: Change Primary Color

```bash
# Team decides: primary blue needs to be darker
# Update the token source

# In @yourteam/design-tokens:
colors.primary = '#0052CC'  // Was #0066FF, now darker

# Publish new version
npm version patch
npm publish

# In your project:
npm install @yourteam/design-tokens@1.0.1

# All components automatically use new color ✅
# No code changes needed
```

---

## Common Token Categories

```typescript
// src/styles/tokens.ts

export const tokens = {
  // Colors
  colors: {
    primary: '#0066FF',
    secondary: '#6B7280',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F97316',
    info: '#0EA5E9',
  },

  // Spacing (8px base)
  spacing: [0, 4, 8, 12, 16, 24, 32, 48, 64],

  // Typography
  typography: {
    headingXL: { size: '32px', weight: 700, family: 'Poppins' },
    headingL: { size: '24px', weight: 700, family: 'Poppins' },
    bodyL: { size: '16px', weight: 400, family: 'Inter' },
    bodyM: { size: '14px', weight: 400, family: 'Inter' },
    small: { size: '12px', weight: 400, family: 'Inter' },
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
  },

  // Border radius
  borderRadius: {
    sm: 2,
    md: 4,
    lg: 8,
    full: 9999,
  },

  // Z-index
  zIndex: {
    dropdown: 1000,
    modal: 1100,
    popover: 1200,
    tooltip: 1300,
  },

  // Transitions
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
};
```

---

## Troubleshooting

### "Token not found"
```bash
# Verify package is installed
npm ls @yourteam/design-tokens

# If not installed:
npm install @yourteam/design-tokens

# If installed but still not working:
npm run build  # Rebuild
npm run dev
```

### "Styles not applying"
```bash
# Check import path
import { colors } from '../styles/tokens';  // ✅ Correct path

# Check CSS-in-JS framework
// If using styled-components:
import styled from 'styled-components';
// Then use: ${colors.primary}

// If using CSS modules:
// Define colors in CSS:
.button { background-color: var(--primary-color); }
```

### "FORGE not using my tokens"
```bash
# Verify config file
cat .forge/tokens.config.json

# Should have:
// {
//   "tokenSource": "@yourteam/design-tokens",
//   ...
// }

# If config missing or wrong:
# Update .forge/tokens.config.json
# Run next build with: forge build --regenerate-config
```

---

## Best Practices

1. **Keep tokens in sync**
   - Design tokens should match Figma/design tool
   - Update tokens when design changes
   - Publish new version immediately

2. **Use semantic names**
   - ✅ colors.primary (semantic)
   - ❌ colors.blue5 (not semantic)

3. **Document tokens**
   ```markdown
   # Design Tokens

   ## Colors
   - **Primary**: #0066FF (main CTA, brand color)
   - **Secondary**: #6B7280 (secondary CTA)
   - **Success**: #10B981 (positive actions)

   ## Spacing
   Base unit: 4px
   Scale: 4, 8, 12, 16, 24, 32, 48, 64
   ```

4. **Version carefully**
   - Adding tokens: Minor version (1.1.0)
   - Removing tokens: Major version (2.0.0)
   - Changing values: Patch (1.0.1) if internal only

---

## Next Steps

1. **Install tokens package** into your project (5 min)
2. **Set up tokens.ts file** (2 min)
3. **Configure FORGE** with token source (1 min)
4. **Generate next feature** and verify FORGE uses your tokens ✅

**Questions?** Check [FAQ](../04-reference/03-faq.md) or ask design lead.