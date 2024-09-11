import UserIcon from '@/components/Icons/userIcon';
import PopupScreen from '@/components/PopupScreen';
import Image from 'next/image';
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5';

const ProfileScreen = ({ toggleScreen }: { toggleScreen: () => void }) => {
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
            className="w-full h-full z-20 left-20"
            title="פרופיל"
            headerLeft={leftArrow}
        >
            <div className='flex flex-col w-[459px] h-full mt-5 py-5'>
                <div className="flex flex-col space-y-3">
                    {/* Modal Header/Title */}
                    <input className="bg-[#E6F0FA] rounded-xl p-3 text-black" placeholder="שם" />
                    <input className="bg-[#E6F0FA] rounded-xl p-3 text-black" placeholder="עסק" />
                    <input className="bg-[#E6F0FA] rounded-xl p-3 text-black" placeholder="טלפון" />
                    <input className="bg-[#E6F0FA] rounded-xl p-3 text-black" placeholder="אימייל" />
                    <input className="bg-[#E6F0FA] rounded-xl p-3 text-black" placeholder="אזור / יישוב" />

                    <div className="bg-[#E6F0FA] rounded-xl p-3 ">
                        <p className="text-black">תחום</p>
                        <div className="flex gap-3 mt-2">
                            <span className="bg-[#3EABF8] text-white rounded-full px-3 py-1">חשמלאי</span>
                            <span className="bg-[#3EABF8] text-white rounded-full px-3 py-1">חשמלאי</span>
                            <span className="bg-[#3EABF8] text-white rounded-full px-3 py-1">חשמלאי</span>
                        </div>
                    </div>

                    <div className="bg-[#F6F6F6] rounded-xl p-3">
                        <p className="text-black mb-2">התמחויות</p>
                        <button className="bg-[#F8374B] text-white rounded-full w-8 h-8 flex items-center justify-center">+</button>
                    </div>

                    <div className="bg-[#F6F6F6] rounded-xl ">
                        <textarea className="bg-transparent text-black w-full h-full p-2" placeholder="אודות" rows={4} />
                    </div>

                </div>
                <div className='px-4 mt-[auto]'>
                    <button className="w-full py-3 bg-yellow-400 text-white rounded-full text-lg font-semibold">שמירה</button>
                </div>
            </div>
        </PopupScreen>
    )
}

export default ProfileScreen
