import { useState } from 'react';
import Dot from '../../_components/Dot';
import LoadingSpinner from '../../../../_components/loadingSpinner/LoadingSpinner';

// 배너 제목
const BannerTitle = ['주간순위', '월간순위'];

/**
 * 출석 순위 정보를 담는 슬라이드 배열
 * @param {Object}
 * @returns
 */
export default function AttendanceBanner({ items: attendanceRanks, isLoading }) {
    const [slideIdx, setSlideIdx] = useState(1);

    const handleDotClick = idx => {
        setSlideIdx(idx + 1);
    };

    if (isLoading)
        return (
            <div className='absolute left-0 top-0 flex h-full w-full flex-col justify-center pt-3'>
                <LoadingSpinner size={30} />
            </div>
        );

    return (
        <div className='relative h-full w-full'>
            {/* 출석 순위 */}
            {attendanceRanks?.map((attendanceRank, idx) => (
                <div
                    key={attendanceRank.id}
                    className={`slide absolute left-0 top-0 h-full w-full p-5 pt-4 text-black ${
                        slideIdx === idx + 1 ? 'visible' : 'invisible'
                    }`}
                >
                    <div className='text-home-primary mb-[0.35rem] text-sm font-bold'>{BannerTitle[idx]}</div>
                    <div className='mb-1 flex h-[1rem] w-full flex-row text-xs font-semibold'>
                        <span className='mr-12 w-10'>순위</span>
                        <div className='flex w-full flex-row justify-between'>
                            <span>이름</span>
                            <span>점수</span>
                        </div>
                    </div>
                    {attendanceRank.length === 0 ? (
                        <p className='w-full pt-10 text-center text-xs text-stone-500'>출석자가 없습니다</p>
                    ) : (
                        <>
                            <ul className='pr-1 text-black'>
                                {attendanceRank.map((ranker, idx) => (
                                    <li className='flex h-[1.4rem] w-full flex-row text-xs'>
                                        <span className='mr-14 w-2 pl-2'>{idx + 1}</span>
                                        <div className='flex w-full flex-row justify-between'>
                                            <span>{ranker.memberName}</span>
                                            <span className='text-right'>{ranker.point}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ))}
            {/* 인덱스 닷 */}
            <div className='absolute bottom-0 left-1/2 mb-1 flex -translate-x-1/2 flex-row'>
                {Array.from({ length: attendanceRanks?.length }).map((_, idx) => (
                    <Dot
                        key={idx}
                        active={slideIdx === idx + 1 ? 'active' : ''}
                        idx={idx}
                        setSlideIdx={handleDotClick}
                    />
                ))}
            </div>
        </div>
    );
}
