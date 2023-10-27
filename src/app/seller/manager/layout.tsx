'use client'
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import LayoutComponent from "@/components/layoutComponent";
import React from "react";
import {RootState} from "@/redux/store";


export default function RootLayout({children,}: { children: React.ReactNode }) {
    const isAuth = useSelector((state:RootState) => state.auth.value?.isAuth)
    const isActiveStore = useSelector((state:RootState) => state.auth.value?.user.store.isActive)
    const router = useRouter()
    return isAuth && isActiveStore === 'active' ? (
        <LayoutComponent role="seller"> {/* Nest children within LayoutComponent */}
            {children}
        </LayoutComponent>
    ) : (
        (() => {
            router.push('/'); // Redirect to the not-found page
            return null; // Return null if you use router.push to avoid rendering children
        })()
    );

}
