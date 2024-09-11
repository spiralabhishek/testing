'use client'

import PopupScreen from '@/components/PopupScreen';
import Image from 'next/image';
import React, { useState } from 'react'

const AssetManagementScreen = ({ toggleScreen }: { toggleScreen: () => void }) => {
    const [activeTab, setActiveTab] = useState('%');

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

    const tabs = ['%', '₪0'];

    return (
        <PopupScreen
            title="ניהול נכסים"
            headerLeft={leftArrow}
        >
            <div className="flex flex-col w-[459px] h-full mt-5 py-5 gap-4">
                <div className="bg-[#F6F6F6] rounded-xl rtl">
                    <textarea className="bg-transparent text-black w-full h-full p-2 focus-visible:outline-none" placeholder="תיאור השירות" rows={4} />
                </div>
                <input className="bg-[#FAFAFA] rounded-xl p-3 text-black rtl focus-visible:outline-none" placeholder="מחיר" />
                <div>
                    <div className="w-full">
                        <div className="relative right-0">
                            <ul className="relative flex flex-wrap p-1 list-none bg-blue-gray-50/60 bg-[#FAFAFA] py-1 rounded-full" role="list">
                                {tabs.map((tab) => (
                                    <li key={tab} className="z-30 flex-auto text-center">
                                        <button
                                            className={`z-30 flex items-center justify-center w-full px-4 py-3 mb-0 transition-all ease-in-out border-0 rounded-full cursor-pointer text-slate-700
                                                                ${activeTab === tab ? 'bg-[#FFDD67]' : 'bg-inherit'}`}
                                            onClick={() => setActiveTab(tab)}
                                            role="tab"
                                            aria-selected={activeTab === tab}
                                        >
                                            <span className="ml-1">{tab}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='px-4 mt-[auto]'>
                    <button className="bg-[#FBDC48] text-black rounded-full py-2 mt-4 w-full">שמירה</button>
                </div>
            </div>
        </PopupScreen>
    )
}

export default AssetManagementScreen
