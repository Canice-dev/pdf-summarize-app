import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// const buttonVariants = cva(
//   "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
//   {
//     variants: {
//       variant: {
//         // default: "bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer",
//         default: "  bg-[#0783F5] text-white px-5 py-2.5 text-sm font-semibold tracking-wide rounded-lg shadow-[0_1px_2px_rgba(7,131,245,0.3)] hover:bg-[#0670d4] hover:shadow-[0_4px_12px_rgba(7,131,245,0.35)] active:scale-[0.98] active:shadow-none transition-all duration-150 ease-out cursor-pointer",
//         outline:
//           "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 cursor-pointer",
//         secondary:
//           "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground cursor-pointer",
//         ghost:
//           "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 cursor-pointer",
//         destructive:
//           "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40 cursor-pointer",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default:
//           "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
//         xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
//         sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
//         lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
//         icon: "size-8",
//         "icon-xs":
//           "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
//         "icon-sm":
//           "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
//         "icon-lg": "size-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-150 ease-out outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#1B3A6B] text-white tracking-tight rounded-2xl hover:bg-[#1B3A6B]/80 active:not-aria-[haspopup]:translate-y-0 active:scale-[0.97] active:shadow-[0_2px_8px_rgba(7,131,245,0.3)] cursor-pointer",
        outline:
          "border-border bg-background rounded-2xl hover:bg-muted text-[#1B3A6B] hover:text-[#1B3A6B] aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 active:not-aria-[haspopup]:translate-y-0 active:scale-[0.97] cursor-pointer",
        secondary:
          "bg-secondary text-secondary-foreground rounded-2xl hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground active:not-aria-[haspopup]:translate-y-0 active:scale-[0.97] cursor-pointer",
        ghost:
          "rounded-2xl hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 active:not-aria-[haspopup]:translate-y-0 active:scale-[0.97] cursor-pointer",
        destructive:
          "bg-destructive/10 text-destructive rounded-2xl hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40 active:not-aria-[haspopup]:translate-y-0 active:scale-[0.97] cursor-pointer",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 gap-2.5 px-7 text-[15px]",
        xs:      "h-7  gap-1   px-3.5 text-xs  rounded-xl [&_svg:not([class*='size-'])]:size-3",
        sm:      "h-9  gap-1.5 px-5   text-sm  rounded-xl [&_svg:not([class*='size-'])]:size-3.5",
        lg:      "h-13 gap-3   px-9   text-base",
        icon:      "size-11 rounded-2xl",
        "icon-xs": "size-7  rounded-xl [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-9  rounded-xl [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-13 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
