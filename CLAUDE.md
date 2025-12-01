# HR Command Center - Claude Code Configuration

> **Note:** This is the project-specific configuration for HR Command Center. For comprehensive guides, see `~/claude-docs/`:
> - [agents.md](~/claude-docs/agents.md) - All available agents and their uses
> - [plugins.md](~/claude-docs/plugins.md) - Plugin commands and workflows
> - [rules.md](~/claude-docs/rules.md) - Coding standards and best practices
> - [workflows.md](~/claude-docs/workflows.md) - Complete workflow guides
> - [mcp.md](~/claude-docs/mcp.md) - MCP server configuration and usage

---

## Project Overview

**Project Name:** HR Command Center

**Description:** Marketing and landing page for HR Command Center - a modern HR management platform. Built with Next.js 16 App Router and React 19.

**Tech Stack:**
- Framework: Next.js 16.0.4 with App Router
- Language: TypeScript 5
- UI Library: React 19.2.0
- Styling: Tailwind CSS 4
- Animations: Framer Motion 12
- Icons: Lucide React
- Deployment: Vercel (target)

**Repository:** (Not yet published)

**Status:** Initial Development

---

## Project-Specific Rules

> **Default Standards:** See `~/claude-docs/rules.md` for comprehensive coding standards.
> Only document project-specific deviations or additions here.

### Code Style Exceptions
- None (following standard rules.md conventions)

### Project-Specific Conventions

**1. Component Organization:**
```typescript
// All page components in app/
// Reusable UI components in components/
// Export all components via components/index.ts barrel file

import { Header, Hero, Features } from '@/components'
```

**2. Client Components Pattern:**
```typescript
// Components using hooks, animations, or browser APIs must include:
'use client'

// Server Components are default - prefer them when possible
```

**3. Animation Standards (Framer Motion):**
```typescript
// Use consistent animation patterns
import { motion } from 'framer-motion'

// Prefer subtle, professional animations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}
```

**4. Tailwind CSS 4 Usage:**
```typescript
// Use Tailwind's new CSS-first configuration
// Prefer utility classes over custom CSS
// Use consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64)
```

### Testing Requirements (Beyond Standard 80%)
- Landing page components: Visual regression tests recommended
- Form components (if added): 100% coverage for validation logic
- Accessibility: WCAG 2.1 AA compliance required

---

## Project Architecture

### Directory Structure
```
hr-command-center/
  app/
    favicon.ico          # Site favicon
    globals.css          # Global styles and Tailwind imports
    layout.tsx           # Root layout with fonts and metadata
    page.tsx             # Homepage (landing page)
  components/
    Header.tsx           # Navigation header
    Hero.tsx             # Hero section with CTA
    Features.tsx         # Product features showcase
    HowItWorks.tsx       # How it works section
    Testimonials.tsx     # Customer testimonials
    Pricing.tsx          # Pricing plans
    CTA.tsx              # Call-to-action section
    Footer.tsx           # Site footer
    index.ts             # Barrel export file
  public/                # Static assets
```

### Key Architectural Decisions

1. **Next.js 16 App Router** - Latest Next.js with React 19 support, server components by default, improved performance

2. **Component-First Landing Page** - Each section is a self-contained component for easy iteration and A/B testing potential

3. **Framer Motion for Animations** - Professional-grade animations with minimal bundle impact, consistent motion design

4. **Tailwind CSS 4** - CSS-first configuration, better performance, native CSS features

---

## Project-Specific Agents

> **All Available Agents:** See `~/claude-docs/agents.md`
> List only the agents most relevant to THIS project's workflow.

### Primary Agents for This Project

1. **visual-design-critic** - Critical for landing page polish. Use after implementing sections, before major releases, when refining visual hierarchy.

2. **accessibility-auditor** - Landing pages need broad accessibility. Use after creating/modifying components, implementing forms, before releases.

3. **performance-profiler** - Landing page speed affects conversion. Use when adding animations, optimizing images, before production deploy.

