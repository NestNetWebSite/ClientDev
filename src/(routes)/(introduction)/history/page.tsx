import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import getHistory from './_lib/getHistory';

export default function Page() {
    const [currentYear, setCurrentYear] = useState(0);

    const { data, isLoading } = useQuery({
        queryKey: ['history'],
        queryFn: getHistory,
        retry: false,
        refetchOnWindowFocus: false,
        gcTime: Infinity,
        throwOnError: true,
    });

    if (isLoading) {
        return <></>;
    }

    const yearOptions: { label: string; value: number }[] = data.map(history => ({
        label: String(history.year),
        value: history.year,
    }));

    return (
        <main className={'mx-auto flex w-[55rem] flex-col p-5'}>
            <div className={'mb-6 border-b-2 border-rose-700 pb-2'}>
                <h1 className={'text-3xl font-bold text-rose-700'}>네스트넷 변천사</h1>
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
                            return `!w-[16rem] !border-gray-300 !px-2 !rounded-xl !h-[3rem] !border !bg-white !text-sm !shadow-none !transition-all`;
                        },

                        option() {
                            return '!text-sm';
                        },

                        placeholder() {
                            return '!text-[#a9a9a9]';
                        },
                    }}
                />
            </div>
            <div className={'flex flex-col gap-y-4'}>
                <h1 className={'text-2xl font-semibold text-rose-700'}>
                    {currentYear === 0 ? data[0].year : currentYear}
                </h1>
                <hr />
                {currentYear === 0 ? (
                    <div className={'flex flex-col gap-y-16'}>
                        {data[0].activities.map(activity => {
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
                ) : (
                    <div className={'flex flex-col gap-y-16'}>
                        {data
                            .find(history => history.year === currentYear)
                            .activities.map(activity => {
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
                )}
            </div>
        </main>
    );
}
