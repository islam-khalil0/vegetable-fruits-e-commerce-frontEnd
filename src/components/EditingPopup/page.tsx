import React, { useEffect, useState } from 'react';
import Styles from './page.module.css';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { usePathname } from 'next/navigation';

interface EditingPopupProps {
    isEditingPopupVisible: boolean;
    toggleEditingPopup: () => void;
    id: number;
    name: string;
    price: number;
}

const EditingPopup: React.FC<EditingPopupProps> = ({
    isEditingPopupVisible,
    toggleEditingPopup,
    id,
    name,
    price,
}) => {
    const [upName, setUpName] = useState(name);
    const [upPrice, setUpPrice] = useState(price);
    const pathName = usePathname();

    useEffect(() => {
        if (isEditingPopupVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isEditingPopupVisible]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const apiUrl = determineApiUrl(pathName, id);

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ upName, upPrice }),
            });

            if (response.ok) {
                console.log('Data updating successfully');
                window.location.reload();
            } else {
                console.error('Failed to edit data');
            }
        } catch (error) {
            console.log('Error in time update product: ', error);
        }
    };

    const determineApiUrl = (path: string, itemId: number): string => {
        switch (path) {
            case '/admin/adminPage/vegetableEditingPage':
                return `https://vegetable-e-commerce.onrender.com/updateVegetable/${itemId}`;
            case '/admin/adminPage/fruitsEditingPage':
                return `https://vegetable-e-commerce.onrender.com/updateFruits/${itemId}`;
            default:
                return `https://vegetable-e-commerce.onrender.com/updateOffer/${itemId}`;
        }
    };

    return (
        <div>
            {isEditingPopupVisible && (
                <div className={Styles.popupOverlay}>
                    <div className={Styles.popupContent}>
                        <h2>عدل المنتج</h2>
                        <p>غير القيم واضغط تعديل</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="اكتب الاسم الجديد"
                                value={upName}
                                onChange={(e) => setUpName(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="اكتب السعر الجديد"
                                value={upPrice}
                                onChange={(e) => setUpPrice(e.target.value)}
                            />
                            <button type="submit">تعديل</button>
                        </form>
                        <span onClick={toggleEditingPopup}>
                            <IoIosCloseCircleOutline />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditingPopup;
