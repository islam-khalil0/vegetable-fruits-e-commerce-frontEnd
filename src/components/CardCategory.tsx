import Image from 'next/image';
import React from 'react';

interface CardCategoryProps {
  cateTitle: string;
  cateImg: string;
}

const CardCategory: React.FC<CardCategoryProps> = ({ cateTitle, cateImg }) => {
  return (
    <div className='rounded flex flex-col items-center justify-center gap-8 cursor-pointerp-4'>
      <Image alt='category-image' src={cateImg} width={200} height={200} className='w-[20rem] rounded' />
      <h2 className='text-green-600 text-[25px]'>{cateTitle}</h2>
    </div>
  );
};

export default CardCategory;
