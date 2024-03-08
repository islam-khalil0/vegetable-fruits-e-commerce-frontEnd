"use client";

import Image from 'next/image'
import Styles from "./page.module.css"
import infoImg from "../../public/infoImg.png"
import branchTree from "../../public/branchTree.png"
import ProductCard from '@/components/ProductCard'
import fixedImage from "../../public/hero-img.jpg"
import { FaWhatsapp } from "react-icons/fa";
import { useProductsContext } from '@/contexts/ProductsContext'
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

interface BannerImage {
  imagePath: string;
  imageName: string;
}

interface product {
  name: string;
  price: number;
  _id: string;
  imagePath: String;
  imageName: String;
}

export default function Home() {

  const { vegetablesList,
    fetchDataOfVegetable,
    fruitsList,
    fetchDataOfFruits,
    offersList,
    fetchDataOfOffers,
    bannerImagesList,
    fetchBannerImages
  } = useProductsContext();

  const [VegetablesLoading, setVegetablesLoading] = useState(true)
  const [fruitsLoading, setFruitsLoading] = useState(true)
  const [offersLoading, setOffersLoading] = useState(true)


  useEffect(() => {
    const fetchVegetableData = async () => {
      try {
        await fetchDataOfVegetable();
        setVegetablesLoading(false);
      } catch (error) {
        console.error("Error fetching vegetable data:", error);
      }
    };

    const fetchFruitsData = async () => {
      try {
        await fetchDataOfFruits();
        setFruitsLoading(false);
      } catch (error) {
        console.error("Error fetching vegetable data:", error);
      }
    };

    const fetchOffersData = async () => {
      try {
        await fetchDataOfOffers();
        setOffersLoading(false);
      } catch (error) {
        console.error("Error fetching vegetable data:", error);
      }
    };
    const fetchBanner = async () => {
      try {
        await fetchBannerImages();
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };

    fetchVegetableData();
    fetchFruitsData();
    fetchOffersData();
    fetchBanner();
  }, [])


  return (
    <div className={Styles.container}>

      <div className={Styles.icon}>
        <a href='https://wa.me/+201120560632' target='_blank'>
          <FaWhatsapp />
        </a>
      </div>

      <div className={Styles.heroSection}>
        <div className={Styles.content}>
          <h1>ال<span className='text-[#07aa18]'>فكه</span>اني</h1>
          <p>في عالم مليء بتنوع الطبيعة وجمال الأرض، تبرز "الفكهاني" كوجهة لا مثيل لها لاكتشاف أجود أنواع الفاكهة والخضار. نحن نفتخر بتقديم مجموعة متنوعة ومتميزة من المنتجات الطازجة التي تلبي أعلى معايير الجودة.</p>
          <button className='text-2xl'>شوف انت عايز ايه</button>
        </div>
      </div>

      <div className={Styles.infoSection}>
        <Image className={Styles.branchTree} src={branchTree} alt='branch tree' />
        <h1>أهلاً بك في <span className='text-[#07aa18] font-bold'>الفكهاني</span> - وجهتك المميزة لشراء الفاكهة والخضار!</h1>
        <div className={Styles.infoContainer}>
          <div className={Styles.infoImage}>
            <Image src={infoImg} alt='info image' />
          </div>
          <div className={Styles.infoContent}>
            <h3>مين احنا ؟!</h3>
            <p>احنا هنا لنقدم لك تجربة فريدة ومميزة في عالم الطازج واللذيذ. في "الفكهاني"، نجعل من تجارة الفاكهة والخضار تجربة استثنائية. نفتخر بتوفير أعلى معايير الجودة وأفضل اختيار من المنتجات الطازجة، حيث نسعى دائماً لتلبية توقعاتك وتحقيق رضاك.</p>
            <small>شكرًا لاختياركم "الفكهاني"، حيث يلتقي الجودة بالتميز في كل لحظة طعام!</small>
            <span className={Styles.btnGroup}>
              <button>اشتري دلوقتي</button>
              <button>شوف الاصناف</button>
            </span>
          </div>
        </div>
      </div>
      <div className={Styles.imageSlider}>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          className={Styles.Swiper}
          spaceBetween={10}
          slidesPerView={1.5}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {bannerImagesList.map((item: BannerImage, index: number) => (
            <SwiperSlide className={Styles.SwiperSlide} key={index}>
              <Image src={item.imagePath} alt={item.imageName} width={1000} height={700} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      {/* vegetable section */}
      <div className={Styles.vegetables} id='vegetable'>
        <div className="flex items-center justify-between w-[100%] ">
          <h1>الخضروات</h1>
          {
            vegetablesList.length >= 4 &&
            <Link href="/vegetablesPage">
              <p className='bg-gray-300 py-2 px-4 rounded-3xl text-black cursor-pointer text-sm'>اعرض اكتر</p>
            </Link>
          }
        </div>
        <div className={Styles.content}>
          {
            VegetablesLoading ? (
              <div className={Styles.spinnerContainer}>
                <div className={Styles.spinner}>
                  <div className={Styles.spinner}>
                    <div className={Styles.spinner}>
                      <div className={Styles.spinner}>
                        <div className={Styles.spinner}>
                          <div className={Styles.spinner}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              vegetablesList.slice(0, 4).map((item: product, index: number) => (
                <ProductCard key={index} {...item} />
              )))
          }
        </div>
      </div>

      {/* fruits section */}
      <div className={Styles.fruits} id='fruits'>
        <div className="flex items-center justify-between w-[100%] ">
          <h1>الفواكه</h1>
          {
            fruitsList.length >= 4 &&
            <Link href="/fruitsPage">
              <p className='bg-gray-300 py-2 px-4 rounded-3xl text-black cursor-pointer text-sm'>اعرض اكتر</p>
            </Link>
          }
        </div>
        <div className={Styles.content}>
          {
            fruitsLoading ? (
              <div className={Styles.spinnerContainer}>
                <div className={Styles.spinner}>
                  <div className={Styles.spinner}>
                    <div className={Styles.spinner}>
                      <div className={Styles.spinner}>
                        <div className={Styles.spinner}>
                          <div className={Styles.spinner}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              fruitsList.slice(0, 4).map((item: product, index: number) => (
                <ProductCard key={index} {...item} />
              )))
          }
        </div>
      </div>

      <div className={Styles.viewSection}>
        <div className={Styles.content}>
          <h1>اطلب اليوم واستمتع بالطازجة كما لم تفعل من قبل!</h1>
          <p>
            احتفال بالنكهة والتغذية والاستدامة هل أنت مستعد للانطلاق في رحلة اللذة؟ تصفح موقعنا، املأ سلة التسوق الخاصة بك بخيرات الطبيعة، ودعنا نقدم لك الطازجة. في الفكهاني, كل لقمة هي احتفال بالنكهة والتغذية والاستدامة</p>
        </div>
      </div>

      {/* offers section */}
      <div className={Styles.offers} id='offers'>
        <div className="flex items-center justify-between w-[100%] ">
          <h1>ايه الجديد</h1>
          {
            offersList.length >= 4 &&
            <Link href="/OffersPage">
              <p className='bg-gray-300 py-2 px-4 rounded-3xl text-black cursor-pointer text-sm'>اعرض اكتر</p>
            </Link>
          }
        </div>
        <div className={Styles.content}>
          {
            offersLoading ? (
              <div className={Styles.spinnerContainer}>
                <div className={Styles.spinner}>
                  <div className={Styles.spinner}>
                    <div className={Styles.spinner}>
                      <div className={Styles.spinner}>
                        <div className={Styles.spinner}>
                          <div className={Styles.spinner}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (

              offersList.slice(0, 4).map((item: product, index: number) => (
                <ProductCard key={index} {...item} />
              )))
          }
        </div>
      </div>

      <div className={Styles.fixedImage}>
        <Image alt='panier image' src={fixedImage} width={500} height={500} className={Styles.img} />
      </div>

    </div>

  )
}
