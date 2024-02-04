import { Link } from 'react-router-dom';
import { PAGE_ROUTE } from '../../../_constants/constants';

/**
 * 메인 푸터 영역
 * @returns
 */
export default function Footer() {
    class Content {
        constructor(title, link) {
            this.title = title;
            this.link = link;
        }
    }

    const links = [
        new Content('소프트웨어학부', 'https://software.cbnu.ac.kr/'),
        new Content('소프트웨어 중심대학사업단', 'https://sw7up.cbnu.ac.kr/home/'),
        new Content('개신누리', 'https://eis.cbnu.ac.kr/cbnuLogin/'),
        new Content('블랙보드', 'https://lms.chungbuk.ac.kr/login/index.php/'),
    ];

    const boards = [
        new Content('공지사항', PAGE_ROUTE.NOTICE),
        new Content('통합 게시판', PAGE_ROUTE.COMMUINTY),
        new Content('사진 게시판', PAGE_ROUTE.PHOTOALBUMS),
        new Content('자료 게시판', PAGE_ROUTE.EXAM),
    ];

    const etcs = [
        new Content('동아리 연혁', PAGE_ROUTE.HISTORY),
        new Content('교수 소개', PAGE_ROUTE.PROFESSOR),
        new Content('현 임원 소개', PAGE_ROUTE.EXECUTIVES),
        new Content('전 임원 소개', PAGE_ROUTE.FORMER_EXECUTIVES),
    ];

    return (
        <footer className='mt-20 border-t-2 border-gray-300 bg-white dark:bg-gray-800'>
            <div className='mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-12'>
                <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
                    <div className='mb-2 grid gap-14 lg:grid-cols-2 xl:col-span-2'>
                        <div className='md:grid md:grid-cols-2 md:gap-8'>
                            <div className='col-span-2'>
                                {/* 학교 관련 페이지 바로가기 링크 */}
                                <h4 className='mb-2 text-gray-800'>바로가기</h4>
                                <ul className='text-sm text-gray-500 dark:text-gray-400'>
                                    {links.map((link, idx) => (
                                        <li key={idx} className='mb-1'>
                                            <Link to={link.link} target='_blank'>
                                                <span className='text-sm text-gray-500'>{link.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-8'>
                            <div>
                                {/* 홈페이지 내 게시판 바로가기 링크 */}
                                <h4 className='mb-2 text-gray-800'>게시판</h4>
                                <ul>
                                    {boards.map((board, idx) => (
                                        <li key={idx} className='mb-1'>
                                            <Link to={board.link} target='_blank'>
                                                <span className='text-sm text-gray-500'>{board.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                {/* 홈페이지 내 기타 바로가기 링크 */}
                                <h4 className='mb-2 text-gray-800'>기타</h4>
                                <ul>
                                    {etcs.map((etc, idx) => (
                                        <li key={idx} className='mb-1'>
                                            <Link to={etc.link} target='_blank'>
                                                <span className='text-sm text-gray-500'>{etc.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* 네스트넷 로고 */}
                    <div className='mx-auto my-10 flex w-fit flex-col items-center xl:mt-0'>
                        <img className='w-[16rem]' src='_assets/images/nestnet-logo.png' alt='네스트넷 로고' />
                        <span className='mx-auto pr-3 text-[0.9rem] text-gray-500'>소프트웨어학부 1등 학술동아리</span>
                    </div>
                </div>
                <div className='text-slate-600'>
                    {/* 프로젝트 개발자 */}
                    <div className='mb-1 text-xs'>제작자</div>
                    <div className='text-xs'>
                        <ul className='text-[0.7rem]'>
                            <li>
                                <span>Front. </span>김강민 허원일
                            </li>
                            <li>
                                <span>Back. </span>김성호
                            </li>
                            <li>
                                <span>Design. </span>김강민 허원일
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
