'use client'
import React from 'react'
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    const isAuth = useSelector((state) => state.auth.value?.isAuth)
    const router = useRouter()
    return isAuth ? <main className={'font-poppins bg-neutral-100 overflow-hidden'}>{children}</main> : router.push('/login')
}