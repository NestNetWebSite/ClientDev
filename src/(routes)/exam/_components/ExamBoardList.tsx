import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ExamBoard from './ExamBoard.tsx';

interface Props {
    examBoardList: {
        id: number;
        subject: string;
        professor: string;
        year: number;
        semester: string | number;
        examType: string;
        userName: string;
    }[];
}

export default function ExamBoardList({ examBoardList }: Props) {
    const navigate = useNavigate();
    const handleBoardClick = useCallback((id: number) => {
        navigate(`/exam/${id}`);
    }, []);

    return (
        <main className='grid w-full grid-cols-3 gap-x-6 gap-y-7 p-4'>
            {examBoardList?.map(examBoard => {
                return <ExamBoard {...examBoard} onBoardClick={handleBoardClick} />;
            })}
        </main>
    );
}
