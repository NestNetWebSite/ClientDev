import { Link, Outlet } from 'react-router-dom';
import SideNavbar from './_component/SideNavbar';

export default function Layout() {
    return (
        <div className={'mx-auto flex w-[32rem] flex-col items-center'}>
            <header className={'mb-9 mt-14'}>
                <Link className={'text-5xl font-bold tracking-wider text-rose-700'} to={'/'}>
                    Nest.Net
                </Link>
            </header>
            <div className={'mb-14 w-full rounded-3xl border border-gray-300 bg-white'}>
                <SideNavbar />
                <Outlet />
            </div>
        </div>
    );
}
