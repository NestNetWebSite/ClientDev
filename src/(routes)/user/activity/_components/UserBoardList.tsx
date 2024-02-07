import { useNavigate, useOutletContext } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UserBoard from './UserBoard.tsx';
import getUserBoards from '../_lib/getUserBoards';
import LoadingSpinner from '../../../../_components/loadingSpinner/LoadingSpinner.tsx';

export default function UserBoardList() {
    // @ts-ignore
    const id: number = useOutletContext().id;

    const navigate = useNavigate();

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['user', 'boards', id],
        queryFn: getUserBoards,
        gcTime: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        throwOnError: true,
    });

    const handleBoardClick = (id: number, postCategory: string) => {
        if (postCategory === 'EXAM') {
            navigate(`/exam/${id}`);
        } else if (postCategory === 'UNIFIED') {
            navigate(`/board/${id}`);
        } else if (postCategory === 'INTRODUCTION') {
            navigate(`/about_me/${id}`);
        } else if (postCategory === 'NOTICE') {
            navigate(`/notice/${id}`);
        } else if (postCategory === 'PHOTO') {
            navigate(`/photo-album/${id}`);
        }
    };

    return (
        <ul className={'h-full'}>
            {isLoading || isFetching ? (
                <div className={'flex h-full flex-col items-center justify-center'}>
                    <LoadingSpinner size={50} />
                </div>
            ) : (
                data.dtoList &&
                (data.dtoList.length !== 0 ? (
                    data.dtoList.map(userBoard => {
                        return <UserBoard key={userBoard.id} {...userBoard} onBoardClick={handleBoardClick} />;
                    })
                ) : (
                    <div className={'flex h-full flex-col items-center justify-center'}>
                        <p className={'text-lg font-bold'}>작성한 게시글이 없습니다. 게시글을 작성해보세요.</p>
                    </div>
                ))
            )}
        </ul>
    );
}
