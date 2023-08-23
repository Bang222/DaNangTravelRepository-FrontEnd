import './globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import QueryClientProvider from "@/app/util/Provider";
import ReduxProvider from "@/redux/Provider";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProvidersWrapper from "@/components/authForm/ProvidersWrapper";
import {GoogleOAuthProvider} from "@react-oauth/google";

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
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            </body>
            </html>
        </QueryClientProvider>
    )
}
