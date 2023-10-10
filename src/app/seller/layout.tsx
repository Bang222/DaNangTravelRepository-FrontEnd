'use client'
import React from 'react'
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    const isAuth = useSelector((state) => state.auth.value?.isAuth)
    const isActive = useSelector((state) => state.auth.value?.user.store.isActive)
    const router = useRouter()
    if (isAuth && isActive === 'active') {
        return <main className={'font-poppins bg-neutral-100'}>{children}</main>;
    } else if(isAuth && isActive === 'close') {
        router.push('/');
       
        return null;
    }
}
