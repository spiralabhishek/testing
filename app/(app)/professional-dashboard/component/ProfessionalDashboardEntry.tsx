'use client'

import React from "react";
import { FaTrash } from "react-icons/fa";
import LinkIcon from "@/components/Icons/linkIcon";
import BinIcon from "@/components/Icons/binIcon";
import propertyImg from '@/assets/images/property-lorem.png'
import Image from "next/image";
import WhatsAppIcon from "@/assets/icons/whatsappIcon";
import FacebookIcon from "@/assets/icons/facebookIcon";
import PhoneIcon from "@/assets/icons/phoneIcon";
import EyeIcon from "@/assets/icons/eyeIcon";
import Select from 'react-select';


interface ProfessionalDashboardEntryType {
  entryName?: string;
  date?: string;
  time?: string;
  profile?: string;
  board?: string;
  price?: string;
}
const ProfessionalDashboardEntry: React.FC<ProfessionalDashboardEntryType> = ({
  board,
  price,
  profile,
  date,
  time,
  entryName,
}) => {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  return (
    <div
      id={`professional_dashboard_entry_${entryName}`}
      className="professional_dashboard_entry cursor-pointer transition py-2">
      <div className="flex justify-between items-cent gap-3">
        <div className="flex items-center gap-3">
          <div>
            <label>
              <input type="checkbox" value="" className="sr-only peer" defaultChecked />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
            </label>
          </div>
          <div>
            <span className="bg-[#F2F2F2] p-3 flex items-center rounded-full"><BinIcon height={'20px'} width={'20px'} /></span>
          </div>
          <div>
            <button className="bg-[#F2F2F2] px-3 py-[2px] rounded-2xl flex items-center gap-2">
              150<span className="bg-white p-1 rounded-full"><EyeIcon fill="#3EABF8" height={'14PX'} width={'14px'} /></span>
            </button>
          </div>
          <div>
            <button className="bg-[#F2F2F2] px-3 py-[2px] rounded-2xl flex items-center gap-2">
              150<span className="bg-white p-1 rounded-full"><WhatsAppIcon fill="#3EABF8" height={'14PX'} width={'14px'} /></span>
            </button>
          </div>
          <div>
            <button className="bg-[#F2F2F2] px-3 py-[2px] rounded-2xl flex items-center gap-2">
              150<span className="bg-white p-1 rounded-full"><PhoneIcon fill="#3EABF8" height={'14PX'} width={'14px'} /></span>
            </button>
          </div>
          <div>
            <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <LinkIcon /></button>
          </div>
          <div>
            <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <LinkIcon /></button>
          </div>
          <div>
            <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <LinkIcon /></button>
          </div>
        </div>

        <div className="details-page-right">
          <ul>
            <li className="rounded-lg text-white flex items-center gap-2">
              <Image src={propertyImg} alt="property" />
            </li>
            <li className="bg-[#F8374B] px-3 py-[1px] rounded-lg text-white flex items-center gap-2">
              {entryName}
            </li>
            <li className="px-3 py-[1px] rounded-lg text-white flex items-center gap-2">
              <Select options={options} placeholder="סטטוס" />
            </li>
            <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">תאריך {date}</li>
            <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">שעה {time}</li>
            <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">פרופיל {profile}</li>
            <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">לוח {board}</li>
            <li className="bg-[#FBDC48] px-3 py-[1px] rounded-lg font-normal text-black flex items-center gap-2">
              {price}
            </li>
            <li className="bg-[#3EABF8] px-3 py-[1px] rounded-lg text-white flex items-center gap-2">
              {entryName}
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};

export default ProfessionalDashboardEntry;
