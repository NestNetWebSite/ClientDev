import { HiCalendarDays } from 'react-icons/hi2';
import { FaRegUser } from 'react-icons/fa';

interface Props {
    id: number;
    year: number;
    semester: string | number;
    examType: string;
    subject: string;
    professor: string;
    userName: string;
    onBoardClick: (id: number) => void;
}

export default function ExamBoard({ id, year, semester, examType, subject, professor, userName, onBoardClick }: Props) {
    return (
        <article
            className={
                'my-3 flex h-56 cursor-pointer flex-col justify-between rounded-2xl border border-gray-100 px-7 py-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl'
            }
            onClick={() => {
                onBoardClick(id);
            }}
        >
            <div>
                <div className={'mx-1 mb-5 flex justify-between'}>
                    <div className={'flex items-center gap-x-1.5'}>
                        <HiCalendarDays className={'h-5 w-5 text-gray-500'} />
                        <span className={'text-[0.9rem] font-bold text-gray-500'}>
                            {year}년도 {semester}학기
                        </span>
                    </div>
                    <div>
                        <span
                            className={`block rounded-2xl border px-2 py-1 text-[0.9rem] font-semibold ${
                                examType === 'FINAL'
                                    ? 'border-orange-500 text-orange-500'
                                    : 'border-blue-500 text-blue-500'
                            }`}
                        >
                            {examType === 'FINAL' ? '기말' : '중간'}고사
                        </span>
                    </div>
                </div>
                <div>
                    <h1 className={'ml-1 line-clamp-2 text-[1.7rem] font-bold text-slate-950'}>{subject}</h1>
                </div>
            </div>
            <div>
                <div className={'pb-1 text-right'}>
                    <span className={'text-base'}>
                        - <span className={'font-bold'}> {professor}</span> 교수님 -
                    </span>
                </div>
                <div className={'flex gap-x-2 text-slate-600'}>
                    <FaRegUser className={'h-5 w-5'} />
                    <span className={'text-[0.9rem] font-bold'}>{userName}</span>
                </div>
            </div>
        </article>
    );
}
