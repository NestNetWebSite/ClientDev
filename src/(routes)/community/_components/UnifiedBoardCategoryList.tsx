import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const categoryList = [
    { value: 'free', label: '자유' },
    { value: 'dev', label: '개발' },
    { value: 'career', label: '진로' },
    { value: 'job_info', label: '취업 정보' },
];

export default function UnifiedBoardCategoryList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentCategory = searchParams.get('category') ?? 'free';

    const handleCategoryClick = useCallback((targetCategory: string) => {
        setSearchParams({ category: targetCategory, page: '1' });
    }, []);

    return (
        <ul className={'flex gap-x-2 p-2'}>
            {categoryList.map(category => {
                return (
                    <li
                        key={category.value}
                        onClick={() => {
                            handleCategoryClick(category.value);
                        }}
                    >
                        <span
                            className={`cursor-pointer rounded-2xl px-4 py-3 font-semibold ${
                                currentCategory === category.value ? 'bg-black/10' : 'hover:bg-black/10'
                            } transition-all`}
                        >
                            {category.label}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}
