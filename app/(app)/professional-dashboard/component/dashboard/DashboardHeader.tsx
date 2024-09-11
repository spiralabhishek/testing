'use client';
// components/Header.js
import FacebookIcon from '@/assets/icons/facebookIcon';
import GoogleIcon from '@/assets/icons/googleIcon';
import InstagramIcon from '@/assets/icons/instagramIcon';
import LinkedInIcon from '@/assets/icons/linkedinIcon';
import MusicIcon from '@/assets/icons/musicIcon';
import SettingsIcon from '@/components/Icons/settingsIcon';
import WhatsAppIcon from '@/assets/icons/whatsappIcon';
import YoutubeIcon from '@/assets/icons/youtubeIcon';
import HeroImage from '@/assets/images/hero.png';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import SecurityIcon from '@/assets/icons/securityIcon';
import KeyIcon from '@/assets/icons/keyIcon';
import { IoMdCheckmark } from "react-icons/io";
import { useUser } from '@clerk/clerk-react'
import { useClientApi } from '@/utils/clientApi';
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  const { user } = useUser()
  const clientApi = useClientApi();
  const router = useRouter(); 
  // const handleGetPosts = async () => {
  //   const initialPosts = await clientApi({ endpoint: '/api/posts', method: 'GET', requiresAuth: false })
  // }
  // useEffect(() => {
  //   handleGetPosts()
  // }, [handleGetPosts])

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="bg-[#3EABF8] text-white flex justify-between p-3 rounded-xl">
      {/* Left Section */}
      <div className="flex items-center bg-white text-black p-2 rounded-full" onClick={() => router.back()}>
        <span className="mr-2">{'< מעבר לפרופיל'}</span>
        <Image
          src={user?.imageUrl || HeroImage}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-[15px] sm:gap-[22px] md:[25px] md:gap-[25px] lg:gap-[28px] xl:gap-[32px]">
        <div>
          <GoogleIcon className="dashboard_label text-white cursor-pointer hover:text-gray-200 hover:shadow-xl" />
        </div>
        <div>
          <LinkedInIcon className="dashboard_label text-white cursor-pointer hover:text-gray-200 hover:shadow-xl" />
        </div>

        <div>
          <YoutubeIcon className="dashboard_label text-white cursor-pointer hover:text-gray-200 hover:shadow-xl" />
        </div>

        <div className='relative'>
          <MusicIcon className="dashboard_label text-white cursor-pointer hover:text-gray-200 hover:shadow-xl" />
          <div className='absolute top-[-12px] bg-[#3EABF8] left-[-12px]  p-[3px] rounded-full text-[15px] text-black'>
            <IoMdCheckmark className='bg-[#FFDD67] p-[2px] rounded-full text-black ' />
          </div>
        </div>

        <div className='relative'>
          <InstagramIcon className="dashboard_label text-white cursor-pointer hover:text-gray-200 hover:shadow-xl" />
          <div className='absolute top-[-12px] bg-[#3EABF8] left-[-12px] p-[3px] rounded-full text-[15px] text-black'>
            <IoMdCheckmark className='bg-[#FFDD67] p-[2px] rounded-full text-black' />
          </div>
        </div>

        <div className='relative'>
          <FacebookIcon className="dashboard_label text-white cursor-pointer hover:text-gray-200 hover:shadow-xl" />
          <div className='absolute top-[-12px] bg-[#3EABF8] left-[-12px] p-[3px] rounded-full text-[15px] text-black'>
            <IoMdCheckmark className='bg-[#FFDD67] p-[2px] rounded-full text-black' />
          </div>
        </div>

        <div className='relative'>
          <WhatsAppIcon className="dashboard_label text-white cursor-pointer hover:text-gray-200 hover:shadow-xl" />
          <div className='absolute top-[-12px] bg-[#3EABF8] left-[-12px] p-[3px] rounded-full text-[15px] text-black'>
            <IoMdCheckmark className='bg-[#FFDD67] p-[2px] rounded-full text-black' />
          </div>
        </div>

        <div
          id="settings-button"
          className="hover:cursor-pointer hover:shadow-xl my-auto ml-gap"
          onClick={toggleDropdown}
        >
          <SettingsIcon />
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute right-[20px] top-[64px] mt-2 w-[250px] bg-white rounded-lg shadow-lg transition-all ease-in-out duration-300 transform opacity-0 scale-95 origin-top-right z-50"
          style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? 'scale(1)' : 'scale(0.95)' }}
        >
          <ul className="py-1">
            <li className="px-4 py-2 text-black">
              <div className='flex items-center gap-2 space-x-3 bg-[#FAFAFA] h-[50px] px-2 rounded-lg justify-between'>
                <SecurityIcon />
                <p>איפוס סיסמא</p>
              </div>
            </li>
            <li className="px-4 py-2 text-black">
              <div className='flex items-center gap-2 space-x-3 bg-[#FAFAFA] h-[50px] px-2 rounded-lg justify-between'>
                <KeyIcon />
                <p>התנתקות</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
