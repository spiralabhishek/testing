import PopupScreen from '@/components/PopupScreen';
import { useCreateFAQ } from '@/hooks/faqs/useCreateFaq';
import { FAQ } from '@/lib/types/common';
import Image from 'next/image';
import React, { useState } from 'react';

const FaqScreen = ({ toggleScreen }: { toggleScreen: () => void }) => {
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const createFAQ = useCreateFAQ();
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const faqData: FAQ = {
            question, answer
        };

        try {
            await createFAQ(faqData);
            setQuestion('');
            setAnswer('');
            toggleScreen();
        } catch (error) {
            console.error('Error creating FAQ:', error);
        }

    };

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
            title="שאלות נפוצות"
            headerLeft={leftArrow}
        >
            <form onSubmit={handleSubmit} className="flex flex-col w-[459px] h-full mt-5 py-5 gap-4">
                <div className="bg-[#F6F6F6] rounded-xl rtl">
                    <textarea
                        className="bg-transparent text-black w-full h-full p-2 focus-visible:outline-none"
                        placeholder="שאלה"
                        rows={6}
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                </div>
                <div className="bg-[#F6F6F6] rounded-xl rtl">
                    <textarea
                        className="bg-transparent text-black w-full h-full p-2 focus-visible:outline-none"
                        placeholder="תשובה"
                        rows={6}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </div>
                <div className='px-4 mt-[auto]'>
                    <button
                        type="submit"
                        className="bg-[#FBDC48] text-black rounded-full py-2 mt-4 w-full"
                    >
                        שמירה
                    </button>
                </div>
            </form>
        </PopupScreen>
    )
}

export default FaqScreen;
