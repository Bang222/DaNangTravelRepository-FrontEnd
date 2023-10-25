'use client'

import { QueryClient,QueryClientProvider} from '@tanstack/react-query';
import React from "react";

// @ts-ignore
const Providers= ({ children }) => {
    const [queryClient] =  React.useState(()=> new QueryClient)
    return (
        <QueryClientProvider client={queryClient}>
                {children}
        </QueryClientProvider>

    )
}

export default Providers