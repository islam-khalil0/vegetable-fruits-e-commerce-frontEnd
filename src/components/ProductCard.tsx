"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Popup from './Popup/page';
import EditingPopup from './EditingPopup/page';

interface ProductCardProps {
  name: string;
  price: number;
  _id: string;
  imagePath: String,
  imageName: String,
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, _id, imagePath, imageName }) => {

  const pathName = usePathname();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  // editing popup
  const [isEditingPopupVisible, setEditingPopupVisible] = useState(false);

  const toggleEditingPopup = () => {
    setEditingPopupVisible(!isEditingPopupVisible);
  };



  const deleteOffers = async (id: string) => {
    try {
      await fetch(`https://vegetable-e-commerce.onrender.com/deleteOffers/${id}`, {
        method: 'DELETE',
      });
      console.log("Deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error in delete item: ", error);
    }
  }

  const deleteFruits = async (id: string) => {
    try {
      await fetch(`https://vegetable-e-commerce.onrender.com/deleteFruits/${id}`, {
        method: 'DELETE',
      });
      console.log("Deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error in delete item: ", error);
    }
  }

  const deleteVegetable = async (id: string) => {
    try {
      await fetch(`https://vegetable-e-commerce.onrender.com/deleteVegetable/${id}`, {
        method: 'DELETE',
      });
      console.log("Deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error in delete item: ", error);
    }
  }
  return (
    <div className='min-w-[20rem] max-w-[20rem] h-[26rem] flex flex-col items-center justify-start gap-2 bg-white overflow-hidden rounded truncate'>
      <Image alt={imageName} src={imagePath} width={200} height={200} className='w-[100%] h-[60%] object-cover object-center' />
      <div className='w-[100%] h-[40%] flex flex-col items-center justify-evenly'>

        <h2 className='text-[#07aa18] text-2xl'>{name}</h2>
        <h3 className='text-xl'>
          {price} <span className='text-gray-700'>جنيه</span>
        </h3>

        {pathName === "/admin/adminPage/fruitsEditingPage" || pathName === "/admin/adminPage/vegetableEditingPage" || pathName === "/admin/adminPage/offersEditingPage"
          ? (
            <>
              <div className='w-full flex items-center justify-evenly p-2'>
                <h3 className='text-red-600 cursor-pointer' onClick={() => pathName === "/admin/adminPage/fruitsEditingPage" ? deleteFruits(_id) : pathName === "/admin/adminPage/vegetableEditingPage" ? deleteVegetable(_id) : pathName === "/admin/adminPage/offersEditingPage" ? deleteOffers(_id) : null}>حذف</h3>
                <h3 className='text-green-600 cursor-pointer' onClick={toggleEditingPopup}>تعديل</h3>
              </div>
              <EditingPopup toggleEditingPopup={toggleEditingPopup} isEditingPopupVisible={isEditingPopupVisible} id={_id} name={name} price={price} />
            </>

          )
          : (
            <>
              <button onClick={togglePopup} className="mt-4 bg-transparent border border-solid border-green-500 rounded-md py-2 px-4 transition-all ease-in duration-300 hover:bg-[#07aa18] hover:text-[#ffff]">اضف الي سلتك</button>
              <Popup togglePopup={togglePopup} isPopupVisible={isPopupVisible} />
            </>
          )
        }
      </div>
    </div>
  );
};

export default ProductCard;
