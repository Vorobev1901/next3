'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Loader } from 'lucide-react';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md outline-none text-sm font-semibold transition-colors disabled:pointer-events-none disabled:bg-gray-500 focus-visible:outline-black outline-offset-0',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:text-[#979592] disabled:bg-gray-100',
                destructive: 'text-destructive hover:text-destructive/90',
                outline: 'border border-primary text-primary bg-transparent hover:bg-secondary',
                secondary: 'bg-secondary text-primary hover:bg-primary/10',
                ghost: 'hover:bg-secondary hover:text-secondary-foreground disabled:bg-white',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 lg:h-12 px-4 py-2',
                sm: 'h-8 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-8 w-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, children, disabled, loading, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                disabled={disabled || loading}
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}>
                {!loading ? children : <Loader className="w-5 h-5 animate-spin" />}
            </Comp>
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };