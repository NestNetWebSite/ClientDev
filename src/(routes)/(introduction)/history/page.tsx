import { useState } from 'react';
import Select from 'react-select';
import { ACTIVITIES } from './constant.ts';

export default function Page() {
    const [currentYear, setCurrentYear] = useState(ACTIVITIES.sort((a1, a2) => a2.year - a1.year)[0].year);

    const yearOptions: { label: string; value: number }[] = ACTIVITIES.sort((a1, a2) => a2.year - a1.year).map(
        activity => ({
            label: `${String(activity.year)} 년`,
            value: activity.year,
        }),
    );

    return (
        <main className={'mx-auto flex w-[55rem] flex-col p-5'}>
            <div className={'mb-6 border-b-2 border-secondary pb-2'}>
                <h1 className={'text-3xl font-bold text-secondary'}>네스트넷 변천사</h1>
            </div>
            <div className={'flex justify-end'}>
                <Select
                    isSearchable={false}
                    defaultValue={yearOptions[0]}
                    options={yearOptions}
                    onChange={option => {
                        setCurrentYear(option.value);
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
            <div className={'flex flex-col gap-y-4'}>
                <h1 className={'text-2xl font-semibold text-secondary'}>{currentYear}</h1>
                <hr />
                <div className={'flex flex-col gap-y-16'}>
                    {ACTIVITIES.filter(history => history.year === currentYear).map(activity => {
                        return (
                            <div key={activity.title}>
                                <h3 className={'mb-3 text-xl font-bold'}>{activity.title}</h3>
                                <ul className={'flex list-disc flex-col gap-y-3 px-8'}>
                                    {activity.details.map(detail => {
                                        return <li key={detail}>{detail}</li>;
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
