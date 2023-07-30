import './globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import QueryClientProvider from "@/app/util/Provider";
import ReduxProvider from "@/redux/Provider";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Travel Page',
    description: 'Final year of mine',
}
export default function RootLayout({children,}: { children: React.ReactNode }) {
    return (
            <QueryClientProvider>
                <html lang="en">
                     <body className={inter.className}>
                     <ReduxProvider>
                             {children}
                     </ReduxProvider>
                    </body>
                </html>
            </QueryClientProvider>
    )
}
