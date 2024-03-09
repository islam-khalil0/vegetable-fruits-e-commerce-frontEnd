import React, { useEffect } from 'react';
import Styles from './page.module.css';
import { IoMdClose } from "react-icons/io";



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
                        <span onClick={togglePopup}><IoMdClose /></span>
                        <h2>كل عام وأنتم بخير بمناسبة حلول شهر رمضان الكريم!</h2>
                        <p> نتقدم بأسمى آيات التهاني والتبريكات بمناسبة حلول شهر رمضان المبارك، شهر الرحمة والمغفرة والعتق من النار, نُقدم لكم خلال شهر رمضان الكريم مجموعة متنوعة من الفواكه والخضروات الطازجة باسعار مناسبة، لتسهيل تحضير وجبات إفطار شهية وصحية.</p>
                        <small className='text-[#07aa18]'>نتمنى لكم شهرًا مباركًا مليئًا بالخير والبركات، وأن يُعيده الله علينا وعليكم باليمن والبركات.</small>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Popup;
