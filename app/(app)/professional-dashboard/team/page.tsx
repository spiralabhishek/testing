'use client'

import WhatsAppIcon from "@/assets/icons/whatsappIcon";
import LinkIcon from "@/components/Icons/linkIcon";
import propertyImg from '@/assets/images/property-lorem.png'
import React from 'react'
import Select from 'react-select'
import FacebookIcon from "@/assets/icons/facebookIcon";
import Image from "next/image";

export default function Team() {

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <>
      <div className="container-fluid px-3 mt-7 overflow-x-scroll">
        <div className="professional_dashboard_entry cursor-pointer transition my-2 py-2 bg-[#f5f5f5]">
          <div className="flex justify-between items-center gap-5 my-2">
            <div className="flex items-center gap-5">
              <div className="bg-[#EFFFE9] md:w-[90px] md:h-[60px] lg:w-[100px] lg:h-[70px] xl:w-[120px] xl:h-[80px] rounded-2xl flex justify-end items-end pe-3 pb-2 md:pt-2 lg:pt-2 shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
                <div className="text-right leading-normal">
                  <h5 className="text-[20px] font-[800] text-[#353535]">6</h5>
                  <p className="text-[17px]">נסגר</p>
                </div>
              </div>
              <div className="bg-[#FFE7DF] md:w-[90px] md:h-[60px] lg:w-[100px] lg:h-[70px] xl:w-[120px] xl:h-[80px] rounded-2xl flex justify-end items-end pe-3 pb-2 md:pt-2 lg:pt-2 shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
                <div className="text-right leading-normal">
                  <h5 className="text-[20px] font-[800] text-[#353535]">--</h5>
                  <p className="text-[17px]">נסגר</p>
                </div>
              </div>
              <div className="bg-[#D6F5FF] md:w-[90px] md:h-[60px] lg:w-[100px] lg:h-[70px] xl:w-[120px] xl:h-[80px] rounded-2xl flex justify-end items-end pe-3 pb-2 md:pt-2 lg:pt-2 shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
                <div className="text-right leading-normal">
                  <h5 className="text-[20px] font-[800] text-[#353535]">6</h5>
                  <p className="text-[17px]">נסגר</p>
                </div>
              </div>
              <div className="bg-[#FAFAFA] md:w-[90px] md:h-[60px] lg:w-[100px] lg:h-[70px] xl:w-[120px] xl:h-[80px] rounded-2xl flex justify-end items-end pe-3 pb-2 md:pt-2 lg:pt-2 shadow-[0_8px_24px_rgba(149,157,165,0.2)] ">
                <div className="text-right leading-normal">
                  <h5 className="text-[20px] font-[800] text-[#353535]">6</h5>
                  <p className="text-[17px]">נסגר</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-5">
                <div className="rounded-2xl flex justify-end items-end">
                  <Select options={options} placeholder="סטטוס" />
                </div>
              </div>
            </div>
          </div>
          <div
            id={`professional_dashboard_entry`}
            className="professional_dashboard_entry cursor-pointer transition py-2">
            <div className="flex justify-between items-center overflow-x-auto gap-6">
              <div className="flex items-center gap-5">
                <div>
                  <div>
                    <label>
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                    </label>
                  </div>
                </div>
                <div>
                  <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <LinkIcon /></button>
                </div>
                <div>
                  <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <FacebookIcon /></button>
                </div>
                <div>
                  <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <WhatsAppIcon /></button>
                </div>
              </div>
              <div>
                <ul>
                  <li className="px-3 py-[1px] rounded-lg text-white flex items-center gap-2">
                    <Image src={propertyImg} alt="property" />
                  </li>
                  <li className="bg-[#F8374B] px-3 py-1 font-bold rounded-lg text-white flex items-center gap-2">
                    ABC
                  </li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">אילת</li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">מערב 7</li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">דופלקס</li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">3.5 חד׳ </li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">90 מ״ר</li>
                  <li className="bg-[#FBDC48] px-2 py-1 rounded-lg font-normal text-black flex items-center gap-2">
                    ₪1,200,000
                  </li>
                  <li className="bg-[#3EABF8] font-bold px-3 py-1 rounded-lg text-white flex items-center gap-2 min-w-[110px]">
                    050-2391149
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            id={`professional_dashboard_entry`}
            className="professional_dashboard_entry cursor-pointer transition py-2 my-2">
            <div className="flex justify-between items-center overflow-x-auto gap-6">
              <div className="flex items-center gap-5">
                <div>
                  <div>
                    <label>
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                    </label>
                  </div>
                </div>
                <div>
                  <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <LinkIcon /></button>
                </div>
                <div>
                  <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <FacebookIcon /></button>
                </div>
                <div>
                  <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <WhatsAppIcon /></button>
                </div>
              </div>
              <div>
                <ul>
                  <li className="px-3 py-[1px] rounded-lg text-white flex items-center gap-2">
                    <Image src={propertyImg} alt="property" />
                  </li>
                  <li className="bg-[#F8374B] px-3 py-1 font-bold rounded-lg text-white flex items-center gap-2">
                    ABC
                  </li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">אילת</li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">מערב 7</li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">דופלקס</li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">3.5 חד׳ </li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">90 מ״ר</li>
                  <li className="bg-[#FBDC48] px-2 py-1 rounded-lg font-normal text-black flex items-center gap-2">
                    ₪1,200,000
                  </li>
                  <li className="bg-[#3EABF8] font-bold px-3 py-1 rounded-lg text-white flex items-center gap-2 min-w-[110px]">
                    050-2391149
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            id={`professional_dashboard_entry`}
            className="professional_dashboard_entry cursor-pointer transition py-2 my-2">
            <div className="flex justify-between items-center overflow-x-auto gap-6">
              <div className="flex items-center gap-5">
                <div>
                  <div>
                    <label>
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                    </label>
                  </div>
                </div>
                <div>
                  <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <LinkIcon /></button>
                </div>
                <div>
                  <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <FacebookIcon /></button>
                </div>
                <div>
                  <button className="bg-[#3EABF8] px-3 py-[1px] rounded-2xl text-white flex items-center gap-2">קישור <WhatsAppIcon /></button>
                </div>
              </div>
              <div>
                <ul>
                  <li className="px-3 py-[1px] rounded-lg text-white flex items-center gap-2">
                    <Image src={propertyImg} alt="property" />
                  </li>
                  <li className="bg-[#F8374B] px-3 py-1 font-bold rounded-lg text-white flex items-center gap-2">
                    ABC
                  </li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">אילת</li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">מערב 7</li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">דופלקס</li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">3.5 חד׳ </li>
                  <li className="bg-[#f2f2f2] px-2 py-1 rounded-lg font-bold min-w-[60px]">90 מ״ר</li>
                  <li className="bg-[#FBDC48] px-2 py-1 rounded-lg font-normal text-black flex items-center gap-2">
                    ₪1,200,000
                  </li>
                  <li className="bg-[#3EABF8] font-bold px-3 py-1 rounded-lg text-white flex items-center gap-2 min-w-[110px]">
                    050-2391149
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
