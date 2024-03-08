import type { Metadata } from 'next'
import { Alexandria } from "next/font/google";
import './globals.css'
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { ProductsProvider } from "../contexts/ProductsContext"


const alexandria = Alexandria({ subsets: ["latin", "arabic"] });

export const metadata: Metadata = {
  title: 'أفضل أصناف الفاكهة والخضار - الفكهاني',
  description: 'تصفح أجود أنواع الفاكهة والخضار في السوق. اكتشف تشكيلتنا الفريدة واستمتع بالجودة والطعم الرائع.',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar">
      <body className={alexandria.className} >
        <ProductsProvider>
          <NavBar />
          {children}
          <Footer />
        </ProductsProvider>
      </body>
    </html>
  )
}
