import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getUnifiedBoards from './_lib/getUnifiedBoards';
import UnifiedBoardCategoryList from './_components/UnifiedBoardCategoryList';
import BoardAddButton from '../../_components/button/BoardAddButton.tsx';
import BoardListPagination from '../../_components/pagination/BoardListPagination.tsx';
import UnifiedBoardList from './_components/UnifiedBoardList';
import LoadingSpinner from '../../_components/loadingSpinner/LoadingSpinner.tsx';

export default function Page() {
    const [searchParams] = useSearchParams();

    const currentPage = Number(searchParams.get('page') ?? '1');

    const currentCategory = searchParams.get('category') ?? 'free';

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['boards', 'unified', { currentCategory, currentPage }],
        queryFn: getUnifiedBoards,
        retry: 0,
        refetchOnWindowFocus: false,
        gcTime: 0,
        throwOnError: true,
    });

    return (
        <div
            className={
                'mx-auto flex h-[calc(100dvh-4.68rem)] w-[50rem] flex-col overflow-y-auto border-x border-gray-200 scrollbar-hide'
            }
        >
            <div
                className={
                    'sticky top-0 z-[1] flex w-full items-center justify-between border-b border-gray-200 bg-white/70 px-6 py-4 backdrop-blur-md'
                }
            >
                <UnifiedBoardCategoryList />
                <BoardAddButton content={'게시글 작성'} href={'/community/post'} />
            </div>
            {isLoading || isFetching ? (
                <div className={'flex h-full items-center justify-center'}>
                    <LoadingSpinner size={70} />
                </div>
            ) : data && data.totalSize !== 0 ? (
                <>
                    <UnifiedBoardList unifiedBoardList={data.dtoList} />
                    <BoardListPagination totalItemsCount={data.totalSize} />
                </>
            ) : (
                <div className={'relative flex-1'}>
                    <span
                        className={
                            'absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[0.9rem] font-bold'
                        }
                    >
                        게시글이 존재하지 않습니다. <br />위 <span className={'text-secondary'}>게시글 작성</span>{' '}
                        버튼을 눌러 게시글을 추가해 보세요.
                    </span>
                </div>
            )}
        </div>
    );
}
