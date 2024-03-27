import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce, isEqual } from 'lodash';
import useExamSearchFilterStore from '../../../_stores/useExamSearchFilterStore';
import SearchFilterModal from './SearchFilterModal';

interface ExamSearchFilter {
    year: string;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
}

interface Props {
    currentSearchFilter: ExamSearchFilter;
    updateCurrentSearchFilter: (newSearchFilter: ExamSearchFilter) => void;
}

export default function SearchFilterArea({ currentSearchFilter, updateCurrentSearchFilter }: Props) {
    const { filterReset } = useExamSearchFilterStore(state => state);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [_1, setSearchParams] = useSearchParams();

    const handleSearchFilterResetButtonClick = useCallback(
        debounce(event => {
            console.log('a');
            event.stopPropagation();
            if (
                isEqual(
                    {
                        examType: '',
                        year: '0',
                        semester: '0',
                        subject: '',
                        professor: '',
                    },
                    currentSearchFilter,
                )
            ) {
                return;
            }
            setSearchParams({ page: '1' });
            filterReset();
            updateCurrentSearchFilter({
                examType: '',
                year: '0',
                semester: '0',
                subject: '',
                professor: '',
            });
        }, 500),
        [],
    );

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [isModalOpen]);

    return (
        <div>
            <button
                onClick={event => {
                    event.stopPropagation();
                    setIsModalOpen(true);
                }}
                className={
                    'mr-5 box-content rounded-xl border border-rose-800 bg-rose-800 px-4 py-3 text-sm text-white transition-all  hover:bg-rose-900'
                }
            >
                검색 필터
            </button>
            <button
                type={'button'}
                onClick={handleSearchFilterResetButtonClick}
                className={
                    'cursor-pointer rounded-xl border border-rose-800 px-4 py-3 text-sm font-bold text-rose-800 transition-all hover:bg-rose-50'
                }
            >
                검색 필터 초기화
            </button>
            <SearchFilterModal
                isModalOpen={isModalOpen}
                closeModal={() => {
                    setIsModalOpen(false);
                }}
                updateCurrentSearchFilter={updateCurrentSearchFilter}
            />
        </div>
    );
}
