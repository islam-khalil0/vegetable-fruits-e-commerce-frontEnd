"use client";

import Link from 'next/link';
import { GiFruitBowl } from 'react-icons/gi';
import { usePathname } from 'next/navigation';

const navigation = [
    { name: 'الفاكهة', href: '/admin/adminPage/fruitsEditingPage' },
    { name: 'الخضروات', href: '/admin/adminPage/vegetableEditingPage' },
    { name: 'العروض', href: '/admin/adminPage/offersEditingPage' },
    { name: 'البانر', href: '/admin/adminPage/bannerEditingPage' },
];

const SideBar = () => {

    const pathName = usePathname();

    return (
        <>
            <div className='bg-[#07aa18] h-[full] w-[25%] shadow-lg flex flex-col p-6 justify-start items-start truncate max-xl:hidden'>

                <Link href="/admin/adminPage" className='flex items-center gap-2'>
                    <h1 className='text-white text-3xl font-bold'>الفكهاني</h1>
                    <span className='text-[3rem] text-white'>
                        <GiFruitBowl />
                    </span>
                </Link>

                <div className='flex flex-col gap-4 mt-10 w-full'>
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className={`text-xl text-white w-full p-2 rounded ${pathName === item.href ? 'bg-green-400' : 'hover:bg-green-400'}`}>
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className='flex flex-row gap-4 p-4 items-center justify-center flex-wrap hidden max-xl:flex w-[100%]'>
                {navigation.map((item) => (
                    <Link key={item.name} href={item.href} className={`text-xl text-black w-full py-2 px-6 rounded h-[max-content] w-[max-content] ${pathName === item.href ? 'bg-green-400' : 'hover:bg-green-400'}`}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </>
    );
};

export default SideBar;
