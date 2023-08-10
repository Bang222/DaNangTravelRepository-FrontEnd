import React from 'react'
import Navbar from "@/components/Navbar";
import Introduction from "@/components/Introduction";
import NavMobile from "@/components/NavMobile";

export default async function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <main className={'bg-zinc-200 h-6/6 font-poppins'} >
            <Navbar/>
            <div className={'h-[130px] nh:h-[70px]'}></div>
                <section>
                    {children}
                </section>
            <NavMobile/>
        </main>
    )
}