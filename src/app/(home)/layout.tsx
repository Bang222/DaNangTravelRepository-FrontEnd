import React from 'react'
import Navbar from "@/components/Navbar";
import Introduction from "@/components/Introduction";

export default async function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <main className={'bg-zinc-200 h-6/6 font-poppins'} >
            <Navbar/>
            <div className={'h-[130px] lg:h-[70px]'}></div>
                <section className={'pt-7 lg:grid lg:grid-cols-4 lg:gap-3 container mx-auto px-auto'}>
                    {children}
                    <section className={'hidden lg:block fixed lg:right-[2%]'}>
                        <Introduction/>
                    </section>
                </section>
        </main>
    )
}