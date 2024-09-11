import UserIcon from '@/components/Icons/userIcon';
import PopupScreen from '@/components/PopupScreen';
import Image from 'next/image';
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5';

const PriceListScreen = ({ toggleScreen }: { toggleScreen: () => void }) => {
    const leftArrow = (
        <Image
            onClick={toggleScreen}
            src={"/left-arrow.svg"}
            width={16}
            height={16}
            alt="leftArrow"
            className="cursor-pointer"
        />
    );
    return (
        <PopupScreen
            title="מחירון"
            headerLeft={leftArrow}
        >
            <div className="flex flex-col w-[459px] h-full mt-5 py-5">
                <div className="p-6 max-w-sm w-full">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Work in Progress</h2>
                    <p className="text-gray-600 mb-6">
                        Were currently working on this feature. Stay tuned for updates!
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <div className="bg-blue-500 h-4 rounded-full" style={{ width: '65%' }}></div>
                    </div>

                    <p className="text-right text-gray-500 text-sm">65% Completed</p>
                </div>
            </div>
        </PopupScreen>
    )
}

export default PriceListScreen