4. **code-review-quality** - Use after implementing features, before commits, when user asks to review code.

5. **react-component-refactor** - Use when components grow large, patterns emerge across sections, prop drilling appears.

### Example Usage in This Project

```bash
# Example 1: After implementing Hero section
"I just finished the Hero section with animations"
# Uses: visual-design-critic, accessibility-auditor

# Example 2: Before production deploy
"Let's review the landing page before going live"
# Uses: performance-profiler, accessibility-auditor, code-review-quality

# Example 3: Refactoring repeated patterns
"The section headers all look similar, should we extract a component?"
# Uses: react-component-refactor
```

---

## Project-Specific Workflows

> **Complete Workflow Guides:** See `~/claude-docs/workflows.md`
> Document only project-specific workflow variations here.

### Feature Development (This Project)

```
Standard workflow (see workflows.md) with these additions:
1. Check if component needs 'use client' directive (animations, hooks)
2. Ensure component is exported in components/index.ts
3. Run visual-design-critic for UI components
4. Test responsive behavior (mobile, tablet, desktop)
5. Verify animations are smooth and not excessive
```

### Deployment Workflow (This Project)

```
Environment: Local → Vercel Preview → Vercel Production

Steps:
1. Run full validation: npm run build && npm run lint
2. Test all sections render correctly
3. Lighthouse audit (target: 90+ all categories)
4. Deploy to Vercel preview
5. Test on multiple devices/browsers
6. Promote to production

See workflows.md for general deployment best practices.
```

### Adding New Landing Page Section

```
1. Create component: components/NewSection.tsx
2. Add 'use client' if using animations or hooks
3. Export in components/index.ts
4. Import and add to app/page.tsx
5. Run visual-design-critic for design review
6. Test responsive behavior
7. Run accessibility-auditor
```

---

## Environment Setup

### Required Environment Variables

```bash
# Currently no environment variables required for basic landing page
# Add as features are implemented:

# Analytics (optional)
NEXT_PUBLIC_GA_ID=                    # Google Analytics ID

# Contact Form (if implemented)
CONTACT_FORM_ENDPOINT=                # Form submission endpoint

# CMS Integration (if implemented)
CMS_API_KEY=                          # Headless CMS API key
```

**Note:** MCP server credentials (GITHUB_PERSONAL_ACCESS_TOKEN, BRAVE_API_KEY) are configured separately via `claude mcp add` commands and stored in `~/.claude.json`, not in your project's `.env.local` file.

### Local Development Setup

```bash
# 1. Navigate to project
cd ~/Desktop/hr-command-center

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev  # → http://localhost:3000

# 4. Build for production
npm run build

# 5. Start production server
npm start
```

---

## MCP Configuration

> **Complete Guide:** See `~/claude-docs/mcp.md` for detailed documentation on all MCP servers.

### Understanding MCP Servers (Global, Not Project-Specific)

**IMPORTANT:** MCP servers are **global** - they're configured once via `claude mcp add` and stored in `~/.claude.json`. They automatically connect across ALL your projects whenever you launch Claude Code. **You do NOT need project-specific MCP configuration files.**

This section documents which **global MCP servers** are particularly useful for THIS project.

### Recommended Global MCP Servers

If you haven't already, configure these MCP servers globally (see `~/claude-docs/mcp.md` for full setup instructions):

1. **Filesystem Server** - Local file access and operations
   - Access project files across your machine
   - Compare with HRSkills or other HR projects
   - Setup: `claude mcp add --transport stdio filesystem -- npx -y @modelcontextprotocol/server-filesystem /Users/mattod`

2. **GitHub Server** - Repository operations and collaboration
   - Create/manage PRs and issues
   - Push to repository when ready
   - Setup: `claude mcp add --transport stdio github --env GITHUB_PERSONAL_ACCESS_TOKEN=your_token -- npx -y @modelcontextprotocol/server-github`

