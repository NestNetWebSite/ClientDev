import { useInView } from 'react-intersection-observer';
import MainView from './main_view/page';
import PhotoZone from './photo_zone/page';
import Services from './services/page';
import Footer from './footer/page';

/**
 * 메인 홈
 * @returns
 */
export default function Page() {
    // api 호출 위한 포토존 영역 옵저버
    const { ref: photoZoneRef, inView } = useInView({
        triggerOnce: true,
    });

    return (
        <>
            {/* 메인뷰 */}
            <section>
                <MainView />
            </section>
            {/* 고정 배경화면 */}
            <section className="h-[9rem] bg-[url('./_assets/images/nestnet-bg.png')]  bg-fixed bg-bottom bg-no-repeat" />
            {/* 포토존 */}
            <section className='relative -top-44 pt-60' ref={photoZoneRef}>
                <PhotoZone inView={inView} />
            </section>
            {/* 서비스 */}
            <section className='px-14 md:px-20 xl:px-24'>
                <Services />
            </section>
            {/* 푸터 */}
            <section>
                <Footer />
            </section>
        </>
    );
}
