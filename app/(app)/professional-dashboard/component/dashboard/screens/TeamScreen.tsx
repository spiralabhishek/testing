'use client'

import ChooseFile from '@/assets/icons/chooseFile';
import PopupScreen from '@/components/PopupScreen';
import Image from 'next/image';
import React, { useState } from 'react'

const TeamScreen = ({ toggleScreen }: { toggleScreen: () => void }) => {
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

    const [fileName, setFileName] = useState('');

    const handleFileChange = (e: any) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName('');
        }
    };

    return (
        <PopupScreen
            className="max-w-[529px] w-full h-full z-20 left-20"
            title="צוות"
            headerLeft={leftArrow}
        >
            <div className="flex flex-col w-[459px] h-full mt-5 py-5 gap-4">
                <div className="flex items-center">
                    <label className="relative cursor-pointer bg-[#FAFAFA] rounded-lg p-[50px] w-full flex items-center justify-center text-black">
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                        />
                        <div className='flex flex-col items-center'>
                            <ChooseFile />
                            <p> {fileName ? fileName : 'הוספת תמונה / סרטון'}</p>
                        </div>
                    </label>
                </div>
                <input className="bg-[#FAFAFA] rounded-2xl p-3  placeholder:text-black text-black" placeholder="שם" />
                <input className="bg-[#FAFAFA] rounded-2xl  placeholder:text-black p-3 text-black" placeholder="תפקיד" />
                <input className="bg-[#FAFAFA] rounded-2xl  placeholder:text-black p-3 text-black" placeholder="טלפון" />
                <input className="bg-[#FAFAFA] rounded-2xl  placeholder:text-black p-3 text-black" placeholder="תיאור" />
                <div className="bg-[#F6F6F6] rounded-xl rtl">
                    <textarea className="bg-transparent text-black w-full h-full p-2 focus-visible:outline-none  placeholder:text-black" placeholder="תיאור השירות" rows={4} />
                </div>
                <div className='bg-[#FAFAFA] p-3 rounded-2xl ltr'>
                    <div className='flex justify-between'>
                        <label>
                            <input type="checkbox" value="" className="sr-only peer " defaultChecked />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                        </label>
                        <p className='text-black'>קבלת שיחות</p>
                    </div>

                </div>
                <div className='bg-[#FAFAFA] p-3 rounded-2xl ltr'>
                    <div className='flex justify-between'>
                        <label>
                            <input type="checkbox" value="" className="sr-only peer " defaultChecked />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                        </label>
                        <p className='text-black'>קבלת וואטסאפ</p>
                    </div>
                </div>
                <div className='px-4 mt-[auto]'>
                    <button className="w-full py-3 bg-yellow-400 text-white rounded-full text-lg font-semibold">שמירה</button>
                </div>
            </div>
        </PopupScreen>
    )
}

export default TeamScreen
