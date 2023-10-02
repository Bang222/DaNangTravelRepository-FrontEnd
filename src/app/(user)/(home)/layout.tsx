import React from 'react'
import Navbar from "@/components/user/navbar/Navbar";
import Introduction from "@/components/user/Introduction";
import NavMobile from "@/components/user/navbar/NavMobile";

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
