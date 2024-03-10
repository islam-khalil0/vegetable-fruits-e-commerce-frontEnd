import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Confetti = dynamic(() => import('react-confetti'), { ssr: false });
const RamadanPopup = dynamic(() => import('@/components/ramadanPopUp/page'));

const ConfettiComponent = () => {
  const [isConfettiActive, setConfettiActive] = useState(false);
  const [windowDem, setWindowDem] = useState({ width: 0, height: 0 });
  const [isPopupVisible, setPopupVisible] = useState(false);

  const detectSize = () => {
    setWindowDem({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      detectSize();
      window.addEventListener('resize', detectSize);

      return () => {
        window.removeEventListener('resize', detectSize);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
