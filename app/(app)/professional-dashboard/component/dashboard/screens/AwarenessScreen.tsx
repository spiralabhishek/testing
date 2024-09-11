import UserIcon from '@/components/Icons/userIcon';
import PopupScreen from '@/components/PopupScreen';
import Image from 'next/image';
import React from 'react'
import { IoArrowBackSharp } from 'react-icons/io5';

const AwarenessScreen = ({ toggleScreen }: { toggleScreen: () => void }) => {
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
    return (
        <PopupScreen
            title="מודעות"
            headerLeft={leftArrow}
        >
            <div className="flex flex-col w-[459px] h-full mt-5 py-5">
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { icon: '🏠', title: 'השכרה', label: 'מוגב לפני כשעה' },
                        { icon: '🛒', title: 'מכירה', label: 'מוגב לפני כשעה' },
                        { icon: '🧳', title: 'יומיות', label: 'מוגב לפני כשעה' },
                        { icon: '💡', title: 'טיפ', label: 'מוגב לפני כשלושה ימים' },
                        { icon: '📚', title: 'מדריך', label: 'מוגב לפני חמישה ימים' },
                        { icon: '📰', title: 'סקירה', label: 'מוגב לפני שמונה ימים' },
                        { icon: '💼', title: 'שירות', label: 'מוגב לפני חודש' },
                        { icon: '📦', title: 'מוצר', label: 'מוגב לפני עשרה ימים' },
                        { icon: '🔧', title: 'דרושים', label: 'מוגב לפני שבועיים' },
                        { icon: '✔️', title: 'פרויקט', label: 'מוגב לפני שבועיים' },
                        { icon: '📝', title: 'תיק', label: 'מוגב לפני שלושה ימים' },
                        { icon: '🔖', title: 'לפני-אחרי', label: 'מוגב לפני חודש' },
                        { icon: '⚙️', title: 'מרכז', label: 'מוגב לפני שבועיים' },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center justify-between"
                        >
                            {/* Icon */}
                            <div className="text-4xl mb-2">{item.icon}</div>
                            {/* Title */}
                            <h3 className="text-sm font-semibold text-center text-black">{item.title}</h3>
                            {/* Label */}
                            <div className="text-xs mt-2 px-2 py-1 bg-yellow-400 text-gray-900 rounded-lg">
                                {item.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PopupScreen>
    )
}

export default AwarenessScreen
