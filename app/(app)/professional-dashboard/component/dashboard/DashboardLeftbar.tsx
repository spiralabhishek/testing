'use client'
import React, { useState } from 'react';
import { FaStar, FaEye, FaPhone, FaWhatsapp } from 'react-icons/fa';

const DashboardLeftbar: React.FC = () => {
    return (
        <div className="w-[30%] sm:w-[33.33%] md:w-[30%] lg:w-1/4 xl:w-1/4 h-[calc(100%-16px)] bg-white text-black rounded-3xl shadow-xl p-4 flex flex-col ">
            <div className='shadow-md p-3 rounded-2xl'>
                <div className="rounded-full bg-gray-50 p-3 gap-3 flex justify-around text-center mb-4 flex-wrap">
                    <button className="text-sm font-medium">שנה</button>
                    <button className="text-sm font-medium">חודש</button>
                    <button className="text-sm font-medium">שבוע</button>
                    <button className="text-sm font-medium">אתמול</button>
                    <button className="text-sm font-medium text-blue-600">היום</button>
                </div>
                <div className="flex gap-3 text-center custom-flex-wrap">
                    <div className='rounded-xl bg-gray-50 sm:py-3 sm:px-3 md:py-3 md:px-3 lg:px-3 lg:py-2 xl:px-2 xl:py-3 flex-1'>
                        <div className='flex justify-end'><p className="text-end text-[#3EABF8]"><FaStar /></p></div>
                        <div className='py-3'>
                            <p className="xl:text-lg lg:text-md md:text-sm text-[#3EABF8] font-bold">90</p>
                            <p className="text-black text-xs">ביקורות</p>
                        </div>

                    </div>
                    <div className='rounded-xl bg-gray-50 sm:py-3 sm:px-3 md:py-3 md:px-3 lg:px-3 lg:py-2 xl:px-2 xl:py-3 flex-1'>
                        <div className='flex justify-end'><p className="text-end text-[#3EABF8]"><FaEye /></p></div>
                        <div className='py-3'>
                            <p className="text-lg text-[#3EABF8] font-bold">800</p>
                            <p className="text-black text-xs">צפיות בפרופיל</p>
                        </div>
                    </div>
                    <div className='rounded-xl bg-gray-50 sm:py-3 sm:px-3 md:py-3 md:px-3 lg:px-3 lg:py-2 xl:px-2 xl:py-3 flex-1'>
                        <div className='flex justify-end'><p className="text-end text-[#3EABF8]"><FaWhatsapp /></p></div>
                        <div className='py-3'>
                            <p className="text-lg text-[#3EABF8] font-bold">--</p>
                            <p className="text-black text-xs">הודעות</p>
                        </div>
                    </div>
                    <div className='rounded-xl bg-gray-50 sm:py-3 sm:px-3 md:py-3 md:px-3 lg:px-3 lg:py-2 xl:px-2 xl:py-3 flex-1'>
                        <div className='flex justify-end'><p className="text-end text-[#3EABF8]"><FaPhone /></p></div>
                        <div className='py-3'>
                            <p className="text-lg text-[#3EABF8] font-bold">800</p>
                            <p className="text-black text-xs">שיחות</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-end shadow-md p-3 rounded-2xl h-full relative">
                <div>
                    <p className="text-[#3EABF8] font-bold">היי כוכב המזיזוג בעמ 👋</p>
                    <p className="text-sm text-gray-600">ברוך הבא לעמוד לניהול עמוד העסק שלך</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardLeftbar;
