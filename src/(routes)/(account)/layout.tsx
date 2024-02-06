import { Link, Outlet } from 'react-router-dom';
import LOGO_URL from '/public/_assets/images/nestnet-logo.png';
import SideNavbar from './_component/SideNavbar';

export default function Layout() {
    return (
        <div className={'mx-auto flex w-[32rem] flex-col items-center'}>
            <header className={'mb-9 mt-14'}>
                <Link className={'text-5xl font-bold tracking-wider text-rose-700'} to={'/'}>
                    <img className={'w-[18rem]'} src={LOGO_URL} alt={'NestNetLogo'} />
                </Link>
            </header>
            <div className={'mb-14 w-full rounded-2xl border border-gray-300 bg-white'}>
                <SideNavbar />
                <Outlet />
            </div>
        </div>
    );
}
