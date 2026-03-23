# UI Component Patterns

This file documents the standards for creating and evolving UI components in `src/components/ui`.

## tailwind-variants usage

- Use `tailwind-variants` (`tv`) as the source of truth for style composition.
- Do not use external merge helpers (for example `cn`) when rendering components that already use `tv`.
- Pass `className` directly into the `tv` function call with the other variant props.

Example:

```tsx
className={buttonVariants({ className, variant, size, fullWidth })}
```

## Component API shape

- Public props should combine native element props with `VariantProps<typeof ...Variants>`.
- Keep `type="button"` as default on button-like components.
- Forward refs with `forwardRef` and set a `displayName`.

## Styling tokens (ATUALIZADO TAILWIND V4)

- **SEMPRE** use classes semânticas geradas pelo `@theme` em `src/app/globals.css` instead of hardcoded values.
- Keep semantic naming for DevRoast tokens (for example `--color-devroast-green`, `--color-devroast-text-primary`).
- Map component states (default, hover, focus, disabled) to explicit variables whenever possible.

### ✅ SINTAXE CORRETA Tailwind v4:
```tsx
// Classes semânticas geradas automaticamente pelo @theme
className="bg-devroast-green"           // Fundo verde
className="text-devroast-text-primary"  // Texto principal
className="border-devroast-border"      // Borda
className="font-mono"                   // Fonte mono
className="h-5.5"                       // Altura semântica
className="rounded-md"                  // Radius semântico
```

### ❌ SINTAXE INCORRETA (OBSOLETA):
```tsx
// NUNCA use estas sintaxes - são malformadas no Tailwind v4
className="bg-(--color-devroast-green)"        // ❌ Malformada
className="text-(--color-devroast-text-primary)" // ❌ Malformada  
className="border-(--color-devroast-border)"     // ❌ Malformada
className="font-(--font-jetbrains-mono)"         // ❌ Obsoleta
className="h-[22px]"                             // ❌ Evitar quando h-5.5 existe
className="w-[560px]"                            // ❌ Usar w-140 ao invés
```

## Width Classes - Tailwind v4 Best Practices

**SEMPRE** use classes semânticas do Tailwind ao invés de valores arbitrários em pixels.

### ✅ SINTAXE CORRETA para Larguras:
```tsx
// Spacing scale (recomendado para medidas exatas)
className="w-120"  // 30rem (480px)
className="w-140"  // 35rem (560px) 
className="w-195"  // 48.75rem (780px)

// Container scale (para layouts responsivos)
className="w-xs"   // 20rem (320px)
className="w-sm"   // 24rem (384px)
className="w-md"   // 28rem (448px)
className="w-lg"   // 32rem (512px)
className="w-xl"   // 36rem (576px)
className="w-2xl"  // 42rem (672px)
className="w-3xl"  // 48rem (768px)

// Percentuais e auto
className="w-full" // 100%
className="w-1/2"  // 50%
className="w-auto" // auto
```

### ❌ SINTAXE INCORRETA (EVITAR):
```tsx
className="w-[480px]"  // ❌ Usar w-120
className="w-[560px]"  // ❌ Usar w-140  
className="w-[780px]"  // ❌ Usar w-195
className="w-[32rem]"  // ❌ Usar w-lg
```

### Conversão Pixel → Spacing Scale:
- **Fórmula**: `pixels ÷ 4 = spacing-unit`
- **480px** = 480 ÷ 4 = `w-120`
- **560px** = 560 ÷ 4 = `w-140` 
- **780px** = 780 ÷ 4 = `w-195`

### Container Scale Usage:
Use container scale (`w-xs`, `w-lg`, etc.) para componentes que devem se adaptar a diferentes breakpoints. Use spacing scale (`w-120`, `w-140`) para medidas exatas que devem ser pixel-perfect.

## DevRoast Color System

Use estas variáveis CSS específicas para o projeto:

```css
/* Cores principais */
--color-devroast-bg: #0a0a0a              # Fundo principal
--color-devroast-text-primary: #fafafa     # Texto principal branco
--color-devroast-text-secondary: #6b7280   # Texto secundário cinza
--color-devroast-text-muted: #4b5563       # Texto menos relevante
--color-devroast-border: #2a2a2a           # Bordas
--color-devroast-surface: #0f0f0f          # Superfícies/containers
--color-devroast-green: #10b981            # Verde principal (botões, acentos)
--color-devroast-orange: #f59e0b           # Laranja (badges warning)
--color-devroast-red: #ef4444              # Vermelho (badges error)
--color-devroast-code-orange: #ffc799      # Laranja específico para código
```

## Typography Guidelines

- **Font families**: 
  - `font-mono` para elementos de código, UI components, headings
  - `font-sans` para texto corrido (pouco usado no DevRoast)
- **Weights**: Preferir `font-bold` para headings, `font-medium` para botões
- **Sizes**: Usar classes Tailwind semânticas quando possível

## Variants organization

- Keep `base`, `variants`, and `defaultVariants` explicit and small.
- Use `variant` for visual intent and `size` for dimensions/typography.
- Add boolean variants for structural toggles (for example `fullWidth`).

## DevRoast Button Specifications

Based on Pencil design analysis:

```tsx
// Primary Button
variant: "primary"
// Background: --color-devroast-green (#10B981)
// Text: --color-devroast-bg (#0A0A0A)  
// Border radius: 0px (sharp corners)
// Padding: [10px, 24px] = py-2.5 px-6

// Secondary Button  
variant: "secondary"
// Background: transparent
// Border: --color-devroast-border (#2A2A2A)
// Text: --color-devroast-text-primary (#FAFAFA)

// Ghost Button
variant: "ghost"  
// Background: transparent
// Text: --color-devroast-text-secondary (#6B7280)
// Hover: background --color-devroast-surface (#0F0F0F)
```

## Accessibility baseline

- Ensure focus-visible styles are present for interactive components.
- Preserve disabled semantics with `disabled:pointer-events-none` and reduced opacity.
- Keep text contrast aligned with the design tokens used in each variant.

## Best Practices

1. **Sempre extrair cores do design Pencil** para CSS variables antes de implementar
2. **Usar font-mono** para manter consistência com o tema terminal/código
3. **Sharp corners** (radius 0) para botões principais seguindo o design
4. **Test components** na página `/components` para verificar implementação
5. **Manter pixel-perfect** com as especificações extraídas do Pencil
