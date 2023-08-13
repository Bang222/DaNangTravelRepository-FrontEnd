import React from 'react'
import {useSelector} from "react-redux";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return <main >{children}</main>
}