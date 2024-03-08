"use client";

import React, { useEffect, useState } from 'react';
import Styles from "./page.module.css";
import { useProductsContext } from '@/contexts/ProductsContext';
import ProductCard from '@/components/ProductCard';

const Page = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)

  const { vegetablesList, fetchDataOfVegetable } = useProductsContext();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('file', file);

      const response = await fetch("https://vegetable-e-commerce.onrender.com/addVegetable", {
        method: "POST",
        body: formData,
      });

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
      console.error("Error in adding a new item:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchDataOfVegetable();
  }, []);

  return (
    <div className={Styles.container}>
      <div className={Styles.ContainerForm}>
        <h1>من هنا تقدر تضيف الخضروات الجديده</h1>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='اسم الخضار' value={name} onChange={(e) => setName(e.target.value)} />
          <input type='number' placeholder='ايه سعره' value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type='file' onChange={handleFileChange} />
          <button type="submit" disabled={loading}>
            {loading ? 'جاري الرفع...' : 'انشر المنتج'}
          </button>
        </form>
      </div>
      <div className={Styles.listOfProducts}>
        <h1>الخضروات ال علي المنصة</h1>
        <div className={Styles.content}>
          {vegetablesList.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;