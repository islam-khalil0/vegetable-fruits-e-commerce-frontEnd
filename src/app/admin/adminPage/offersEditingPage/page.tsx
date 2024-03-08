"use client";

import React, { useEffect, useState } from 'react'
import Styles from "./page.module.css"
import { useProductsContext } from '@/contexts/ProductsContext';
import ProductCard from '@/components/ProductCard';

const page = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState<null | File>(null); const [loading, setLoading] = useState(false)
  const { offersList, fetchDataOfOffers } = useProductsContext();


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] ?? null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {

      if (file === null) {
        console.error('File is null.');
        return;
      }
      
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('file', file);

      const response = await fetch("https://vegetable-e-commerce.onrender.com/addOffers", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        console.log('Data sent successfully');
        window.location.reload();
      } else {
        console.error('Failed to send data');
      }
      setName('');
      setPrice('');
      setFile(null);
    } catch (error) {
      console.log("error in add new item :", error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataOfOffers();
  }, [])


  return (
    <div className={Styles.container}>
      <div className={Styles.ContainerForm}>
        <h1>من هنا تقدر تضيف العروض او الاصناف الجديده</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='اسم الخضار او الفاكهه' value={name} onChange={(e) => setName(e.target.value)} />
          <input type='number' placeholder='ايه سعره' value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type='file' onChange={handleFileChange} />
          <button type="submit" disabled={loading}>
            {loading ? 'جاري الرفع...' : 'انشر المنتج'}
          </button>
        </form>
      </div>
      <div className={Styles.listOfProducts}>
        <h1>العروض والاصناف الجديده ال علي المنصة</h1>
        <div className={Styles.content}>
          {
            offersList.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default page