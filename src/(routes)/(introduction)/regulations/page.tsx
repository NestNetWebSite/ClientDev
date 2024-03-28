import { useState } from 'react';
import Select from 'react-select';
import Chapter1 from './_components/Chapter1';
import Chapter2 from './_components/Chapter2';
import Chapter3 from './_components/Chapter3';
import Chapter4 from './_components/Chapter4';
import Chapter5 from './_components/Chapter5';
import Chapter6 from './_components/Chapter6';
import Chapter7 from './_components/Chapter7';
import Chapter8 from './_components/Chapter8';
import Chapter9 from './_components/Chapter9';

const regulationOptions = [
    { value: 'chapter1', label: '제 1장 총칙' },
    { value: 'chapter2', label: '제 2장 회원' },
    { value: 'chapter3', label: '제 3장 조직' },
    { value: 'chapter4', label: '제 4장 동아리 방 내 준수 사항' },
    { value: 'chapter5', label: '제 5장 모임' },
    { value: 'chapter6', label: '제 6장 재정' },
    { value: 'chapter7', label: '제 7장 회칙개정' },
    { value: 'chapter8', label: '제 8장 활동' },
    { value: 'chapter9', label: '제 9장 부칙' },
];

export default function Page() {
    const [currentChapter, setCurrentChapter] = useState('chapter1');

    return (
        <main className={'mx-auto flex w-[55rem] flex-col p-5'}>
            <div className={'mb-6 border-b-2 border-secondary pb-2'}>
                <h1 className={'text-3xl font-bold text-secondary'}>동아리 회칙 (2019년 2월 28일 개정)</h1>
            </div>
            <div className={'flex justify-end'}>
                <Select
                    isSearchable={false}
                    defaultValue={regulationOptions.find(option => option.value === currentChapter)}
                    options={regulationOptions}
                    onChange={option => {
                        if (option) {
                            setCurrentChapter(option.value);
                        }
                    }}
                    menuPlacement={'auto'}
                    classNames={{
                        control() {
                            return `!w-[16rem] !border-gray-300 !px-2 !rounded-xl !h-[3rem] !border !bg-white !font-bold !shadow-none !transition-all`;
                        },

                        placeholder() {
                            return '!text-[#a9a9a9]';
                        },
                    }}
                />
            </div>
            {
                [
                    { value: 'chapter1', component: <Chapter1 /> },
                    { value: 'chapter2', component: <Chapter2 /> },
                    { value: 'chapter3', component: <Chapter3 /> },
                    { value: 'chapter4', component: <Chapter4 /> },
                    { value: 'chapter5', component: <Chapter5 /> },
                    { value: 'chapter6', component: <Chapter6 /> },
                    { value: 'chapter7', component: <Chapter7 /> },
                    { value: 'chapter8', component: <Chapter8 /> },
                    { value: 'chapter9', component: <Chapter9 /> },
                ]?.find(e => e?.value === currentChapter)?.component
            }
        </main>
    );
}
