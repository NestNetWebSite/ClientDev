import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getAboutMeBoards from './_lib/getAboutMeBoards';
import BoardAddButton from '../../_components/button/BoardAddButton.tsx';
import AboutMeBoardList from './_components/AboutMeBoardList';
import BoardListPagination from '../../_components/pagination/BoardListPagination.tsx';
import LoadingSpinner from '../../_components/loadingSpinner/LoadingSpinner.tsx';

export default function Page() {
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? '1');

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['aboutMeBoards', { currentPage }],
        queryFn: getAboutMeBoards,
        retry: false,
        refetchOnWindowFocus: false,
        gcTime: 0,
        throwOnError: true,
    });

    return (
        <>
            <div
                className={
                    'mx-auto flex h-[calc(100dvh-4.68rem)] w-[50rem] flex-col overflow-y-auto border-x border-gray-200 scrollbar-hide'
                }
            >
                <div
                    className={
                        'sticky top-0 z-[1] flex w-full items-center justify-end border-b border-gray-200 bg-white/70 px-6 py-4 backdrop-blur-md'
                    }
                >
                    <BoardAddButton content={'자기소개 작성'} href={'/about_me/post'} />
                </div>
                {isLoading || isFetching ? (
                    <div className={'flex h-full items-center justify-center'}>
                        <LoadingSpinner size={70} />
                    </div>
                ) : data && data.totalSize !== 0 ? (
                    <>
                        <AboutMeBoardList aboutMeBoardList={data.dtoList} />
                        <BoardListPagination totalItemsCount={data.totalSize} />
                    </>
                ) : (
                    <div className={'relative flex-1'}>
                        <span
                            className={
                                'absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-[0.9rem] font-bold'
                            }
                        >
                            게시글이 존재하지 않습니다. <br />위 <span className={'text-red-700'}>자기소개 작성</span>{' '}
                            버튼을 눌러 게시글을 추가해 보세요.
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
