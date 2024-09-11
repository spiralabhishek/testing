import UserIcon from '@/components/Icons/userIcon';
import PopupScreen from '@/components/PopupScreen';
import Image from 'next/image';
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5';

const BannerScreen = ({ toggleScreen }: { toggleScreen: () => void }) => {
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
            title="באנר"
            headerLeft={leftArrow}
        >
            <div className="flex flex-col w-[459px] h-full mt-5 py-5">
                <div className="flex flex-col items-start py-6 px-4">
                    <textarea
                        className="w-full h-40 p-3 rounded-xl border border-gray-200 bg-gray-100 text-sm focus:outline-none"
                        placeholder="הודעה"
                        rows={4}
                    />
                </div>
                <div className="flex flex-col items-start px-4">
                    <input
                        type='text'
                        className="w-full h-10 p-3 rounded-xl border border-gray-200 bg-gray-100 text-sm focus:outline-none"
                        placeholder="קישור"
                    />
                </div>
                <div className="px-4 mt-[auto]">
                    <button className="w-full py-3 bg-yellow-400 text-white rounded-full text-lg font-semibold">
                        שמירה
                    </button>
                </div>
            </div>
        </PopupScreen>
    )
}

export default BannerScreen
