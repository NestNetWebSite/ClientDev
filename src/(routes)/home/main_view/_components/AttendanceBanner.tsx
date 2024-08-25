import { useState } from 'react';
import Dot from '../../_components/Dot';
import LoadingSpinner from '../../../../_components/loadingSpinner/LoadingSpinner';
import { IWeeklyAttdRank, IMonthlyAttdRank } from '../../type';

// 배너 제목
const BannerTitle = ['주간순위', '월간순위'];

// 출석 순위 배너
interface IAttdBannerProps {
    bannerItems: [IWeeklyAttdRank[], IMonthlyAttdRank[]];
    isLoading: boolean;
}
export default function AttendanceBanner({ bannerItems: attendanceRanks, isLoading }: IAttdBannerProps) {
    const [slideIdx, setSlideIdx] = useState(1);

    // 배너 내 인덱스 닷 핸들러
    const handleDotClick = (idx: number) => {
        setSlideIdx(idx + 1);
    };

    if (isLoading)
        return (
            <div className='relative top-[45%] text-center'>
                <LoadingSpinner size={30} />
            </div>
        );

    return (
        <div className='relative h-full w-full'>
            {/* 출석 순위 */}
            {attendanceRanks?.map((attendanceRank, idx) => (
                <div
                    key={idx}
                    className={`RankSlide absolute left-0 top-0 h-full w-full ${
                        slideIdx === idx + 1 ? 'visible' : 'invisible'
                    }`}
                >
                    <div className='m-[0.8rem] mb-[0.4rem] text-sm font-bold text-primary'>{BannerTitle[idx]}</div>
                    <div className='mb-2 flex h-[1rem] w-full flex-row px-4 text-xs font-semibold'>
                        <span className='mr-12 w-10'>순위</span>
                        <div className='flex w-full flex-row justify-between'>
                            <span>이름</span>
                            <span>점수</span>
                        </div>
                    </div>
                    {attendanceRank.length === 0 ? (
                        <p className='w-full pt-10 text-center text-xs text-stone-500'>출석자가 없습니다</p>
                    ) : (
                        <ul className='w-full px-4 text-black'>
                            {attendanceRank.map((ranker, idx) => (
                                <li key={idx} className='mb-1 flex h-4 w-full flex-row text-xs'>
                                    <span className='mr-16 w-2 pl-2'>{idx + 1}</span>
                                    <div className='flex w-full flex-row justify-between'>
                                        <span>{ranker.memberName}</span>
                                        <span className='text-right'>{ranker.point}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
            {/* 인덱스 닷 */}
            <div className='absolute bottom-0 left-1/2 mb-1 flex -translate-x-1/2 flex-row'>
                {Array.from({ length: attendanceRanks?.length }).map((_, idx) => (
                    <Dot key={idx} dotSize={0} isActive={slideIdx === idx + 1} idx={idx} setSlideIdx={handleDotClick} />
                ))}
            </div>
        </div>
    );
}
