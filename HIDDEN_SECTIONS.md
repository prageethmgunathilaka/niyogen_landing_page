# Hidden Sections Documentation

This document lists all sections and components that have been hidden from the main NiyoGen landing page.

## Last Updated
Date: February 16, 2026

---

## Hidden Sections

### 1. **Products Section**
- **File:** `src/components/pages/niyogen/products.htm`
- **Status:** Removed from `index.html`
- **Content:** 
  - FastGraph Swarm Builder card
  - EvolSpace card
  - Main feature card with product overview

### 2. **Features Section**
- **File:** `src/components/pages/niyogen/features.htm`
- **Status:** Removed from `index.html`
- **Original Heading:** "Features"
- **Original Subheading:** "Business outcomes enabled by FastGraph Swarm Builder and EvolSpace."
- **Content:** 6 feature cards:
  1. No-code agent swarms
  2. Fine-tuning with guardrail control
  3. Integrations that matter
  4. Evolve agents
  5. Operational reliability
  6. From pilot to production

### 3. **How It Works Section**
- **File:** `src/components/pages/niyogen/how-it-works.htm`
- **Status:** Removed from `index.html`
- **Content:**
  - 3-step process visualization
  - Integration showcase (CRM, Ticketing, Monitoring, Data, AI Models)

### 4. **FAQ Section**
- **File:** `src/components/pages/niyogen/faq.htm`
- **Status:** Removed from `index.html`
- **Content:** 6 accordion-style questions about the platform

### 5. **CTA Section (Final Call to Action)**
- **File:** `src/components/pages/niyogen/cta.htm`
- **Status:** Removed from `index.html`
- **Content:** "Ready to explore NiyoGen?" with Contact and Learn more buttons

---

## Hidden Navigation Items

### Desktop Navigation (`header.htm`)
- ~~Products~~ (removed)
- ~~Features~~ (removed)
- ~~How It Works~~ (removed)
- ~~Pricing~~ (removed)
- ~~FAQ~~ (removed)

**Result:** Navigation menu is now empty (only logo and "Get started" button remain)

### Mobile Navigation (`header.htm`)
- ~~Products~~ (removed)
- ~~Features~~ (removed)
- ~~How It Works~~ (removed)
- ~~Pricing~~ (removed)
- ~~FAQ~~ (removed)

---

## Hidden Hero Elements

### Hero Section (`hero.htm`)
- **Removed:** "See Features" button
- **Original button:**
  ```html
  <a href="#features" class="btn btn-white...">
    <span>See Features</span>
  </a>
  ```

---

## Current Active Sections

### Main Page Structure (`index.html`)
```html
<main>
  <Component src="src/components/pages/niyogen/hero.htm" />
  <Component src="src/components/pages/niyogen/pricing.htm" />
</main>
```

**Active Sections:**
1. ✅ Header (logo + Get started button)
2. ✅ Hero Section (with custom heading)
3. ✅ Pricing/Contact Demo Section
4. ✅ Footer

---

## Content Changes Made

### Hero Section
- **Old Heading:** "Build swarms of Agents from simple prompts"
- **New Heading:** "Know before you act"
- **Old Subheading:** "FastGraph Swarm Builder lets you compose multi-agent workflows..."
- **New Subheading:** "AI that understands your situation and guides your next move"

### Footer
- **Old Description:** "Build swarms of AI agents from simple prompts. FastGraph Swarm Builder and EvolSpace help you move from idea to production with confidence."
- **New Description:** "Know what's happening. Know what to do. An AI decision assistant for everyday situations."

---

## How to Restore Hidden Sections

### To restore a section:

1. **Open `index.html`**
2. **Add the Component line back** in the desired order:
   ```html
   <Component src="src/components/pages/niyogen/SECTION_NAME.htm" />
   ```

3. **Update navigation** in `src/components/pages/niyogen/header.htm`:
   - Add links back to desktop navigation
   - Add links back to mobile navigation

### Example: Restore Features Section

**In `index.html`:**
```html
<main>
  <Component src="src/components/pages/niyogen/hero.htm" />
  <Component src="src/components/pages/niyogen/features.htm" /> <!-- Add this -->
  <Component src="src/components/pages/niyogen/pricing.htm" />
</main>
```

**In `header.htm` (Desktop):**
```html
<nav class="hidden xl:flex items-center gap-8 flex-1 justify-center">
  <a href="#features">Features</a>
  <!-- other links -->
</nav>
```

**In `header.htm` (Mobile):**
```html
<ul class="space-y-4 mb-8">
  <li><a href="#features" class="nav-close...">Features</a></li>
  <!-- other links -->
</ul>
```

---

## File Locations

### Component Files (All in `src/components/pages/niyogen/`)
- `header.htm` - Navigation header
- `hero.htm` - Hero section
- `products.htm` - Products overview (hidden)
- `features.htm` - Features grid (hidden)
- `how-it-works.htm` - Process visualization (hidden)
- `pricing.htm` - Contact for demo (active)
- `faq.htm` - FAQ accordion (hidden)
- `cta.htm` - Final CTA (hidden)
- `footer.htm` - Footer
- `contact-modal.htm` - Contact form modal

### Main Files
- `index.html` - Main page structure
- `vite.config.js` - Build configuration
- `package.json` - Dependencies

---

## Notes

- All hidden component files still exist and are intact
- They can be restored at any time by adding them back to `index.html`
- Navigation links should be updated accordingly when restoring sections
- The page uses Vite with the `vite-plugin-html-inject` plugin for component assembly

---

## Backup Instructions

If you need to restore the original page:

1. Check git history: `git log --oneline`
2. Find the commit before changes
3. Restore files: `git checkout <commit-hash> -- <file-path>`

Or keep this document as a reference for manual restoration.
