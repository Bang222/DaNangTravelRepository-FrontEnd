'use client'
import React from 'react'
import {GoogleOAuthProvider} from "@react-oauth/google";

export default function RootLayout({children,}: { children: React.ReactNode }) {
    const isAuth = useSelector((state:RootState) => state.auth.value.isAuth);
    const router = useRouter();
    return !isAuth ?  <main className={'relative text-white w-screen h-screen z-10 font-poppins'}
                 style={{
                     backgroundImage: `url(${bg.src})`,
                     backgroundSize: 'cover',
                     backgroundRepeat: 'no-repeat',
                 }}>
        <div className={'absolute h-full w-full bg-black z-10 opacity-70 '}>
        </div>
        <GoogleOAuthProvider clientId='373533503121-q9ium2dd7ko1mld7sdalde2o3g3ksr09.apps.googleusercontent.com'>
        {children}
        </GoogleOAuthProvider>
    </main>
        : router.push('/')
}