"use client";

import { createContext, useContext, useState } from "react";

const productsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [vegetablesList, setVegetablesList] = useState([]);
  const [fruitsList, setFruitsList] = useState([]);
  const [offersList, setOffersList] = useState([]);
  const [bannerImagesList, setBannerImagesList] = useState([]);

  const fetchDataOfVegetable = async () => {
    try {
      const response = await fetch(
        "https://vegetable-e-commerce.onrender.com/getVegetable"
      );
      const data = await response.json();
      setVegetablesList(data);
    } catch (error) {
      console.log("error in get vegetable data : ", error);
    }
  };

  const fetchDataOfFruits = async () => {
    try {
      const response = await fetch(
        "https://vegetable-e-commerce.onrender.com/getFruits"
      );
      const data = await response.json();
      setFruitsList(data);
    } catch (error) {
      console.log("error in get fruits data : ", error);
    }
  };

  const fetchDataOfOffers = async () => {
    try {
      const response = await fetch(
        "https://vegetable-e-commerce.onrender.com/getOffers"
      );
      const data = await response.json();
      setOffersList(data);
    } catch (error) {
      console.log("error in get offers data : ", error);
    }
  };

  const fetchBannerImages = async () => {
    try {
      const response = await fetch(
        "https://vegetable-e-commerce.onrender.com/getBannerImages"
      );
      const data = await response.json();
      setBannerImagesList(data);
    } catch (error) {
      console.log("error in get banner images : ", error);
    }
  };

  return (
    <productsContext.Provider
      value={{
        vegetablesList,
        fetchDataOfVegetable,
        fruitsList,
        fetchDataOfFruits,
        offersList,
        fetchDataOfOffers,
        bannerImagesList,
        fetchBannerImages,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

const useProductsContext = () => {
  return useContext(productsContext);
};

export { ProductsProvider, useProductsContext };
