<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## Goal

The user is implementing a DevRoast application - a code review application built with Next.js that replicates a design from a Pencil (.pen) file. The current goal is to make the CodeBlock component pixel-perfect with the Pencil design, specifically focusing on exact spacing, colors, and syntax highlighting to match the original design specifications.

## Instructions

- **Always use MCP Pencil** to access design specifications from `/home/vinicius/Downloads/devroast.pen` for accurate implementation
- **Follow Tailwind v4 best practices**: Use semantic classes instead of arbitrary values (e.g., `w-120` not `w-[480px]`)
- **Maintain pixel-perfect fidelity** to the Pencil design specifications
- **Use DevRoast color system**: Specific CSS variables defined in globals.css (e.g., `--color-devroast-green`, `--color-devroast-text-primary`)
- **Typography**: Use `font-mono` (JetBrains Mono) for consistency with terminal/code theme
- **Component patterns**: Use `tailwind-variants` with `forwardRef` and proper TypeScript interfaces
- **Update documentation** in `AGENTS.md` and `CLAUDE.md` for future reference

## Latest Discoveries - COMPLETED ✅

- **Syntax highlighting color mapping from Pencil** (IMPLEMENTED):
  - `$syn-keyword` = `#C678DD` (keywords like `function`, `var`, `for`, `if`, `return`)
  - `$syn-function` = `#61AFEF` (function names like `calculateTotal`, `.log`)
  - `$syn-variable` = `#E06C75` (variables like `items`, `total`, `i`)
  - `$syn-number` = `#D19A66` (numbers like `0`, `100`, `0.9`)
  - `$syn-string` = `#E5C07B` (strings like `"discount applied"`)
  - `$syn-property` = `#98C379` (properties like `.length`, `.price`)
  - `$syn-operator` = `#ABB2BF` (operators and punctuation)
  - Comments = `#8B8B8B` (TODO comments)

- **Exact spacing specifications from Pencil** (VERIFIED CORRECT):
  - Window header: 40px height, 16px horizontal padding ✅
  - Traffic lights: 12px circles, 8px gap between them ✅
  - Line numbers: 48px width, 16px+12px padding, 8px gap vertically ✅
  - Code column: 16px padding, 8px gap vertically ✅
  - Container: 780px width, 360px height

- **CodeBlockWithCopy** now includes custom JavaScript syntax highlighting that matches Pencil design exactly ✅

## Accomplished ✅

### ✅ **CodeBlock Component - PIXEL PERFECT:**
- ✅ Added exact syntax highlighting colors from Pencil design to CSS variables
- ✅ Implemented custom JavaScript syntax highlighter for `CodeBlockWithCopy`
- ✅ Verified spacing matches Pencil specifications exactly
- ✅ Uses DevRoast color system with proper CSS variables
- ✅ Both server (`CodeBlock`) and client (`CodeBlockWithCopy`) versions working
- ✅ Built and tested successfully

### ✅ **Homepage Implementation Complete:**
- Created pixel-perfect first section following Pencil design
- Successfully integrated CodeBlockWithCopy component to replace manual code editor
- Implemented all sections: navbar, hero title, code editor, actions bar, footer stats
- Added functional Toggle component for "roast mode"
- Used proper DevRoast color system and typography

### ✅ **Component Library:**
- All UI components working: Button, Badge, Card, Typography, Toggle, CodeBlock, DiffLine, TableRow, ScoreRing
- Fixed Toggle component state management issues
- Migrated from arbitrary pixel values to semantic Tailwind classes
- Updated documentation with best practices

## Status: COMPLETE ✅

The CodeBlock component is now pixel-perfect with the Pencil design and includes exact syntax highlighting colors. The homepage implementation is complete and functional.

## Relevant files / directories

### **CodeBlock Implementation:**
- `src/components/ui/code-block.tsx` - CodeBlock component with custom syntax highlighting
- `src/app/globals.css` - DevRoast color system including syntax highlighting variables
- `/home/vinicius/Downloads/devroast.pen` - Original Pencil design file (access via MCP)

### **Homepage Implementation:**
- `src/app/page.tsx` - Homepage using CodeBlockWithCopy component
- `src/app/globals.css` - DevRoast color system and design tokens

### **UI Components:**
- `src/components/ui/` - All UI components directory
- `src/components/ui/toggle.tsx` - Fixed toggle component
- `src/components/ui/button.tsx` - Button with DevRoast styling
- `src/components/ui/typography.tsx` - Text components

### **Documentation:**
- `src/components/ui/AGENTS.md` - Component patterns and Tailwind v4 best practices
- `CLAUDE.md` - Project overview with changelog of homepage implementation

### **Test Pages:**
- `src/app/components/page.tsx` - Component library demonstration
- `src/app/test-toggle/page.tsx` - Toggle testing page

### **Configuration:**
- `package.json`, `tsconfig.json`, `next.config.ts` - Project setup
- Build system working correctly with all components

**Status**: All tasks completed successfully. The CodeBlock component now matches the Pencil design exactly with proper syntax highlighting and spacing.

---
