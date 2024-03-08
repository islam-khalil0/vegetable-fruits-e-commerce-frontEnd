"use client"

import { usePathname } from "next/navigation"

export default function Footer() {

  const pathName = usePathname();

  return pathName === "/admin" || pathName === "/admin/adminPage" || pathName === "/admin/adminPage/fruitsEditingPage" || pathName === "/admin/adminPage/vegetableEditingPage" || pathName === "/admin/adminPage/offersEditingPage" || pathName === "/admin/adminPage/bannerEditingPage" ? null : (
    <footer className="bg-[#07aa18] mt-12 h-[10rem] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-evenly w-[100%] h-[100%]">
        <h1 className="text-white text-[2.5rem] font-bold">الفكهاني</h1>
        <p className="text-center text-xs leading-5 text-white">
          &copy; جميع الحقوق محفوظه للفكهاني 2024
        </p>
      </div>
    </footer>
  )
}