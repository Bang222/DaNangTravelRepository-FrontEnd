import * as React from 'react'
import {VariantProps, cva} from 'class-variance-authority'
import {cn} from "@/util/utils";

export const paragraphVariants = cva(
    'text-black-700 max-sm:text-[8px] dark:text-black-300',
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

interface LabelProps
    extends React.HTMLAttributes<HTMLLabelElement>,
        VariantProps<typeof paragraphVariants> {
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
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

Label.displayName = 'Label';

export default Label;