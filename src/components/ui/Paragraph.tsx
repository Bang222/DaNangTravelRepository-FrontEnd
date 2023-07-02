import * as React from 'react'
import {VariantProps, cva} from 'class-variance-authority'
import {cn} from "@/util/utils";

export const paragraphVariants = cva(
    'max-w-prose text-black-700 dark:text-black-300 mb-2',
    {
        variants: {
            size: {
                default: 'text-base sm:text-lg',
                sm: 'text-sm sm:text-base',
                lg: 'text-5xl sm:text-5xl',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
)

interface ParagraphProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof paragraphVariants> {
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({className, size, children, ...props}, ref) => {
        return (
            <p
                ref={ref}
                {...props}
                className={cn(paragraphVariants({size, className}))}>
                {children}
            </p>
        )
    }
)

Paragraph.displayName = 'Paragraph';

export default Paragraph;