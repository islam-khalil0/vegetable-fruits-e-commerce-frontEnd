"use client"

import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { RiMenu4Fill } from "react-icons/ri";
import { LuShoppingBag } from "react-icons/lu";
import { GiFruitBowl } from "react-icons/gi";
import { usePathname } from 'next/navigation';
import Link from 'next/link';


const navigation = [
  { name: 'الرئيسية', href: '/' },
  { name: 'الخضروات', href: '#vegetable' },
  { name: 'الفاكهة ', href: '#fruits' },
  { name: 'ايه الجديد', href: '#offers' },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [header, setHeader] = useState(false);

  const pathName = usePathname();


  // handle header
  const scrollHeader = () => {
    if (window.scrollY >= 20) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHeader);
    return () => {
      window.removeEventListener("scroll", scrollHeader);
    };
  }, []);


  return pathName === "/admin" || pathName === "/admin/adminPage" || pathName === "/admin/adminPage/fruitsEditingPage" || pathName === "/admin/adminPage/vegetableEditingPage" || pathName === "/admin/adminPage/offersEditingPage" || pathName === "/admin/adminPage/bannerEditingPage" ? null : (
    <header
      className={`w-full sticky top-[0] transition duration-300 z-10 bg-[#07aa18] ${header ? "backdrop-blur-md bg-[#07aa18]/30" : "bg-[#07aa18]"
        }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">الفكهاني</span>
            <span className='text-4xl text-white'>
              <GiFruitBowl />
            </span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white text-2xl"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <RiMenu4Fill />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white hover:text-green-300">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-white flex gap-2 items-start hover:text-green-300">
            سلتك  <span className='text-xl'><LuShoppingBag /></span>
          </a>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto  bg-[#07aa18] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">الفكهاني</span>
              <span className='text-4xl text-white'>
                <GiFruitBowl />
              </span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white text-2xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only text-white">Close menu</span>
              <RiMenu4Fill />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-green-400"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <a
                  onClick={() => setMobileMenuOpen(false)}
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-green-400"
                >
                  سلتك
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
