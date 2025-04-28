'use client';

import Head from 'next/head';
import { Navbar } from './Navbar2';
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }){
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith('/auth','/dashboard');

    if (isAuthPage) {
        return children;
    }

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar/>
            <main>{children}</main>
        </>
    );
}