import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

export default async function DashboardRightbar() {
    const user = await currentUser();
    return (
        <div className="w-[33.33%] sm:w-[33.33%] md:w-[30%]  lg:w-1/4 xl:w-1/4 h-[calc(100%-16px)] bg-white text-black rounded-3xl shadow-md p-6 flex flex-col items-center flex-grow overflow-hidden">
            <div className="relative mb-6">
                <Image
                    src={user?.imageUrl || ""}
                    alt="Profile"
                    className="rounded-full object-cover sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32"
                />
                <div className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-2">
                    <FaPlus />
                </div>
            </div>
            <h3 className="xl:text-[20px] lg:text-[15px] font-bold mb-4">{user?.firstName} {user?.lastName}</h3>
            <div className="w-full mb-4">
                <div className="flex justify-center flex-col-reverse items-center md:flex md:flex-wrap md:justify-center md:flex-col-reverse md:items-center lg:flex lg:justify-between lg:items-center lg:flex-nowrap lg:flex-row  xl:flex xl:justify-between xl:items-center xl:flex-nowrap xl:flex-row p-3 bg-gray-50 rounded-full mb-3">
                    <p className='xl:text-[15px] lg:text-[12px]'>קבלת שיחות</p>
                    <label className='ltr'>
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                    </label>
                </div>
                <div className="flex justify-center flex-col-reverse items-center md:flex md:flex-wrap md:justify-center md:flex-col-reverse md:items-center lg:flex lg:justify-between lg:items-center lg:flex-nowrap lg:flex-row  xl:flex xl:justify-between xl:items-center xl:flex-nowrap xl:flex-row p-3 bg-gray-50 rounded-full mb-3">
                    <p className='xl:text-[15px] lg:text-[12px]'>קבלת הודעות</p>
                    <label className='ltr'>
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                    </label>
                </div>
                <div className="flex justify-center flex-col-reverse items-center md:flex md:flex-wrap md:justify-center md:flex-col-reverse md:items-center lg:flex lg:justify-between lg:items-center lg:flex-nowrap lg:flex-row  xl:flex xl:justify-between xl:items-center xl:flex-nowrap xl:flex-row p-3 bg-gray-50 rounded-full mb-3">
                    <p className='xl:text-[15px] lg:text-[12px]'>הצגת מחירון</p>
                    <label className='ltr'>
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                    </label>
                </div>
            </div>

            {/* Plan Details */}
            <div className="mt-auto w-full bg-gray-50 rounded-md p-4 text-center">
                <div className="flex justify-between mb-2 flex-wrap items-center">
                    <div>
                        <p className="sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[15px]">מסלול</p>
                        <p className="font-medium sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[15px]">PRO</p>
                    </div>
                    <div className='xl:my-0 lg:my-2'>
                        <p className="sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[15px]">עד תוקף</p>
                        <p className="font-medium sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[15px]">25-08-2025</p>
                    </div>
                    <div>
                        <p className="sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[15px]">ימים</p>
                        <p className="font-medium sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[15px]">350</p>
                    </div>
                </div>
            </div>
        </div>
    );
}; 
