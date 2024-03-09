import React, { useEffect } from 'react';
import Styles from './page.module.css';

interface PopupProps {
    isPopupVisible: boolean;
    togglePopup: () => void;
}

const Popup: React.FC<PopupProps> = ({ isPopupVisible, togglePopup }) => {

    useEffect(() => {
        if (isPopupVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPopupVisible]);

    return (
        <div>
            {isPopupVisible && (
                <div className={Styles.popupOverlay}>
                    <div className={Styles.popupContent}>
                        <h2>اهلا بيك</h2>
                        <p>للاسف خدمة انك تشتشري من الموقع غير متوفرة حاليا, ولاكن اذا كان في اقبال علي الموضوع سيتم العمل عليها. <a className='cursor-pointer text-[#07aa18] text-sm' href='https://wa.me/+201120560632' target='_blank'>تقدر تتواصل واتساب</a> </p>
                        <button onClick={togglePopup} className="mt-4 bg-transparent border border-solid border-green-500 rounded-md py-2 px-4 transition-all ease-in duration-200 hover:bg-[#07aa18] hover:text-[#ffff]">اغلاق</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popup;
