import { type ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-(--radius-button) px-6 py-2.5 text-[13px] font-medium font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-focus-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  variants: {
    variant: {
      primary:
        "bg-button-primary text-button-primary-foreground hover:bg-button-primary-hover",
      secondary:
        "border border-devroast-border text-devroast-text-primary hover:bg-devroast-surface",
      ghost:
        "text-devroast-text-secondary hover:bg-devroast-surface hover:text-devroast-text-primary",
    },
    size: {
      default: "px-6 py-2.5",
      sm: "px-4 py-2 text-xs",
      lg: "px-7 py-3 text-sm",
      icon: "size-10 p-0",
    },
    fullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, fullWidth, size, type = "button", variant, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ className, fullWidth, size, variant })}
        ref={ref}
        type={type}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
