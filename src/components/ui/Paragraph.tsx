import * as React from 'react'
import {VariantProps, cva} from 'class-variance-authority'
import {cn} from "@/util/utils";

export const paragraphVariants = cva(
    ' text-black-700 mb-2',
    {
        variants: {
            size: {
                default: 'text-base sm:text-base',
                md:'text-2xl sm:text-xl',
                sm: 'text-sm sm:text-base',
                lg: 'text-5xl sm:text-5xl',
                sx: 'text-[8px] sm:text-[12px]'
            },
            status: {
                default: '',
                error:'text-red-500 mb-0 pt-2 sm:text-[14px] max-sm:text-[10px]'
            }
        },
        defaultVariants: {
            size: 'default',
            status: 'default'
        },
    }
)

interface ParagraphProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof paragraphVariants> {
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({className, size,status, children, ...props}, ref) => {
        return (
            <p
                ref={ref}
                {...props}
                className={cn(paragraphVariants({status, size, className}))}>
                {children}
            </p>
        )
    }
)

Paragraph.displayName = 'Paragraph';

export default Paragraph;