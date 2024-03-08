"use client";

import React, { useEffect, useState } from "react";
import Styles from "./page.module.css";
import { useProductsContext } from "@/contexts/ProductsContext";
import ProductCard from "@/components/ProductCard";

const page = () => {
  const { vegetablesList, fetchDataOfVegetable } = useProductsContext();
  const [VegetablesLoading, setVegetablesLoading] = useState(true);

  useEffect(() => {
    const fetchVegetableData = async () => {
      try {
        await fetchDataOfVegetable();
        setVegetablesLoading(false);
      } catch (error) {
        console.error("Error fetching vegetable data:", error);
      }
    };

    fetchVegetableData();
  }, []);

  return (
    <div className={Styles.container}>
      <h1>الخضروات</h1>
      <div className={Styles.contentContainer}>
        {VegetablesLoading ? (
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
          vegetablesList.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))
        )}
      </div>
    </div>
  );
};

export default page;
