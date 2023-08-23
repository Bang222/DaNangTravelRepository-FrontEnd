'use client'
import React from 'react'
import {GoogleOAuthProvider} from "@react-oauth/google";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    return <main className={'relative text-white w-screen h-screen z-10 font-poppins'}
                 style={{
                     backgroundImage: `url(${'https://vietravelasia.com/api/files/202306271350-27d15e1f93-MAIN%20BANNER-01.jpg'})`,
                     backgroundSize: 'cover',
                     backgroundRepeat: 'no-repeat',
                 }}>
        <div className={'absolute h-full w-full bg-black z-10 opacity-70 '}></div>
        <GoogleOAuthProvider clientId='373533503121-q9ium2dd7ko1mld7sdalde2o3g3ksr09.apps.googleusercontent.com'>
        {children}
        </GoogleOAuthProvider>
    </main>
}