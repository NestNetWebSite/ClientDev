import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AboutMeBoard from './AboutMeBoard';

interface Props {
    aboutMeBoardList: {
        id: number;
        title: string;
        viewCount: number;
        likeCount: number;
        createdTime: number[];
        saveFilePath: string;
        saveFileName: string;
    }[];
}

export default function AboutMeBoardList({ aboutMeBoardList }: Props) {
    const navigate = useNavigate();
    const handleBoardClick = useCallback((id: number) => {
        navigate(`/about_me/${id}`);
    }, []);

    return (
        <main className={'flex flex-col'}>
            {aboutMeBoardList.map(aboutMeBoard => {
                return <AboutMeBoard key={aboutMeBoard.id} {...aboutMeBoard} onBoardClick={handleBoardClick} />;
            })}
        </main>
    );
}