3. **Brave Search Server** - Web search for research
   - Find latest Next.js 16 documentation
   - Research landing page best practices
   - Look up Tailwind CSS 4 patterns
   - Setup: `claude mcp add --transport stdio brave-search --env BRAVE_API_KEY=your_key -- npx -y @modelcontextprotocol/server-brave-search`

4. **Figma Server** - Design file integration
   - Generate code from Figma designs
   - Extract design tokens and components
   - Setup: Run `/mcp` in Claude Code and authenticate via browser

5. **Puppeteer Server** - Browser automation
   - Take screenshots of deployed pages
   - UI testing and visual regression
   - Form automation and interaction testing
   - Setup: `claude mcp add --transport stdio puppeteer -- npx -y @modelcontextprotocol/server-puppeteer`

### Verify Your Global MCP Servers

**Check which MCP servers are currently connected:**
```bash
claude mcp list
# or run in Claude Code:
/mcp
```

### How to Use MCP Servers in This Project

**Example prompts that utilize your global MCP servers:**
- "Compare this Hero component with the one in HRSkills" (filesystem)
- "Create a GitHub repo for hr-command-center and push the code" (github)
- "Search for the latest Next.js 16 App Router patterns" (brave-search)
- "Generate code for this Figma landing page design" (figma)

**Project-Specific MCP Usage Notes:**
- **Most useful for this project:** filesystem (compare with HRSkills), figma (design-to-code)
- **Design integration:** Figma server highly recommended for landing page work
- **Database queries:** Not needed (no database in this project currently)

---

## Critical Code Paths

> **Note:** Landing page has fewer critical paths than full applications.

### Layout & SEO
- **Files:** `app/layout.tsx`
- **Critical:** Metadata, fonts, global structure
- **Impact:** SEO, performance, accessibility

### Homepage Composition
- **Files:** `app/page.tsx`
- **Critical:** Section ordering, overall page structure
- **Impact:** User experience, conversion flow

### Component Barrel Export
- **Files:** `components/index.ts`
- **Critical:** All components must be exported here
- **Impact:** Import consistency across project

---

## Common Tasks & Quick Reference

### Code Review Before PR

```bash
# Standard review process (see workflows.md #3)
/review-pr

# Project-specific: Also check
# - Responsive design on all breakpoints
# - Animation performance
# - Accessibility compliance
```

### Adding New Features

```bash
# Standard feature workflow (see workflows.md #1)
/feature-dev [feature description]

# Project-specific considerations:
# - Is this a new section or enhancement to existing?
# - Does it need animations? (add 'use client')
# - Does it affect SEO? (check metadata in layout.tsx)
```

### Running Tests

```bash
# Lint check
npm run lint

# Build verification
npm run build

# Type check (if configured)
npm run type-check
```

---

## Project-Specific Security Considerations

> **Standard Security Guidelines:** See `~/claude-docs/rules.md` - Security Standards

### This Project's Sensitive Data
- **PII:** None currently (landing page only)
- **Compliance:** Standard web accessibility (WCAG 2.1 AA)
- **Encryption:** N/A (no user data)

### Critical Security Checks
- [ ] No API keys in code (use environment variables if needed)
- [ ] All external links use `rel="noopener noreferrer"`
- [ ] Form submissions (if any) validated client and server-side
- [ ] No hardcoded sensitive information in components

---

## Dependencies & Integrations

### Key Dependencies

| Package | Version | Purpose | Update Frequency |
|---------|---------|---------|------------------|
| next | 16.0.4 | Full-stack framework | Quarterly |
| react | 19.2.0 | UI library | With Next.js |
| framer-motion | 12.x | Animations | Quarterly |
| lucide-react | 0.555.x | Icons | Monthly |
| tailwindcss | 4.x | Styling | Quarterly |

### Third-Party Integrations

Currently none. Potential future integrations:
- Analytics (Google Analytics, Plausible)
- Form handling (Formspree, custom API)
- CMS (Sanity, Contentful) for content management

---

## Performance Targets (This Project)

