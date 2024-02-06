import { Link, Outlet } from 'react-router-dom';
import SideNavbar from './_component/SideNavbar';
import LOGO_URL from '/public/_assets/images/nestnet-logo.png';

export default function Layout() {
    return (
        <div className={'mx-auto flex w-[32rem] flex-col items-center'}>
            <header className={'mb-9 mt-14'}>
                <Link className={'text-5xl font-bold tracking-wider text-rose-700'} to={'/'}>
                    <img className={'w-[18rem]'} src={LOGO_URL} alt={'NestNetLogo'} />
                </Link>
            </header>
            <div className={'w-full rounded-2xl border border-gray-300 bg-white'}>
                <SideNavbar />
                <div className={'p-8'}>
                    <Outlet />
                    <div className={'w-full text-end'}>
                        <Link
                            className={'text-[0.9rem] font-bold text-gray-500 transition-all hover:text-rose-700'}
                            to={'signin'}
                        >
                            로그인 / 회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
