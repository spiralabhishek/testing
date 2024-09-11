'use client'
import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import CalcIcon from '../../../../components/Icons/calcIcon'
import NotebookIcon from '../../../../components/Icons/notebookIcon'
import NoteIcon from '../../../../components/Icons/noteIcon'
import UserIcon from '../../../../components/Icons/userIcon'
import { useModalStore } from '@/store/modalStore'

const NewPostMenu = () => {
    const { openModal } = useModalStore();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div className="fixed sm:left-[15%] sm:bottom-[11%] md:left-[15%] md:bottom-[11%] lg:left-[13%] lg:bottom-[11%] xl:bottom-[11%] xl:left-[11%]  transform -translate-x-1/2 translate-y-1/2">
                <div className="bg-[#fff] text-white sm:w-[140px] sm:h-[47px] md:w-[165px] md:h-[50px] lg:w-[165px] lg:h-[50px] xl:h-[60px] xl:w-[190px] flex justify-center items-center sm:text-[17px] md:text-[20px] xl:text-[20px] relative rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
                    <button onClick={toggleDropdown} aria-expanded={isDropdownOpen} className="focus:outline-none flex text-black gap-2 items-center">
                        <GoPlus className='xl:text-[40px] lg:text-[30px] md:text-[25px] bg-[#F8374B] rounded-full text-white' /> מודעה חדשה
                    </button>
                </div>

                {/* Dropdown */}
                {isDropdownOpen && (
                    <div className="absolute bottom-full mb-2 w-[218px] bg-white rounded-2xl py-2 shadow-[0_5px_15px_rgba(0,0,0,0.35)]">
                        <div className="block px-4 py-2 text-black" onClick={() => openModal('פוסט')}>
                            <div className='flex items-center gap-2 justify-end bg-[#FAFAFA] h-[50px] px-2 rounded-lg'>
                                <p>פוסט</p>
                                <NoteIcon />
                            </div>
                        </div>
                        <div className="block px-4 py-2 text-black" onClick={() => openModal('שאלות נפוצות')}>
                            <div className='flex items-center gap-2 justify-end bg-[#FAFAFA] h-[50px] px-2 rounded-lg'>
                                <p>שאלה נפוצה</p>
                                <NotebookIcon />
                            </div>
                        </div>
                        <div className="block px-4 py-2 text-black" onClick={() => openModal('איש צוות')}>
                            <div className='flex items-center gap-2 justify-end bg-[#FAFAFA] h-[50px] px-2 rounded-lg'>
                                <p>איש צוות</p>
                                <UserIcon fill={"#3EABF8"} />
                            </div>
                        </div>
                        <div className="block px-4 py-2 text-black" onClick={() => openModal('מחירון')}>
                            <div className='flex items-center gap-2 justify-end bg-[#FAFAFA] h-[50px] px-2 rounded-lg'>
                                <p>מחירון</p>
                                <CalcIcon />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default NewPostMenu
