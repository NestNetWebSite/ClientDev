import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import SliderArrowBtn from '../../_components/SliderArrowBtn';
import Dot from '../../_components/Dot';
import { PAGE_ROUTE } from '../../../../_constants/constants';
import { ILinkBannerItem } from '../../type';
import useInterval from '../../../../_hooks/useInterval';

// 배너 내 각 슬라이드 아이템
const sliderItems: ILinkBannerItem[] = [
    {
        title: '연혁',
        src: '_assets/images/history-bg.jpg',
        link: PAGE_ROUTE.HISTORY,
    },
    {
        title: '회칙',
        src: '_assets/images/regulations-bg.jpg',
        link: PAGE_ROUTE.REGULATIONS,
    },
    {
        title: '지도교수',
        src: '_assets/images/professor-bg.jpg',
        link: PAGE_ROUTE.PROFESSOR,
    },
    {
        title: '임원',
        src: '_assets/images/executives-bg.jpg',
        link: PAGE_ROUTE.EXECUTIVES,
    },
];

// COMPONENT: 링크 슬라이딩 배너 (연혁, 회칙 등의 페이지로 넘어갈 수 있는 링크를 담은 배너)
export default memo(function LinkBanner() {
    const [slideIdx, setSlideIdx] = useState(1);

    // 이전 또는 이후 슬라이드로 이동
    const nextSlide = () => {
        setSlideIdx(prevIdx => (prevIdx % sliderItems?.length) + 1);
    };
    const prevSlide = () => {
        setSlideIdx(prevIdx => (prevIdx === 1 ? sliderItems?.length : prevIdx - 1));
    };

    // 닷 클릭시 해당 슬라이드 이동
    const handleDotClick = (idx: number) => {
        setSlideIdx(idx + 1);
    };

    useInterval(() => {
        setSlideIdx(prevIdx => (prevIdx % sliderItems?.length) + 1);
    }, 12000);

    return (
        <div className='relative h-full w-full select-none'>
            <>
                {sliderItems.map((item, idx) => {
                    return (
                        <div key={idx}>
                            <div
                                className={`SlideImg absolute left-0 top-0 h-full w-full ${
                                    slideIdx === idx + 1 ? 'animate-fadein opacity-100' : 'opacity-0'
                                }`}
                            >
                                <img className='brightness-[105%]' src={item.src} alt='' />
                            </div>
                            <div
                                className={`SlideTitle absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  
                                text-[1.3rem] font-semibold tracking-normal ${
                                    slideIdx === idx + 1 ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                {item.title}
                            </div>
                        </div>
                    );
                })}
                {sliderItems.map((item, idx) => {
                    return slideIdx === idx + 1 ? (
                        <Link key={idx} to={item.link} className={`absolute h-full w-full`} />
                    ) : null;
                })}
            </>
            {/* 배너 양방향 이동 버튼 */}
            <span className='absolute top-1/2 my-auto flex -translate-y-1/2 flex-col justify-center'>
                <SliderArrowBtn moveSlide={prevSlide} direction={'prev'} />
            </span>
            <span className='absolute right-0 top-1/2 my-auto flex -translate-y-1/2 flex-col justify-center'>
                <SliderArrowBtn moveSlide={nextSlide} direction={'next'} />
            </span>
            <div className='absolute bottom-0 left-1/2 mb-1 flex -translate-x-1/2 flex-row'>
                {sliderItems?.map((_, idx) => (
                    <Dot
                        key={idx}
                        isActive={slideIdx === idx + 1 ? true : false}
                        shape={'circle'}
                        idx={idx}
                        setSlideIdx={handleDotClick}
                    />
                ))}
            </div>
        </div>
    );
});
