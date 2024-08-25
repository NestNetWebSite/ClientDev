import { useEffect, useState } from 'react';
import AttendanceBtn from './_components/AttendanceBtn';
import MainPhotoBanner from './_components/MainPhotoBanner';
import RecentPostsBanner from './_components/RecentPostsBanner';
import LinkBanner from './_components/LinkBanner';
import AttendanceBanner from './_components/AttendanceBanner';
import { IWeeklyAttdRank, IMonthlyAttdRank } from '../type';
import { useGetAttendance, useGetNewPosts } from '../../../api/home-banner-api';

// 메인 페이지
export default function Page() {
    const { data: recentPosts, isLoading: isNewPostsLoading, isError: isNewPostsError } = useGetNewPosts();
    const {
        data: { weeklyStatisticsDtoList: weeklyAttdRank = [], monthlyStatisticsDtoList: monthlyAttdRank = [] } = {},
        isLoading: isAttdRanksLoading,
        isSuccess: isAttdRanksSuccess,
        isError: isAttdRankError,
    } = useGetAttendance();
    const [attdRankSlides, setAttdRankSlides] = useState<[IWeeklyAttdRank[], IMonthlyAttdRank[]]>([[], []]);

    useEffect(() => {
        if (isAttdRanksSuccess) {
            setAttdRankSlides([[...weeklyAttdRank], [...monthlyAttdRank]]);
        }
    }, [isAttdRanksSuccess, weeklyAttdRank, monthlyAttdRank]);

    return (
        <>
            <div className='pointer-events-none fixed inset-0 overflow-hidden' />
            {/* 출석체크 버튼 */}
            <div className='fixed bottom-10 right-10 z-50'>
                <AttendanceBtn />
            </div>
            <div className='w-full pb-[10rem]'>
                <div className='relative top-10 mx-auto max-w-screen-xl px-16 xl:px-20'>
                    <div className='relative top-3 grid w-full grid-cols-1 gap-10 lg:grid-cols-[auto_14rem] xl:gap-8'>
                        {/* 메인 사진 */}
                        <div className='relative hidden min-h-[30rem] w-full sm:flex'>
                            <MainPhotoBanner />
                        </div>
                        {/* 배너 */}
                        <div className='px-auto	mx-auto flex select-none flex-col gap-4 sm:flex-row sm:gap-12 md:gap-24 lg:flex-col lg:gap-4'>
                            <div className='flex flex-col justify-between gap-4'>
                                {/* 최신 글 배너 */}
                                <article className='flex h-[14rem] w-[14rem] flex-col rounded-[0.5rem] border-2 border-secondary bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                                    <h1 className='m-[0.8rem] mb-[0.3rem] text-sm font-bold text-primary'>최신 글</h1>
                                    {isNewPostsError ? (
                                        <div className='relative top-[35%] text-center text-xs'>
                                            최신 글을 불러오는데 실패했습니다.
                                        </div>
                                    ) : (
                                        <RecentPostsBanner items={recentPosts} isLoading={isNewPostsLoading} />
                                    )}
                                </article>
                                {/* 로고 배너 */}
                                <div className='h-[6rem] w-[14rem] overflow-hidden rounded-[0.5rem] bg-secondary p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] lg:hidden'>
                                    <img
                                        className='h-full w-full object-contain'
                                        src='_assets/images/nestnet-text-logo-removebg.png'
                                        alt='네스트넷 로고'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                {/* 링크 배너 */}
                                <article className='max-[78rem]:flex relative box-border h-[7.5rem] min-w-[14rem] overflow-hidden rounded-[0.5rem] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] brightness-95 lg:hidden xl:flex'>
                                    <LinkBanner />
                                </article>
                                {/* 출석 순위 배너 */}
                                <article className='flex h-[12.5rem] w-[14rem] flex-col overflow-hidden rounded-[0.5rem] border-2 border-secondary bg-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                                    {isAttdRankError ? (
                                        <div className='relative top-[45%] text-center text-xs'>
                                            출석 순위를 불러오는데 실패했습니다.
                                        </div>
                                    ) : (
                                        <AttendanceBanner bannerItems={attdRankSlides} isLoading={isAttdRanksLoading} />
                                    )}
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
