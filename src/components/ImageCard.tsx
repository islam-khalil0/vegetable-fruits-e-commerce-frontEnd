"use client";

import Image from 'next/image';
import React from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";


interface ProductCardProps {
    _id: string;
    imagePath: string;
    imageName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ _id, imagePath, imageName }) => {

    const deleteImage = async (id: string) => {
        try {
            await fetch(`https://vegetable-e-commerce.onrender.com/deleteImage/${id}`, {
                method: 'DELETE',
            });
            console.log("Deleted successfully");
            window.location.reload();
        } catch (error) {
            console.error("Error in delete item: ", error);
        }
    }

    return (
        <div className='relative min-w-[20rem] max-w-[20rem] h-[20rem] flex flex-col items-center justify-start gap-2 bg-white overflow-hidden rounded truncate'>
            <span className='absolute top-2 right-2 text-xl text-red-600 cursor-pointer' onClick={() => deleteImage(_id)} >
                <IoIosCloseCircleOutline />
            </span>
            <Image alt={imageName} src={imagePath} width={200} height={200} className='w-[100%] h-[100%] object-cover object-center' />
        </div>
    );
};

export default ProductCard;
