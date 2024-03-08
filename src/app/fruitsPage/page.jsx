"use client";

import React, { useEffect, useState } from "react";
import Styles from "./page.module.css";
import { useProductsContext } from "@/contexts/ProductsContext";
import ProductCard from "@/components/ProductCard";

const page = () => {
  const { fruitsList, fetchDataOfFruits } = useProductsContext();
  const [Fruits, setFruits] = useState(true);

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        await fetchDataOfFruits();
        setFruits(false);
      } catch (error) {
        console.error("Error fetching vegetable data:", error);
      }
    };

    fetchFruits();
  }, []);

  return (
    <div className={Styles.container}>
      <h1>الفواكة</h1>
      <div className={Styles.contentContainer}>
        {Fruits ? (
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
          fruitsList.map((item, index) => <ProductCard key={index} {...item} />)
        )}
      </div>
    </div>
  );
};

export default page;
