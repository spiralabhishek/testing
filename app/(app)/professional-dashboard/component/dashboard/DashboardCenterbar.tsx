'use client'

import AssetManagementIcon from '@/components/Icons/assetManagementIcon';
import CalcIcon from '@/components/Icons/calcIcon';
import ClockIcon from '@/components/Icons/clockIcon';
import NotebookIcon from '@/components/Icons/notebookIcon';
import NoteIcon from '@/components/Icons/noteIcon';
import NotifyIcon from '@/components/Icons/notifyIcon';
import QrIcon from '@/components/Icons/qrIcon';
import UserIcon from '@/components/Icons/userIcon';
import React from 'react';
import { useModalStore } from '@/store/modalStore';
import ModalGroup from './modals/ModalGroup';

const DashboardCenterbar = () => {
    const stats = [
        { icon: <UserIcon className="xl:text-3xl text-[#3EABF8] lg:text-[20px] " fill={'#3EABF8'} />, label: 'פרופיל' },
        { icon: <QrIcon className="xl:text-3xl text-[#3EABF8] lg:text-[20px] " />, label: 'שיתוף' },
        { icon: <ClockIcon className="xl:text-3xl text-[#3EABF8] lg:text-[20px] " />, label: 'שעות פעילות' },
        { icon: <CalcIcon className="xl:text-3xl text-[#3EABF8] lg:text-[20px] " />, label: 'מחירון' },
        { icon: <NoteIcon className="xl:text-3xl text-[#3EABF8] lg:text-[20px] " />, label: 'מודעות' },
        { icon: <NotebookIcon className="xl:text-3xl text-[#3EABF8] lg:text-[20px] " />, label: 'שאלות נפוצות' },
        { icon: <UserIcon className="xl:text-3xl text-[#3EABF8] lg:text-[20px] " fill={'#3EABF8'} />, label: 'צוות' },
        { icon: <NotifyIcon className="xl:text-3xl text-[#3EABF8] lg:text-[20px] " />, label: 'באנר' },
        { icon: <AssetManagementIcon className="xl:text-3xl text-[#3EABF8] lg:text-[20px] " />, label: 'ניהול נכסים' }
    ];

    const { openModal } = useModalStore();

    return (
        <>
            <div className="w-[33.33%] sm:w-[33.33%] md:w-[40%] lg:w-1/2 xl:w-1/2 h-[calc(100%-16px)] bg-white text-black rounded-3xl shadow-md md:p-2 lg:p-3 xl:p-3 flex flex-col">
                <div className="md:p-2 lg:p-3 xl:p-3">
                    <div className="flex flex-wrap [direction:rtl;]" >
                        {stats.map((stat, index) => (
                            <div key={index} className="w-full sm:w-1/2 lg:w-1/4 p-2" >
                                <div className="rounded-xl bg-gray-50 p-8 flex flex-col items-center relative"
                                    onClick={() => {
                                        openModal(stat.label)
                                    }}>
                                    {stat.icon}
                                    <p className="text-black text-xs mt-2">{stat.label}</p>
                                    <div className='absolute left-[15px] bottom-[11px]'>
                                        <span className="bg-[#FFDD67] w-[20px] h-[20px] flex items-center justify-center rounded-full font-bold text-[12px]">7</span>
                                    </div>
                                    <div className='absolute left-[15px] top-[11px]'>
                                        <span className="bg-[#F8374B] w-[30px] h-[20px] flex items-center justify-center rounded-full font-bold text-[10px] text-white">חדש</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ModalGroup />
        </>
    );
};

export default DashboardCenterbar;
