'use client'

import { useFAQs } from '@/hooks/faqs/useFaqs';
import React from 'react'

const FaqList = () => {

    const { data, error, isLoading } = useFAQs();

    console.log(data);

    return (
        <>
            <div className="flex justify-between items-center bg-[#FAFAFA] px-3 py-2 rounded-xl my-3">
                <div className="flex justify-between items-center gap-5">
                    <label>
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                    </label>
                </div>
                <div>
                    <div className="flex items-center gap-3 text-black">
                        <p className="bg-[#F2F2F2] p-2 rounded-md">האם אתם עושים קמפיינים ממומנים בגוגל ופייסבוק?</p>
                        <button type="button" className="bg-[#F8374B] px-4 py-1 rounded-lg text-white">שאלה</button>
                        <h5 className="text-[20px] font-bold">1</h5>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center bg-[#FAFAFA] px-3 py-2 rounded-xl my-3">
                <div className="flex justify-between items-center gap-5">
                    <label>
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                    </label>
                </div>
                <div>
                    <div className="flex items-center gap-3 text-black">
                        <p className="bg-[#F2F2F2] p-2 rounded-md">האם אתם עושים קמפיינים ממומנים בגוגל ופייסבוק?</p>
                        <button type="button" className="bg-[#F8374B] px-4 py-1 rounded-lg text-white">שאלה</button>
                        <h5 className="text-[20px] font-bold">2</h5>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center bg-[#FAFAFA] px-3 py-2 rounded-xl my-3">
                <div className="flex justify-between items-center gap-5">
                    <label>
                        <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#3EABF8]"></div>
                    </label>
                </div>
                <div>
                    <div className="flex items-center gap-3 text-black">
                        <p className="bg-[#F2F2F2] p-2 rounded-md">האם אתם עושים קמפיינים ממומנים בגוגל ופייסבוק?</p>
                        <button type="button" className="bg-[#F8374B] px-4 py-1 rounded-lg text-white">שאלה</button>
                        <h5 className="text-[20px] font-bold">3</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FaqList
