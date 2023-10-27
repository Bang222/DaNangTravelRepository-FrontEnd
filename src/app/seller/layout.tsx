'use client'
import React from 'react'
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {RootState} from "@/redux/store";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    const isAuth = useSelector((state:RootState) => state.auth.value?.isAuth)
    const router = useRouter()
    return isAuth ? <main className={'font-poppins bg-neutral-100'}>{children}</main> : router.push('/login')
}
