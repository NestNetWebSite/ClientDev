import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import NoticeBoard from './NoticeBoard';

interface Props {
    noticeBoardList: {
        id: number;
        title: string;
        createdTime: number[];
        viewCount: number;
        likeCount: number;
        userName: string;
    }[];
}

export default function NoticeBoardList({ noticeBoardList }: Props) {
    const navigate = useNavigate();
    const handleBoardClick = useCallback((id: number) => {
        navigate(`/notice/${id}`);
    }, []);

    return (
        <main className={'flex flex-col'}>
            {noticeBoardList.map(noticeBoard => {
                return <NoticeBoard key={noticeBoard.id} {...noticeBoard} onBoardClick={handleBoardClick} />;
            })}
        </main>
    );
}
