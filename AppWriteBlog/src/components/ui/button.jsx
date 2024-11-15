import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-600", // Default button style
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:text-white dark:hover:bg-red-800", // Destructive button style
        outline:
          "border border-zinc-200 text-zinc-900 bg-white hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800", // Outline button style
        secondary:
          "bg-green-500 text-white hover:bg-green-600 dark:bg-green-700 dark:text-white dark:hover:bg-green-800", // Updated secondary button style
        ghost:
          "bg-transparent text-zinc-900 hover:bg-yellow-100 dark:bg-transparent dark:text-yellow-300 dark:hover:bg-yellow-500/10", // Updated ghost button style
        link: "text-purple-600 underline-offset-4 hover:underline dark:text-purple-400", // Updated link button style
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);


const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
