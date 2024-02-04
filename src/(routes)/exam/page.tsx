import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { isEqual } from 'lodash';
import getExamBoards from './_lib/getExamBoards.ts';
import useExamSearchFilterStore from '../../_stores/useExamSearchFilterStore';
import SearchFilterArea from './_components/SearchFilterArea';
import ExamBoardList from './_components/ExamBoardList.tsx';
import BoardListPagination from '../../_components/pagination/BoardListPagination.tsx';
import BoardAddButton from '../../_components/button/BoardAddButton.tsx';
import LoadingSpinner from '../../_components/loadingSpinner/LoadingSpinner.tsx';

interface ExamSearchFilter {
    year: string;
    semester: string;
    examType: string;
    subject: string;
    professor: string;
}

export default function Page() {
    const { examSearchFilter, filterReset } = useExamSearchFilterStore();

    const [currentSearchFilter, setCurrentSearchFilter] = useState<ExamSearchFilter>(examSearchFilter);

    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get('page') ?? 1);

    const updateCurrentSearchFilter = useCallback(
        (newSearchFilter: ExamSearchFilter) => {
            if (isEqual(newSearchFilter, currentSearchFilter)) {
                return;
            }
            setSearchParams({ page: '1' });
            setCurrentSearchFilter(newSearchFilter);
        },
        [currentSearchFilter],
    );

    useEffect(() => {
        return () => {
            if (window.location.pathname.includes('/exam')) {
                return;
            }
            filterReset();
        };
    }, []);

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['boards', 'exam', { ...currentSearchFilter, currentPage }],
        queryFn: getExamBoards,
        retry: false,
        refetchOnWindowFocus: false,
        gcTime: 0,
        throwOnError: true,
    });

    return (
        <>
            <div
                className={
                    'relative mx-auto flex h-[calc(100dvh-4.68rem)] w-[70rem] flex-col overflow-y-auto border-x border-gray-200 scrollbar-hide'
                }
            >
                <div
                    className={
                        'sticky top-0 z-[1] flex w-full items-center justify-between gap-x-1 border-b border-gray-200 bg-white/70 px-6 py-4 backdrop-blur-md'
                    }
                >
                    <SearchFilterArea
                        currentSearchFilter={currentSearchFilter}
                        updateCurrentSearchFilter={updateCurrentSearchFilter}
                    />
                    <BoardAddButton content={'게시글 작성'} href={'/exam/post'} />
                </div>
                {isLoading || isFetching ? (
                    <LoadingSpinner size={70} />
                ) : data && data.totalSize !== 0 ? (
                    <>
                        <ExamBoardList examBoardList={data.dtoList} />
                        <BoardListPagination totalItemsCount={data.totalSize} />
                    </>
                ) : (
                    <div className={'relative flex-1'}>
                        <span
                            className={
                                'absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[0.9rem] font-bold'
                            }
                        >
                            게시글이 존재하지 않습니다. <br />위 <span className={'text-red-700'}>게시글 작성</span>{' '}
                            버튼을 눌러 게시글을 추가해 보세요.
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
