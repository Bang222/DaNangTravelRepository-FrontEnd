import React from "react";
import Navbar from "@/components/user/navbar/Navbar";
import NavMobile from "@/components/user/navbar/NavMobile";

export default async function RootLayout({children,}: { children: React.ReactNode }) {
    return (
        <main className={'font-poppins bg-neutral-400'} >
                {children}
        </main>
    )
}
