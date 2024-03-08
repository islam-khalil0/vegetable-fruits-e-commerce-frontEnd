import type { Metadata } from 'next'
import { Alexandria } from "next/font/google";
import SideBar from "../../../components/SideBar"


export const metadata: Metadata = {
    title: 'حسابي',
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex w-[100%] h-[100vh] max-xl:flex-col'>
            <SideBar />
            {children}
        </div>
    )
}
