'use client'

import { QueryClient, QueryClientProvider } from 'react-query';
import { FC, ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

const queryClient = new QueryClient()

const Providers: FC<LayoutProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default Providers