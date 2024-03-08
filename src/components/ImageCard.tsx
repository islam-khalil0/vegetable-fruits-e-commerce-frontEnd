"use client";

import Image from 'next/image';
import React from 'react';

interface ProductCardProps {
    _id: string;
    imagePath: String,
    imageName: String,
}

const ProductCard: React.FC<ProductCardProps> = ({ _id, imagePath, imageName }) => {


    return (
        <div className='min-w-[20rem] max-w-[20rem] h-[20rem] flex flex-col items-center justify-start gap-2 bg-white overflow-hidden rounded truncate'>
            <Image alt={imageName} src={imagePath} width={200} height={200} className='w-[100%] h-[100%] object-cover object-center' />
        </div>
    );
};

export default ProductCard;
