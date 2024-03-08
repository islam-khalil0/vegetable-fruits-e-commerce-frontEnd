"use client";

import React, { useEffect, useState } from "react";
import Styles from "./page.module.css";
import { useProductsContext } from "@/contexts/ProductsContext";
import ProductCard from "@/components/ProductCard";

const page = () => {
  const { offersList, fetchDataOfOffers } = useProductsContext();
  const [OffersLoading, setOffersLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        await fetchDataOfOffers();
        setOffersLoading(false);
      } catch (error) {
        console.error("Error fetching vegetable data:", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className={Styles.container}>
      <h1>ايه الجديد</h1>
      <div className={Styles.contentContainer}>
        {OffersLoading ? (
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
          offersList.map((item, index) => <ProductCard key={index} {...item} />)
        )}
      </div>
    </div>
  );
};

export default page;
