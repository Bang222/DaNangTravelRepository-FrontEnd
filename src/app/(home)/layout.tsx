import React from 'react'
import Navbar from "@/components/Navbar";
import Introduction from "@/components/Introduction";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return <main>
        <Navbar/>
        <section className={'pt-7 lg:grid lg:grid-cols-4 lg:gap-3 container mx-auto px-auto'}>
            {children}
            <section className={'lg:block'}>
                <Introduction/>
            </section>

        </section>
    </main>
}