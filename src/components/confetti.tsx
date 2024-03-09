"use client";

import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import RamadanPopup from "@/components/ramadanPopUp/page"

const ConfettiComponent = () => {
  const [isConfettiActive, setConfettiActive] = useState(false);
  const [windowDem, setWindowDem] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [isPopupVisible, setPopupVisible] = useState(false);

  const detectSize = () => {
    setWindowDem({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowDem]);

  useEffect(() => {
    const hasEffectRunBefore = localStorage.getItem('hasEffectRun');

    if (!hasEffectRunBefore) {
      setConfettiActive(true);

      const confettiTimer = setTimeout(() => {
        setConfettiActive(false);
        localStorage.setItem('hasEffectRun', 'true');
      }, 8000);

      const popupTimer = setTimeout(() => {
        setPopupVisible(true);
      }, 500);

      return () => {
        clearTimeout(confettiTimer);
        clearTimeout(popupTimer);
      };
    }
  }, []);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      {isConfettiActive && (
        <Confetti
          width={windowDem.width}
          height={windowDem.height}
        />
      )}

      {isPopupVisible && (
        <RamadanPopup togglePopup={togglePopup} isPopupVisible={isPopupVisible} />
      )}
    </div>
  );
};

export default ConfettiComponent;
