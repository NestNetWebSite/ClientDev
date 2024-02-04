import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UnifiedBoard from './UnifiedBoard';

interface Props {
    unifiedBoardList: {
        id: string | number;
        username: string;
        title: string;
        createdTime: number[];
        viewCount: number;
        likeCount: number;
    }[];
}

export default function UnifiedBoardList({ unifiedBoardList }: Props) {
    const navigate = useNavigate();
    const handleBoardClick = useCallback((id: string | number) => {
        navigate(`/community/${id}`);
    }, []);

    return (
        <main className={'flex flex-col'}>
            {unifiedBoardList.map(unifiedBoard => {
                return (
                    <UnifiedBoard
                        key={unifiedBoard.id}
                        id={unifiedBoard.id}
                        userName={unifiedBoard.username}
                        title={unifiedBoard.title}
                        createdTime={unifiedBoard.createdTime}
                        viewCount={unifiedBoard.viewCount}
                        likeCount={unifiedBoard.likeCount}
                        onBoardClick={handleBoardClick}
                    />
                );
            })}
        </main>
    );
}
