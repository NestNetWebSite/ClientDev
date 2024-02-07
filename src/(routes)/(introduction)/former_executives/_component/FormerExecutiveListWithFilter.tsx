import { useState } from 'react';
import Select from 'react-select';
import ExecutiveListItem from '../../_component/ExecutiveListItem.tsx';

interface Executive {
    id: number;
    year: number;
    name: string;
    studentId: string;
    role: string;
}

interface Props {
    yearList: number[];
    formerExecutiveList: Executive[];
}

export default function FormerExecutiveListWithFilter({ yearList, formerExecutiveList }: Props) {
    const [year, setYear] = useState(yearList[0]);
    const yearOptions = yearList.map(year => ({
        value: year,
        label: `${String(year)}년도`,
    }));

    return (
        <>
            <div className={'mb-9 flex justify-end'}>
                <Select
                    isSearchable={false}
                    defaultValue={yearOptions.find(option => option.value === year)}
                    options={yearOptions}
                    onChange={option => {
                        if (option) {
                            setYear(option.value);
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
            <ul className={'mb-10 grid w-full grid-cols-2 gap-10'}>
                {formerExecutiveList
                    .filter(executive => executive.year === year)
                    .map(executive => {
                        return <ExecutiveListItem key={executive.id} {...executive} />;
                    })}
            </ul>
        </>
    );
}
