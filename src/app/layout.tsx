import './globals.css'
import {Inter} from 'next/font/google'
import React from "react";
import QueryClientProvider from "@/app/util/Provider";
import ReduxProvider from "@/redux/Provider";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Metadata} from "next";
import icon from '../../public/iconDaNangTraVelPage.png'

const inter = Inter({subsets: ['latin']})

export const metadata:Metadata = {
    title: 'Travel Page',
    description: 'Final year of mine',
    icons: {
        icon: icon.src,
        apple:icon.src,
    }
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
