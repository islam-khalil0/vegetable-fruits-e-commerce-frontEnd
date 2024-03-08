"use client";

import React, { useEffect, useState } from 'react'
import Styles from "./page.module.css"
import { useProductsContext } from '@/contexts/ProductsContext';
import ProductCard from '@/components/ProductCard';
import ImageCard from "@/components/ImageCard";

const page = () => {

    const [file, setFile] = useState<null | File>(null);
    const [loading, setLoading] = useState(false)

    const { bannerImagesList, fetchBannerImages } = useProductsContext();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files?.[0] ?? null);
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch("https://vegetable-e-commerce.onrender.com/addBannerImages", {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                console.log('Data sent successfully');
                window.location.reload();
            } else {
                console.error('Failed to send data');
            }
            setFile(null);
        } catch (error) {
            console.log("error in add new item : ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBannerImages();
    }, [])


    return (
        <div className={Styles.container}>
            <div className={Styles.ContainerForm}>
                <h1>من هنا تقدر تضيف صور للبانر</h1>
                <form onSubmit={handleSubmit}>
                    <input type='file' onChange={handleFileChange} required />
                    <button type="submit" disabled={loading}>
                        {loading ? 'جاري الرفع...' : 'انشر الصورة'}
                    </button>
                </form>
            </div>
            <div className={Styles.listOfImages}>
                <h1>الصور الموجودة في البانر</h1>
                <div className={Styles.content}>
                    {
                        bannerImagesList.map((item, index) => (
                            <ImageCard key={index} {...item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default page