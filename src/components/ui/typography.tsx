import { forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const typographyVariants = tv({
  variants: {
    variant: {
      h1: [
        "font-mono",
        "font-bold",
        "text-4xl",
        "text-devroast-text-primary",
        "tracking-tight",
      ],
      h2: [
        "font-mono",
        "font-bold",
        "text-3xl",
        "text-devroast-text-primary",
        "tracking-tight",
      ],
      h3: [
        "font-mono",
        "font-bold",
        "text-2xl",
        "text-devroast-text-primary",
        "tracking-tight",
      ],
      h4: [
        "font-mono",
        "font-medium",
        "text-xl",
        "text-devroast-text-primary",
        "tracking-tight",
      ],
      body: [
        "font-mono",
        "text-base",
        "text-devroast-text-primary",
        "leading-relaxed",
      ],
      bodySecondary: [
        "font-mono",
        "text-base",
        "text-devroast-text-secondary",
        "leading-relaxed",
      ],
      small: [
        "font-mono",
        "text-sm",
        "text-devroast-text-secondary",
        "leading-normal",
      ],
      muted: [
        "font-mono",
        "text-sm",
        "text-devroast-text-muted",
        "leading-normal",
      ],
      code: [
        "font-mono",
        "text-sm",
        "bg-devroast-surface",
        "border",
        "border-devroast-border",
        "px-2",
        "py-1",
        "text-devroast-code-orange",
      ],
      lead: [
        "font-mono",
        "text-xl",
        "text-devroast-text-secondary",
        "leading-relaxed",
      ],
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

// Individual typography components for better type safety
export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {}

const H1 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        className={typographyVariants({ className, variant: "h1" })}
        {...props}
      />
    );
  },
);

const H2 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        className={typographyVariants({ className, variant: "h2" })}
        {...props}
      />
    );
  },
);

const H3 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={typographyVariants({ className, variant: "h3" })}
        {...props}
      />
    );
  },
);

const H4 = forwardRef<HTMLHeadingElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        className={typographyVariants({ className, variant: "h4" })}
        {...props}
      />
    );
  },
);

const Text = forwardRef<
  HTMLParagraphElement,
  Omit<TypographyProps, "variant"> & {
    variant?: "body" | "bodySecondary" | "small" | "muted" | "lead";
  }
>(({ className, variant = "body", ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={typographyVariants({ className, variant })}
      {...props}
    />
  );
});

const Code = forwardRef<HTMLElement, Omit<TypographyProps, "variant">>(
  ({ className, ...props }, ref) => {
    return (
      <code
        ref={ref}
        className={typographyVariants({ className, variant: "code" })}
        {...props}
      />
    );
  },
);

H1.displayName = "H1";
H2.displayName = "H2";
H3.displayName = "H3";
H4.displayName = "H4";
Text.displayName = "Text";
Code.displayName = "Code";

export { H1, H2, H3, H4, Text, Code, typographyVariants };