> **Standard Performance Guidelines:** See `~/claude-docs/rules.md` - Performance Standards

### Project-Specific Targets

- **LCP (Largest Contentful Paint):** <2.0s (landing pages need fast first impression)
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1
- **Lighthouse Score:** 90+ all categories
- **Bundle Size:** <100KB initial JS

### Performance Monitoring

- Tool: Lighthouse, Vercel Analytics (when deployed)
- Review: Before each major release
- Critical: Hero section load time, animation smoothness

---

## Known Issues & Technical Debt

### Current Known Issues

None at this time (new project).

### Technical Debt

1. **Testing setup needed** - No test framework configured yet
   - Impact: Low (landing page)
   - Plan: Add Playwright for E2E when needed

2. **Image optimization** - No images added yet
   - Impact: Medium (affects performance)
   - Plan: Use Next.js Image component, WebP format

---

## Team & Contacts

### Key Contacts

- **Project Lead:** Matt O'Donnell
- **Development:** Matt O'Donnell

### Communication Channels

- **Repository:** GitHub (to be created)
- **Documentation:** This file + ~/claude-docs/

---

## Project-Specific AI Agent Configuration

### Model Preferences for This Project

> **Default:** Follow `~/claude-docs/rules.md` model selection guidelines
> Override only for project-specific needs.

- **Standard tasks:** Sonnet (default) - component creation, styling, animations
- **Design critique:** Opus - visual design analysis, UX recommendations
- **Simple fixes:** Haiku - quick formatting, simple component updates

### Custom Agents (If Any)

No custom agents at this time.

---

## Quick Links

### Documentation

- **Comprehensive Guides:** `~/claude-docs/` (agents, plugins, rules, workflows)
- **Next.js 16 Docs:** https://nextjs.org/docs
- **Tailwind CSS 4:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/

### Related Projects

- **HRSkills Platform:** `~/Desktop/HRSkills` - Full HR application (can share patterns/components)

---

## Onboarding Checklist

**New developers should:**

- [ ] Read this project-level document completely
- [ ] Read `~/claude-docs/rules.md` for coding standards
- [ ] Review `~/claude-docs/workflows.md` for development processes
- [ ] Review `~/claude-docs/agents.md` for available specialized agents
- [ ] Review `~/claude-docs/mcp.md` for MCP capabilities
- [ ] Verify global MCP servers are configured (see "MCP Configuration" above)
- [ ] Run `npm install` and `npm run dev`
- [ ] Review each component in `components/` directory
- [ ] Understand the landing page section flow in `app/page.tsx`

---

## Notes for Claude Code

> Instructions for Claude Code when working on this project.

### Project Context

This is a **landing page / marketing site** for HR Command Center. The codebase prioritizes **visual polish, performance, and conversion optimization**. It serves as the public face of the HR product.

### Special Considerations

- **Visual Quality Critical:** This is a marketing site. Design quality directly impacts brand perception and conversions.

- **Performance Matters:** Landing page speed affects SEO and user experience. Keep bundle small, optimize images, use efficient animations.

- **Responsive First:** All components must work perfectly on mobile, tablet, and desktop. Test at 375px, 768px, and 1440px minimum.

- **Animation Subtlety:** Framer Motion animations should enhance, not distract. Prefer subtle, professional motion.

### When Making Changes

1. **Always** reference this document for project-specific context
2. **Always** follow standards in `~/claude-docs/rules.md` unless explicitly overridden here
3. **Always** use appropriate agents from `~/claude-docs/agents.md`
4. **Always** follow workflows from `~/claude-docs/workflows.md`
5. **Always** test responsive behavior after UI changes
6. **Always** run visual-design-critic for significant UI work

### Prohibited Actions

- Never add heavy dependencies without performance justification
- Never skip responsive testing for UI components
- Never use inline styles (use Tailwind classes)
- Never commit large unoptimized images
- Never add features that don't serve the landing page purpose

---

**Last Updated:** November 26, 2024
**Updated By:** Claude Code
**Version:** 1.0.0
